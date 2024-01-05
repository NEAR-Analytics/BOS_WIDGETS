const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};

const imgSrc = `https://ipfs.near.social/ipfs/bafkreih5d2mix23e4hqsblgob74chyp3yyoze2ygtdm4cbo7dblt565rwa`;

function Articles() {
  State.init({ page: 1 });
  let mediumPosts = [];

  const Post = (props) => {
    const { key, post } = props;
    return (
      <Card key={key} index={props.index} href={post.url} target="_blank">
        <CardImage src={imgSrc} alt="" />
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

  console.log(fetchMedium);

  if (fetchMedium && fetchMedium?.body?.items?.length > 0) {
    fetchMedium.body.items.forEach((item) => {
      mediumPosts.push({
        title: item.title,
        url: item.link,
        thumbnail: item.thumbnail || fetchMedium?.body?.feed.image,
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

  const AuthorNDate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap:4px;
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

  const Author = styled.div`
  & span {
  color: rgba(28, 31, 65, 0.45);
  text-align: right;
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
    #aspect-ratio: 16 / 9;
    border-radius: 8px;
    margin-top: 16px;
    margin-bottom: 16px;
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
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px;
`;

  const H2 = styled.h2`
    color: #1C1F41;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    margin-bottom: 15px;
  `;

  return (
    <div>
      <H2>ARTICLES</H2>
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
    </div>
  );
}

return <Articles />;
