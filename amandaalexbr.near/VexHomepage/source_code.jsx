const BgVex =
  "https://aquamarine-official-jay-421.mypinata.cloud/ipfs/QmTK8WdS2vYgnMFKNonzQBvfSshRh1CwZP1feR2d8UaJoz";

const BannerBg =
  "https://aquamarine-official-jay-421.mypinata.cloud/ipfs/QmP9WkFCfYPy4LxyReTrHMaH45im1avLXjhCk9M25iXMns";

const Hero = styled.div`
border: 0;
box-sizing: border-box;
margin: 0;
background: black;
background-image: url(${BannerBg});
background-size: cover;
width: 100%;
min-height: 100vh;
display: flex;
flex-direction:column;
justify-content: center;
align-items: left;
padding: 1.5rem;
gap: 0.5rem;
`;

const Title = styled.h1`
font-size: 4rem;
color: red;
font-weight: 800;
font-family: Verdana, sans-serif;
`;

const SubTitle = styled.h2`
font-size: 1.5rem;
color: white;
font-weight: 600;
font-family: ${fontCss}, sans-serif;
`;

const TwitterButton = styled.a`
background: white;
padding: 0.75rem;
width: 12rem;
font-size: 1.5rem;
border: 1px solid white;
border-radius: 10px;
display: flex;
justify-content: center;
`;

return (
  <Hero>
    <Title>VEX Esports</Title>
    <SubTitle>Esports betting for gamers, by gamers.</SubTitle>

    <Widget
      src="near/widget/DIG.Button"
      props={{
        href: "https://twitter.com/betvex",
        icon: "ph-fill ph-twitter-logo",
        label: "Twitter",
        size: "large",
      }}
    />
  </Hero>
);
