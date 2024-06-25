const CHAIN_ID = props.chainId || 8453;
const EXPLOR = props.explor;
const contracts = props.contracts || {};
const Tokens = props?.tokens || {};
const { chainName, chainIcon } = props;

return (
  <Widget
    src="dapdapbos.near/widget/Base.Uniswap.Swap.SwapConnector"
    props={{
      chainId: CHAIN_ID,
      explor: EXPLOR,
      chainName,
      dex: {
        name: "UniSwap",
        logo: "https://ipfs.near.social/ipfs/bafkreigrdrkqfoxu7f24er3aznyqnirvd67u4fdwexzp4dy46lf33t4ev4",
        uniType: "v3",
        defaultCurrencies: {
          input: Tokens["native"],
        },
        tokens: Tokens,
        stableTokens: props.stableTokens || {},
        ...contracts,
      },
      slippage: props.slippage,
      wethToken: props.wethToken,
      amountOutFn: "dapdapbos.near/widget/Linea.Uniswap.Swap.QuoterV3UniApi",
      handlerV3: "dapdapbos.near/widget/Linea.Uniswap.Swap.HandlerV3",
      onOpenBridge: () => {
        props.onOpenBridge?.();
      },
      onOpenCode: () => {
        props.onOpenCode?.();
      },
      onImport: (currency) => {
        props.onImportToken?.({ ...currency, chainId: props.chainId });
      },
      onSetSlippage: (slippage) => {
        props.onSetSlippage?.(slippage);
      },
      onSwitchChain: props.onSwitchChain,
      switchingChain: props.switchingChain,
      openRequestModal: props.openRequestModal,
      toast: props.toast || {},
      addTransaction: props.addTransaction,
      account: props.account,
      chainIcon,
    }}
  />
);
