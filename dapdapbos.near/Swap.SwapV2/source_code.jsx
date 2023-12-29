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
  account,
  chainIdNotSupport,
  onSwitchChain,
} = props;

const { name, CHAIN_LIST, curChain } = props;

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

const PanelLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  padding-left: 16px;

  color: white;
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;

  .chain-icon {
    width: 26px;
    height: 26px;
    border-radius: 8px;
  }
`;

const SwapContainer = styled.div``;

const BackRoute = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  top: 0;
  border-bottom: 1px solid #343838;
  display: flex;
  align-items: center;
  gap: 12px;

  .back-icon {
    padding-left: 100px;
    padding-right: 8px;
  }

  .dapp-logo {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .dapp-name {
    font-size: 16px;
    font-style: italic;
    font-weight: 900;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: var(--button-color);
  }
`;

const Panel = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--border-color);

  position: relative;

  padding: 24px 8px 12px;

  background-color: #181a27;
`;

const ExchangeIconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
`;

const ExchangeIcon = styled.div`
  height: 34px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  svg {
    color: var(--text-color);
  }
`;
const PanelLabel = styled.div``;

const Price = styled.div`
  font-size: 14px;
  color: var(--thirdary-text-color);
  text-align: right;
  margin-bottom: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

// styled area end

const getBestTrade = () => {
  State.update({
    loading: true,
  });
};

const backIcon = (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 12L2 6.5L7 1"
      stroke="#979ABE"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const getUnitAmount = () => {
  const bigInputAmount = Big(state.inputCurrencyAmount || 0);
  const bigOutputAmount = Big(state.outputCurrencyAmount || 0);
  if (bigInputAmount.eq(0) || bigOutputAmount.eq(0)) return "-";
  const unitAmount = bigOutputAmount.div(bigInputAmount);
  if (unitAmount.lt(0.001)) return unitAmount.toPrecision(1);
  return unitAmount.toFixed(3);
};

return (
  <SwapContainer>
    <Panel>
      {chainIdNotSupport && (
        <Widget
          src="dapdapbos.near/widget/Swap.ChainWarnigBox"
          props={{
            chain: curChain,
          }}
        />
      )}
      <PanelLabelWrapper>
        <PanelLabel>Swap on</PanelLabel>
        <img className="chain-icon" src={curChain.logo} />
        <Widget
          props={{
            CHAIN_LIST,
            curChain,
            onSwitchChain,
          }}
          src="dapdapbos.near/widget/Swap.ChainListDropDown"
        />
      </PanelLabelWrapper>

      <Widget
        src="dapdapbos.near/widget/Swap.CurrencyInput"
        props={{
          currency: state.inputCurrency,
          chainIdNotSupport,
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
              loading:
                val &&
                Number(val) &&
                state.inputCurrency.address &&
                state.outputCurrency.address,
            });
            if (val && Number(val)) state.debounce(getBestTrade, 500)();
          },
        }}
      />
      <ExchangeIconWrapper>
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
          <Widget src="dapdapbos.near/widget/Swap.ExchangeIcon" />
        </ExchangeIcon>
      </ExchangeIconWrapper>

      <Widget
        src="dapdapbos.near/widget/Swap.CurrencyInput"
        props={{
          currency: state.outputCurrency,
          chainIdNotSupport,
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
        src="dapdapbos.near/widget/Swap.SwapButton"
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
          handlerV3: dexConfig.handler || handlerV3,
          handlerSolidly,
          onSuccess: () => {
            State.update({
              updateInputTokenBalance: true,
              updateOutputTokenBalance: true,
            });
          },
          noPair: state.noPair,
          loading: state.loading,
          fee: state.v3Fee,
          stable: state.stable,
          syncSwapPoolAddress: state.syncSwapPoolAddress,
          uniType: dexConfig.uniType,
          addAction: props.addAction,
          toast: props.toast,
          chainIdNotSupport: props.chainIdNotSupport,
          chainId: props.chainId,
          switchingChain: props.switchingChain,
          onSwitchChain: props.onSwitchChain,
        }}
      />
    </Panel>
    {state.displayCurrencySelect && (
      <Widget
        src="dapdapbos.near/widget/Swap.CurrencySelect"
        props={{
          display: state.displayCurrencySelect,
          chainIdNotSupport,
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

    {dexConfig.uniType === "v3" && !chainIdNotSupport && account && (
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
    {dexConfig.uniType === "v2" && !chainIdNotSupport && account && (
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
          onLoad: (data) => {
            State.update({
              loading: false,
              ...data,
            });
          },
        }}
      />
    )}

    {dexConfig.uniType === "solidly" && !chainIdNotSupport && account && (
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

    {dexConfig.uniType === "Syncswap" && !chainIdNotSupport && account && (
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
