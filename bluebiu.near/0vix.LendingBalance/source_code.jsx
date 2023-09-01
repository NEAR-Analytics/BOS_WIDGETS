const Balance = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #fff;
  display: flex;
  align-items: baseline;
  .f_16 {
    font-size: 16px;
  }
  .f_24 {
    font-size: 24px;
  }
`;
const { balance } = props;
if (!balance || isNaN(balance)) return <Balance>$0</Balance>;
const splits = balance.split(".");
return (
  <Balance>
    <div className="f_24">${Number(splits[0]).toLocaleString()}</div>
    {splits[1] && <div className="f_24">.</div>}
    <div className="f_16">{splits[1]}</div>
  </Balance>
);
