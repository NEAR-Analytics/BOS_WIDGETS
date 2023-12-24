const rootUser = "nearweekapp.near";

const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};

const issues = data.body.data;

const detailsPage = props.detailsPage;
const updateDetailsPage = props.updateDetailsPage;
const sections = detailsPage?.sections;

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  margin-bottom: 10px;
`;

const CardTitle = styled.h2`
  overflow: hidden;
  color: #1C1F41;
  text-overflow: ellipsis;
  whitespace: nowrap;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  cursor: pointer;
`;

const CordDate = styled.p`
  color: rgba(28, 31, 65, 0.45);
  text-align: right;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 8.5px;
  text-align: left;
  margin-top: 8px;
`;

const SectionHeader = styled.div`
  width: 100%;
  margin-bottom: 15px;
       @media screen and (min-width: ${breakpoints.md}) {
        margin-top:100px;
     }
`;

const H2 = styled.h2`
  color: #1C1F41;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  margin-bottom: 15px;
`;

const CardBody = styled.div`
  padding: 12px;
  display: flex;
  gap: 16px;
  > * {
    min-width: 0;
  }
`;
const TabContentFooter = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom:20px;
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

const CardContent = styled.div`
      font-size: 10px;
      font-weight: 400;
      line-height: 13px;
      letter-spacing: -0.02em;
      color: hsla(0, 0%, 0%, 1);
      width: 100%;
    `;
function BottomSection() {
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
    posts = [];

    indexedPosts.forEach((post) => {
      const data = Social.get(`${post.accountId}/post/main`, post.blockHeight);
      if (data) {
        const json = JSON.parse(data);
        const content = json.text.split("\n");
        const title = content[0] || "";
        const url = content[1] || content[2] || "";
        const lastLine = content.pop() || "";
        const hasNewsTag = lastLine.indexOf("#news") > -1;
        const isValid = hasNewsTag && url.indexOf("https://") > -1;

        if (isValid) {
          const block = Near.block(post.blockHeight);
          let createdAt = "";
          if (block) {
            const timeMs = parseFloat(block.header.timestamp_nanosec) / 1e6;
            createdAt = new Date(timeMs).toISOString();
          }
          posts.push({
            blockHeight: post.blockHeight,
            title,
            url,
            thumbnail: "https://near.org/favicon.png",
            createdAt,
            categories: ["Near ORG", "blog"],
          });

          posts.sort((a, b) => b.blockHeight - a.blockHeight);
        }
      }
    });
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
  return (
    <div>
      {issues !== null && issues.length > 0 ? (
        issues.map((issue, index) => (
          <div key={index}>
            {index === 0 && (
              <SectionHeader>
                <H2>Previous Newsletters</H2>
              </SectionHeader>
            )}
            {index > 0 && (
              <Card>
                <CardBody>
                  <CardContent>
                    <div className="d-flex clearfix">
                      <div className="d-flex">
                        <img
                          className="rounded"
                          width="67"
                          height="49"
                          src={nwSite + issue.Thumbnail.url}
                          alt={issue.Thumbnail.alternativeText}
                        />
                        <div className="d-flex flex-column ms-3 mt-0">
                          <CardTitle onClick={() => updateDetailsPage(issue)}>
                            {"Edition"} {issue.Number ? issue.Number : ""}
                          </CardTitle>
                          <CordDate>
                            {index > 0
                              ? `${calculateTimeDifference(issue.createdAt)}`
                              : formatDate(issue.createdAt)}
                          </CordDate>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CardBody>
              </Card>
            )}
          </div>
        ))
      ) : (
        <div>Loading ...</div>
      )}
      <TabContentFooter>
        <ButtonLink href="https://nearweek.com/newsletters" target="_blank">
          Load more
        </ButtonLink>
      </TabContentFooter>
      <Widget src={`${rootUser}/widget/nw-newsletter-badge`} />
    </div>
  );
}

return <BottomSection />;
