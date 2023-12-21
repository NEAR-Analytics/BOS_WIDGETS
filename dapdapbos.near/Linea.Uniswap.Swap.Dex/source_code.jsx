// const CHAIN_ID = 59144;
const CHAIN_ID = props.chainId || 59144;
const EXPLOR = props.explor;
const contracts = props.contracts || {};
const Tokens = props?.tokens || {};

const Container = styled.div`
  --text-color: #7794d3;
  --button-color: #1d2a30;
  --border-color: #2c334b;
  --input-border-color: #2c334b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #7794d3;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: #fff;
  --button-text-color: #62ddff;
  --dex-hover-bg-color: rgba(51, 84, 156, 0.1);
`;

return (
  <Container>
    <Widget
      src="dapdapbos.near/widget/Linea.Uniswap.Swap.SwapConnector"
      props={{
        chainId: CHAIN_ID,
        explor: EXPLOR,
        chainName: "Linea",
        dex: {
          name: "UniSwap",
          logo: "https://ipfs.near.social/ipfs/bafkreigrdrkqfoxu7f24er3aznyqnirvd67u4fdwexzp4dy46lf33t4ev4",
          uniType: "v3",
          defaultCurrencies: {
            input: Tokens["native"],
          },
          tokens: Tokens,
          stableTokens: props.stableTokens || [],
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
        openRequestModal: props.openRequestModal,
        toast: props.toast || {},
        addTransaction: props.addTransaction,
        account: props.account,
        onSwitchChain: props.onSwitchChain,
        switchingChain: props.switchingChain,
      }}
    />
  </Container>
);
