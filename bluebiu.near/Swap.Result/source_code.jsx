const StyledContainer = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #979abe;
  margin-top: 20px;
  margin-bottom: 16px;
  .price_impact {
    color: #33b65f;
  }
  .warning-1 {
    color: #ff9445;
  }
  .warning-card-1 {
    color: #ff9445;
    border: 1px solid #ff9445;
    background: rgba(255, 148, 69, 0.1);
  }
  .warning-2 {
    color: #ff547d;
  }
  .warning-card-2 {
    color: #ff547d;
    border: 1px solid #ff547d;
    background: rgba(255, 84, 125, 0.1);
  }
  .fee {
    border-bottom: 1px dashed #979abe;
    position: relative;
    cursor: pointer;
  }
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFlexSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledPanelWrapper = styled.div`
  height: 0px;
  animation: fadeOut 0.4s 0.1s ease both;
  &.expand {
    animation: fadeIn 0.4s 0.1s ease both;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
      border-top: none;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
      border-top: none;
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
  }
`;

const StyledPanel = styled.div`
  border-radius: 12px;
  border: 1px solid #373a53;
  padding: 16px 12px 0px;
  color: #979abe;
  margin-top: 16px;
  display: none;

  &.expand {
    display: block;
  }
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 16px;
`;

const StyledArrow = styled.div`
  transition: 0.3s;
  transform-origin: center;
  cursor: pointer;
  &.up {
    transform: rotate(0deg);
  }
  &.down {
    transform: rotate(180deg);
  }
`;

const StyledPriceWarning = styled.div`
  border-radius: 8px;
  border: 1px solid #ff547d;
  background: rgba(255, 84, 125, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
  height: 43px;
  padding: 0px 13px;
`;

const StyledFeePanel = styled.div`
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  color: #979abe;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  left: -230px;
  top: -50%;
  width: 223px;
`;

const Layer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;

const {
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  priceImpact,
  gas,
  nativeCurrency,
  routerStr,
  routes,
} = props;

const WarningIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.10016 1C7.86996 -0.333334 9.79446 -0.333333 10.5643 1L17.3935 12.8286C18.1633 14.1619 17.201 15.8286 15.6614 15.8286H2.00298C0.463382 15.8286 -0.498867 14.1619 0.270933 12.8286L7.10016 1ZM7.91793 6.22857C7.91793 5.72363 8.32727 5.31429 8.83221 5.31429C9.33716 5.31429 9.7465 5.72363 9.7465 6.22857V9.88572C9.7465 10.3907 9.33716 10.8 8.83221 10.8C8.32727 10.8 7.91793 10.3907 7.91793 9.88572V6.22857ZM8.83221 11.7143C8.32727 11.7143 7.91793 12.1236 7.91793 12.6286C7.91793 13.1335 8.32727 13.5429 8.83221 13.5429C9.33716 13.5429 9.7465 13.1335 9.7465 12.6286C9.7465 12.1236 9.33716 11.7143 8.83221 11.7143Z"
      fill="#FF547D"
    />
  </svg>
);

useEffect(() => {
  let priceImpactWarningType = 0;
  if (!priceImpact) {
    priceImpactWarningType = 0;
    State.update({
      priceImpactWarningType,
    });
    return;
  }
  if (
    Big(priceImpact || 0)
      .abs()
      .gt(1)
  ) {
    priceImpactWarningType = 1;
  }
  if (
    Big(priceImpact || 0)
      .abs()
      .gt(2)
  ) {
    priceImpactWarningType = 2;
  }
  let _priceImpact = Big(priceImpact || 0).toFixed(2);
  if (
    Big(priceImpact || 0)
      .abs()
      .gt(100)
  ) {
    _priceImpact = "100";
  }

  State.update({
    priceImpactWarningType,
    priceImpact: _priceImpact,
  });
}, [priceImpact]);

useEffect(() => {
  if (!gas || !nativeCurrency?.symbol) return;
  Ethers.provider()
    .getGasPrice()
    .then((gasPrice) => {
      const price = props.prices[nativeCurrency.symbol];
      let _value = Big(0);
      let isValue = false;
      if (!price) {
        _value = Big(
          ethers.utils.formatUnits(gas || 0, nativeCurrency.decimals)
        ).mul(gasPrice);
        isValue = false;
      } else {
        _value = Big(
          ethers.utils.formatUnits(gas || 0, nativeCurrency.decimals)
        )
          .mul(price)
          .mul(gasPrice);
        isValue = true;
      }
      const _res = Big(_value).lt(0.000001)
        ? "<0.000001"
        : Big(_value).toFixed(6);

      State.update({
        gas_usd: isValue ? `$${_res}` : `${_res}${nativeCurrency.symbol}`,
      });
    });
}, [gas, props.prices]);

return (
  <StyledContainer>
    <StyledFlexSpace>
      <StyledFlex style={{ gap: "5px" }}>
        <div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.26902 1.50339C5.46062 0.562652 6.96581 0 8.60359 0C12.3267 0 15.3715 2.90803 15.5901 6.57633L16.0418 6.15507C16.3392 5.87912 16.8033 5.89525 17.0793 6.19091C17.3552 6.48657 17.3391 6.95246 17.0435 7.22841L15.2337 8.91637C15.0931 9.04758 14.914 9.11276 14.7351 9.11324L14.7157 9.1135C14.5213 9.1135 14.3349 9.03629 14.1975 8.89884C14.1787 8.88004 14.161 8.86031 14.1445 8.83977L12.4829 7.05819C12.2051 6.76074 12.2212 6.29664 12.5187 6.02069C12.8144 5.74474 13.2802 5.76087 13.5562 6.05653L14.1254 6.66686C13.9545 3.76556 11.5478 1.46576 8.60359 1.46576C7.33946 1.46576 6.17393 1.89132 5.24298 2.60477C5.23294 2.61614 5.22253 2.62723 5.21174 2.63802C5.07429 2.77547 4.88788 2.85268 4.69351 2.85268C4.49914 2.85268 4.31273 2.77547 4.17529 2.63802C4.03784 2.50058 3.96063 2.31417 3.96063 2.1198C3.96063 1.92543 4.03784 1.73902 4.17529 1.60157C4.20732 1.56954 4.24201 1.54078 4.27885 1.5155L4.26902 1.50339ZM8.60359 12.5307C9.95109 12.5307 11.1857 12.0486 12.1461 11.2477L12.1579 11.2621C12.2837 11.1684 12.4371 11.1169 12.5958 11.1169C12.7902 11.1169 12.9766 11.1941 13.1141 11.3316C13.2515 11.469 13.3287 11.6554 13.3287 11.8498C13.3287 12.0442 13.2515 12.2306 13.1141 12.368C13.0604 12.4217 12.9992 12.4662 12.9331 12.5005C11.7425 13.4389 10.2386 14 8.60359 14C4.7385 14 1.60449 10.866 1.60449 7.0009C1.60449 6.9262 1.60567 6.85176 1.60801 6.77762L1.19043 7.11021C0.873268 7.36286 0.412754 7.3109 0.160098 6.99374C-0.0925578 6.67657 -0.0405931 6.21427 0.276571 5.96161L2.14458 4.47239C2.16553 4.45102 2.18802 4.43069 2.21203 4.41157C2.52919 4.15891 2.9915 4.21088 3.24415 4.52804L4.78696 6.46328C5.03962 6.78044 4.98766 7.24275 4.67049 7.4954C4.35333 7.74806 3.89102 7.6961 3.63837 7.37893L3.0811 6.67992C3.07509 6.78554 3.07204 6.89196 3.07204 6.9991C3.07204 10.0543 5.54843 12.5307 8.60359 12.5307Z"
              fill="#979ABE"
            />
          </svg> */}
        </div>
        <div>
          1 {outputCurrency.symbol} ={" "}
          {Big(inputCurrencyAmount || 0)
            .div(
              Big(outputCurrencyAmount || 0).eq(0) ? 1 : outputCurrencyAmount
            )
            .toFixed(4)}{" "}
          {inputCurrency.symbol}{" "}
        </div>
      </StyledFlex>
      <StyledFlex style={{ gap: "10px" }}>
        {state.priceImpactWarningType === 2 && WarningIcon}
        {!state.showContent && state.gas_usd && (
          <span className="gray">Fee {state.gas_usd}</span>
        )}
        <StyledArrow
          onClick={() => {
            State.update({
              showContent: !state.showContent,
            });
          }}
          className={state.showContent ? "up" : "down"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
          >
            <path
              d="M1 1L6 5L11 1"
              stroke="#979ABE"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </StyledArrow>
      </StyledFlex>
    </StyledFlexSpace>
    <StyledPanelWrapper className={state.showContent ? "expand" : ""}>
      <StyledPanel className={state.showContent ? "expand" : ""}>
        <StyledItem>
          <div>Minimum Received</div>
          <div>
            {Big(outputCurrencyAmount || 0).toFixed(8)} {outputCurrency.symbol}
          </div>
        </StyledItem>
        {!!priceImpact && (
          <StyledItem>
            <div>Price Impact</div>
            <div
              className={`price_impact warning-${state.priceImpactWarningType}`}
            >
              {state.priceImpact}%
            </div>
          </StyledItem>
        )}
        {state.gas_usd && (
          <StyledItem>
            <div>Trading Fee</div>
            <div
              className="fee"
              onClick={() => {
                State.update({
                  showFeePanel: true,
                });
              }}
            >
              <div>{state.gas_usd}</div>
              {state.showFeePanel && (
                <StyledFeePanel>
                  <StyledFlexSpace>
                    <div>Gas fee</div>
                    <div>{state.gas_usd}</div>
                  </StyledFlexSpace>
                </StyledFeePanel>
              )}
            </div>
          </StyledItem>
        )}
        <StyledItem>
          <div>Route</div>
          <div>
            {routerStr ? (
              routerStr
            ) : routes ? (
              <Widget
                src="bluebiu.near/widget/Swap.Routes"
                props={{
                  routes,
                }}
              />
            ) : (
              ` ${inputCurrency.symbol} > ${outputCurrency.symbol}`
            )}
          </div>
        </StyledItem>
      </StyledPanel>
    </StyledPanelWrapper>
    {!!priceImpact && !!state.priceImpactWarningType && (
      <StyledPriceWarning
        className={`warning-card-${state.priceImpactWarningType}`}
      >
        <StyledFlex style={{ gap: "5px" }}>
          {state.priceImpactWarningType === 2 && WarningIcon}
          <div>Price impact warning</div>
        </StyledFlex>
        <div>{state.priceImpact}%</div>
      </StyledPriceWarning>
    )}
    {state.showFeePanel && (
      <Layer
        onClick={() => {
          State.update({
            showFeePanel: false,
          });
        }}
      />
    )}
  </StyledContainer>
);
