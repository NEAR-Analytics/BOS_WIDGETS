const DashPanel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #181a27;
  border: 1px solid #332c4b;
  box-sizing: border-box;
  border-radius: 12px;
  height: 90px;
  padding: 30px;
  margin-top: 30px;
  @media (max-width: 768px) {
    border-radius: 10px;
    height: 158px;
    padding: 0px 20px;
    margin-top: 20px;
    flex-direction: column;
    background-color: #222436;
  }
`;
const SupplyBorrow = styled.div`
  display: flex;
  width: 40%;
  .panel-item {
    flex-grow: 1;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    border-bottom: 1px dashed rgba(124, 127, 150, 0.26);
    align-items: center;
    .panel-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
const Factors = styled.div`
  display: flex;
  width: 60%;
  .panel-item {
    flex-grow: 1;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    align-items: center;
  }
`;

const Line = styled.div`
  height: 68px;
  width: 1px;
  background-color: #332c4b;
  margin-right: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Label = styled.div`
  color: #7c7f96;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 4px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Value = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const { userSupply, userBorrow, accountLiquidity, healthFactor } = props;

const calculateBorrowLimitUsed = () => {
  if (Big(accountLiquidity || 0).eq(0) || Big(userBorrow || 0).eq(0))
    return "0%";
  const userBorrowLimit = Big(userBorrow).plus(accountLiquidity);
  return (
    Big(userBorrow)
      .div(userBorrowLimit.eq(0) ? 1 : userBorrowLimit)
      .mul(100)
      .toFixed(2) + "%"
  );
};
const formatAmount = (amount) => {
  if (!amount) return "0";
  return Big(amount).toFixed(4);
};
const formatHealthFactor = () => {
  if (!healthFactor) return "0.00";
  if (Big(healthFactor).gt(2)) return "2.00";
  return Big(healthFactor).toFixed(2);
};

return (
  <DashPanel>
    <SupplyBorrow>
      <div className="panel-item">
        <Label>Your Supplied</Label>
        <Widget
          src="bluebiu.near/widget/0vix.LendingBalance"
          props={{ balance: formatAmount(userSupply) }}
        />
      </div>
      <div className="panel-item">
        <Label>Your Borrows</Label>
        <Widget
          src="bluebiu.near/widget/0vix.LendingBalance"
          props={{ balance: formatAmount(userBorrow) }}
        />
      </div>
    </SupplyBorrow>
    <Line />
    <Factors>
      <div className="panel-item">
        <Label>Borrow Limit Used</Label>
        <Value>{calculateBorrowLimitUsed()}</Value>
      </div>
      <div className="panel-item">
        <Label>Health Factor</Label>
        <Value>{formatHealthFactor()}</Value>
      </div>
      <div className="panel-item">
        <Label>Liquidation Risk</Label>
        <Value>{userBorrow ? "VERY HIGH RISK" : "N/A"}</Value>
      </div>
    </Factors>
  </DashPanel>
);
