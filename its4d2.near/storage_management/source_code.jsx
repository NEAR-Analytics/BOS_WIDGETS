const { accountId } = context;
const rpcServer = "https://1rpc.io/near";

if (!accountId) return "Please login";

const txs = [...(state?.txs ?? [])];
let storageDeposits = [...(state?.storageDeposits ?? [])];
State.init({
  txs,
  page: state?.page ?? 1,
  doneTxs: state?.doneTxs ?? false,
  storageDeposits,
  doneRpc: state?.doneRpc ?? false,
  language: "en",
  expandedContracts: state?.expandedContracts ?? {},
});

const translations = {
  en: {
    title: "Storage Management",
    description:
      "This BOS app allows you to free unused Near that you have deposited for storage staking.",
    loadingTxs: "Loading transactions...",
    scanningTxs: "Scanning transactions...",
    remaining: "Remaining",
    totalButton: "Free {{amount}} NEAR from {{count}} contracts",
    staked: "Staked",
    available: "Available",
    freeButton: "Free {{amount}} NEAR",
    unregisterButton: "Unregister account for {{amount}} NEAR",
  },
  zh: {
    title: "Storage Management",
    description: "這個 BOS 應用程式可以讓你釋放為儲存抵押但未使用的 NEAR。",
    loadingTxs: "正在載入交易...",
    scanningTxs: "正在掃描交易...",
    remaining: "剩餘",
    totalButton: "從 {{count}} 個合約中釋放 {{amount}} NEAR",
    staked: "已抵押",
    available: "可用",
    freeButton: "釋放 {{amount}} NEAR",
    unregisterButton: "為 {{amount}} NEAR 註銷帳戶",
  },
  fr: {
    title: "Storage Management",
    description:
      "Cette application BOS vous permet de libérer les NEAR inutilisés que vous avez déposés pour le staking de stockage.",
    loadingTxs: "Chargement des transactions...",
    scanningTxs: "Analyse des transactions...",
    remaining: "Restant",
    totalButton: "Libérer {{amount}} NEAR de {{count}} contrats",
    staked: "Engagé",
    available: "Disponible",
    freeButton: "Libérer {{amount}} NEAR",
    unregisterButton: "Désinscription du compte pour {{amount}} NEAR",
  },
};

const onLanguageChange = (language) => {
  State.update({ language });
};

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 33vh;
`;

const Spinner = styled.span`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
  margin-bottom: 1rem;

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
`;

if (!state.doneTxs) {
  asyncFetch(
    `https://api.nearblocks.io/v1/account/${accountId}/txns?method=storage_deposit&order=desc&page=${state.page}&per_page=25`
  ).then((res) => {
    if (
      !res.ok ||
      !Array.isArray(res.body?.txns) ||
      res.body.txns.length === 0
    ) {
      State.update({
        doneTxs: true,
      });
      return;
    }
    State.update({
      txs: txs.concat(res.body.txns),
      page: state.page + 1,
    });
  });
  return (
    <Centered>
      <Spinner />
      <div>{translations[state.language].loadingTxs}</div>
    </Centered>
  );
}

if (!state.doneRpc) {
  const tx = txs.pop();
  asyncFetch(rpcServer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "tx",
      params: [tx.transaction_hash, tx.predecessor_account_id],
    }),
  }).then((res) => {
    if (!res.ok || !Array.isArray(res.body.result?.transaction?.actions)) {
      State.update({
        doneRpc: true,
      });
      return;
    }
    const storageDeposit = res.body.result.transaction.actions.find(
      (action) => {
        const args = action.FunctionCall?.args;
        if (args == null) return false;
        const actionArgs = JSON.parse(Buffer.from(args, "base64").toString());
        return actionArgs.receiver_id === accountId;
      }
    );
    if (storageDeposit != null) {
      storageDeposits.push(tx.receiver_account_id);
    }
    const doneRpc = txs.length === 0;
    if (doneRpc) {
      storageDeposits = Array.from(new Set(storageDeposits));
    }
    State.update({
      txs: [...txs],
      storageDeposits: [...storageDeposits],
      doneRpc,
    });
  });
  return (
    <Centered>
      <Spinner />
      <div>
        {translations[state.language].scanningTxs}
        <br />
        {translations[state.language].remaining}: {txs.length}
      </div>
    </Centered>
  );
}

const storageBalances = {};
for (const contractId of state.storageDeposits) {
  try {
    const storageBalanceOf = Near.view(contractId, "storage_balance_of", {
      account_id: accountId,
    });
    if (storageBalanceOf != null) {
      storageBalances[contractId] = storageBalanceOf;
    }
  } catch (err) {}
}

let totalAvailable = Big("0");
for (const storageBalanceOf of Object.values(storageBalances)) {
  if (
    !storageBalanceOf ||
    !storageBalanceOf.total ||
    !storageBalanceOf.available
  ) {
    continue;
  }
  totalAvailable = totalAvailable.plus(storageBalanceOf.available);
}
totalAvailable = totalAvailable.div(Big(10).pow(24)).round(3).toString();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
`;

const LanguageSelector = styled.div`
  position: absolute;
  top: 0rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Flag = styled.span`
  font-size: 1.5rem;
`;

const Text = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContractCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const ContractHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const ContractDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const storageWithdraw = (contractId) => {
  Near.call(contractId, "storage_withdraw", {}, "30000000000000", "1");
};

const storageWithdrawAll = () => {
  Near.call(
    Object.entries(storageBalances)
      .filter(
        ([_, storageBalanceOf]) =>
          storageBalanceOf != null &&
          !!storageBalanceOf.total &&
          !!storageBalanceOf.available &&
          Number(storageBalanceOf.available) > 0
      )
      .map(([contractId]) => ({
        contractName: contractId,
        methodName: "storage_withdraw",
        deposit: "1",
      }))
  );
};

const storageUnregister = (contractId) => {
  Near.call(contractId, "storage_unregister", {}, "30000000000000", "1");
};

const toggleContract = (contractId) => {
  State.update({
    expandedContracts: {
      ...state.expandedContracts,
      [contractId]: !state.expandedContracts[contractId],
    },
  });
};

const renderStorageInfos = () =>
  Object.entries(storageBalances)
    .filter(
      ([_, storageBalanceOf]) =>
        storageBalanceOf != null &&
        !!storageBalanceOf.total &&
        !!storageBalanceOf.available
    )
    .map(([contractId, storageBalanceOf]) => {
      const total = Big(storageBalanceOf.total)
        .div(Big(10).pow(24))
        .round(3)
        .toString();
      const available = Big(storageBalanceOf.available)
        .div(Big(10).pow(24))
        .round(3)
        .toString();
      return (
        <ContractCard key={contractId}>
          <ContractHeader onClick={() => toggleContract(contractId)}>
            <Label>{contractId}</Label>
            <span>{state.expandedContracts[contractId] ? "▲" : "▼"}</span>
          </ContractHeader>
          {state.expandedContracts[contractId] && (
            <ContractDetails>
              <div>
                {translations[state.language].staked}: {total}
              </div>
              <div>
                {translations[state.language].available}: {available}
              </div>
              <ButtonGroup>
                {storageBalanceOf.available &&
                  Number(storageBalanceOf.available) > 0 && (
                    <Button onClick={() => storageWithdraw(contractId)}>
                      {translations[state.language].freeButton.replace(
                        "{{amount}}",
                        available
                      )}
                    </Button>
                  )}
                <Button onClick={() => storageUnregister(contractId)}>
                  {translations[state.language].unregisterButton.replace(
                    "{{amount}}",
                    total
                  )}
                </Button>
              </ButtonGroup>
            </ContractDetails>
          )}
        </ContractCard>
      );
    });

return (
  <Wrapper>
    <TitleWrapper>
      <Title>{translations[state.language].title}</Title>
      <LanguageSelector>
        <Flag onClick={() => onLanguageChange("en")}>🇺🇸</Flag>
        <Flag onClick={() => onLanguageChange("fr")}>🇫🇷</Flag>
        <Flag onClick={() => onLanguageChange("zh")}>🇭🇰</Flag>
      </LanguageSelector>
    </TitleWrapper>
    <Text>{translations[state.language].description}</Text>
    {context.accountId ? (
      <>
        {!state.doneTxs || !state.doneRpc ? (
          <Centered>
            <Spinner />
            <div>
              {!state.doneTxs
                ? translations[state.language].loadingTxs
                : translations[state.language].scanningTxs}
              {!state.doneRpc && (
                <>
                  <br />
                  {translations[state.language].remaining}: {txs.length}
                </>
              )}
            </div>
          </Centered>
        ) : (
          <>
            <Button onClick={() => storageWithdrawAll()}>
              {translations[state.language].totalButton
                .replace("{{amount}}", totalAvailable)
                .replace("{{count}}", state.storageDeposits.length)}
            </Button>
            <FormGroup>{renderStorageInfos()}</FormGroup>
          </>
        )}
      </>
    ) : (
      <Text
        style={{
          color: "#856404",
          backgroundColor: "#fff3cd",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        {translations[state.language].loginPrompt}
      </Text>
    )}
  </Wrapper>
);
