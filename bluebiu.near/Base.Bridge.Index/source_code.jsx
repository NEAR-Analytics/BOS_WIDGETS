const Wrapper = styled.div`
  width: 560px;
  margin: 0px auto 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Panel = styled.div`
  width: 100%;
  border: 1px solid #373a53;
  border-radius: 16px;
  background-color: #262836;
  padding: 20px;
`;

const BridgeNameWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px;
  gap: 10px;
`

const BridgeImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: block;
`

const BridgeName = styled.div`
  color: var(--chain-name-color);
  font-size: 20px;
`

const { connectProps, chain, mainnet, account, prices, currentChainId, bridgeImg } = props;

if (!account) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
        chainId: chain.id,
        chainName: chain.name,
        isWrongNetwork: false,
        account,
      }}
    />
  );
}

if (currentChainId !== chain.id && currentChainId !== mainnet.id) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
        chainId: chain.id,
        chainName: chain.name,
        isWrongNetwork: true,
        account,
      }}
    />
  );
}

useEffect(() => {
  State.init({
    displayNetwork: false,
  });
}, []);

const { tokens, amountOutFn, handlerSwap, handlerClaim, bridgeStorageKey, getTxStatus, showFee } = props;

const handleStargateTx = ({ hash, amount, price, from, to, currency }) => {
  const txs =  (handlerClaim ? Storage.privateGet(bridgeStorageKey) : Storage.privateGet("stargate_txs")) || {};
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
  
  handlerClaim ? Storage.privateSet(bridgeStorageKey, txs) : Storage.privateSet("stargate_txs", txs);
};

return (
  <Wrapper>
    <Panel>
      {
        bridgeImg && <BridgeNameWapper>
          <BridgeImg src={bridgeImg} />
          <BridgeName>Orbiter Finance</BridgeName>
        </BridgeNameWapper>
      }

      <Widget
        src="bluebiu.near/widget/Base.Bridge.Swap"
        props={{
          chain,
          mainnet,
          tokens,
          amountOutFn,
          chainId: currentChainId,
          handlerSwap,
          addAction: props.addAction,
          toast: props.toast,
          account,
          prices,
          showFee,
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

    {
      handlerClaim ? <Panel>
        <Widget
          src={handlerClaim}
          props={{
            currentChainId,
            mainnet,
            toast: props.toast,
            account,
            txs: Storage.privateGet(bridgeStorageKey) || {},
          }}
        />
      </Panel> :
        <Panel>
          <Widget
            src="bluebiu.near/widget/Base.Bridge.Transactions"
            props={{
              txs: Storage.privateGet("stargate_txs"),
              getTxStatus,
              chainId: currentChainId,
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
    }

    <Widget
      src="bluebiu.near/widget/Base.Bridge.NetwrokDialog"
      props={{
        chain,
        mainnet,
        display: state.displayNetwork,
        currentChainId: state.currentChainId || props.defaultChainId,
        onClose: () => {
          State.update({
            displayNetwork: false,
          });
        },
      }}
    />
  </Wrapper>
);
