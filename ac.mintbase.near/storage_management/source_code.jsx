const { accountId } = context;
const rpcServer = "https://1rpc.io/near";

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
  border: 0.25em solid #272829;
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

const LoginPrompt = styled.div`
  color: #856404;
  background-color: #fff3cd;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

if (!accountId) {
  return (
    <Centered>
      <LoginPrompt>請先登入</LoginPrompt>
    </Centered>
  );
}

const txs = [...(state?.txs ?? [])];
let storageDeposits = [...(state?.storageDeposits ?? [])];
State.init({
  txs,
  page: state?.page ?? 1,
  doneTxs: state?.doneTxs ?? false,
  storageDeposits,
  doneRpc: state?.doneRpc ?? false,
  expandedContracts: state?.expandedContracts ?? {},
});

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
      <div style={{ color: "#272829" }}>正在載入交易...</div>
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
      <div style={{ color: "#272829" }}>
        正在掃描交易...
        <br />
        剩餘: {txs.length}
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
  background-color: #F5F7F8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  color: #272829;
`;

const Text = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #272829;
`;

const FormGroup = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #F5F7F8;
  background-color: #272829;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #31363f;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

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

const toggleContract = (contractId) => {
  State.update({
    expandedContracts: {
      ...state.expandedContracts,
      [contractId]: !state.expandedContracts[contractId],
    },
  });
};

const storageWithdraw = (contractId) => {
  Near.call(contractId, "storage_withdraw", {}, "30000000000000", "1");
};

const storageUnregister = (contractId) => {
  Near.call(contractId, "storage_unregister", {}, "30000000000000", "1");
};

return (
  <Wrapper>
    <Title>Storage Management</Title>
    <Text>這個 BOS 應用程式可以讓你釋放為儲存抵押但未使用的 NEAR。</Text>
    {!state.doneTxs || !state.doneRpc ? (
      <Centered>
        <Spinner />
        <div style={{ color: "#272829" }}>
          {!state.doneTxs ? "正在載入交易..." : "正在掃描交易..."}
          {!state.doneRpc && (
            <>
              <br />
              剩餘: {txs.length}
            </>
          )}
        </div>
      </Centered>
    ) : (
      <>
        <Button onClick={() => storageWithdrawAll()}>
          從 {state.storageDeposits.length} 個合約中釋放 {totalAvailable} NEAR
        </Button>
        <FormGroup>
          {Object.entries(storageBalances)
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
                    <label style={{ color: "#272829" }}>📝 {contractId}</label>
                    <span>{state.expandedContracts[contractId] ? "▲" : "▼"}</span>
                  </ContractHeader>
                  {state.expandedContracts[contractId] && (
                    <ContractDetails>
                      <div style={{ color: "#272829" }}>已抵押: {total}</div>
                      <div style={{ color: "#272829" }}>可用: {available}</div>
                      <ButtonGroup>
                        {storageBalanceOf.available &&
                          Number(storageBalanceOf.available) > 0 && (
                            <Button onClick={() => storageWithdraw(contractId)}>
                              釋放 {available} NEAR
                            </Button>
                          )}
                        <Button onClick={() => storageUnregister(contractId)}>
                          為 {total} NEAR 註銷帳戶
                        </Button>
                      </ButtonGroup>
                    </ContractDetails>
                  )}
                </ContractCard>
              );
            })}
        </FormGroup>
      </>
    )}
  </Wrapper>
);