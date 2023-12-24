const rootUser = "nearweekapp.near";
const nwSite = "https://nearweek.com";

const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};
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
  font-weight: 600;
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
  margin-bottom:24px;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 600;
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

State.init({ detailsPage: null });
function updateDetailsPage(value) {
  State.update({ detailsPage: value });
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
/* NEWSWIRE */
function NewswireCard() {
  return <Widget src={`${rootUser}/widget/nw-newswire`} />;
}
/* AUDIO */
function AudioCard() {
  return <Widget src={`${rootUser}/widget/nw-audio`} />;
}

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

const Wrapper = styled.div`
  width: calc(100vw - 20px);  
  max-width: 100%;
  box-sizing: border-box;
  @media screen and (max-width: ${breakpoints.md}) {
      width: 100%;
  }
`;

const Container = styled.div`
    background: #FAF9F9;
    margin:0 auto;
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
  <Wrapper>
    <Container className="container-xl">
      <div className="row">
        {/*main section*/}
        <Widget src={`${rootUser}/widget/nw-navbar`} />

        <ContentContainer>
          <div>
            {/*Newsletter div */}
            <MainSection>
              <NewsletterCard />
              <TabContentFooter>
                <ButtonLink
                  href="https://nearweek.com/newsletters"
                  target="_blank"
                >
                  Load more
                </ButtonLink>
              </TabContentFooter>
            </MainSection>
            {/*Audio Div */}
            <div class="d-none d-md-block">
              <MainSection class="border border-danger">
                <AudioCard />
                <TabContentFooter>
                  {/* This part remains the same */}
                  <AudioButtonLink href={nwSite + "/audio"} target="_blank">
                    Load more
                  </AudioButtonLink>
                </TabContentFooter>
                <AudioBage>
                  <div className="text-container">
                    <h3>Submit Your Audio</h3>
                    <p>
                      Share your podcast, Spaces or interview and get featured
                    </p>
                  </div>
                </AudioBage>
              </MainSection>
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
          <MainSection>
            <NewswireCard />
            <TabContentFooter>
              <ButtonLink
                href="https://near.org/nearweekapp.near/widget/nearweek-news"
                target="_blank"
              >
                Load more
              </ButtonLink>
            </TabContentFooter>
          </MainSection>
          {/*Audio Div */}
          <div class="d-block d-md-none">
            <MainSection>
              <AudioCard />
              <TabContentFooter>
                <AudioButtonLink href={nwSite + "/audio"} target="_blank">
                  Load more
                </AudioButtonLink>
              </TabContentFooter>
              <AudioBage>
                <div className="text-container">
                  <h3>Submit Your Audio</h3>
                  <p>
                    Share your podcast, Spaces or interview and get featured
                  </p>
                </div>
              </AudioBage>
            </MainSection>
          </div>
        </ContentContainer>
        <Widget src={`${rootUser}/widget/nw-footer`} />
      </div>
    </Container>
  </Wrapper>
);
