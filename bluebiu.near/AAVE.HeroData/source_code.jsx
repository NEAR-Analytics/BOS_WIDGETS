const {
  netWorth,
  netApy,
  healthFactor,
  config,
  rewardsAmount,
  theme,
  claimRewards,
} = props;

if (!netWorth || !netApy || !healthFactor) {
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
  "Net APY": netApy,
  "Health Factor": healthFactor,
  "Available rewards": Number(rewardsAmount || 0).toFixed(2),
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
          {row.name === "Available rewards" ? (
            <Widget
              src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
              props={{
                config,
                children: "Claim",
                theme,
                style: { height: 30 },
                onClick: claimRewards,
              }}
            />
          ) : null}
        </div>
      </KVData>
    ))}
  </HeroDataContainer>
);
