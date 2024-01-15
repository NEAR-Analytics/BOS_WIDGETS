const Asset = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Icon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
const Symbol = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

const { icon, symbol } = props;

return (
  <Asset>
    <Icon src={icon} />
    <Symbol>{symbol}</Symbol>
  </Asset>
);
