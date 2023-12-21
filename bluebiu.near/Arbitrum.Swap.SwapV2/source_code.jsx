const {
  title,
  chainId,
  chainName,
  wethAddress,
  dexConfig,
  amountOutFn,
  quoterV3,
  handlerV2,
  handlerV3,
  handlerSolidly,
  QuoterSolidly,
  handleSyncswap,
  QuoterSyncswap,
} = props;

const prevTitle = Storage.privateGet("prevTitle");
if (prevTitle !== title || !state.inputCurrency) {
  State.update({
    inputCurrency: dexConfig.defaultCurrencies.input,
    outputCurrency: dexConfig.defaultCurrencies.output,
    uniType: dexConfig.type,
    inputCurrencyAmount: "1",
    outputCurrencyAmount: "",
    maxInputBalance: "0",
    maxOutputBalance: "0",
    tradeType: "in",
    targetUnitAmount: 0,
    noPair: false,
    updateInputTokenBalance: true,
    updateOutputTokenBalance: true,
    loading: true,
    displayCurrencySelect: false,
    selectedTokenAddress: "",
    currencySelectType: 0,
    debounce: (fn, wait) => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, wait);
      };
    },
  });
  Storage.privateSet("prevTitle", title);
}
// styled area
const SwapContainer = styled.div``;
const Title = styled.div`
  color: var(--text-color);
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding-left: 30px;
  padding-bottom: 10px;
  @media (max-width: 900px) {
    display: none;
  }
`;
const Panel = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  padding: 30px;
  background-color: #181a27;
`;
const ExchangeIcon = styled.div`
  width: 60px;
  margin: 20px auto;
  svg {
    color: var(--text-color);
  }
`;
const PanelLabel = styled.div`
  color: var(--secondary-text-color);
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
`;
const Price = styled.div`
  font-size: 14px;
  color: var(--thirdary-text-color);
  text-align: right;
  margin-bottom: 30px;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const getBestTrade = () => {
  State.update({
    loading: true,
  });
};

const debouncedGetBestTrade = state.debounce(getBestTrade, 500);

const getUnitAmount = () => {
  const bigInputAmount = Big(state.inputCurrencyAmount || 0);
  const bigOutputAmount = Big(state.outputCurrencyAmount || 0);
  if (bigInputAmount.eq(0) || bigOutputAmount.eq(0)) return "-";
  const unitAmount = bigOutputAmount.div(bigInputAmount);
  if (unitAmount.lt(0.001)) return "<0.001";
  return unitAmount.toFixed(3);
};

return (
  <SwapContainer>
    <Title>{title}</Title>
    <Panel>
      <PanelLabel>Swap From</PanelLabel>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CurrencyInput"
        props={{
          currency: state.inputCurrency,
          amount: state.inputCurrencyAmount,
          updateTokenBalance: state.updateInputTokenBalance,
          onCurrencySelectOpen: () => {
            State.update({
              displayCurrencySelect: true,
              currencySelectType: 0,
              selectedTokenAddress: state.inputCurrency.address,
            });
          },
          onUpdateCurrencyBalance: (balance) => {
            State.update({
              maxInputBalance: ethers.utils.formatUnits(
                balance,
                state.inputCurrency.decimals
              ),
              updateInputTokenBalance: false,
            });
          },
          onAmountChange: (val) => {
            State.update({
              inputCurrencyAmount: val,
              tradeType: "in",
            });
            if (val && Number(val)) debouncedGetBestTrade();
          },
        }}
      />
      <ExchangeIcon
        onClick={() => {
          const [inputCurrency, outputCurrency] = [
            state.outputCurrency,
            state.inputCurrency,
          ];
          State.update({
            inputCurrency,
            outputCurrency,
            outputCurrencyAmount: "",
            tradeType: "in",
            updateInputTokenBalance: true,
            updateOutputTokenBalance: true,
            loading: true,
          });
          if (Big(state.inputCurrencyAmount || 0).gt(0)) getBestTrade();
        }}
      >
        <Widget src="bluebiu.near/widget/Arbitrum.Swap.ExchangeIcon" />
      </ExchangeIcon>
      <PanelLabel>To</PanelLabel>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CurrencyInput"
        props={{
          currency: state.outputCurrency,
          amount: state.outputCurrencyAmount,
          updateTokenBalance: state.updateOutputTokenBalance,
          disabled: true,
          onCurrencySelectOpen: () => {
            State.update({
              displayCurrencySelect: true,
              currencySelectType: 1,
              selectedTokenAddress: state.outputCurrency.address,
            });
          },
          onUpdateCurrencyBalance: () => {
            State.update({
              updateOutputTokenBalance: false,
            });
          },
        }}
      />
      <Price>
        1 {state.inputCurrency.symbol}≈ {getUnitAmount()}{" "}
        {state.outputCurrency.symbol}
      </Price>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.SwapButton"
        props={{
          routerAddress: dexConfig.routerAddress,
          wethAddress,
          title,
          chainName,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          maxInputBalance: state.maxInputBalance,
          handleSyncswap,
          handlerV2,
          handlerV3,
          handlerSolidly,
          onSuccess: () => {
            State.update({
              updateInputTokenBalance: true,
              updateOutputTokenBalance: true,
            });
          },
          addAction: props.addAction,
          toast: props.toast,
          noPair: state.noPair,
          loading: state.loading,
          fee: state.v3Fee,
          stable: state.stable,
          syncSwapPoolAddress: state.syncSwapPoolAddress,
          uniType: dexConfig.uniType,
          add: state.add,
          chainId,
        }}
      />
    </Panel>
    {chainId === 1101 && (
      <Widget
        src="guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
        props={{
          add: state.add,
          onChangeAdd: (add) => {
            State.update({ add });
          },
          source: props.source,
        }}
      />
    )}
    {state.displayCurrencySelect && (
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CurrencySelect"
        props={{
          display: state.displayCurrencySelect,
          selectedTokenAddress: state.selectedTokenAddress,
          title: props.title,
          chainId: props.chainId,
          tokens: dexConfig.tokens,
          onClose: () => {
            State.update({
              displayCurrencySelect: false,
            });
          },
          onSelect: (currency) => {
            const updatedParams = {
              outputCurrencyAmount: "",
              noPair: false,
              updateInputTokenBalance: true,
            };
            if (state.currencySelectType === 0) {
              updatedParams.inputCurrency = currency;
              if (currency.address === state.outputCurrency.address)
                updatedParams.outputCurrency = null;
            }
            if (state.currencySelectType === 1) {
              updatedParams.outputCurrency = currency;
              updatedParams.outputCurrencyAmount = "";
              if (currency.address === state.inputCurrency.address) {
                updatedParams.inputCurrency = null;
                updatedParams.inputCurrencyAmount = "";
              }
            }
            if (
              state.inputCurrencyAmount &&
              Number(state.inputCurrencyAmount) &&
              state.inputCurrency?.address
            ) {
              updatedParams.loading = true;
            }
            State.update(updatedParams);
            if (updatedParams.loading) getBestTrade();
          },
        }}
      />
    )}

    {dexConfig.uniType === "v3" && (
      <Widget
        src={quoterV3}
        props={{
          amountIn: state.inputCurrencyAmount,
          tokenIn: state.inputCurrency,
          tokenOut: state.outputCurrency,
          quoterContractId: dexConfig.quoterAddress,
          wethAddress,
          loadAmountOut: (data) => {
            State.update({
              outputCurrencyAmount: data.amountOut,
              v3Fee: data.fee,
              loading: false,
            });
          },
        }}
      />
    )}
    {dexConfig.uniType === "v2" && (
      <Widget
        src={amountOutFn}
        props={{
          update: state.loading,
          routerAddress: dexConfig.routerAddress,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          tradeType: state.tradeType,
          wethAddress,
          title,
          onLoad: (data) => {
            State.update({
              loading: false,
              ...data,
            });
          },
        }}
      />
    )}

    {dexConfig.uniType === "solidly" && (
      <Widget
        src={QuoterSolidly}
        props={{
          update: state.loading,
          routerAddress: dexConfig.routerAddress,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          tradeType: state.tradeType,
          wethAddress,
          onLoad: (data) => {
            State.update({
              loading: false,
              ...data,
            });
          },
        }}
      />
    )}

    {dexConfig.uniType === "Syncswap" && (
      <Widget
        src={QuoterSyncswap}
        props={{
          ...dexConfig,
          update: state.loading,
          routerAddress: dexConfig.routerAddress,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          tradeType: state.tradeType,
          wethAddress,
          onLoad: (data) => {
            State.update({
              loading: false,
              ...data,
            });
          },
        }}
      />
    )}
  </SwapContainer>
);
