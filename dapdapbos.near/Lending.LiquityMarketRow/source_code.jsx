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
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
  from,
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
          <Widget
            src="bluebiu.near/widget/Lending.LiquityMarketCol"
            props={{
              key: column.key,
              data,
              amount: data[column.key],
              expand: state.expand,
              from,
              //  price: data?.underlyingPrice,
            }}
          />
        </StyledRowItem>
      ))}
    </StyledRowHeader>
    {from === "YOURS" ? (
      <Widget
        src="bluebiu.near/widget/Lending.LiquityPoolExpand"
        props={{
          expand: state.expand,
          ...props,
        }}
      />
    ) : (
      <Widget
        src="bluebiu.near/widget/Lending.LiquityMarketExpand"
        props={{
          expand: state.expand,
          ...props,
        }}
      />
    )}
  </StyledRow>
);
