const rootUser = "nearweekapp.near";
const breakpoints = { md: "768px", lg: "1100px", xl: "1300px" };

function NewsletterCard() {
  const TopCardTitle = styled.h2`
     overflow: hidden;
      color: #1C1F41;
      text-overflow: ellipsis;
      whitespace: nowrap;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      display:grid;
      gap:20px;
      margin-bottom:27px;
    `;

  const MainSection = styled.div`
    padding: 0;
    @media screen and (min-width: ${breakpoints.lg}) {
      padding: 30px 16px 20px 16px;
      width: 100%;
    }
    `;
  const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center; 
    justify-items: center; 
    margin-top: 32px;
      @media screen and (min-width: ${breakpoints.lg}) {
        width: 100%;
        display: flex;
        grid-column-gap: 20px;
        flex-direction: row-reverse;
      }
    `;

  const audioDetails = props.audioDetails;
  const updateAudioDetails = props.updateAudioDetails;

  const ReturnButton = styled.div`
    cursor: pointer;
  `;
  const AudioContainer = styled.div`
    width: 80%;
      @media screen and (max-width: ${breakpoints.lg}) {
        width: 100%;
      }
  `;

  const ContentContainer = styled.div`
  `;
  const AudioContent = styled.div`
    display: flex;
    gap: 1.5rem;
  `;

  const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 4px;
  `;

  const C = styled.div`
  
  `;

  function TopSection() {
    return (
      <MainSection>
        {audioDetails ? (
          <AudioContainer>
            <TopCardTitle>
              <ReturnButton onClick={() => updateAudioDetails(null)}>
                <Widget src={`${rootUser}/widget/details-return`} />
              </ReturnButton>
              <ContentContainer>
                <AudioContent>
                  <img
                    src={audioDetails.thumbnail}
                    width="132"
                    height="132"
                    alt=""
                    style={{ borderRadius: "8px" }}
                  />
                  <C>
                    <Title>{audioDetails.title}</Title>
                    <iframe
                      style={{ width: "100%", fontFamily: "Inter" }}
                      srcDoc={audioDetails.description}
                    />
                  </C>
                </AudioContent>
                <div className="raw-html-embed">
                  <iframe
                    style={{ width: "100%" }}
                    src={audioDetails.frameSrc}
                  />
                </div>
                <Widget
                  props={{
                    updateAudioDetails,
                    audioCardFullWidth: true,
                  }}
                  src={`${rootUser}/widget/nw-audio`}
                />
              </ContentContainer>
            </TopCardTitle>
          </AudioContainer>
        ) : (
          <div>Loading ...</div>
        )}
      </MainSection>
    );
  }
  const BottomContainer = styled.div`
    display: none;
    transform: translateY(50px);
    @media screen and (min-width: ${breakpoints.lg}) {
      display: block;
    }
`;

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

  return (
    <div>
      <Widget src={`${rootUser}/widget/nw-navbar`} />
      <MainContainer>
        <TopSection />
        <BottomContainer>
          <AudioCard />
        </BottomContainer>
      </MainContainer>
    </div>
  );
}

return <NewsletterCard />;
