const Items = [
  {
    heading: (
      <>
        Marketing
        <br />
        Support
      </>
    ),
    description:
      "Recieve the marketing support from 20+ guilds and 50k users coverage from Near ecosystem",
    cta: {
      href: "https://t.me/nearprotocolua",
      title: "Read ↗",
    },
  },
  {
    heading: <>Talents</>,
    description: (
      <>
        Need to find developers, builders, designers, community managers,
        product managers?
      </>
    ),
    cta: {
      href: "https://t.me/nearprotocolua",
      title: "Book a meeting ↗",
    },
  },
  {
    heading: <>Funding support</>,
    description:
      "Explore funding opportunities from the Near Protocol ecosystem",
    cta: {
      href: "https://t.me/nearprotocolua",
      title: "Learn more ↗",
    },
  },
];

const Circle = styled.div`
  display: flex;
  width: 18.75rem;
  height: 18.75rem;
  padding: 2.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  border-radius: 22.5rem;
  border: 1px solid #00ec97;
  background: #f4f4f4;

  h3 {
    color: #101820;
    text-align: center;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 36px */
  }

  p {
    color: #101820;
    text-align: center;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 28.8px */
    letter-spacing: -0.72px;
  }

  a {
    color: #04a46e;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 28.8px */
  }
`;

const Container = styled.div`
  padding: 3rem;
  padding-top: 0;
  margin-top: 1.5rem;

  @media screen and (max-width: 786px) {
    padding: 1.5rem;
    padding-top: 0;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  flex-wrap: wrap;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Content = (
  <Container>
    <ItemsContainer>
      {Items.map((it) => (
        <Circle key={Math.random()}>
          <h3>{it.heading}</h3>
          <p>{it.description}</p>
          <a href={it.cta.href}>{it.cta.title}</a>
        </Circle>
      ))}
    </ItemsContainer>
  </Container>
);

return (
  <Widget
    src="devgovgigs.near/widget/devhub.components.island.home-section"
    props={{
      title: "/get support",
      children: Content,
      background: true,
    }}
  />
);
