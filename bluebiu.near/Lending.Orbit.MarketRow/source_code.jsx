const StyledRow = styled.div`
  margin-bottom: 10px;
`;
const StyledRowHeader = styled.div`
  border: 1px solid #373a53;
  height: 84px;
  display: flex;
  align-items: center;
  background-color: #262836;
  padding-left: 22px;
  padding-right: 24px;
  border-radius: 16px;
  cursor: pointer;
`;
const StyledRowItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const StyledExpand = styled.div`
  cursor: pointer;
  transform-origin: center;
  transform: rotate(-90deg);
  transition: 0.3s;

  &.expand {
    transform: rotate(0deg);
  }
`;

const {
  columns,
  data,
  borrowLimit,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
  orbitTab,
} = props;

State.init({
  expand: false,
});

return (
  <StyledRow>
    <StyledRowHeader
      style={{ borderRadius: state.expand ? "16px 16px 0px 0px" : "16px" }}
      onClick={() => {
        State.update({
          expand: !state.expand,
        });
      }}
    >
      {columns.map((column) => (
        <StyledRowItem key={column.key} style={{ width: column.width }}>
          {column.key === "asset" && (
            <Widget
              src="bluebiu.near/widget/Lending.MarketAsset"
              props={{
                icon: data?.underlyingToken.icon,
                symbol: data?.underlyingToken.symbol,
              }}
            />
          )}
          {column.type === "amount" && (
            <Widget
              src="bluebiu.near/widget/Lending.MarketAmount"
              props={{
                amount: data[column.key],
                price: data.underlyingPrice || 1,
                // price: prices[data?.underlyingToken.symbol] || 1,
              }}
            />
          )}
          {column.type === "apy" && (
            <Widget
              src="bluebiu.near/widget/Lending.MarketApy"
              props={{
                apy: data[column.key],
                distributionApy: data?.distributionApy,
                key: column.key === "supplyApy" ? "supply" : "borrow",
              }}
            />
          )}
          {column.key === "handler" && (
            <StyledExpand className={state.expand ? "expand" : ""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
              >
                <path
                  d="M5.94103 7.02391C5.5407 7.52432 4.77961 7.52432 4.37929 7.02391L0.459914 2.1247C-0.0638966 1.46993 0.402276 0.499999 1.24078 0.499999L9.07953 0.5C9.91804 0.5 10.3842 1.46993 9.8604 2.12469L5.94103 7.02391Z"
                  fill="#979ABE"
                />
              </svg>
            </StyledExpand>
          )}
        </StyledRowItem>
      ))}
    </StyledRowHeader>
    <Widget
      src="bluebiu.near/widget/Lending.Orbit.MarketExpand"
      props={{
        expand: state.expand,
        borrowLimit,
        data,
        addAction,
        toast,
        chainId,
        nativeCurrency,
        dexConfig,
        onSuccess,
        account,
        prices,
        orbitTab,
      }}
    />
  </StyledRow>
);
