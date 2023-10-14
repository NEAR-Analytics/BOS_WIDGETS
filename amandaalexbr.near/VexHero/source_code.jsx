const Buttons = styled.div`
display: flex;
justify-content: left;
align-items: center;
gap: 0.5rem;
`;

const heroTitle = { text: "VEX Esports" };
const heroSubtitle = { text: "Esports betting for gamers, by gamers." };

return (
  <Hero>
    <Widget src="amandaalexbr.near/widget/VexTitle" props={heroTitle} />
    <Widget src="amandaalexbr.near/widget/VexSubtitle" props={heroSubtitle} />

    <Buttons>
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://twitter.com/betvex",
          iconLeft: "ph-fill ph-twitter-logo",
          label: "Twitter",
          size: "large",
        }}
      />

      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://test.near.org/vex-hackathon.testnet/widget/MatchList",
          label: "Place your bets",
          size: "large",
        }}
      />
    </Buttons>
  </Hero>
);
