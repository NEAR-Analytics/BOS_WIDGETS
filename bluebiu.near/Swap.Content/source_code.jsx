const {
  chainId,
  dexConfig,
  account,
  chainIdNotSupport,
  name,
  CHAIN_LIST,
  curChain,
  wethAddress,
  prices,
  onSwitchChain,
} = props;

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
}, [curChain]);
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
const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  position: relative;
  padding: 24px 16px 16px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
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
    color: #ffffff;
  }
`;
const PanelLabel = styled.div``;

const PanelSettings = styled.div`
  display: flex;
  align-items: center;
  padding-right: 13px;
  gap: 14px;
  .setting_btn {
    cursor: pointer;
    position: relative;
  }
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #979abe;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 16px;
`;

// styled area end

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

  const debouncedGetBestTrade = debounce(getBestTrade, 1000);

  State.update({
    getBestTrade,
    debouncedGetBestTrade,
  });
}, []);

useEffect(() => {
  if (state.loading || !state.getBestTrade) return;
  const cachedTimer = Storage.privateGet("_swap_timer");
  clearTimeout(cachedTimer);
  const _timer = setTimeout(() => {
    state.getBestTrade();
  }, 30000);
  Storage.privateSet("_swap_timer", _timer);
}, [state.loading]);

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
      <PanelHeader>
        <PanelLabelWrapper>
          <PanelLabel>Swap on</PanelLabel>
          <img className="chain-icon" src={curChain.logo} />
          <Widget
            props={{
              CHAIN_LIST,
              curChain,
              onSwitchChain,
            }}
            src="bluebiu.near/widget/Swap.ChainListDropDown"
          />
        </PanelLabelWrapper>
        <PanelSettings>
          <div
            className="setting_btn"
            onClick={(ev) => {
              State.update({
                showSlippageSetting: !state.showSlippageSetting,
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M17.5879 7.375C17.584 7.33984 17.5801 7.31055 17.5742 7.29297V7.27734L17.5664 7.23438C17.4277 6.55859 16.9805 6.12305 16.4238 6.12305H16.332C15.3828 6.12305 14.6133 5.34961 14.6133 4.4043C14.6133 4.18555 14.7148 3.875 14.7578 3.76562C15.0273 3.13672 14.7402 2.41992 14.0742 2.05469L11.9785 0.869141L11.9395 0.855469C11.7832 0.804687 11.6016 0.744141 11.3984 0.744141C11.0195 0.744141 10.5938 0.919922 10.3301 1.18359C10 1.50977 9.33008 1.99609 8.93164 1.99609C8.53516 1.99609 7.86328 1.51172 7.5332 1.18359C7.25195 0.90625 6.86328 0.744141 6.46484 0.744141C6.25586 0.744141 6.08008 0.802734 5.92383 0.855469L5.88867 0.869141L3.69141 2.05859L3.67773 2.06641C3.14453 2.40039 2.92773 3.16602 3.19922 3.77344L3.20312 3.78125L3.20703 3.78906C3.25 3.88477 3.38281 4.20898 3.38281 4.49219C3.38281 5.44141 2.60938 6.21094 1.66406 6.21094H1.57227C0.990234 6.21094 0.554687 6.64063 0.429687 7.33008L0.421875 7.36914V7.38281C0.421875 7.40234 0.414062 7.42969 0.408203 7.46484C0.359375 7.75977 0.242188 8.45508 0.242188 9.02344C0.242188 9.5918 0.357422 10.2871 0.408203 10.582C0.412109 10.6172 0.416016 10.6465 0.421875 10.6641V10.6797L0.429687 10.7227C0.568359 11.3984 1.01562 11.834 1.57227 11.834H1.61914C2.56836 11.834 3.33789 12.6074 3.33789 13.5527C3.33789 13.7715 3.23633 14.082 3.19336 14.1914C2.93359 14.7832 3.17969 15.543 3.75391 15.9258L3.76953 15.9336L5.83984 17.0859L5.87891 17.0996C6.03516 17.1504 6.21289 17.2109 6.41602 17.2109C6.84961 17.2109 7.24023 17.0449 7.48438 16.7715C7.50781 16.7539 7.53125 16.7305 7.55859 16.707C7.80859 16.4883 8.48047 15.9102 8.92383 15.9102C9.25391 15.9102 9.80664 16.2559 10.3633 16.8125C10.6445 17.0898 11.0332 17.252 11.4316 17.252C11.7012 17.252 11.9004 17.1777 12.127 17.0664L12.1348 17.0625L14.2578 15.8887L14.2656 15.8809C14.7988 15.5469 15.0156 14.7813 14.7441 14.1738L14.7402 14.166L14.7363 14.1582C14.7324 14.1562 14.5664 13.8105 14.5977 13.5L14.6016 13.4805V13.4609C14.6016 12.5117 15.375 11.7422 16.3203 11.7422H16.418C17 11.7422 17.4355 11.3125 17.5605 10.623L17.5684 10.584V10.5703C17.5723 10.5547 17.5762 10.5312 17.582 10.5C17.6328 10.2129 17.75 9.54297 17.75 8.92969C17.7539 8.36328 17.6387 7.66992 17.5879 7.375ZM8.99414 11.7188C7.49219 11.7188 6.27539 10.502 6.27539 9C6.27539 7.49805 7.49219 6.28125 8.99414 6.28125C10.4961 6.28125 11.7129 7.49805 11.7129 9C11.7129 10.502 10.4961 11.7188 8.99414 11.7188Z"
                fill="#979ABE"
              />
            </svg>
          </div>
          <div
            className="setting_btn"
            onClick={(ev) => {
              state.getBestTrade();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clip-path="url(#clip0_2970_2119)">
                <path
                  d="M12.0248 7.0921C11.8208 6.9961 11.7278 6.8671 11.7458 6.7051C11.7638 6.5431 11.8328 6.4141 11.9528 6.3181C11.9888 6.2941 12.1058 6.2011 12.3038 6.0391C12.5018 5.8771 12.7448 5.6821 13.0328 5.4541C12.5288 4.8781 11.9288 4.4251 11.2328 4.0951C10.5368 3.7651 9.78081 3.6001 8.96481 3.6001C8.20881 3.6001 7.50081 3.7411 6.84081 4.0231C6.18081 4.3051 5.60481 4.6921 5.11281 5.1841C4.62081 5.6761 4.23381 6.2521 3.95181 6.9121C3.66981 7.5721 3.52881 8.2801 3.52881 9.0361C3.52881 9.7801 3.66981 10.4821 3.95181 11.1421C4.23381 11.8021 4.62081 12.3781 5.11281 12.8701C5.60481 13.3621 6.18081 13.7491 6.84081 14.0311C7.50081 14.3131 8.20881 14.4541 8.96481 14.4541C9.58881 14.4541 10.1798 14.3551 10.7378 14.1571C11.2958 13.9591 11.8058 13.6801 12.2678 13.3201C12.7298 12.9601 13.1258 12.5371 13.4558 12.0511C13.7858 11.5651 14.0288 11.0341 14.1848 10.4581C14.2688 10.1821 14.4248 9.9541 14.6528 9.7741C14.8808 9.5941 15.1508 9.5041 15.4628 9.5041C15.8348 9.5041 16.1498 9.6361 16.4078 9.9001C16.6658 10.1641 16.7948 10.4761 16.7948 10.8361C16.7948 11.0041 16.7648 11.1661 16.7048 11.3221C16.4528 12.1621 16.0808 12.9361 15.5888 13.6441C15.0968 14.3521 14.5118 14.9611 13.8338 15.4711C13.1558 15.9811 12.4028 16.3801 11.5748 16.6681C10.7468 16.9561 9.87681 17.1001 8.96481 17.1001C7.84881 17.1001 6.79881 16.8901 5.81481 16.4701C4.83081 16.0501 3.97581 15.4741 3.24981 14.7421C2.52381 14.0101 1.94781 13.1551 1.52181 12.1771C1.09581 11.1991 0.882812 10.1521 0.882812 9.0361C0.882813 7.9201 1.09581 6.8701 1.52181 5.8861C1.94781 4.9021 2.52381 4.0471 3.24981 3.3211C3.97581 2.5951 4.83081 2.0191 5.81481 1.5931C6.79881 1.1671 7.84881 0.954102 8.96481 0.954102C10.2008 0.954102 11.3468 1.2091 12.4028 1.7191C13.4588 2.2291 14.3588 2.9221 15.1028 3.7981C15.3788 3.5941 15.6098 3.4171 15.7958 3.2671C15.9818 3.1171 16.0988 3.0241 16.1468 2.9881C16.2188 2.9281 16.2968 2.8831 16.3808 2.8531C16.4648 2.8231 16.5428 2.8231 16.6148 2.8531C16.6868 2.8831 16.7498 2.9461 16.8038 3.0421C16.8578 3.1381 16.8968 3.2821 16.9208 3.4741C16.9328 3.5821 16.9448 3.7651 16.9568 4.0231C16.9688 4.2811 16.9808 4.5811 16.9928 4.9231C17.0048 5.2651 17.0108 5.6191 17.0108 5.9851C17.0108 6.3511 17.0048 6.6961 16.9928 7.0201C16.9808 7.4281 16.8848 7.7221 16.7048 7.9021C16.6088 7.9981 16.4648 8.0521 16.2728 8.0641C16.0808 8.0761 15.8768 8.0581 15.6608 8.0101C15.3368 7.9381 14.9798 7.8601 14.5898 7.7761C14.1998 7.6921 13.8278 7.6051 13.4738 7.5151C13.1198 7.4251 12.8078 7.3411 12.5378 7.2631C12.2678 7.1851 12.0968 7.1281 12.0248 7.0921Z"
                  fill="#979ABE"
                />
              </g>
              <defs>
                <clipPath id="clip0_2970_2119">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </PanelSettings>
      </PanelHeader>
      <Widget
        src="bluebiu.near/widget/Swap.CurrencyInput"
        props={{
          type: "in",
          currency: state.inputCurrency,
          chainIdNotSupport,
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
      <ExchangeIconWrapper>
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
          <Widget src="bluebiu.near/widget/Swap.ExchangeIcon" />
        </ExchangeIcon>
      </ExchangeIconWrapper>

      <Widget
        src="bluebiu.near/widget/Swap.CurrencyInput"
        props={{
          type: "out",
          currency: state.outputCurrency,
          chainIdNotSupport,
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
      <Widget
        src="bluebiu.near/widget/Swap.Result"
        props={{
          outputCurrency: state.outputCurrency,
          outputCurrencyAmount: state.outputCurrencyAmount,
          inputCurrency: state.inputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          priceImpact: state.priceImpact,
          gas: state.gas,
          nativeCurrency: props.nativeCurrency,
          prices,
          routerStr: props.routerStr,
          routes: state.routes,
        }}
      />
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.SwapButton"
        props={{
          routerAddress: dexConfig.routerAddress || state.routerAddress,
          wethAddress,
          title: name,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          maxInputBalance: state.maxInputBalance,
          addAction: props.addAction,
          toast: props.toast,
          noPair: state.noPair,
          loading: state.loading,
          add: state.add,
          unsignedTx: state.unsignedTx,
          chainId: props.chainId,
          gas: state.gas,
          chainIdNotSupport: props.chainIdNotSupport,
          account,
          onSuccess: () => {
            State.update({
              updateInputTokenBalance: true,
              updateOutputTokenBalance: true,
            });
          },
          onApprovedSuccess: () => {
            state.getBestTrade();
          },
        }}
      />
    </Panel>
    {state.displayCurrencySelect && (
      <Widget
        src="bluebiu.near/widget/Swap.CurrencySelect"
        props={{
          display: state.displayCurrencySelect,
          chainIdNotSupport,
          selectedTokenAddress: state.selectedTokenAddress,
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
              updatedParams.updateInputTokenBalance = true;
              hasToken = true;
              if (currency.address === state.outputCurrency.address) {
                updatedParams.outputCurrency = null;
                hasToken = false;
              }
            }
            if (state.currencySelectType === 1) {
              updatedParams.outputCurrency = currency;
              updatedParams.updateOutputTokenBalance = true;
              hasToken = true;
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

    {!chainIdNotSupport && account && dexConfig.amountOutFn && (
      <Widget
        src={dexConfig.amountOutFn}
        props={{
          updater: state.loading,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          account,
          wethAddress,
          prices,
          ...dexConfig,
          slippage: state.slippage ? state.slippage / 100 : 0.005,
          multicallAddress: props.multicallAddress,
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
              priceImpact: null,
              ...data,
            });
          },
        }}
      />
    )}

    {state.showSlippageSetting && (
      <Widget
        src="bluebiu.near/widget/Swap.SlippageSetting"
        props={{
          slippage: state.slippage,
          onSetSlippage: (slippage) => {
            State.update({
              slippage,
            });
          },
          onClose: () => {
            State.update({
              showSlippageSetting: false,
            });
          },
        }}
      />
    )}
  </SwapContainer>
);
