const rootUser = "nearweekapp.near";
const nwSite = "https://nearweek.com";

const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};

if (!state.theme) {
  State.update({
    theme: styled.div`
    background: #FAF9F9;
    color: #1C1F41;
    margin: 0;
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
  return <Widget src={`${rootUser}/widget/nw-articles`} />;
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
return (
  <Theme>
    {/*main section*/}
    <Widget src={`${rootUser}/widget/nw-navbar`} />

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
      <MainSectionArticles fullWidth changeOrder>
        <Articles />
        <TabContentFooter>
          <ButtonLink href="//nearweek.medium.com" target="_blank">
            Load more
          </ButtonLink>
        </TabContentFooter>
      </MainSectionArticles>
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
