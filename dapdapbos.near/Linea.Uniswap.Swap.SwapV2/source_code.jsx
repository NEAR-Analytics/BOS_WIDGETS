const {
  title,
  chainId,
  chainName,
  wethToken,
  dexConfig,
  amountOutFn,
  slippage,
  account,
  handlerV3,
  handleSyncswap,
  QuoterSyncswap,
  onImport,
  onSetSlippage,
} = props;

if (account) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ currentChainId: chainId });
    })
    .catch(() => {});
}

State.init({
  inputCurrency: dexConfig.defaultCurrencies.input,
  outputCurrency: null,
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
  loading: false,
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
const SwapContainer = styled.div``;

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
  box-shadow: 0px 0px 20px 10px rgba(96, 222, 255, 0.1);
  border: 1px solid #3d363d;
  padding: 24px 8px 12px;
  position: relative;
  background: #131313;
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
  display: flex;
  justify-content: space-between;
  .setting-btn {
    cursor: pointer;
    position: relative;
    margin-right: 16px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
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
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  padding-top: 10px;
  color: #8e8e8e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .view-code {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  .view-code-icon {
    width: 15px;
    height: 15px;
  }
  .view-code-text {
    text-decoration: underline;
  }
`;

const getBestTrade = () => {
  if (
    !state.inputCurrency ||
    !state.outputCurrency ||
    !state.inputCurrencyAmount
  )
    return;
  State.update({
    loading: true,
    trade: null,
    showPriceImpactWarning: false,
  });
};

const debouncedGetBestTrade = state.debounce?.(getBestTrade, 500);

const getUnitAmount = () => {
  const bigInputAmount = Big(state.inputCurrencyAmount || 0);
  const bigOutputAmount = Big(state.outputCurrencyAmount || 0);
  if (bigInputAmount.eq(0) || bigOutputAmount.eq(0)) return "-";
  const unitAmount = bigOutputAmount.div(bigInputAmount);
  if (unitAmount.lt(0.001)) return unitAmount.toPrecision(1);
  return unitAmount.toFixed(3);
};

useEffect(() => {
  if (!state.trade) return;
  console.log(state.trade);
  State.update({
    showPriceImpactWarning: !Big(state.trade.priceImpact || 0).lt(2),
  });
}, [state.trade]);

return (
  <>
    <SwapContainer>
      <Panel className="">
        <PanelLabel>
          <div>Swap</div>
          <div
            className="setting-btn"
            onClick={(ev) => {
              State.update({
                showSlippageSetting: !state.showSlippageSetting,
                clientX: ev.clientX,
                clientY: ev.clientY,
              });
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5879 7.375C17.584 7.33984 17.5801 7.31055 17.5742 7.29297V7.27734L17.5664 7.23438C17.4277 6.55859 16.9805 6.12305 16.4238 6.12305H16.332C15.3828 6.12305 14.6133 5.34961 14.6133 4.4043C14.6133 4.18555 14.7148 3.875 14.7578 3.76562C15.0273 3.13672 14.7402 2.41992 14.0742 2.05469L11.9785 0.869141L11.9395 0.855469C11.7832 0.804687 11.6016 0.744141 11.3984 0.744141C11.0195 0.744141 10.5938 0.919922 10.3301 1.18359C10 1.50977 9.33008 1.99609 8.93164 1.99609C8.53516 1.99609 7.86328 1.51172 7.5332 1.18359C7.25195 0.90625 6.86328 0.744141 6.46484 0.744141C6.25586 0.744141 6.08008 0.802734 5.92383 0.855469L5.88867 0.869141L3.69141 2.05859L3.67773 2.06641C3.14453 2.40039 2.92773 3.16602 3.19922 3.77344L3.20312 3.78125L3.20703 3.78906C3.25 3.88477 3.38281 4.20898 3.38281 4.49219C3.38281 5.44141 2.60938 6.21094 1.66406 6.21094H1.57227C0.990234 6.21094 0.554687 6.64063 0.429687 7.33008L0.421875 7.36914V7.38281C0.421875 7.40234 0.414062 7.42969 0.408203 7.46484C0.359375 7.75977 0.242188 8.45508 0.242188 9.02344C0.242188 9.5918 0.357422 10.2871 0.408203 10.582C0.412109 10.6172 0.416016 10.6465 0.421875 10.6641V10.6797L0.429687 10.7227C0.568359 11.3984 1.01562 11.834 1.57227 11.834H1.61914C2.56836 11.834 3.33789 12.6074 3.33789 13.5527C3.33789 13.7715 3.23633 14.082 3.19336 14.1914C2.93359 14.7832 3.17969 15.543 3.75391 15.9258L3.76953 15.9336L5.83984 17.0859L5.87891 17.0996C6.03516 17.1504 6.21289 17.2109 6.41602 17.2109C6.84961 17.2109 7.24023 17.0449 7.48438 16.7715C7.50781 16.7539 7.53125 16.7305 7.55859 16.707C7.80859 16.4883 8.48047 15.9102 8.92383 15.9102C9.25391 15.9102 9.80664 16.2559 10.3633 16.8125C10.6445 17.0898 11.0332 17.252 11.4316 17.252C11.7012 17.252 11.9004 17.1777 12.127 17.0664L12.1348 17.0625L14.2578 15.8887L14.2656 15.8809C14.7988 15.5469 15.0156 14.7813 14.7441 14.1738L14.7402 14.166L14.7363 14.1582C14.7324 14.1562 14.5664 13.8105 14.5977 13.5L14.6016 13.4805V13.4609C14.6016 12.5117 15.375 11.7422 16.3203 11.7422H16.418C17 11.7422 17.4355 11.3125 17.5605 10.623L17.5684 10.584V10.5703C17.5723 10.5547 17.5762 10.5312 17.582 10.5C17.6328 10.2129 17.75 9.54297 17.75 8.92969C17.7539 8.36328 17.6387 7.66992 17.5879 7.375ZM8.99414 11.7188C7.49219 11.7188 6.27539 10.502 6.27539 9C6.27539 7.49805 7.49219 6.28125 8.99414 6.28125C10.4961 6.28125 11.7129 7.49805 11.7129 9C11.7129 10.502 10.4961 11.7188 8.99414 11.7188Z"
                fill="#8E8E8E"
              />
            </svg>
          </div>
        </PanelLabel>
        <Widget
          src="dapdapbos.near/widget/Linea.Uniswap.Swap.CurrencyInput"
          props={{
            account,
            currency: state.inputCurrency,
            amount: state.inputCurrencyAmount,
            updateTokenBalance: state.updateInputTokenBalance,
            isCorrectNetwork: state.currentChainId === chainId,
            labelText: "You pay",
            onCurrencySelectOpen: () => {
              if (chainId !== state.currentChainId && account) return;
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
                outputCurrencyAmount: "",
              });
              if (val && Number(val)) {
                debouncedGetBestTrade();
              }
            },
          }}
        />
        <ExchangeIconWrapper>
          <ExchangeIcon
            onClick={() => {
              if (!state.outputCurrency || state.loading || state.pending)
                return;
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
          src="dapdapbos.near/widget/Linea.Uniswap.Swap.CurrencyInput"
          props={{
            account,
            currency: state.outputCurrency,
            labelText: "You receive",
            amount:
              state.inputCurrency && state.outputCurrency
                ? state.outputCurrencyAmount
                : "",
            isCorrectNetwork: state.currentChainId === chainId,
            updateTokenBalance: state.updateOutputTokenBalance,
            disabled: true,
            onCurrencySelectOpen: () => {
              if (chainId !== state.currentChainId && account) return;
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
        {state.inputCurrency && state.outputCurrency && state.trade && (
          <Widget
            src="dapdapbos.near/widget/Linea.Uniswap.Swap.Result"
            props={{
              trade: {
                ...state.trade,
                inputCurrency: state.inputCurrency,
                outputCurrency: state.outputCurrency,
                inputCurrencyAmount: state.inputCurrencyAmount,
                outputCurrencyAmount: state.outputCurrencyAmount,
                slippage,
              },
              showPriceImpactWarning: state.showPriceImpactWarning,
              onRouterClick: (ev) => {
                State.update({
                  showRoutes: true,
                  clientX: ev.clientX,
                  clientY: ev.clientY,
                });
              },
              onSlippageClick: (ev) => {
                State.update({
                  showSlippageAmount: true,
                  clientX: ev.clientX,
                  clientY: ev.clientY,
                });
              },
            }}
          />
        )}
        {state.showPriceImpactWarning && (
          <Widget
            src="dapdapbos.near/widget/Linea.Uniswap.Swap.PriceImpactWarningButton"
            props={{
              priceImpact: state.trade.priceImpact,
              onClick: (ev) => {
                State.update({
                  showPriceImpactTips: true,
                  clientX: ev.clientX,
                  clientY: ev.clientY,
                });
              },
            }}
          />
        )}
        <Widget
          src="dapdapbos.near/widget/Linea.Uniswap.Swap.SwapButton"
          props={{
            routerAddress: dexConfig.routerAddress,
            wethAddress: wethToken.address,
            title,
            chainName,
            currentChainId: state.currentChainId,
            inputCurrency: state.inputCurrency,
            outputCurrency: state.outputCurrency,
            inputCurrencyAmount: state.inputCurrencyAmount,
            outputCurrencyAmount: state.outputCurrencyAmount,
            maxInputBalance: state.maxInputBalance,
            handleSyncswap,
            handlerV3,
            slippage,
            trade: state.trade,
            onSuccess: () => {
              State.update({
                updateInputTokenBalance: true,
                updateOutputTokenBalance: true,
              });
            },
            onPending: (pending) => {
              State.update({
                pending,
              });
            },
            openRequestModal: props.openRequestModal,
            toast: props.toast,
            addTransaction: props.addTransaction,
            noPair: state.noPair,
            loading: state.loading,
            stable: state.stable,
            chainId,
            syncSwapPoolAddress: state.syncSwapPoolAddress,
            uniType: dexConfig.uniType,
            account: props.account,
            onSwitchChain: props.onSwitchChain,
            switchingChain: props.switchingChain,
          }}
        />
      </Panel>
      {account && (
        <Widget
          src="dapdapbos.near/widget/Linea.Uniswap.Swap.BridegeTips"
          props={{
            onClick: () => {
              props.onOpenBridge();
            },
          }}
        />
      )}
      <Power>
        <div
          className="view-code"
          onClick={() => {
            props.onOpenCode();
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2_166)">
              <path
                d="M5.33524 7.50357C5.33522 7.66313 5.39812 7.81627 5.51028 7.92977C5.62244 8.04326 5.77482 8.10797 5.93438 8.10984H9.27247C9.43232 8.10984 9.58562 8.04634 9.69865 7.93331C9.81168 7.82028 9.87518 7.66698 9.87518 7.50713C9.87518 7.34728 9.81168 7.19398 9.69865 7.08095C9.58562 6.96792 9.43232 6.90442 9.27247 6.90442H5.93438C5.77605 6.90627 5.62473 6.96999 5.51277 7.08195C5.40081 7.19392 5.33709 7.34524 5.33524 7.50357ZM2.33951 7.93866C2.39518 7.99451 2.46132 8.03883 2.53415 8.06907C2.60697 8.09931 2.68505 8.11488 2.76391 8.11488C2.84276 8.11488 2.92084 8.09931 2.99367 8.06907C3.0665 8.03883 3.13264 7.99451 3.1883 7.93866L5.53495 5.58488C5.59081 5.52922 5.63512 5.46307 5.66536 5.39025C5.6956 5.31742 5.71117 5.23934 5.71117 5.16048C5.71117 5.08163 5.6956 5.00355 5.66536 4.93072C5.63512 4.85789 5.59081 4.79175 5.53495 4.73609L3.1883 2.35378C3.13257 2.29758 3.06631 2.25291 2.99332 2.22231C2.92032 2.19172 2.84201 2.1758 2.76286 2.17547C2.68372 2.17514 2.60528 2.1904 2.53203 2.22038C2.45878 2.25036 2.39215 2.29448 2.33595 2.35021C2.27975 2.40595 2.23508 2.4722 2.20448 2.5452C2.17389 2.6182 2.15797 2.6965 2.15764 2.77565C2.15697 2.9355 2.21983 3.08907 2.33238 3.20257L4.2796 5.14979L2.33238 7.08274C2.27545 7.13852 2.23021 7.20511 2.19934 7.27859C2.16846 7.35208 2.15255 7.43099 2.15255 7.5107C2.15255 7.59041 2.16846 7.66932 2.19934 7.7428C2.23021 7.81629 2.27545 7.88287 2.33238 7.93866H2.33951ZM13.7946 13.7946H1.20542V1.20542H13.7946V13.7946ZM13.7946 0H1.20542C0.885723 0 0.57912 0.126999 0.35306 0.35306C0.126999 0.57912 0 0.885723 0 1.20542L0 13.7946C0.00560989 14.1106 0.135082 14.4117 0.360537 14.6331C0.585992 14.8546 0.889396 14.9787 1.20542 14.9786H13.7946C14.1069 14.9731 14.4049 14.8466 14.6257 14.6257C14.8466 14.4049 14.9731 14.1069 14.9786 13.7946V1.20542C14.9787 0.889396 14.8546 0.585992 14.6331 0.360537C14.4117 0.135082 14.1106 0.00560989 13.7946 0Z"
                fill="#8E8E8E"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_166">
                <rect width="15" height="15" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="view-code-text">View Code</div>
        </div>
        <div>Powered by DapDap & NEAR</div>
      </Power>
      {state.displayCurrencySelect && (
        <Widget
          src="dapdapbos.near/widget/Linea.Uniswap.Swap.CurrencySelect"
          props={{
            account,
            display: state.displayCurrencySelect,
            selectedTokenAddress: state.selectedTokenAddress,
            title: props.title,
            chainId: props.chainId,
            explor: props.explor,
            tokens: dexConfig.tokens,
            stableTokens: dexConfig.stableTokens,
            onImport,
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
                trade: null,
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
              State.update(updatedParams);
              debouncedGetBestTrade();
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
            inputCurrency: state.inputCurrency,
            outputCurrency: state.outputCurrency,
            inputCurrencyAmount: state.inputCurrencyAmount,
            outputCurrencyAmount: state.outputCurrencyAmount,
            tradeType: state.tradeType,
            quoterAddress: dexConfig.quoterAddress,
            wethAddress: wethToken.address,
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
    {state.showSlippageSetting && (
      <Widget
        src="dapdapbos.near/widget/Linea.Uniswap.Swap.SlippageSetting"
        props={{
          clientX: state.clientX,
          clientY: state.clientY,
          slippage,
          onSetSlippage: onSetSlippage,
          onClose: () => {
            State.update({
              showSlippageSetting: false,
            });
          },
        }}
      />
    )}
    {state.showRoutes && state.trade && (
      <Widget
        src="dapdapbos.near/widget/Linea.Uniswap.Swap.Routes"
        props={{
          clientX: state.clientX,
          clientY: state.clientY,
          routes: state.trade.routes,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          gasCost: state.trade.gasCost,
          onClose: () => {
            State.update({
              showRoutes: false,
            });
          },
        }}
      />
    )}
    {state.showSlippageAmount && state.trade && (
      <Widget
        src="dapdapbos.near/widget/Linea.Uniswap.Swap.SlippageAmount"
        props={{
          clientX: state.clientX,
          clientY: state.clientY,
          slippage,
          amount: state.outputCurrencyAmount,
          outputCurrency: state.outputCurrency,
          onClose: () => {
            State.update({
              showSlippageAmount: false,
            });
          },
        }}
      />
    )}
    {state.showPriceImpactTips && (
      <Widget
        src="dapdapbos.near/widget/Linea.Uniswap.Swap.PriceImpactWarning"
        props={{
          clientX: state.clientX,
          clientY: state.clientY,
          onClose: () => {
            State.update({
              showPriceImpactTips: false,
            });
          },
        }}
      />
    )}
    <Widget src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokensPrice" />
  </>
);
