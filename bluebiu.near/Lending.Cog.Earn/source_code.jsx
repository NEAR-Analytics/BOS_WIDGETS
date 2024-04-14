const Yours = styled.div`
  display: flex;
  gap: 20px;
`;
const YoursTableWrapper = styled.div`
  background-color: rgba(53, 55, 73, 0.2);
  border-radius: 6px;
  width: 50%;
`;
const Title = styled.div`
  padding: 20px;
  border-bottom: 1px solid #292c42;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #7c7f96;
  &.yours-table-title {
    color: var(--yours-table-title);
  }
`;
const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 4px;
  color: #fff;
  &.supply-color {
    color: var(--supply-color);
  }
  &.borrow-color {
    color: var(--borrow-color);
  }
`;
const Right = styled.div`
  text-align: right;
`;

const StyledContainer = styled.div``;

const COLUMNS = [
  {
    key: "POOL_NAME",
    label: "Pools",
    width: "24%",
  },
  {
    key: "YourDeposited",
    label: "Your Deposits",
    width: "24%",
  },
  {
    key: "TotalDeposits",
    label: "Total Deposits",
    width: "24%",
  },
  {
    key: "APY",
    label: "APY",
    width: "24%",
  },
  {
    key: "handler",
    width: "4%",
  },
];

const { markets } = props;

return (
  <StyledContainer>
    <Widget
      src="bluebiu.near/widget/Lending.MarketHeader"
      props={{
        columns: COLUMNS,
      }}
    />
    {markets.map((record, index) => (
      <Widget
        key={index}
        src="bluebiu.near/widget/Lending.Cog.MarketRow"
        props={{
          ...props,
          columns: COLUMNS,
          data: record,
          from: "EARN",
        }}
      />
    ))}
  </StyledContainer>
);
