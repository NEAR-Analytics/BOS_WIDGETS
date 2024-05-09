const Header = styled.div`
  display: flex;
`;
const ChainCard = styled.div`
  width: 50%;
  height: 80px;
  border-radius: 20px 20px 0px 0px;
  background-color: #373a53;
  transition: 0.5s;
  padding: 20px;
  box-sizing: border-box;
  color: #979abe;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &.active {
    background-color: #c7ff18;
    color: #332c4b;
  }
  @media (max-width: 768px) {
    height: 60px;
    border-radius: 16ppx 16px 0px 0px;
  }
`;
const ChainName = styled.div`
  font-size: 18px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const Apy = styled.div`
  font-size: 18px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const ChainLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
  }
`;

return (
  <Header>
    {props.chains?.map((chain) => (
      <ChainCard
        key={chain.symbol}
        className={chain.symbol === props.chain && "active"}
        onClick={() => {
          props.onChange?.(chain.symbol);
        }}
      >
        <div>
          <ChainName>{chain.symbol}</ChainName>
          <Apy>
            APY {(chain.symbol === "ETH" ? props.ethApy : props.nearApy) || "-"}
            %
          </Apy>
        </div>
        <ChainLogo src={chain.icon} alt="Chain Logo" />
      </ChainCard>
    ))}
  </Header>
);
