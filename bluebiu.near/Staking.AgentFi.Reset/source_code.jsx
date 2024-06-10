const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;
const StyledFormItem = styled.div`
  border-bottom: 1px solid #373A53;
  padding-bottom: 18px;
  padding-top: 18px;
  
  &.inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &:first-child {
    padding-top: 0;
  }
`;
const StyledFormItemTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #979ABE;
`;
const StyledFormItemBody = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const StyledFormItemFoot = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(151, 154, 190, 1);
`;
const StyledInput = styled.input`
  flex: 1;
  width: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  height: 24px;
  outline: none;
  background-color: transparent;
  padding: 0;

  &:focus {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    outline: none;
    box-shadow: none;
  }
`;
const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;
  margin-top: 8px;
`;
const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .label {
    color: #979ABE;
  }
  .value {
    color: #fff;
  }
`;
const StyledContent = styled.div`
  flex: 1;
`;
const StyledButton = styled.button`
  background: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  line-height: 56px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: auto;
  text-align: center;
  
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledFullSelect = styled.div`
  width: 100%;

  > div {
    width: 100%;
    
    > div[type="button"] {
      width: 100%;
    }
  }
`;
const StyledTips = styled.div`
  color: rgb(151, 154, 190);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;
  
  &.full {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const StyledWithdrawTips = styled.div`
  width: 240px;
  text-align: center;
  margin: 0 auto;

  .value {
    color: var(--switch-color);
    font-size: 18px;
  }
  .title {
    border-bottom: 1px solid #373A53;
    font-size: 18px;
    color: rgb(151, 154, 190);
    padding: 8px 0;
  }
  .assets {
    margin-top: 8px;
  }
  .head-wd {
    border-bottom: 1px solid #373A53;
    
    .col-wd {
      color: rgb(151, 154, 190);
    }
  }
  .row-wd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
  }
  .col-wd {
    flex-shrink: 0;
    flex-basis: 33.33%;
    color: #fff;
    font-size: 14px;
    text-align: left;
    padding: 8px 0;
  }
  .body-wd {}
`;
const StyledPriceRangeList = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 0;
  border: 1px solid #373A53;
  border-radius: 6px;

  .min-price,
  .range-price,
  .max-price {
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .min-price {}
  .range-price {
    border-left: 1px solid #373A53;
  }
  .max-price {
    border-left: 1px solid #373A53;
  }
  .range-value {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
  }
  .range-label {
    color: #979ABE;
    font-size: 14px;
  }
`;

const {
  record,
  prices,
  dexConfig,
  getTokenBalance,
  formatTVL,
} = props;

const { StakeTokens } = dexConfig;

State.init({
  pending: false,

  rate: 20,
});

const handleSubmit = () => {};

const handleRate = (ev) => {
  if (isNaN(Number(ev.target.value))) return;
  let amount = ev.target.value.replace(/\s+/g, "");
  if (!amount) {
    State.update({
      rate: '',
    });
    return;
  }
  if (Big(amount).lte(0)) {
    amount = 1;
  }
  if (Big(amount).gt(50)) {
    amount = 50;
  }
  amount = Math.round(amount);
  State.update({
    rate: amount,
  });
};

const {
  pending,
  rate,
} = state;

const renderButton = (disabled) => {
  return (
    <StyledButton
      disabled={pending || disabled}
      onClick={handleSubmit}
    >
      {pending ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : 'SET NEW RANGE'}
    </StyledButton>
  );
};

const renderReset = () => {
  if (record.name === 'Concentrated Liquidity Manager') {
    return (
      <>
        <StyledContent>
          <StyledTips>
            Resetting the strategy will withdraw your existing underlying LP assets and deposit them into the new range.
          </StyledTips>
          <StyledFormItem>
            <StyledFormItemTitle>
              Enter LP Range
            </StyledFormItemTitle>
            <StyledFormItemBody>
              <div style={{ width: '60px', display: 'flex' }}>
                <StyledInput
                  type="text"
                  placeholder="0"
                  value={rate}
                  onChange={handleRate}
                />
                <span style={{ color: '#fff' }}>%</span>
              </div>
              <div className="current-usdb" style={{ color: '#fff' }}>
                {3697} USDB
              </div>
              <StyledPriceRangeList>
                <div className="min-price">
                  <span className="range-value">3,161</span>
                  <span className="range-label">min</span>
                </div>
                <div className="range-price">
                  <span className="range-value">{rate}%</span>
                  <span className="range-label">range</span>
                </div>
                <div className="max-price">
                  <span className="range-value">4,233</span>
                  <span className="range-label">max</span>
                </div>
              </StyledPriceRangeList>
            </StyledFormItemBody>
          </StyledFormItem>
        </StyledContent>
        {renderButton(!rate)}
      </>
    );
  }
  return null;
};

return (
  <StyledContainer>
    {renderReset()}
  </StyledContainer>
);
