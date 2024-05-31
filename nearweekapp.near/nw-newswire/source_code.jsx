const accountId = "near";
State.init({ page: 1 });
let mediumPosts = [];

const data = fetch(
  `https://nearweek.com/api/nw-newswire?populate=deep&sort=createdAt:desc&pagination[pageSize]=${
    state.page * 13
  }`,
  {
    //subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization:
        "Bearer 15699f0723aa9fe9f655b1a94e450552476c08807f67b525b5a3c8011eecc8aee6d45923443620f17815b897858be058cd7bd89ddf23a28aabaecb178e7ebc55d380293beeb51a8ce87b40e1518ce4708e4d51a06b115f27fa64ab5cbee5a3511cec785d7ae6a155ecd05ac8196aadae3e9b8e9401b8df8d8b69904f7364f925",
    },
  }
);

const Wrapper = styled.div`
  display: grid;
  margin-bottom: 0px;
  gap: 2px;
`;

const H2 = styled.h2`
    color: #1C1F41;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    margin-bottom: 15px;
`;

const Content = styled.div`
  display: grid;
  margin: 0px 0 15px 0;
  gap: 10px;
  width: 100%;`;

const Card = styled.a`
    position: relative;
    width: 100%;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #eceef0;
    overflow: hidden;
    padding:12px;
    display:flex !important;
    flex-direction: column;
    gap:10px;
    text-decoration: none !important;
  `;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  width: 100%;
`;

const CardUser = styled.div`
& span{
    color: rgba(28, 31, 65, 0.45);
    text-align: right;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px;
}
`;

const TwitterBage = styled.div`
    height: 28px;
    width: 28px;
    background-color: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Align the badge to the far right */
    margin-left: auto;
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0;
    flex: 1;
`;

const CardTitle = styled.div`
    height:54px;
    overflow: hidden;
    color: #1C1F41;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.12px;
    a {
        color: inherit;
    }
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    height:20px;
`;

const CardDate = styled.div`
    color: rgba(28, 31, 65, 0.45);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px;
    text-align: left;
    
`;

const Badges = styled.div`
    display: flex;
    gap: 6px;
`;

const Badge = styled.span`
    background: #F5F5F5;
    padding: 6px 20px;
    border-color: hsla(214, 10%, 86%, 1);
    border-radius: 4px;
    color: #9C9C9C;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px;
    display: ${(props) => (props.index > 1 ? "none" : "block")}; 
`;

const ButtonLink = styled.a`
   width: 180px;
  padding: 8px;
  height: 31px;
  background: transparent;
  margin: 4px auto 0 auto;
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
const AuthorNDate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap:4px;
    margin-bottom:10px;
  `;

const Dot = styled.span`
  color: rgba(28, 31, 65, 0.45);
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 8.5px; /* 70.833% */
  letter-spacing: 0.12px;
    `;
const news = [...(data?.body?.data ?? [])]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, limit);
const nwSite = "https://nearweek.com";

function dateToDays(date) {
  const timeAgo = (diffSec) =>
    diffSec < 60000
      ? `${(diffSec / 1000) | 0}s`
      : diffSec < 3600000
      ? `${(diffSec / 60000) | 0}min`
      : diffSec < 86400000
      ? `${(diffSec / 3600000) | 0}hr`
      : `${(diffSec / 86400000) | 0}d`;

  var d = new Date(date);
  return timeAgo(Date.now() - d.getTime());
}

function extractUsernameFromURL(url) {
  let username = "";

  const xcomIndex = url.indexOf("x.com/");
  if (xcomIndex !== -1) {
    const afterXcom = url.substring(xcomIndex + 6); // Extract the part after "x.com/"
    const nextSlashIndex = afterXcom.indexOf("/");
    if (nextSlashIndex !== -1) {
      username = afterXcom.substring(0, nextSlashIndex);
    } else {
      username = afterXcom;
    }
  }

  if (!username) {
    const twitterIndex = url.indexOf("twitter.com/");
    if (twitterIndex !== -1) {
      const afterTwitter = url.substring(twitterIndex + 12); // Extract the part after "twitter.com/"
      const nextSlashIndex = afterTwitter.indexOf("/");
      if (nextSlashIndex !== -1) {
        username = afterTwitter.substring(0, nextSlashIndex);
      } else {
        username = afterTwitter;
      }
    }
  }

  if (!username) {
    const mediumIndex = url.indexOf("medium.com/");
    if (mediumIndex !== -1) {
      const afterMedium = url.substring(mediumIndex + 11);
      const nextSlashIndex = afterMedium.indexOf("/");
      if (nextSlashIndex !== -1) {
        username = afterMedium.substring(0, nextSlashIndex);
      } else {
        username = afterMedium;
      }
    }
  }

  // if near.org usr = NEAR
  if (!username && url.includes("near.org")) {
    username = "NEAR";
  }

  return username;
}

function NewswireCard() {
  return (
    <div>
      {news && news.length > 0 ? (
        <Wrapper>
          <H2>NEWSWIRE</H2>
          <Content>
            {news.map((item, index) => (
              <Card index={index} href={item.url} target="_blank">
                <div class="d-flex flex-grow-1">
                  <CardContent>
                    <CardHeader>
                      <AuthorNDate>
                        {item.url && (
                          <CardUser>
                            <span>@{extractUsernameFromURL(item.url)} </span>
                          </CardUser>
                        )}
                        <Dot>·</Dot>
                        <CardDate>
                          {item.createdAt
                            ? `${dateToDays(item.createdAt)}`
                            : ""}
                        </CardDate>
                      </AuthorNDate>
                      <TwitterBage>
                        <svg
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_37_8004)">
                            <path
                              d="M0.573242 0.0361328L5.97827 7.2081L0.539062 13.0367H1.76322L6.52544 7.93279L10.3743 13.037H14.5391L8.82957 5.46291L13.8925 0.0361328H12.6684L8.28269 4.73594L4.73889 0.0361328H0.573242ZM2.37358 0.930954H4.28737L12.7379 12.1419H10.8246L2.37358 0.930954Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_37_8004">
                              <rect
                                width="14"
                                height="13"
                                fill="white"
                                transform="translate(0.539062 0.0361328)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </TwitterBage>
                    </CardHeader>

                    <CardTitle>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {item.title}
                      </a>
                    </CardTitle>
                    <CardFooter>
                      <Badges>
                        {item.categories.length > 0 &&
                          item.categories.map((category) => (
                            <Badge>{category}</Badge>
                          ))}
                      </Badges>
                    </CardFooter>
                  </CardContent>
                </div>
              </Card>
            ))}
          </Content>
        </Wrapper>
      ) : (
        <div>Loading ...</div>
      )}
      <ButtonLink onClick={() => State.update({ page: state.page + 1 })}>
        Load more
      </ButtonLink>
    </div>
  );
}
return <NewswireCard />;
