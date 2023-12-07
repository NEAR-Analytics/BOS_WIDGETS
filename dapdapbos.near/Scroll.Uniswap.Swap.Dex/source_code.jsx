const CHAIN_ID = props.chainId || 534352;
const EXPLOR = props.explor;
const contracts = props.contracts || {};
const Tokens = props?.tokens || {};
const Container = styled.div`
  --text-color: #101010;
  --panel-bg-color: #ffe6c7;
  --exchange-icon-color: #fff;
  --secondary-text-color: #a49b9a;
  --input-bg-color: #fff0dd;
  --input-text-color: #101010;
  --currency-border-color: #000000;
  --currency-bg-color: #ffffff;
  --currency-text-color: #101010;
  --currency-label-color: rgba(16, 16, 16, 0.6);
  --currency-empty-border-color: #242424;
  --currency-empty-bg-color: #131313;
  --currency-empty-text-color: #ffffff;
  --button-no-account-bg: #ff684b;
  --button-no-account-text: #ffffff;
  --button-bg-color: #101010;
  --button-text-color: #fff;
`;

return (
  <Container>
    <Widget
      src="dapdapbos.near/widget/Scroll.Uniswap.Swap.SwapConnector"
      props={{
        chainId: CHAIN_ID,
        explor: EXPLOR,
        chainName: "Scroll",
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
        amountOutFn: "dapdapbos.near/widget/Scroll.Uniswap.Swap.QuoterV3UniApi",
        handlerV3: "dapdapbos.near/widget/Scroll.Uniswap.Swap.HandlerV3",
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
      }}
    />
  </Container>
);
