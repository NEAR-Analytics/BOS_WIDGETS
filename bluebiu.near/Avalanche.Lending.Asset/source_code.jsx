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
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;
const Dapp = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const DappIcon = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  &.cream {
    height: 12px;
    border-radius: none;
  }
`;
const DappName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
`;

const { icon, symbol, dappIcon, dappName } = props;

return (
  <Asset>
    <Icon src={icon} />
    <div>
      <Symbol>{symbol}</Symbol>
      <Dapp>
        <DappIcon
          src={dappIcon}
          className={`${dappName === "C.R.E.A.M." && "cream"}`}
        />
        <DappName>{dappName}</DappName>
      </Dapp>
    </div>
  </Asset>
);
