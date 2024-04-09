const {
  netWorth,
  netAPY,
  healthFactor,
  config,
  theme,
  claimRewards,
  totalMarketSize,
  totalAvailable,
  totalBorrows,
  yourBorrows,
} = props;

if (!netWorth || !netAPY || !healthFactor) {
  return <div />;
}

const HeroDataContainer = styled.div`
  margin: 0 auto;
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

const KVData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .key {
    font-size: 18px;
    font-weight: 500;
  }
  .value {
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .text-green {
    color: #2cffa7;
  }
`;

const { heroData } = config;
const heroDataMap = {
  "Net Worth": netWorth,
  "Net APY": netAPY,
  "Health Factor": healthFactor > 10000 ? "∞" : healthFactor,
  "Total market size": (
    <Widget
      src={`${config.ownerId}/widget/Utils.FormatNumber`}
      props={{
        number: totalMarketSize,
      }}
    />
  ),
  "Total available": (
    <Widget
      src={`${config.ownerId}/widget/Utils.FormatNumber`}
      props={{
        number: totalAvailable,
      }}
    />
  ),
  "Total borrows": (
    <Widget
      src={`${config.ownerId}/widget/Utils.FormatNumber`}
      props={{
        number: totalBorrows,
      }}
    />
  ),
};

const heroDataTitle = heroData.map((item) => ({
  name: item,
  value: heroDataMap[item],
}));

return (
  <HeroDataContainer>
    {heroDataTitle.map((row) => (
      <KVData key={row.name}>
        <div className="key">{row.name}</div>
        <div
          className={[
            "value",
            row.value === "Health Factor" ? "text-green" : undefined,
          ]
            .filter((value) => !!value)
            .join(" ")}
        >
          {row.value}
        </div>
      </KVData>
    ))}
  </HeroDataContainer>
);
