const StyledContainer = styled.div``;
const Summary = styled.div`
  padding: 40px 0;
  display: flex;
  justify-content: space-evenly;
  .key {
    color: #979abe;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
  .value {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
`;
const {
  // totalCollateralUsd,
  // userTotalBorrowUsd,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
  IS_ETHOS_DAPP,
  IS_GRAVITA_DAPP,
  IS_LYVE_DAPP,
  IS_PREON_DAPP,
  totalDebt,
  totalCollateral,
} = props;
const data = Object.values(dexConfig.markets || {});
console.log("LiquityMarkets:", props);

const COLUMNS = [
  {
    key: "DEPOSIT",
    label: "DEPOSIT",
    width: "15%",
  },
  {
    key: "BORROW",
    label: "BORROW",
    width: "15%",
    // type: "amount",
  },
  IS_GRAVITA_DAPP || IS_PREON_DAPP || IS_LYVE_DAPP
    ? {
        key: "MAX_LTV",
        label: "MAX LTV",
        width: "15%",
        // type: "apy",
      }
    : null,
  IS_ETHOS_DAPP
    ? {
        key: "MCR",
        label: "Min Collateral Ratio",
        width: "15%",
        // type: "apy",
      }
    : null,
  {
    key: "ONE_TIME_FEE",
    label: "ONE-TIME FEE",
    width: "15%",
    // type: "amount",
  },
  {
    key: "MIN_DEBT",
    label: "MIN DEBT",
    width: "15%",
    // type: "apy",
    // type: "amount",
  },
  IS_GRAVITA_DAPP || IS_PREON_DAPP || IS_LYVE_DAPP
    ? {
        key: "MINTED_CAP",
        label: "MINTED/CAP",
        width: "15%",
        // type: "amount",
      }
    : null,
  {
    key: "LOAN_STATUS",
    label: "LOAN STATUS",
    width: "8%",
    // type: "amount",
  },
  {
    key: "handler",
    width: "2%",
  },
];

return (
  <StyledContainer>
    <Summary>
      <div className="item">
        <div className="key">Your Collateral</div>
        <div className="value">${totalCollateral}</div>
      </div>
      <div className="item">
        <div className="key">Your Debt</div>
        <div className="value">
          {totalDebt} <img className="icon" src={dexConfig.BORROW_URL} alt="" />
        </div>
      </div>
    </Summary>
    <Widget
      src="bluebiu.near/widget/Lending.MarketHeader"
      props={{
        columns: COLUMNS,
      }}
    />
    {data &&
      data.map((record, index) => (
        <Widget
          key={index}
          src="bluebiu.near/widget/Lending.Liquity.MarketRow"
          props={{
            ...props,
            columns: COLUMNS,
            data: record,
          }}
        />
      ))}
  </StyledContainer>
);
