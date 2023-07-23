State.init({ active: 2 });
let posts = [];
let mediumPosts = [];
let rssPosts = [];
const secondTabName = props.secondTabName ?? "COINDESK";
const widgetName = props.widgetName ?? "NEWS";
const rssLink =
  props.rssLink ?? "https://www.coindesk.com/arc/outboundfeeds/rss/"; // coindesk

const rssToJson = "https://api.rss2json.com/v1/api.json?rss_url=";

const rssFetch = rssToJson + rssLink;

const fetchRss = fetch(rssFetch, { method: "GET" });
// change this
if (fetchRss && fetchRss?.body?.items?.length > 0) {
  fetchRss.body.items.forEach((item) => {
    rssPosts.push({
      title: item.title,
      url: item.link,
      thumbnail: item["media:content"].content.url,
      createdAt: item.pubDate,
      categories: item.categories,
    });
  });
} // CHANGE THUMBNAILS AND IF CATEGORIES

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
  return timeAgo(Date.now() - d.getTime()) + " ago";
}

const rssFeed = [...rssPosts]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 24);

const handleTabClick = (e) => {
  const index = parseInt(e.target.id, 0);
  if (index !== state.active) {
    State.update({ active: index });
  }
};

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

const RSSWidget = styled.div`
  border-radius: 16px;
  background: hsla(0, 0%, 100%, 1);
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items:center;
  justify-content: space-between;
`;

const H2 = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 8px;
  letter-spacing: -0.02em;
  margin-bottom: 36px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 25px;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid hsla(210, 12%, 93%, 1);
`;

const TabNavs = styled.div`
  display: flex;  
`;

const Tab = styled.button`
  font-weight: ${(props) => (props.active ? 600 : 400)}; 
  font-style: normal;
  font-size: 19px;
  line-height: 22px;
  letter-spacing: -0.03em;
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  padding: 12px 22px;
  color: ${(props) =>
    props.active ? "hsla(204, 22%, 9%, 1)" : "hsla(204, 22%, 9%, 0.5)"}; 
  border-bottom: ${(props) =>
    props.active ? "2px solid hsla(126, 53%, 77%, 1)" : "none"}; 
  &:hover {
    color: hsla(204, 22%, 9%, 1);    
  }
`;
const TabContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(286px, 1fr));
  gap: 24px;
  width: 100%;
  ${(props) => (props.active ? "" : "display:none")}
  `;

const TabContentFooter = styled.div`
    display: flex;
    grid-column: 1/-1;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #D8DBDF;
    border-radius: 8px;
`;

const CardContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 0;
`;

const CardTitle = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #000000;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    a {
        color: inherit;
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 8px 8px 0 0;
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const CardDate = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: hsla(198, 4%, 45%, 1);
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 8px;
    white-space: nowrap;
    letter-spacing: 0.01em;
`;

const ClockIconSVG = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.66406 2.22685V5.56018H8.16406M10.6641 5.56018C10.6641 6.21679 10.5347 6.86697 10.2835 7.4736C10.0322 8.08023 9.66389 8.63142 9.1996 9.09571C8.7353 9.56001 8.18411 9.92831 7.57748 10.1796C6.97085 10.4309 6.32067 10.5602 5.66406 10.5602C5.00745 10.5602 4.35727 10.4309 3.75065 10.1796C3.14402 9.92831 2.59282 9.56001 2.12853 9.09571C1.66424 8.63142 1.29594 8.08023 1.04466 7.4736C0.793391 6.86697 0.664062 6.21679 0.664063 5.56018C0.664063 4.2341 1.19085 2.96233 2.12853 2.02465C3.06621 1.08696 4.33798 0.560181 5.66406 0.560181C6.99015 0.560181 8.26191 1.08696 9.1996 2.02465C10.1373 2.96233 10.6641 4.2341 10.6641 5.56018Z"
        stroke="#6F7679"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Badges = styled.div`
    display: flex;
    gap: 6px;
`;

const Badge = styled.span`
    border: 1px solid;    
    border-color: hsla(214, 10%, 86%, 1);
    border-radius: 4px;
    font-weight: 500;
    font-size: 12px;
    line-height: 8px;
    padding: 4px 8px;
    white-space: nowrap;
    letter-spacing: 0.01em;    
    color: hsla(204, 5%, 44%, 1);
    display:   ${(props) => (props.index > 1 ? "none" : "block")}; 
`;

const Promo = styled.div`
    border: 1px solid hsla(226, 82%, 52%, 1);
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 8px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.02em;
    color: hsla(226, 82%, 52%, 1);
    a {
        white-space: nowrap;
        padding: 4px 12px;
    }
    a:hover {
    text-decoration: none;
}
`;

const ButtonLink = styled.a`
  width: 100%;
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

const Post = (props) => {
  const { key, post } = props;
  return (
    <Card key={key} index={props.index}>
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
              post.categories.map((category, index) => (
                <Badge index={index}>{category}</Badge>
              ))}
          </Badges>
          <CardDate>
            <ClockIconSVG />
            {post.createdAt ? dateToDays(post.createdAt) : ""}
          </CardDate>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

const PostCoin = (props) => {
  const { key, post } = props;
  return (
    <Card key={key} index={props.index}>
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
              post.categories.map((category, index) => (
                <Badge index={index}>{category}</Badge>
              ))}
          </Badges>
          <CardDate>
            <ClockIconSVG />
            {post.createdAt ? dateToDays(post.createdAt) : ""}
          </CardDate>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
return (
  <Theme>
    <RSSWidget>
      <Header>
        <H2>{widgetName}</H2>
      </Header>
      <Tabs>
        <TabNavs></TabNavs>
        <TabNavs>
          <Tab
            mobile={false}
            onClick={handleTabClick}
            active={state.active === 2}
            id={2}
          >
            {secondTabName}
          </Tab>
        </TabNavs>
      </Tabs>
      <>
        <TabContent active={state.active === 2}>
          <>
            {rssFeed.length > 0 ? (
              rssFeed.map((blog, index) => <Post post={blog} index={index} />)
            ) : (
              <div>Loading Rss Feed...</div>
            )}
            <TabContentFooter>
              <ButtonLink href={rssLink} target="_blank">
                See Feed
              </ButtonLink>
            </TabContentFooter>
          </>
        </TabContent>
      </>
    </RSSWidget>
  </Theme>
);
