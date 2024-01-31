const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { ButtonLink } = VM.require("buildhub.near/widget/components.ButtonLink");

ButtonLink || (ButtonLink = () => <></>);
Feed = Feed || (() => <></>); // ensure it's defined or set to a default component

const { type, hashtag } = props;
type = hashtag;
hashtag = type;

const tab = props.tab || "resolutions";

if (!tab) {
  return "";
}

const { Post } = VM.require("buildhub.near/widget/components");
Post = Post || (() => <></>);

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const feeds = {
  resolutions: {
    label: "12th Graders",
    icon: "bi-calendar3",
    name: "12th Graders",
    hashtag: "12thGraders",
    template: `As a 12th grader, what are the problems you face?
`,
  },
};

const [activeFeed, setActiveFeed] = useState(tab || "resolutions");
const [template, setTemplate] = useState("What did you have in mind?");

return (
  <Widget
    src="buildhub.near/widget/components.AsideWithMainContent"
    props={{
      sideContent: Object.keys(feeds || {}).map((route) => {
        const data = feeds[route];
        return (
          <ButtonLink
            id={route}
            variant={activeFeed === route ? "primary" : "outline"}
            href={`/feed?tab=${route}`}
            className={
              "align-self-stretch flex-shrink-0 justify-content-start fw-medium"
            }
            style={{
              fontSize: "14px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <i className={`bi ${data.icon} `}></i>
            {data.label}
          </ButtonLink>
        );
      }),
      mainContent: (
        <>
          {context.accountId ? (
            <Widget
              src="buildhub.near/widget/Compose"
              props={{
                feed: feeds[activeFeed],
                template: feeds[activeFeed].template,
              }}
            />
          ) : (
            <Widget src="buildhub.near/widget/Bookmarks" />
          )}{" "}
          : (
          <Widget src="buildhub.near/widget/Bookmarks" props={props} />)
          {
            <Feed
              index={[
                {
                  action: "hashtag",
                  key: feeds[activeFeed].hashtag,
                  options: {
                    limit: 10,
                    order: "desc",
                  },
                  cacheOptions: {
                    ignoreCache: true,
                  },
                },
              ]}
              Item={(p) => (
                <Post
                  accountId={p.accountId}
                  blockHeight={p.blockHeight}
                  noBorder={true}
                />
              )}
            />
          }
        </>
      ),
    }}
  />
);
