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
  chainIdNotSupport,
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
    chainId,
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

if (chainId !== state.chainId) {
  State.update({
    chainId,
    inputCurrency: dexConfig.defaultCurrencies.input,
    outputCurrency: dexConfig.defaultCurrencies.output,
  });
}

const SwapContainer = styled.div`
  .borderShadow {
    border-radius: 24px;
    background-color: #131313;
    font-size: 16px;
    line-height: 1.6;
    position: relative;
    background-image: linear-gradient(#131313, #131313),
      linear-gradient(135deg, 292429 0%, 292429 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  .borderShadow:before {
    content: "";
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(135deg, #e97ef8 0%, #e97ef8 100%);
    filter: blur(30px);
    opacity: 0.2;
    transition: opacity 0.3s;
    border-radius: inherit;
  }

  .borderShadow::after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    border-radius: inherit;
  }
`;

const DexIconWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-bottom: 16px;
`;

const DexIcon = styled.img`
  text-align: center;
  margin: 0 auto;
  width: 30px;
`;

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
  border-radius: 24px;

  border: 1px solid #3d363d;

  padding: 24px 8px 12px;
  position: relative;
  background: linear-gradient(0deg, #131313, #131313),
    linear-gradient(0deg, #292429, #292429);
`;
const ExchangeIcon = styled.div`
  /* width: 60px; */
  height: 34px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  svg {
    color: var(--text-color);
  }
`;

const ExchangeIconWrapper = styled.div`
  /* width: 60px; */
  position: relative;
  width: 100%;
  height: 10px;
`;
const PanelLabel = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding-bottom: 16px;
  padding-left: 16px;
`;
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
const SwapButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: var(--button-color);
  color: #fff;
  font-size: 18px;
  line-height: 22px;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Power = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  padding-top: 8px;

  color: #8e8e8e;
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
  if (unitAmount.lt(0.001)) return unitAmount.toPrecision(1);
  return unitAmount.toFixed(3);
};

return (
  <SwapContainer>
    <div className="borderShadow">
      <Panel className="">
        <PanelLabel>Swap</PanelLabel>
        <Widget
          src="dapdapbos.near/widget/Uniswap.Swap.CurrencyInput"
          props={{
            currency: state.inputCurrency,
            amount: state.inputCurrencyAmount,
            chainIdNotSupport,
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
              });
              if (val && Number(val)) {
                console.log("111");
                debouncedGetBestTrade();
              }
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
                inputCurrencyAmount: !state.inputCurrencyAmount
                  ? "1"
                  : Big(
                      Big(state.inputCurrencyAmount)
                        .times(Big(10).pow(state.outputCurrency.decimals))
                        .toFixed(0)
                    )
                      .div(Big(10).pow(state.outputCurrency.decimals))
                      .toFixed(),
                tradeType: "in",
                updateInputTokenBalance: true,
                updateOutputTokenBalance: true,
                loading: true,
              });
              if (Big(state.inputCurrencyAmount || 0).gt(0)) getBestTrade();
            }}
          >
            <Widget src="dapdapbos.near/widget/Uniswap.Swap.ExchangeIcon" />
          </ExchangeIcon>
        </ExchangeIconWrapper>

        <Widget
          src="dapdapbos.near/widget/Uniswap.Swap.CurrencyInput"
          props={{
            currency: state.outputCurrency,
            amount:
              state.inputCurrency && state.outputCurrency
                ? state.outputCurrencyAmount
                : "",
            updateTokenBalance: state.updateOutputTokenBalance,
            chainIdNotSupport,
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
          src="dapdapbos.near/widget/Uniswap.Swap.SwapButton"
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
            noPair: state.noPair,
            loading: state.loading,
            fee: state.fee,
            stable: state.stable,
            chainId,
            syncSwapPoolAddress: state.syncSwapPoolAddress,
            uniType: dexConfig.uniType,
          }}
        />
      </Panel>
    </div>

    <Power>
      {/* <img height={22} src={dexConfig.powerByIcon} /> */}
      Powered by DapDap & NEAR
    </Power>

    {state.displayCurrencySelect && (
      <Widget
        src="dapdapbos.near/widget/Uniswap.Swap.CurrencySelect"
        props={{
          display: state.displayCurrencySelect,
          selectedTokenAddress: state.selectedTokenAddress,
          chainIdNotSupport,
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

    {dexConfig.uniType === "v3" && (
      <Widget
        src={amountOutFn}
        props={{
          update: state.loading,
          routerAddress: dexConfig.routerAddress,
          tokenIn: state.inputCurrency,
          tokenOut: state.outputCurrency,
          amountIn: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          tradeType: state.tradeType,
          quoterAddress: dexConfig.quoterAddress,
          wethAddress,
          chainId,
          loadAmountOut: (data) => {
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
