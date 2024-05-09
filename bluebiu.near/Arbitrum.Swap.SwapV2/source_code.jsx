const { title, chainId, chainName, wethAddress, dexConfig, account, prices } =
  props;
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
  border: 1px solid #373a53;
  padding: 30px;
  background-color: #262836;
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

useEffect(() => {
  const debounce = (fn, wait) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  };

  const getBestTrade = () => {
    State.update({
      loading: true,
      unsignedTx: "",
      outputCurrencyAmount: "",
      gas: undefined,
      priceImpact: 0,
      noPair: true,
    });
  };

  const debouncedGetBestTrade = debounce(getBestTrade, 500);
  State.update({
    getBestTrade,
    debouncedGetBestTrade,
  });
}, []);

useEffect(() => {
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
  });
}, [title]);

useEffect(() => {
  if (loading || !state.getBestTrade) return;
  const cachedTimer = Storage.privateGet("_swap_timer");
  clearTimeout(cachedTimer);
  const _timer = setTimeout(() => {
    state.getBestTrade();
  }, 30000);
  Storage.privateSet("_swap_timer", _timer);
}, [state.loading]);

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
          prices,
          account,
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
              loading: false,
            });
            if (val && Number(val)) state.debouncedGetBestTrade();
          },
        }}
      />
      <ExchangeIcon
        onClick={() => {
          if (state.loading) return;
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
            loading: false,
          });
          if (Big(state.inputCurrencyAmount || 0).gt(0))
            state.debouncedGetBestTrade();
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
          prices,
          account,
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
          routerAddress: dexConfig.routerAddress || state.routerAddress,
          wethAddress,
          title,
          chainName,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          maxInputBalance: state.maxInputBalance,
          onSuccess: () => {
            State.update({
              updateInputTokenBalance: true,
              updateOutputTokenBalance: true,
            });
          },
          onApprovedSuccess: () => {
            state.getBestTrade();
          },
          addAction: props.addAction,
          toast: props.toast,
          noPair: state.noPair,
          loading: state.loading,
          add: state.add,
          unsignedTx: state.unsignedTx,
          chainId,
          gas: state.gas,
          theme: props.theme?.button,
          account,
        }}
      />
    </Panel>
    {state.displayCurrencySelect && (
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CurrencySelect"
        props={{
          display: state.displayCurrencySelect,
          selectedTokenAddress: state.selectedTokenAddress,
          title: props.title,
          chainId: props.chainId,
          tokens: dexConfig.tokens,
          account,
          onClose: () => {
            State.update({
              displayCurrencySelect: false,
            });
          },
          onSelect: (currency) => {
            const updatedParams = {
              outputCurrencyAmount: "",
              noPair: false,
            };
            let hasToken = false;
            if (state.currencySelectType === 0) {
              updatedParams.inputCurrency = currency;
              hasToken = true;
              updatedParams.updateInputTokenBalance = true;
              if (currency.address === state.outputCurrency.address) {
                updatedParams.outputCurrency = null;
                hasToken = false;
              }
            }
            if (state.currencySelectType === 1) {
              updatedParams.outputCurrency = currency;
              updatedParams.outputCurrencyAmount = "";
              hasToken = true;
              updatedParams.updateOutputTokenBalance = true;
              if (currency.address === state.inputCurrency.address) {
                updatedParams.inputCurrency = null;
                updatedParams.inputCurrencyAmount = "";
                hasToken = false;
              }
            }
            State.update({ ...updatedParams, loading: false });
            if (
              state.inputCurrencyAmount &&
              Number(state.inputCurrencyAmount) &&
              hasToken
            ) {
              state.debouncedGetBestTrade();
            }
          },
        }}
      />
    )}
    {dexConfig.amountOutFn && (
      <Widget
        src={dexConfig.amountOutFn}
        props={{
          updater: state.loading,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          wethAddress,
          account,
          prices,
          ...dexConfig,
          multicall: props.multicall,
          onLoad: (data) => {
            console.log("amountOutFn", data);
            if (
              data.inputCurrencyAmount !== state.inputCurrencyAmount ||
              data.inputCurrency.address !== state.inputCurrency.address ||
              data.outputCurrency.address !== state.outputCurrency.address
            )
              return;
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
