const ipfsUrl =
  "https://rose-elaborate-scorpion-109.mypinata.cloud/ipfs/QmUAToxBk1kJF5pqJq5sEBXZWKT3dPuwkPTVqSYdTQZPgC/";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  max-width: 1216px;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const caretRight = (
  <svg
    width="10"
    height="16"
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.45898 16L0.857422 14.3175L5.65431 9.22887L6.79165 7.99503L5.65431 6.77113L0.857422 1.69072L2.45898 0L10.0003 8L2.45898 16Z"
      fill="#C7C7C7"
    />
  </svg>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 400px);
  gap: 0.5rem;
  justify-content: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h1`
  color: #11181c;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  padding-left: 0.75rem;
  border-left: 5px solid ${({ color }) => color};
`;

const Card = styled.a`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 0.66rem;
  justify-content: space-between;
  text-decoration: none !important;
`;

const Circle = styled.img`
  width: 48px;
  height: 48px;
  background-color: grey;
  border-radius: 50%;
  margin-right: 0.75rem;
`;

const Title = styled.h4`
  margin: 0;
  margin-right: auto;
  padding-right: 1rem;
  font-size: 1rem;
  font-weight: semibold;
  color: #000;
`;

const Type = styled.span`
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: semibold;
  margin-right: 0.75rem;
  text-align: center;
`;

const Dapp = ({ title, type, url, iconSrc }) => (
  <Card href={url} target="_blank">
    <Circle src={iconSrc} />
    <Title>{title}</Title>
    <Type color="#0a6846" bg="#b1ffd0">
      {type}
    </Type>
    {caretRight}
  </Card>
);

const dapps = [
  {
    title: "Lido",
    type: "Staking",
    url: "zavodil.near/widget/Lido",
    iconSrc: `${ipfsUrl}/icon-lido.jpg`,
  },
  {
    title: "Uniswap v2",
    type: "DEX",
    url: "zavodil.near/widget/Uniswap",
    iconSrc: `${ipfsUrl}/icon-uniswap.jpg`,
  },
  {
    title: "Aave V3",
    type: "Lending",
    url: "aave-v3.near/widget/AAVE",
    iconSrc: `${ipfsUrl}/icon-aave.jpg`,
  },
  {
    title: "Gamma",
    type: "Liquidity",
    url: "bluebiu.near/widget/ZKEVM.GAMMA",
    iconSrc: `${ipfsUrl}/icon-gamma.jpg`,
  },
  {
    title: "Pendle",
    type: "Yield",
    url: "bluebiu.near/widget/Arbitrum.Pendle.TradeMarkets",
    iconSrc: `${ipfsUrl}/icon-pendle.jpg`,
  },
  {
    title: "Arbitrum DeFi",
    type: "Aggregator",
    url: "ciocan.near/widget/Arbitrum.All-in-one",
    iconSrc: `${ipfsUrl}/icon-arbitrum.jpg`,
  },
];

return (
  <Main>
    <Container>
      <SectionTitle color="rgba(0,0,0,.1)">
        Welcome to the Open Web. Only Web3.
      </SectionTitle>
    </Container>
    <Container>
      <p>
        Explore different dApps accross different chains, manage all your Web3
        identities at once and more by using <b>Open Web Broswer</b>.
      </p>
    </Container>
    <Container>
      <SectionTitle color="#00EC97">Dapps</SectionTitle>
    </Container>
    <Container>
      {dapps.map((props, index) => (
        <Dapp key={index} {...props} />
      ))}
    </Container>
  </Main>
);
