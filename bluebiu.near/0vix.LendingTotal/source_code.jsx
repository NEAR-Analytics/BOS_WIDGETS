const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 100%;
`;
const TotalItem = styled.div`
  width: 50%;
`;
const Line = styled.div`
  height: 42px;
  width: 1px;
  background-color: #332c4b;
  @media (max-width: 640px) {
    display: none;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  padding-bottom: 6px;
  @media (max-width: 640px) {
    font-size: 12px;
    line-height: 16px;
  }
`;
const Value = styled.div`
  display: flex;
  justify-content: center;
`;

const { totalSupply, totalBorrow } = props;

const formatTotal = (total) => {
  if (!total || Big(total).eq(0)) return "0";
  return Big(total).toFixed(5);
};

return (
  <Total>
    <TotalItem>
      <Label>Total Supplied</Label>
      <Value>
        <Widget
          src="bluebiu.near/widget/0vix.LendingBalance"
          props={{ balance: formatTotal(totalSupply) }}
        />
      </Value>
    </TotalItem>
    <Line />
    <TotalItem>
      <Label>Total Borrowed</Label>
      <Value>
        <Widget
          src="bluebiu.near/widget/0vix.LendingBalance"
          props={{ balance: formatTotal(totalBorrow) }}
        />
      </Value>
    </TotalItem>
  </Total>
);
