const breakpoints = {
  md: "768px",
  lg: "1100px",
  xl: "1300px",
};

const defImgSrc = `https://ipfs.near.social/ipfs/bafkreih5d2mix23e4hqsblgob74chyp3yyoze2ygtdm4cbo7dblt565rwa`;

function Articles() {
  State.init({ page: 1 });
  let mediumPosts = [];
  let yotubeVideo = [];

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
      let resizedImgURL;
      const imgURL = item["description"]
        .toString()
        .match(/<img[^>]+src="([^">]+)"/)[1];
      if (imgURL) {
        const filename = imgURL.split("/").pop();
        resizedImgURL = `https://cdn-images-1.medium.com/v2/resize:fit:360/${filename}`;
      }
      mediumPosts.push({
        title: item.title,
        url: item.link,
        thumbnail: resizedImgURL ?? defImgSrc,
        createdAt: item.pubDate,
        categories: item.categories,
        author: item.author,
      });
    });
  }

  const fetchyoutubeVideo = fetch(
    "https://nearweek.com/api/youtube/playlists?playlistId=PL9tzQn_TEuFWMuPiQOXhaE5lpOTnxLPZY",
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

  if (fetchyoutubeVideo && fetchyoutubeVideo?.body?.data?.items?.length > 0) {
    fetchyoutubeVideo.body.data.items.forEach((item) => {
      yotubeVideo.push({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}&list=${item.snippet.playlistId}`,
        thumbnail: item.snippet?.thumbnails?.standard?.url ?? defImgSrc,
        createdAt: item.snippet.publishedAt,
        categories: [item.snippet.channelTitle],
        author: item.snippet.videoOwnerChannelTitle,
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
  margin-bottom: 10px;

  @media screen and (min-width: ${breakpoints.xl}) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

`;

  const TabContentFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
  const ButtonLink = styled.a`
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
  const Card = styled.a`
    color: #1C1F41;
    text-decoration: none !important;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding:12px;
    margin-bottom:10px;
    border: 1px solid #eceef0;
    @media screen and (max-width: 1300px) {
      max-width:100%;
    }
`;

  const CardImage = styled.img`
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
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
            articles
              .slice(0, 6)
              .map((article, index) => <Post post={article} index={index} />)
          ) : (
            <div>Loading ...</div>
          )}
        </>
      </NwWidget>
      <div className="mt-5 mb-5">
        <TabContentFooter>
          <ButtonLink href="//nearweek.medium.com" target="_blank">
            Load more
          </ButtonLink>
        </TabContentFooter>
      </div>
      <H2 className="mt-1">VIDEO</H2>
      <NwWidget>
        <>
          {yotubeVideo.length > 0 ? (
            yotubeVideo.map((video, index) => (
              <Post post={video} index={index} />
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
