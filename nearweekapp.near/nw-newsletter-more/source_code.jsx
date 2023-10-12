const rootUser = "nearweekapp.near";
const breakpoints = { md: "768px", lg: "1100px", xl: "1300px" };

function NewsletterCard() {
  const accountId = "near";
  articles;
  State.init({ active: 0 });
  const nwSite = "https://nearweek.com";
  let posts = [];
  const indexedPosts = Social.index("post", "main", {
    accountId,
    limit: 20,
    order: "desc",
  });
  if (indexedPosts?.length > 0) {
    posts = indexedPosts
      .map((post) => {
        const data = Social.get(
          `${post.accountId}/post/main`,
          post.blockHeight
        );
        if (!data) return;
        const json = JSON.parse(data);
        const content = json.text.split("\n");
        const title = content[0] || "";
        const url = content[1] || content[2] || "";
        const lastLine = content.pop() || "";
        const hasNewsTag = lastLine.includes("#news");
        const isValid = hasNewsTag && url.includes("https://");
        if (isValid) {
          const block = Near.block(post.blockHeight);
          const createdAt = block
            ? new Date(
                parseFloat(block.header.timestamp_nanosec) / 1e6
              ).toISOString()
            : "";
          return {
            blockHeight: post.blockHeight,
            title,
            url,
            thumbnail: "https://near.org/favicon.png",
            createdAt,
            categories: ["Near ORG", "blog"],
          };
        }
      })
      .filter(Boolean);
    posts.sort((a, b) => b.blockHeight - a.blockHeight);
  }

  const data = fetch(
    "https://nearweek.com/api/editions?populate=deep&sort=createdAt:desc&pagination[pageSize]=8",
    {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization:
          "Bearer 15699f0723aa9fe9f655b1a94e450552476c08807f67b525b5a3c8011eecc8aee6d45923443620f17815b897858be058cd7bd89ddf23a28aabaecb178e7ebc55d380293beeb51a8ce87b40e1518ce4708e4d51a06b115f27fa64ab5cbee5a3511cec785d7ae6a155ecd05ac8196aadae3e9b8e9401b8df8d8b69904f7364f925",
      },
    }
  );
  const cssFont = fetch("https://fonts.cdnfonts.com/css/hubot-sans").body;
  if (!cssFont) return "";
  if (!state.theme) {
    State.update({
      theme: styled.div`
        font-family: 'Mona Sans', sans-serif;
        font-style: normal;
        ${cssFont}
      }`,
    });
  }
  const Theme = state.theme;

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
      font-family: Inter;
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
          font-family: Inter;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.15px;
      }
      & a {
        color: #3C71F7;
        font-family: Inter;
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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  }
  function calculateTimeDifference(dateString) {
    const now = new Date();
    const creationDate = new Date(dateString);
    const diffMillis = now - creationDate.getTime();
    const timeUnits = ["Month", "Day", "Hour", "Minute", "Second"];
    const divisors = [
      30 * 24 * 60 * 60 * 1000,
      24 * 60 * 60 * 1000,
      60 * 60 * 1000,
      60 * 1000,
      1000,
    ];

    for (let i = 0; i < divisors.length; i++) {
      const unitCount = Math.floor(diffMillis / divisors[i]);
      if (unitCount >= 1) {
        return `${unitCount} ${timeUnits[i]}${unitCount > 1 ? "s" : ""}`;
      }
    }

    return "Just Now";
  }

  const issues = data.body.data;

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
      window.addEventListener('message', function(event) {
      }, false);
              const handleMessage = (m) => {
                  const { data } = m;
                  let fullHtml = "";
  
                  data.forEach(section => fullHtml+=section.content);
  
                  const contentElement = document.getElementById('content');
                  contentElement.innerHTML = fullHtml;
              };
      window.iFrameResizer = {
          onMessage: handleMessage
      }
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
                <Widget src={`${rootUser}/widget/nw-details-return`} />
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
                  <iframe
                    iframeResizer
                    className="w-100"
                    srcDoc={generateCode()}
                    message={{
                      data: sections.map((section) => {
                        return {
                          ...el,
                          content: section.content.replace(
                            /<img([^>]*)src="\/uploads\//g,
                            `<img width="100%" $1src="http://nearweek.com/uploads/`
                          ),
                        };
                      }),
                    }}
                  />
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
        src={`${rootUser}/widget/nw-details-bottom`}
      />
    );
  }

  return (
    <Theme>
      <Widget src={`${rootUser}/widget/nw-navbar`} />
      <MainContainer>
        <TopSection />
        <BottomContainer>
          <BottomSection />
        </BottomContainer>
      </MainContainer>
    </Theme>
  );
}

return <NewsletterCard />;
