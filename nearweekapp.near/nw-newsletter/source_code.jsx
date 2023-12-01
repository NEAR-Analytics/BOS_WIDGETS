const rootUser = "nearweekapp.near";

function NewsletterCard() {
  State.init({ page: 1 });
  const data = fetch(
    `https://nearweek.com/api/editions?populate=deep&sort=createdAt:desc&pagination[pageSize]=${
      state.page * 9
    }`,
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
      `,
    });
  }
  const Theme = state.theme;

  const ReadButtonLink = styled.a`
    padding: 8px;
    height: 29px;
    width: 100%;
    border: 1px solid #d7dbdf;
    border-radius: 100px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
    background: #fbfcfd;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ecedee;
      text-decoration: none;
      outline: none;
    }
  `;

  const SubscribeButtonLink = styled.a`
    padding: 8px;
    height: 29px;
    width: 100%;
    border: 1px solid #2A6BD5;
    border-radius: 100px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    color: #fff !important;
    background: #2A6BD5;
    white-space: nowrap;

    &:hover,
    &:focus {
      background-color: #ffff;
      color: #2A6BD5 !important;
      border: 1px solid #2A6BD5;
      text-decoration: none;
      outline: none;
    }
  `;

  const Card = styled.div`
    position: relative;
    cursor: pointer;
    width: 100%;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #eceef0;
    overflow: hidden;
    margin-bottom:10px;
  `;

  const TopCard = styled.div`
    position: relative;
    width: 100%;
    border-radius: 12px;
    background: #fff;
    border: 1px solid rgba(28, 31, 65, 0.10);
    overflow: hidden;
    margin-bottom:10px;
  `;

  const CardTitle = styled.h2`
  cursor: pointer;
    overflow: hidden;
    color: #1C1F41;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    margin-top:10px;
    margin-bottom:0;
  `;

  const CordDate = styled.p`
    color: rgba(28, 31, 65, 0.45);
    text-align: right;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px;

    text-align:left;
    margin-bottom:0;
    margin-top:8px;

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
  `;

  const TopCardTitleContainer = styled.h2`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;

    border-bottom: 1px solid rgba(28, 31, 65, 0.10);

    & p {
        color: rgba(28, 31, 65, 0.45);
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 8.5px;

    }
  `;

  const TopCardFooterButtons = styled.h2`
    width:100%;
    display:flex;
    gap:14px;
   
  `;

  const CardBody = styled.div`
    padding: 12px 12px 9px 12px;
    display: flex;
    gap: 16px;
    align-items: center;

    > * {
      min-width: 0;
    }
  `;

  const TopCardBody = styled.div`
    padding: 12px 17px 8px 12px;
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
    display: grid;
    grid-template-column: auto auto;
    gap: 14px;
    padding: 6px 16px;
  `;

  const H2 = styled.h2`
    color: #1C1F41;
    font-family: 'Inter';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    margin-bottom: 15px;
`;
  const ButtonLoadMore = styled.button`
  width: 180px;
  padding: 8px;
  height: 31px;
  background: transparent;
  margin: 0 auto;
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  }

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
  const nwSite = "https://nearweek.com";

  const updateDetailsPage = props.updateDetailsPage;

  return (
    <Theme>
      <H2>Newsletter</H2>
      {issues !== null && issues.length > 0 ? (
        issues.map((issue, index) => (
          <div key={index}>
            {/* Display the top card with unique styling */}
            {index === 0 && (
              <TopCard>
                <TopCardBody>
                  <CardContent>
                    <img
                      class="rounded"
                      width="100%"
                      height="100%"
                      src={nwSite + issue.Thumbnail.url}
                      alt={issue.Thumbnail.alternativeText}
                    />
                  </CardContent>
                </TopCardBody>
                {/* Display "Read" and "Subscribe" buttons only for the top card */}
                {index === 0 && (
                  <CardFooter>
                    <TopCardTitleContainer>
                      <TopCardTitle>
                        {"Edition"} {issue.Number ? issue.Number : ""}
                      </TopCardTitle>
                      <p>{formatDate(issue.createdAt)}</p>
                    </TopCardTitleContainer>
                    <TopCardFooterButtons>
                      <ReadButtonLink onClick={() => updateDetailsPage(issue)}>
                        Read
                      </ReadButtonLink>
                      <SubscribeButtonLink
                        href="https://subscribe.nearweek.com"
                        target="_blank"
                        primary
                      >
                        Subscribe
                      </SubscribeButtonLink>
                    </TopCardFooterButtons>
                  </CardFooter>
                )}
              </TopCard>
            )}

            {/* Display bage */}
            {index === 0 && (
              <Widget src={`${rootUser}/widget/nw-newsletter-bage`} />
            )}

            {/* Display the other three cards with the same styling */}
            {index > 0 && (
              <Card onClick={() => updateDetailsPage(issue)}>
                <CardBody>
                  <CardContent>
                    <div class="d-flex clearfix">
                      <div class="d-flex">
                        <img
                          class="rounded"
                          width="67"
                          height="49"
                          src={nwSite + issue.Thumbnail.url}
                          alt={issue.Thumbnail.alternativeText}
                        />
                        <div class="d-flex flex-column ms-3 mt-0">
                          {/* Display "Edition -" followed by the number */}
                          <CardTitle>
                            {"Edition"} {issue.Number ? issue.Number : ""}
                          </CardTitle>
                          {/* Display time elapsed since creation date */}
                          <CordDate>{`${calculateTimeDifference(
                            issue.createdAt
                          )}`}</CordDate>
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
      <ButtonLoadMore onClick={() => State.update({ page: state.page + 1 })}>
        Load more
      </ButtonLoadMore>
    </Theme>
  );
}

return <NewsletterCard />;
