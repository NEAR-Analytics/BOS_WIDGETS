const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { ButtonLink } = VM.require(
  "forfront_tak.near/widget/home-feed-ButtonLink"
);

ButtonLink || (ButtonLink = () => <></>);
Feed = Feed || (() => <></>);

const { type, hashtag } = props;
type = hashtag;
hashtag = type;

const tab = "idea";

const { Post } = VM.require("buildhub.near/widget/components");
Post = Post || (() => <></>);

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const feeds = {
  idea: {
    label: "Idea",
    icon: "bi-lightbulb",
    name: "data",
    hashtag: "data",
    template: ``,
  },
};

const [activeFeed, setActiveFeed] = useState(tab);
const [template, setTemplate] = useState("What did you have in mind?");

return (
  <>
    {context.accountId ? (
      activeFeed !== "bookmarks" ? (
        <Widget
          src="buildhub.near/widget/Compose"
          props={{
            feed: feeds[activeFeed],
            template: feeds[activeFeed].template,
          }}
        />
      ) : (
        <Widget src="buildhub.near/widget/Bookmarks" />
      )
    ) : (
      <Widget src="buildhub.near/widget/components.login-now" props={props} />
    )}
    {activeFeed !== "bookmarks" && (
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
    )}
  </>
);
