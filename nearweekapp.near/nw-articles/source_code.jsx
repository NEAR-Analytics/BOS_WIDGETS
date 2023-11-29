const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};

function Articles() {
  const accountId = "near";
  State.init({ page: 1 });
  let posts = [];
  let mediumPosts = [];

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

  const Post = (props) => {
    const { key, post } = props;
    return (
      <Card key={key} index={props.index} href={post.url} target="_blank">
        <CardImage src={post.thumbnail} alt="" />
        <CardContent>
          <CardTitle>
            <a href={post.url} target="_blank">
              {post.title}
            </a>
          </CardTitle>
          <CardFooter>
            <Badges>
              {post.categories &&
                post.categories.length > 0 &&
                post.categories
                  .slice(0, window.innerWidth < 255 ? 1 : 2)
                  .map((category, index) => (
                    <Badge index={index}>{category}</Badge>
                  ))}
            </Badges>
            <AuthorNDate>
              {post.author && ( // Check if author is available
                <Author>
                  <span>@{post.author}</span>
                </Author>
              )}
              <Dot>·</Dot>
              <CardDate>
                {post.createdAt ? dateToDays(post.createdAt) : ""}
              </CardDate>
            </AuthorNDate>
          </CardFooter>
        </CardContent>
      </Card>
    );
  };

  const fetchMedium = fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/nearprotocol",
    { method: "GET" }
  );

  if (fetchMedium && fetchMedium?.body?.items?.length > 0) {
    fetchMedium.body.items.forEach((item) => {
      mediumPosts.push({
        title: item.title,
        url: item.link,
        thumbnail: item.thumbnail,
        createdAt: item.pubDate,
        categories: item.categories,
        author: item.author,
      });
    });
  }

  function dateToDays(date) {
    const timeAgo = (diffSec) =>
      diffSec < 60000
        ? `${(diffSec / 1000) | 0}s`
        : diffSec < 3600000
        ? `${(diffSec / 60000) | 0}m`
        : diffSec < 86400000
        ? `${(diffSec / 3600000) | 0}h`
        : `${(diffSec / 86400000) | 0}d`;

    var d = new Date(date);
    return timeAgo(Date.now() - d.getTime());
  }

  const articles = [...mediumPosts];

  const cssFont = fetch(
    "https://fonts.googleapis.com/css2?family=Space+Grotesk"
  ).body;

  if (!cssFont) return "";

  if (!state.theme) {
    State.update({
      theme: styled.div`
    font-family: sans-serif;
    ${cssFont}
`,
    });
  }
  const Theme = state.theme;
  const AuthorNDate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap:4px;
  `;
  const Dot = styled.span`
  color: rgba(28, 31, 65, 0.45);
  text-align: right;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 8.5px; /* 70.833% */
  letter-spacing: 0.12px;
    `;

  const Author = styled.div`
  & span {
  color: rgba(28, 31, 65, 0.45);
  text-align: right;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 8.5px;
  letter-spacing: 0.12px;
  }
  `;

  const NwWidget = styled.div`
  border-radius: 16px;
  background: hsla(0, 0%, 100%, 1);
  margin-bottom: 20px;

  @media screen and (min-width: 1300px) {
    display: flex;
    gap:10px;
    flex-wrap: wrap;
  }

`;

  const Card = styled.a`
    color: #1C1F41;
    text-decoration: none !important;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding:12px;
    margin-bottom:10px;
    border: 1px solid #eceef0;
    max-width:265px;
    @media screen and (max-width: 1300px) {
        max-width:100%;
    }
`;

  const CardImage = styled.img`
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    object-fit: cover;
`;

  const CardContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0;
`;

  const CardTitle = styled.div`
    margin-top: 5px;
    margin-bottom: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    text-transform: capitalise;
    a {
        color: inherit;
    }
`;

  const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:0px;
`;

  const Badges = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
`;

  const Badge = styled.span`
    background: #F5F5F5;
    padding: 6px 20px;  
    border-color: hsla(214, 10%, 86%, 1);
    border-radius: 4px;
    color: #9C9C9C;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px;
    display:   ${(props) => (props.index > 1 ? "none" : "block")}; 
`;

  const CardDate = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(28, 31, 65, 0.45);
    text-align: right;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px;
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

  return (
    <div>
      <H2>Articles</H2>
      <Theme>
        <NwWidget>
          <>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <Post post={article} index={index} />
              ))
            ) : (
              <div>Loading ...</div>
            )}
          </>
        </NwWidget>
      </Theme>
    </div>
  );
}

return <Articles />;
