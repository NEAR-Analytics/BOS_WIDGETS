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
const Panel = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 24px 8px 12px;
  position: relative;
  background: var(--panel-bg-color);
`;
const ExchangeIcon = styled.div`
  cursor: pointer;
  border: 4px solid #ffe6c7;
  background: #181a27;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  svg {
    color: var(--exchange-icon-color);
  }
`;

const ExchangeIconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
`;
const PanelLabel = styled.div`
  color: var(--text-color);
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

const Power = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  padding-top: 10px;
  color: var(--secondary-text-color);
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
  State.update({
    showPriceImpactWarning: !Big(state.trade.priceImpact || 0).lt(2),
  });
}, [state.trade]);

const getSelectableTokens = (currency, cb) => {
  const address =
    currency?.address === "native" ? wethToken.address : currency?.address;
  if (!address) {
    State.update({
      selectableTokens: null,
    });
    cb?.();
    return;
  }
  asyncFetch(
    `https://api.dapdap.net/api/uniswap/pair?chain_id=${chainId}&token=${address}`
  )
    .then((res) => {
      if (Number(res.body?.code) !== 0) throw new Error();
      State.update({
        selectableTokens: res.body.data.reduce((acc, token) => {
          acc[token] = true;
          return acc;
        }, {}),
      });
      cb?.();
    })
    .catch((err) => {
      State.update({
        selectableTokens: null,
      });
    });
};

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
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
            >
              <path
                d="M17.5879 6.63086C17.584 6.5957 17.5801 6.56641 17.5742 6.54883V6.5332L17.5664 6.49023C17.4277 5.81445 16.9805 5.37891 16.4238 5.37891H16.332C15.3828 5.37891 14.6133 4.60547 14.6133 3.66016C14.6133 3.44141 14.7148 3.13086 14.7578 3.02148C15.0273 2.39258 14.7402 1.67578 14.0742 1.31055L11.9785 0.125L11.9395 0.111328C11.7832 0.0605468 11.6016 0 11.3984 0C11.0195 0 10.5938 0.175781 10.3301 0.439453C10 0.765625 9.33008 1.25195 8.93164 1.25195C8.53516 1.25195 7.86328 0.767578 7.5332 0.439453C7.25195 0.162109 6.86328 0 6.46484 0C6.25586 0 6.08008 0.0585937 5.92383 0.111328L5.88867 0.125L3.69141 1.31445L3.67773 1.32227C3.14453 1.65625 2.92773 2.42187 3.19922 3.0293L3.20312 3.03711L3.20703 3.04492C3.25 3.14062 3.38281 3.46484 3.38281 3.74805C3.38281 4.69727 2.60938 5.4668 1.66406 5.4668H1.57227C0.990234 5.4668 0.554687 5.89648 0.429687 6.58594L0.421875 6.625V6.63867C0.421875 6.6582 0.414062 6.68555 0.408203 6.7207C0.359375 7.01562 0.242188 7.71094 0.242188 8.2793C0.242188 8.84766 0.357422 9.54297 0.408203 9.83789C0.412109 9.87305 0.416016 9.90234 0.421875 9.91992V9.93555L0.429687 9.97852C0.568359 10.6543 1.01562 11.0898 1.57227 11.0898H1.61914C2.56836 11.0898 3.33789 11.8633 3.33789 12.8086C3.33789 13.0273 3.23633 13.3379 3.19336 13.4473C2.93359 14.0391 3.17969 14.7988 3.75391 15.1816L3.76953 15.1895L5.83984 16.3418L5.87891 16.3555C6.03516 16.4062 6.21289 16.4668 6.41602 16.4668C6.84961 16.4668 7.24023 16.3008 7.48438 16.0273C7.50781 16.0098 7.53125 15.9863 7.55859 15.9629C7.80859 15.7441 8.48047 15.166 8.92383 15.166C9.25391 15.166 9.80664 15.5117 10.3633 16.0684C10.6445 16.3457 11.0332 16.5078 11.4316 16.5078C11.7012 16.5078 11.9004 16.4336 12.127 16.3223L12.1348 16.3184L14.2578 15.1445L14.2656 15.1367C14.7988 14.8027 15.0156 14.0371 14.7441 13.4297L14.7402 13.4219L14.7363 13.4141C14.7324 13.4121 14.5664 13.0664 14.5977 12.7559L14.6016 12.7363V12.7168C14.6016 11.7676 15.375 10.998 16.3203 10.998H16.418C17 10.998 17.4355 10.5684 17.5605 9.87891L17.5684 9.83984V9.82617C17.5723 9.81055 17.5762 9.78711 17.582 9.75586C17.6328 9.46875 17.75 8.79883 17.75 8.18555C17.7539 7.61914 17.6387 6.92578 17.5879 6.63086ZM8.99414 10.9746C7.49219 10.9746 6.27539 9.75781 6.27539 8.25586C6.27539 6.75391 7.49219 5.53711 8.99414 5.53711C10.4961 5.53711 11.7129 6.75391 11.7129 8.25586C11.7129 9.75781 10.4961 10.9746 8.99414 10.9746Z"
                fill="#101010"
              />
            </svg>
          </div>
        </PanelLabel>
        <Widget
          src="dapdapbos.near/widget/Scroll.Uniswap.Swap.CurrencyInput"
          props={{
            account,
            currency: state.inputCurrency,
            amount: state.inputCurrencyAmount,
            updateTokenBalance: state.updateInputTokenBalance,
            isCorrectNetwork: state.currentChainId === chainId,
            labelText: "You pay",
            onCurrencySelectOpen: () => {
              if (chainId !== state.currentChainId && account) return;
              getSelectableTokens(state.outputCurrency, () => {
                State.update({
                  displayCurrencySelect: true,
                  currencySelectType: 0,
                  selectedTokenAddress: state.inputCurrency.address,
                });
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
            >
              <path
                d="M6.49992 1.5V12M6.49992 12L1 6.5M6.49992 12L12 6.5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </ExchangeIcon>
        </ExchangeIconWrapper>
        <Widget
          src="dapdapbos.near/widget/Scroll.Uniswap.Swap.CurrencyInput"
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
              getSelectableTokens(state.inputCurrency, () => {
                State.update({
                  displayCurrencySelect: true,
                  currencySelectType: 1,
                  selectedTokenAddress: state.outputCurrency.address,
                });
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
            src="dapdapbos.near/widget/Scroll.Uniswap.Swap.Result"
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
            src="dapdapbos.near/widget/Scroll.Uniswap.Swap.PriceImpactWarningButton"
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
          src="dapdapbos.near/widget/Scroll.Uniswap.Swap.SwapButton"
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
          src="dapdapbos.near/widget/Scroll.Uniswap.Swap.BridegeTips"
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
          src="dapdapbos.near/widget/Scroll.Uniswap.Swap.CurrencySelect"
          props={{
            display: state.displayCurrencySelect,
            selectedTokenAddress: state.selectedTokenAddress,
            title: props.title,
            chainId: props.chainId,
            explor: props.explor,
            tokens: dexConfig.tokens,
            stableTokens: dexConfig.stableTokens,
            onImport,
            account,
            checkTokenSelectable: (token) => {
              if (state.selectableTokens === null || !token?.address)
                return true;
              return !state.selectableTokens[token.address.toLowerCase()];
            },
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
                if (currency.address === state.outputCurrency.address) {
                  updatedParams.outputCurrency = null;
                }
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
        src="dapdapbos.near/widget/Scroll.Uniswap.Swap.SlippageSetting"
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
        src="dapdapbos.near/widget/Scroll.Uniswap.Swap.Routes"
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
        src="dapdapbos.near/widget/Scroll.Uniswap.Swap.SlippageAmount"
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
        src="dapdapbos.near/widget/Scroll.Uniswap.Swap.PriceImpactWarning"
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
