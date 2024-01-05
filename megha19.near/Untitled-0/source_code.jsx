const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Oxanium:wght@200&display=swap"
).body;

if (!cssFont) return "";

console.log(cssFont);

if (!state.theme) {
  State.update({
    theme: styled.div`
      font-family: Oxanium !important;
    `,
  });
}
const Theme = state.theme;

const logo =
  "https://ipfs.near.social/ipfs/bafkreicjkwukanzb3wkff4yhulpzms7kr2ogjso5fz33aksv44u5rtzcnm";
const appName =
  "https://ipfs.near.social/ipfs/bafkreihjykfkncpwda7ajnzjsftvznjp66fs2rl4jd4gohaieamvtbwgdy";

const HeaderLgContainer = styled.div`
  background-color: rgba(1, 4, 34, 1);
  color: rgba(255, 255, 255, 1);
  padding-inline: 10vw;
  padding-block: 5vh;

  @media screen and (max-width: 1200px) {
    padding-inline: 5vh;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const HeaderSmContainer = styled.div`
  background-color: rgba(1, 4, 34, 1);
  color: rgba(255, 255, 255, 1);
  padding-inline: 2vw;
  padding-block: 3vh;
  .gap-6 {
    gap: 2rem;
  }

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

const Heading = styled.div`
  font-size: 38px;
  font-weight: 400;
  line-height: 45px;
`;

const HeadingSm = styled.div`
  font-size: 28px;
  font-weight: 400;
  line-height: 40px;
`;

const BodyContainer = styled.div`
  background-color: rgba(228, 224, 243, 1);
  padding-inline: 10vw;
  padding-block: 6vh;
  @media screen and (max-width: 500px) {
    .justify-sm-self-center {
      justify-self: center;
    }
  }
`;

const FooterContainer = styled.div`
  background-color: rgba(104, 57, 226, 1);
  padding-block: 5vh;
  color: rgba(255, 255, 255, 1);
  padding-inline: 10vw;

  @media screen and (max-width: 1000px) {
    padding-inline: 2vw;
  }
`;

const NumberStyle = styled.div`
  font-size: 90px;
  font-weight: 400;
  color: rgba(104, 57, 226, 1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 0.5rem;
  row-gap: 1.5rem;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0rem;
  }
`;

const FooterText = styled.div`
  width:35%;

  @media screen and (max-width: 1000px) {
   width:95%;
  }
`;

const NumberItems = ({ number, title }) => {
  return (
    <div class="d-flex gap-2">
      <NumberStyle>{number}</NumberStyle>
      <div
        class="align-self-center h6"
        style={{ maxWidth: "50%", fontWeight: 600 }}
      >
        {title}
      </div>
    </div>
  );
};

const WorkImage = styled.img`
  height: 120px;
  margin-left: -25%;
  @media screen and (max-width: 2000px) {
    height: 120px;
  }

  @media screen and (max-width: 1000px) {
    margin-left: 0%;
    margin-top:-8%;
  }

  @media screen and (max-width: 500px) {
      margin-top:-12%;
    height: 80px;
  }
`;

return (
  <Theme>
    <HeaderSmContainer>
      <div class="d-flex flex-column justify-content-between gap-6 w-100 align-items-center h-100">
        <img style={{ width: 40 }} src={logo} />
        <img style={{ height: 30 }} src={appName} />
        <HeadingSm class="align-self-center text-center">
          Decentralized <br />
          Design app <br />
          coming soon...
        </HeadingSm>
        <div class="d-flex" style={{ gap: 70 }}>
          <div
            style={{
              backgroundImage:
                "url(https://ipfs.near.social/ipfs/bafkreidqwmgxclnyqnezfxvacxjdfqgqyxqsa3hsv7j3r733arpvqgs6de)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              gap: 20,
              paddingBlock: 40,
            }}
          >
            <img
              style={{ height: 100, alignSelf: "flex-end" }}
              src="https://ipfs.near.social/ipfs/bafkreiedg255ss74zrqdsvbagp24vmcjisyj6nfzznmvhwknjm4mwp2s5m"
            />
            <img
              style={{ height: 200, marginRight: "-30px" }}
              src="https://ipfs.near.social/ipfs/bafkreidntbrxhhenkabwf3wbnut5crypkah45qnewt6setejkfnkmijjvi"
            />
          </div>
        </div>
      </div>
    </HeaderSmContainer>
    <HeaderLgContainer>
      <div class="d-flex justify-content-between w-100 align-items-center h-100">
        <Heading class="align-self-center text-center">
          Decentralized <br />
          Design app <br />
          coming soon...
        </Heading>
        <div class="d-flex" style={{ gap: 70 }}>
          <div
            style={{
              backgroundImage:
                "url(https://ipfs.near.social/ipfs/bafkreidqwmgxclnyqnezfxvacxjdfqgqyxqsa3hsv7j3r733arpvqgs6de)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              gap: 20,
              paddingBlock: 40,
            }}
          >
            <img
              style={{ height: 100, alignSelf: "flex-end" }}
              src="https://ipfs.near.social/ipfs/bafkreiedg255ss74zrqdsvbagp24vmcjisyj6nfzznmvhwknjm4mwp2s5m"
            />
            <img
              style={{ height: 200, marginRight: "-30px" }}
              src="https://ipfs.near.social/ipfs/bafkreidntbrxhhenkabwf3wbnut5crypkah45qnewt6setejkfnkmijjvi"
            />
          </div>
          <div class="d-flex flex-column gap-3">
            <img style={{ width: 40 }} src={logo} />
            <img style={{ height: 30 }} src={appName} />
          </div>
        </div>
      </div>
    </HeaderLgContainer>
    <BodyContainer>
      <div class="d-flex gap-4 flex-column">
        <Heading style={{ fontWeight: 450 }}>How it works:</Heading>
        <Grid>
          <NumberItems number="1." title="Client creates a Brief" />
          <NumberItems number="2." title="Designers submit their work." />
          <WorkImage src="https://ipfs.near.social/ipfs/bafkreia7fjd3snjklznhxxzgy4nolqnpn7zhisysmfo6nnieaqdjvu35vm" />
          <NumberItems
            number="3."
            title="The client [or the community] selects the winner."
          />
          <NumberItems
            number="4."
            title="There are a max of 3 rounds of feedbacks."
          />
          <NumberItems
            number="5."
            title="Client approves and  payment gets released."
          />
          <NumberItems number="6." title="Designers get paid." />
          <NumberItems
            number="7."
            title="An NFT of the final artwork is minted and transferred to the clients wallet"
          />
          <div class="justify-sm-self-center">
            <img
              src="https://ipfs.near.social/ipfs/bafkreibh3yt2wcr5w7gnxsryp4sznj7alybu7wgsupo4xqqg4y3famz76q"
              style={{ height: 150 }}
            />
          </div>
        </Grid>
      </div>
    </BodyContainer>
    <FooterContainer>
      <div class="d-flex justify-content-center align-items-center h-100 w-100 h6 text-center">
        <FooterText>
          We hope to start building this app soon. Please contact
          <a
            style={{ color: "rgba(67, 247, 79, 1)" }}
            href="https://near.social/mob.near/widget/ProfilePage?accountId=clippy.near"
            target="_blank"
            rel="noopener noreferrer"
          >
            clippy.near
          </a>
          if you would like more information.
        </FooterText>
      </div>
    </FooterContainer>
  </Theme>
);
