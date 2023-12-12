const Button = styled.div`
  border-radius: 12px;
  background: rgba(255, 117, 191, 0.1);
  height: 48px;
  padding: 15px 18px 14px 15px;
  color: #ff75bf;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  cursor: pointer;
`;

return (
  <Button onClick={props.onClick}>
    <span>Price impact warning</span>
    <span>{props.priceImpact}%</span>
  </Button>
);
