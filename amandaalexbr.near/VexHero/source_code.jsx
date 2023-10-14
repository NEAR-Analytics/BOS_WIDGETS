const BannerBg =
  "https://aquamarine-official-jay-421.mypinata.cloud/ipfs/QmP9WkFCfYPy4LxyReTrHMaH45im1avLXjhCk9M25iXMns";

const Hero = styled.div`
border: 0;
box-sizing: border-box;
margin: 0;
background: black;
background-image: url(${BannerBg});
background-size: cover;
background-position: right;
width: 100%;
min-height: 80vh;
display: flex;
flex-direction:column;
justify-content: center;
align-items: left;
padding: 1.5rem;
gap: 0.5rem;
`;

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
