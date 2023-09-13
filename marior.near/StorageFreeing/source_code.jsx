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
      doneTxs: state.page > 3,
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

const storageInfo = {};
for (const contractId of state.storageDeposits) {
  try {
    const storageBalanceOf = Near.view(contractId, "storage_balance_of", {
      account_id: accountId,
    });
    const storageBalanceBounds = Near.view(
      contractId,
      "storage_balance_bounds",
      {}
    );
    if (storageBalanceOf != null && storageBalanceBounds != null) {
      storageInfo[contractId] = {
        storageBalanceOf,
        storageBalanceBounds,
      };
    }
  } catch (err) {}
}

console.log("state", state);
console.log("storageInfo", storageInfo);

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

const storageUnregister = (contractId) => {
  Near.call(contractId, "storage_unregister", {}, "30000000000000", "1");
};

const renderStorageInfos = (storageInfos) =>
  Object.entries(storageInfos)
    .filter(
      ([_, { storageBalanceBounds, storageBalanceOf }]) =>
        storageBalanceBounds != null &&
        storageBalanceOf != null &&
        !!storageBalanceOf.total &&
        !!storageBalanceOf.available
    )
    .map(([contractId, { storageBalanceBounds, storageBalanceOf }]) => {
      const total = Big(storageBalanceOf.total).div(Big(10).pow(24)).toFixed(3);
      const available = Big(storageBalanceOf.available)
        .div(Big(10).pow(24))
        .toFixed(3);
      return (
        <Card>
          <CardHeader>{contractId}</CardHeader>
          <CardContent>
            <div>Staked: {total}</div>
            <div>Available: {available}</div>
            {storageBalanceOf.available && (
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
    <Header>Free unused NEAR used for storage staking</Header>
    <Content>{renderStorageInfos(storageInfo)}</Content>
  </Wrapper>
);
