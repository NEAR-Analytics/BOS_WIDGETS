const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const externalLink = `https://sharddog.social/sharddog.near/widget/MainPage.${
  postType === "post" ? "Post" : "Comment"
}.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const clickbaitPrompt =
  props.clickbaitPrompt ??
  `Check out this ${postType} on ShardDog Social\nBuilt on #NearSocial #NEAR \n${externalLink}`;

const twitterUrl = new URL("https://twitter.com/intent/tweet");
twitterUrl.searchParams.set("text", clickbaitPrompt);

const mailtoUrl = new URL("mailto:");
mailtoUrl.searchParams.set(
  "subject",
  `Check out this ${postType} on ShardDog Social`
);
mailtoUrl.searchParams.set(
  "body",
  `Take a look this ${postType}.
${externalLink}
`
);

const Button = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  &:hover {
    color: DeepSkyBlue;
    background: rgba(0, 191, 255, 0.1);
  }
`;

return (
  blockHeight !== "now" && (
    <span>
      <div className="d-inline-flex align-items-center">
        <Button
          className="btn me-1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="Share"
        >
          <i className="bi fs-4 bi-share" />
        </Button>
        <ul className="dropdown-menu">
          <li>
            <Widget
              src="mob.near/widget/CopyButton"
              props={{
                text: externalLink,
                className: "btn btn-outline-dark dropdown-item",
                label: `Copy link to ${postType}`,
              }}
            />
          </li>
          <li className="dropdown-item">
            <a
              className="link-dark text-decoration-none"
              href={mailtoUrl.toString()}
              target="_blank"
            >
              <i className="bi bi-envelope-at" /> Share by email
            </a>
          </li>
          <li className="dropdown-item">
            <a
              className="link-dark text-decoration-none"
              href={twitterUrl.toString()}
              target="_blank"
            >
              <i className="bi bi-twitter" />
              Share on Twitter
            </a>
          </li>
        </ul>
      </div>
    </span>
  )
);
