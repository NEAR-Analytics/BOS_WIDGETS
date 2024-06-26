const rootUser = "nearweekapp.near";
const nwSite = "https://nearweek.com";

const coverImgSrc =
  "https://ipfs.near.social/ipfs/bafkreidb4qtfdndct4rzymrm4p6u2k7gcjw5fohh5izs5lhkzdmjrlrknu";

const mobCoverImgSrc =
  "https://ipfs.near.social/ipfs/bafkreihzi6htmib5soiama557tr5bhwblm5gjxnnenvdtvxqzhvsoraztq";

const mobTopImgSrc =
  "https://ipfs.near.social/ipfs/bafkreiesqutrfntbmeazszo4lfy774wrzoekblijbbpjmufzcwdhfj5dtu";

const breakpoints = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px",
};
// const breakpoints = {
//   sm: "767px",
//   md: "768px",
//   lg: "1100px",
//   xl: "1300px",
// };

if (!state.theme) {
  State.update({
    theme: styled.div`
    background: #FAF9F9;
    color: #1C1F41;
    max-width: 1690px;
    margin: 0 auto;
`,
  });
}
const Theme = state.theme;

const TabContentFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const MainSection = styled.div`
    border: 1px solid var(--bs-border-color);
    border-radius: 20px;
    padding: 20px 15px;
    margin-bottom: 10px;
    height: fit-content;
    width: 341px;
    background: white;
    @media screen and (min-width: ${breakpoints.xl}) {
      max-width: 700px;
      width: ${(props) => (props.fullWidth ? "100%" : "341px")};
    }
`;

const MainSectionArticles = styled.div`
    border: 1px solid var(--bs-border-color);
    border-radius: 20px;
    padding: 20px 15px;
    margin-bottom: 10px;
    height: fit-content;
    background: white;
    width: 341px;
  @media screen and (min-width: ${breakpoints.xl}) {
      max-width: 750px;
      width: ${(props) => (props.fullWidth ? "100%" : "341px")};
    }
`;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 20px;
  justify-content: center;
  justify-items: center;
  margin-top:20px;
  @media screen and (max-width: ${breakpoints.lg}) {
      grid-template-columns: auto auto;
      margin-top:50px;
  }
    @media screen and (max-width: ${breakpoints.md}) {
      grid-template-columns: auto;
      margin-top:50px;
  }
`;
const ButtonLink = styled.a`
  margin-top:14px;
  width: 180px;
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  color: hsla(204, 22%, 9%, 1);
  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }
`;
const AudioBage = styled.div`
width:100%;
border-radius: 12px;
background: linear-gradient(91deg, rgba(0, 0, 0, 0.32) 1.15%, rgba(0, 0, 0, 0.02) 18.22%, rgba(0, 0, 0, 0.12) 75.24%, rgba(0, 0, 0, 0.70) 112%, rgba(0, 0, 0, 0.80) 135.99%);
margin:10px 0px;
background-color: darkcyan;
padding: 10px 15px;
display:flex;
flex-direction: column;
& .text-container {
  width: 160px;
  & p {
    color: rgba(255, 255, 255, 0.80);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    margin:0;
    }
    & h3 {
      color: #FFF;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      margin-bottom:4xp;
}}`;
const AudioButtonLink = styled.a`
  width: 65%;
  padding: 8px;
  height: 31px;
  margin-bottom: 10x;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  color: hsla(204, 22%, 9%, 1);
  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
    }`;
function Articles() {
  return (
    <Widget
      src={`${rootUser}/widget/nw-articles`}
      props={{ postType: "articles" }}
    />
  );
}
function Videos() {
  return (
    <Widget
      src={`${rootUser}/widget/nw-articles`}
      props={{ postType: "videos" }}
    />
  );
}
/*Newsletter*/
State.init({ detailsPage: null, audioDetails: null });
function updateDetailsPage(value) {
  State.update({ detailsPage: value });
}
function updateAudioDetails(value) {
  State.update({ audioDetails: value });
}

function NewsletterCard() {
  return (
    <Widget
      props={{
        updateDetailsPage,
      }}
      src={`${rootUser}/widget/nw-newsletter`}
    />
  );
}
if (state.detailsPage) {
  return (
    <Widget
      src={`${rootUser}/widget/nw-newsletter-more`}
      props={{
        detailsPage: state.detailsPage,
        updateDetailsPage,
      }}
    />
  );
}
if (state.audioDetails) {
  return (
    <Widget
      src={`${rootUser}/widget/nw-audio-more`}
      props={{
        audioDetails: state.audioDetails,
        updateAudioDetails,
      }}
    />
  );
}
/* NEWSWIRE */
function NewswireCard() {
  return <Widget src={`${rootUser}/widget/nw-newswire`} />;
}
/* AUDIO */
function AudioCard() {
  return (
    <Widget
      props={{
        updateAudioDetails,
      }}
      src={`${rootUser}/widget/nw-audio`}
    />
  );
}
/* final return */

const FooterDiv = styled.div``;
const Footer = styled.div`
    width: 100%
    display: block;
    background: black;
    @media screen and (min-width: ${breakpoints.md}) {
      display: none;
    }
`;
const FooterContent = styled.div`
    display: flex;
    justify-content: center;
`;

const PriceContainer = styled.div`
    padding:0;
    margin:0;
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content: center;
`;

const TopHeader = styled.div`
  @media screen and (max-width: ${breakpoints.md}) {
    background-image: url("${mobTopImgSrc}"); 
    background-repeat: no-repeat;
    background-color: transparent;
    background-size: 100% 100%;
    width: 308px;
    height: 87px;
    margin: 0 auto;
    margin-top: 64px;    
  }
`;

const TopText = styled.p`
    display: none; 
  @media screen and (max-width: ${breakpoints.md}) {
      display: block;
      font-weight: 900;
      font-size: 19px;
      text-align: center;
      margin: 24px;
      font-style: italic;    
  }
`;
const Header = styled.div`
  position: relative;
  background-image: url("${coverImgSrc}"); 
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: 100% 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  @media screen and (max-width: ${breakpoints.md}) {
      background-image: url("${mobCoverImgSrc}"); 
  }
  & div {
    position: relative;
    width: 50%;
    top: 50%;
  }
`;

const ipfsURL = "https://ipfs.near.social/ipfs/";

const trusted = [
  {
    title: "Near Foundation",
    imgSrc: `${ipfsURL}bafkreiaf3peebsqx4plzcnvwrxm6ji2gojaooiv6japmpovilcs62lwqbu`,
    url: "https://near.org/",
  },
  {
    title: "Messari",
    imgSrc: `${ipfsURL}bafkreigacp2jluhedmmcxjzhriwgnmtwax6soo7cuorxg4cnmkmtorbqpm`,
    url: "https://messari.io/",
  },
  {
    title: "Coindesk",
    imgSrc: `${ipfsURL}bafkreifeqltl2iys4k7fuudlr3og23heiprbgq2sulkrolwgqg7dndlrpi`,
    url: "https://www.coindesk.com/",
  },
  {
    title: "Coingecko",
    imgSrc: `${ipfsURL}bafkreigqloijqzj6psx2u73mmyd4ezaunsrljdfzj3dhsqvrmakaetcasm`,
    url: "https://www.coingecko.com/",
  },
  {
    title: "Coinmarket Cap",
    imgSrc: `${ipfsURL}bafkreieudnjf3penpnksl5jiiykj3csvwz3xn3y5a373e2meevcb6734n4`,
    url: "https://coinmarketcap.com/",
  },
  {
    title: "Astar Network",
    imgSrc: `${ipfsURL}bafkreibbsjpocg2tf357szmidq7veqbtivxakk2sbwfqx7rdyb4nspxgfi`,
    url: "https://astar.network/",
  },
  {
    title: "Crypto Banter",
    imgSrc: `${ipfsURL}bafkreif4z73cybbsksndem4mx5phyua335msn6inqsyyxg3mqvg4b5lsre`,
    url: "https://www.cryptobanter.com/",
  },
  {
    title: "Big Brain Holdings",
    imgSrc: `${ipfsURL}bafkreideydsvwwzvzfcjfu2f5ltwksgkixw44uigwne6sbqbls25e7sld4`,
    url: "https://www.bigbrain.holdings/",
  },
  {
    title: "Hot Game",
    imgSrc: `${ipfsURL}bafkreieew4kxfhca7gidkgynpmjpklcssa3uyopj5wcinz4ie7i7s6267q`,
    url: "https://hot.game/",
  },
  {
    title: "Sweat Economy",
    imgSrc: `${ipfsURL}bafkreigd4azxkk7sk3zllpmnnsomffqf743u6rc4bamosh5c3w6ghoju54`,
    url: "https://sweateconomy.com/",
  },
];

const Trusted = styled.div`
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  @media screen and (max-width: ${breakpoints.md}) {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
  }
`;
const TrustedTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 300;
  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 12px;
  }
`;

const TrustedList = styled.div`
  display: flex;
  #flex-wrap: wrap;
  @media screen and (min-width: ${breakpoints.xs}) {
    gap:5px;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: ${breakpoints.sm}) {
    gap:10px;
    justify-content: space-between;
    margin-top: 1rem;
  margin-bottom: 1rem;
  }
  @media screen and (min-width: ${breakpoints.md}) {
    gap: 20px;
    justify-content: center;
    margin-top: 3rem;
  margin-bottom: 3rem;
  }
  @media screen and (min-width: ${breakpoints.lg}) {
    gap: 25px;
    justify-content: center;
    margin-top: 3rem;
  margin-bottom: 3rem;
  }
`;

const TrustedLink = styled.a`
  display: flex;
  text-transform: uppercase;
  font-weight: 300;
  fon-size: 10px;
  text-align: center;
  color: #000;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    border-radius:50%;
    width: 100%;
    max-width:106px;
    height: auto;    
  }
  & span{
    font-size: 9px;
    margin-top: 10px;
    @media screen and (min-width: ${breakpoints.xs}) {
        display: none;
    }
    @media screen and (min-width: ${breakpoints.sm}) {
        display: block;
        font-size: .25vw;
    }
    @media screen and (min-width: ${breakpoints.md}) {
        display: block;
        font-size: .35vw;
    }
    @media screen and (min-width: ${breakpoints.lg}) {
        display: block;
        font-size: .5vw;
    }
  }
`;

const RequestServicesButton = styled.a`
    display: block;
    text-align: center;
    width: 409px;
    height: 56px;
    margin: 24px auto;
    background: rgb(66, 0, 255);
    color: rgb(255, 255, 255);
    border-radius: 12px;
    font-size: 24px;
    font-weight: bold;
    padding: 9px 0px;
    font-style: italic;   
  &:hover {
    text-decoration: none;
  }
  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;
const MobRequestServicesButton = styled.a`
    display: none;
  @media screen and (max-width: ${breakpoints.md}) {
    display: block;
    text-align: center;
    width: 196px;
    height: 39px;
    margin: 0 auto;
    background: rgb(66, 0, 255);
    color: rgb(255, 255, 255);
    border-radius: 12px;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
    padding: 9px 24px;
    font-style: italic;
    
  &:hover {
    text-decoration: none;
  }
  }
`;

return (
  <Theme>
    {/*main section*/}
    <Widget src={`${rootUser}/widget/nw-navbar`} />
    <TopHeader />
    <TopText>The Official NEAR Newsletter & Community Platform</TopText>
    <MobRequestServicesButton
      href="https://4efdmh2cgdi.typeform.com/NWservices"
      target="_blank"
    >
      REQUEST SERVICES
    </MobRequestServicesButton>
    <Header>
      <div>
        <RequestServicesButton
          href="https://4efdmh2cgdi.typeform.com/NWservices"
          target="_blank"
        >
          REQUEST SERVICES
        </RequestServicesButton>
      </div>
      <div />
    </Header>
    <Trusted>
      <TrustedTitle>Trusted By</TrustedTitle>
      <TrustedList>
        {trusted.map((link, index) => (
          <TrustedLink href={link.url}>
            <img src={link.imgSrc} width="122" height="122" />
            <span>{link.title}</span>
          </TrustedLink>
        ))}
      </TrustedList>
    </Trusted>
    <ContentContainer>
      <div>
        {/*Newsletter div */}
        <MainSection>
          <NewsletterCard />
        </MainSection>
        {/*Audio Div */}
        <div class="d-none d-md-block">
          <AudioCard />
        </div>
      </div>
      {/*Articles div */}
      <div>
        <MainSectionArticles fullWidth changeOrder>
          <Articles />
        </MainSectionArticles>
        <MainSectionArticles fullWidth changeOrder>
          <Videos />
        </MainSectionArticles>
      </div>

      {/*Newswire div */}
      {!state.detailsPage && (
        <MainSection>
          <NewswireCard />
        </MainSection>
      )}
      {/*Audio Div */}
      <div class="d-block d-md-none">
        <MainSection>
          <AudioCard />
        </MainSection>
      </div>
    </ContentContainer>
    <Widget src={`${rootUser}/widget/nw-footer`} />
  </Theme>
);
