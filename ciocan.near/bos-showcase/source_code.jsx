const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
  background-color: #ccc;
  padding: 0 0.5rem;
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

const GatewayCard = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
`;

const GatewayImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  background-color: #ccc;
  border-top-left-radius: 0.66rem;
  border-top-right-radius: 0.66rem;
`;

const GatewayContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-bottom-left-radius: 0.66rem;
  border-bottom-right-radius: 0.66rem;
  justify-content: space-between;
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

const Circle = styled.div`
  width: 48px;
  height: 48px;
  background-color: grey;
  border-radius: 50%;
  margin-right: 0.75rem;
`;

const Title = styled.h4`
  margin: 0;
  margin-right: auto;
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
`;

const Dapp = ({ title, type, url }) => (
  <Card href={url} target="_blank">
    <Circle />
    <Title>{title}</Title>
    <Type color="#0a6846" bg="#b1ffd0">
      {type}
    </Type>
    {caretRight}
  </Card>
);

const Gateway = ({ title, type, url }) => (
  <GatewayCard href={url} target="_blank">
    <GatewayImg src={url} />
    <GatewayContainer>
      <Circle />
      <Title>{title}</Title>
      <Type color="#4A0A68" bg="#F4D3FF">
        {type}
      </Type>
      {caretRight}
    </GatewayContainer>
  </GatewayCard>
);

const Resource = ({ title, type, url }) => (
  <Card href={url} target="_blank">
    <Circle />
    <Title>{title}</Title>
    <Type color="#232323" bg="#EEEEEE">
      {type}
    </Type>
    {caretRight}
  </Card>
);

const dapps = [
  {
    title: "Arbitrum",
    type: "DEX",
    url: "https://near.org/bluebiu.near/widget/Arbitrum.All-in-one",
  },
  {
    title: "Uniswap v2",
    type: "DEX",
    url: "https://near.social/zavodil.near/widget/Uniswap",
  },
  {
    title: "Aave V3",
    type: "Lending",
    url: "https://near.org/aave-v3.near/widget/AAVE",
  },
  {
    title: "Lido",
    type: "Staking",
    url: "https://near.org/zavodil.near/widget/Lido",
  },
  {
    title: "Gamma",
    type: "Liquidity",
    url: "https://near.org/bluebiu.near/widget/ZKEVM.GAMMA",
  },
  {
    title: "Pendle",
    type: "Yield Aggregator",
    url: "https://near.org/bluebiu.near/widget/Arbitrum.Pendle.TradeMarkets",
  },
];

const gateways = [
  { title: "NEAR", type: "near", url: "https://near.org/" },
  { title: "DapDap", type: "Web3 Games", url: "https://alpha.dapdap.net/" },
  {
    title: "Polygon zkEVM",
    type: "zkEVM",
    url: "https://bos.quickswap.exchange/",
  },
  { title: "Mantle", type: "zkEVM", url: "https://bos.mantle.xyz/" },
];

const resources = [
  {
    title: "What is BOS?",
    type: "Docs",
    url: "https://docs.near.org/bos/overview",
  },
  {
    title: "BOS Loader",
    type: "Github Repo",
    url: "https://github.com/near/bos-loader",
  },
  {
    title: "BOS Gateway",
    type: "Github Repo",
    url: "https://github.com/NearDeFi/bos-gateway-template",
  },
  {
    title: "BOS Decentralized Frontends",
    type: "Telegram",
    url: "https://t.me/NEARisBOS",
  },
];

return (
  <Main>
    <HeroImage src="" />
    <Container>
      <SectionTitle color="#00EC97">Dapps</SectionTitle>
    </Container>
    <Container>
      {dapps.map(({ title, type, url }, index) => (
        <Dapp key={index} title={title} type={type} url={url} />
      ))}
    </Container>
    <Container>
      <SectionTitle color="#C751FF">Gateways</SectionTitle>
    </Container>
    <Container>
      {gateways.map(({ title, type, url }, index) => (
        <Gateway key={index} title={title} type={type} url={url} />
      ))}
    </Container>
    <Container>
      <SectionTitle color="#767676">Resources</SectionTitle>
    </Container>
    <Container>
      {resources.map(({ title, type, url }, index) => (
        <Resource key={index} title={title} type={type} url={url} />
      ))}
    </Container>
  </Main>
);
