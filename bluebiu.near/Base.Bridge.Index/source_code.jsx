const Wrapper = styled.div`
  width: 560px;
  margin: 0px auto 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Panel = styled.div`
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background-color: var(--bg-color);
  padding: 20px;
`;

const account = Ethers.send("eth_requestAccounts", [])[0];

const { connectProps, chain, mainnet } = props;

if (!account) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
        chainId: chain.id,
        chainName: chain.name,
        isWrongNetwork: false,
      }}
    />
  );
}

State.init({
  chainId: -1,
  displayNetwork: false,
});

Ethers.provider()
  .getNetwork()
  .then(({ chainId }) => {
    State.update({ chainId });
  })
  .catch(() => {});

if (![chain.id, mainnet.id].includes(state.chainId) && state.chainId !== -1) {
  State.update({
    displayNetwork: true,
  });
} else if (!state.currentChainId) {
  State.update({
    displayNetwork: false,
  });
}

const { tokens, amountOutFn, handlerSwap } = props;

const handleStargateTx = ({ hash, amount, price, from, to, currency }) => {
  const txs = Storage.privateGet("stargate_txs") || {};
  console.log(hash, amount, price, from, to, currency);
  txs[hash] = {
    amount,
    symbol: currency.symbol,
    price,
    fromLogo: from.logo,
    toLogo: to.logo,
    time: Date.now(),
    link: from.explorer + "/tx/" + hash,
    hash: hash,
    tokenLogo: currency.icon,
    fromChainId: from.id,
    toChainId: to.id,
  };
  Storage.privateSet("stargate_txs", txs);
};

return (
  <Wrapper>
    <Panel>
      <Widget
        src="bluebiu.near/widget/Base.Bridge.Swap"
        props={{
          chain,
          mainnet,
          tokens,
          amountOutFn,
          chainId: state.chainId,
          handlerSwap,
          handleStargateTx,
          showNetwrokDialog: (_chainId) => {
            State.update({
              currentChainId: _chainId,
              displayNetwork: true,
            });
          },
        }}
      />
    </Panel>
    <Panel>
      <Widget
        src="bluebiu.near/widget/Base.Bridge.Transactions"
        props={{
          txs: Storage.privateGet("stargate_txs"),
          chainId: state.chainId,
          onDelete: (hash) => {
            setTimeout(() => {
              const txs = Storage.privateGet("stargate_txs") || {};
              delete txs[hash];
              Storage.privateSet("stargate_txs", txs);
            }, 10000);
          },
        }}
      />
    </Panel>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.NetwrokDialog"
      props={{
        chain,
        mainnet,
        display: state.displayNetwork,
        currentChainId: state.currentChainId,
        onClose: () => {
          State.update({
            displayNetwork: false,
          });
        },
      }}
    />
  </Wrapper>
);
