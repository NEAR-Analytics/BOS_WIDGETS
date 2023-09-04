const Balance = styled.div`
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: baseline;
  .integer_size {
    font-size: 24px;
    @media (max-width: 640px) {
      font-size: 20px;
    }
  }
  .float_size {
    font-size: 16px;
    @media (max-width: 640px) {
      font-size: 12px;
    }
  }
`;
const { balance } = props;
if (!balance || isNaN(balance)) return <Balance>$0</Balance>;
const splits = balance.split(".");
return (
  <Balance>
    <div className="integer_size">${Number(splits[0]).toLocaleString()}</div>
    {splits[1] && <div className="integer_size">.</div>}
    <div className="float_size">{splits[1]}</div>
  </Balance>
);
