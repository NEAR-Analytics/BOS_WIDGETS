const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { ButtonLink } = VM.require("buildhub.near/widget/components.ButtonLink");

ButtonLink || (ButtonLink = () => <></>);
Feed = Feed || (() => <></>); // ensure it's defined or set to a default component

const { type, hashtag } = props;
type = hashtag;
hashtag = type;

const tab = props.tab || "graders";

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
  graders: {
    label: "12th-graders",
    icon: "bi-calendar3",
    name: "12th-graders",
    hashtag: "graders",
    template: `
`,
  },
  bookmarks: {
    label: "Bookmarks",
    icon: "bi-bookmark",
    name: "bookmark",
  },
};

const [activeFeed, setActiveFeed] = useState(tab || "graders");
const [template, setTemplate] = useState("What did you have in mind?");

return (
  <Widget
    src="buildhub.near/widget/components.AsideWithMainContent"
    props={{
      mainContent: (
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
            <Widget
              src="buildhub.near/widget/components.login-now"
              props={props}
            />
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
      ),
    }}
  />
);
