const BgVex =
  "https://aquamarine-official-jay-421.mypinata.cloud/ipfs/QmTK8WdS2vYgnMFKNonzQBvfSshRh1CwZP1feR2d8UaJoz";

const Img = styled.img`
width: 100vw;
height: auto;
z-index: -1;
`;

const fontCss = fetch("https://fonts.googleapis.com/css?family=Rowdies").body;
if (!fontCss) {
  return;
}

const Hero = styled.div`
background: black;
background-image: url(${BgVex});
background-size: cover;
width: 100vw;
height: 100vh;
`;

const Title = styled.h1`
font-size: 8rem;
color: red;
font-weight: 800;
font-family: ${fontCss}, sans-serif;
`;

return (
  <Hero>
    <Title>VEX Esports</Title>
  </Hero>
);
