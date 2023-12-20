const rootUser = "nearweekapp.near";
const breakpoints = { md: "768px", lg: "1100px", xl: "1300px" };

function NewsletterCard() {
  const nwSite = "https://nearweek.com";

  const TopCard = styled.div`
      position: relative;
      width: 100%;
      border-radius: 12px;
      background: #fff;
      overflow: hidden;
      margin-bottom:10px;
      display flex;
      flex-direction: column;
      gap:40px;
    `;

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
  const TopCardBody = styled.div`
      display: flex;
      align-items: center;
  
      > * {
        min-width: 0;
      }
    `;
  const CardContent = styled.div`
      font-size: 10px;
      font-weight: 400;
      line-height: 13px;
      letter-spacing: -0.02em;
      color: hsla(0, 0%, 0%, 1);
      width: 100%;
    `;
  const CardFooter = styled.div`
      margin-bottom:20px;
      & p{
          color: #1C1F41;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.15px;
      }
      & a {
        color: #3C71F7;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.15px;
        text-decoration-line: underline;
      }
    `;

  const MainSection = styled.div`
  padding: 30px 20px 20px 20px;
  @media screen and (min-width: ${breakpoints.xl}) {
   grid-area: 1 / 2 / 2 / 3;
   padding: 30px 45px 20px 45px;
   max-width:100%;
     }
  `;
  const MainContainer = styled.div`
      width:310px;
      display:flex;
    flex-direction:column;
    justify-content: center; 
    justify-items: center; 
     @media screen and (min-width: ${breakpoints.xl}) {
      width:70%;
      display: grid;
      grid-column-gap: 20px;
      justify-content: end;
     }
    `;

  const detailsPage = props.detailsPage;
  const updateDetailsPage = props.updateDetailsPage;
  const sections = detailsPage?.sections;

  function generateCode() {
    const code = `
    <html>
      <head>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
      </head>
      <body>
        <div id="content"></div>
      </body>
      <script>
        window.addEventListener('message', function (event) {}, false);

        const handleMessage = (m) => {
          const { data } = m;
          let fullHtml = "";

          data.forEach((section) => (fullHtml += section.content));

          const parser = new DOMParser();
          const doc = parser.parseFromString(fullHtml, 'text/html');

          const spanElements = doc.querySelectorAll('span');
          spanElements.forEach((span) => {
            span.style.fontFamily = 'Inter';
          });

          const contentElement = document.getElementById('content');
          contentElement.innerHTML = doc.body.innerHTML;
        };

        window.iFrameResizer = {
          onMessage: handleMessage,
        };
      </script>
    </html>
  `;
    return code;
  }

  const ReturnButton = styled.div`
    cursor: pointer;
  `;

  function TopSection() {
    return (
      <MainSection>
        {detailsPage ? (
          <div>
            <TopCardTitle>
              <ReturnButton onClick={() => updateDetailsPage(null)}>
                <Widget src={`${rootUser}/widget/details-return`} />
              </ReturnButton>
              {"Edition"} {detailsPage?.Number ? detailsPage.Number : ""}
            </TopCardTitle>
            <TopCard>
              <TopCardBody>
                <CardContent>
                  <img
                    className="rounded"
                    width="100%"
                    height="100%"
                    src={nwSite + detailsPage.Thumbnail.url}
                    alt={detailsPage.Thumbnail.alternativeText}
                  />
                </CardContent>
              </TopCardBody>

              <CardFooter>
                {sections ? (
                  sections.map((section) => <Markdown text={section.content} />)
                ) : (
                  <div />
                )}
              </CardFooter>
            </TopCard>
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </MainSection>
    );
  }
  const BottomContainer = styled.div`
      tranform:translateY:50px !important;
`;
  function BottomSection() {
    return (
      <Widget
        props={{
          updateDetailsPage,
        }}
        src={`${rootUser}/widget/details-bottom`}
      />
    );
  }

  return (
    <div>
      <Widget src={`${rootUser}/widget/nw-navbar`} />
      <MainContainer>
        <TopSection />
        <BottomContainer>
          <BottomSection />
        </BottomContainer>
      </MainContainer>
    </div>
  );
}

return <NewsletterCard />;
