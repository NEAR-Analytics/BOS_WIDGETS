const { netWorth, netApy, healthFactor, showHealthFactor } = props;

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
  }
  .text-green {
    color: #2cffa7;
  }
`;

const heroData = [
  {
    name: "Net Worth",
    value: netWorth,
  },
  {
    name: "Net APY",
    value: netApy,
  },
  showHealthFactor
    ? {
        name: "Health Factor",
        value: healthFactor,
      }
    : undefined,
].filter((element) => !!element);

return (
  <HeroDataContainer>
    {heroData.map((row) => (
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
