const { accountId } = context;
const loadingWidget = "chess-game.near/widget/ChessGameLoading";
const rpcServer = "https://1rpc.io/near";
// const rpcServer = "https://rpc.mainnet.near.org";

if (!accountId) return "Please login";

const txs = [...(state?.txs ?? [])];
let storageDeposits = [...(state?.storageDeposits ?? [])];
State.init({
  txs,
  page: state?.page ?? 1,
  doneTxs: state?.doneTxs ?? false,
  storageDeposits,
  doneRpc: state?.doneRpc ?? false,
});

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
      // doneTxs: state.page > 3,
    });
  });
  return (
    <Widget
      src={loadingWidget}
      props={{
        content: <div>Loading transactions...</div>,
      }}
    />
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
    <Widget
      src={loadingWidget}
      props={{
        content: (
          <Centered>
            <div>Scanning transactions...</div>
            <div>Remaining: {txs.length}</div>
          </Centered>
        ),
      }}
    />
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
  align-items: stretch;
  max-width: 50rem;
  margin: 0 auto 2rem;
`;

const Header = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
  padding: 3rem;
  font-weight: 600;
`;

const Description = styled.div`
  font-style: italic;
  font-size: 1.1rem;
  margin: 0 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 1.1rem;
  border-radius: 1rem;
  background-color: #c3e4ee;
`;

const CardHeader = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0.6rem;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 0.4rem;
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
        method: "storage_withdraw",
        deposit: "1",
      }))
  );
};

const storageUnregister = (contractId) => {
  Near.call(contractId, "storage_unregister", {}, "30000000000000", "1");
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
        <Card>
          <CardHeader>{contractId}</CardHeader>
          <CardContent>
            <div>Staked: {total}</div>
            <div>Available: {available}</div>
            {storageBalanceOf.available &&
              Number(storageBalanceOf.available) > 0 && (
                <button onClick={() => storageWithdraw(contractId)}>
                  Free {available} NEAR
                </button>
              )}
            <button onClick={() => storageWithdraw(contractId)}>
              Unregister account for {total} NEAR
            </button>
          </CardContent>
        </Card>
      );
    });

return (
  <Wrapper>
    <Header>Free unused storage staked NEAR</Header>
    <Description>
      This BOS app allows you to free unused Near, that you have been depositing
      for storage staking.{" "}
      <a
        href="https://docs.near.org/concepts/storage/storage-staking"
        target="_blank"
        rel="noreferrer noopener"
      >
        Storage staking
      </a>{" "}
      is a concept unique to Near where the contract owner needs to lock NEAR,
      if data is stored in a wallet/contract.
      <br />
      <br />
      Storage management has been standardized via{" "}
      <a
        href="https://nomicon.io/Standards/StorageManagement"
        target="_blank"
        rel="noreferrer noopener"
      >
        NEP-145
      </a>{" "}
      so that there's an interface for users of a smart contract to pay for the
      storage that they are using. Fortunately we can use this standard to also
      refund NEAR, that isn't used for storage staking, but has been paid by
      your account (or someone else paid for you).
      <br />
      <br />
      If you use this app, but a transaction fails, then it is likely that
      either:
      <ul>
        <li>the smart contract didn't properly implement NEP-145</li>
        <li>
          there's an unknown precondition to be able to free funds/unregister
          account
        </li>
      </ul>
    </Description>
    <button onClick={() => storageWithdrawAll(contractId)}>
      Free {totalAvailable} NEAR from{" "}
      {
        Object.values(storageBalances).filter(
          (storageBalanceOf) =>
            storageBalanceOf != null &&
            !!storageBalanceOf.total &&
            !!storageBalanceOf.available &&
            Number(storageBalanceOf.available) > 0
        ).length
      }{" "}
      contracts
    </button>
    <Content>{renderStorageInfos()}</Content>
  </Wrapper>
);
