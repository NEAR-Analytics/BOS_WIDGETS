const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const externalLink = `https://near.social/mob.near/widget/${
  postType === "post" ? "MainPage.Post.Page" : "MainPage.Comment.Page"
}?accountId=${accountId}&blockHeight=${blockHeight}`;

const clickbaitPrompt =
  props.clickbaitPrompt ??
  `Check out this ${postType} on @NearSocial_\n#NearSocial #NEAR #BOS\n${externalLink}`;

const twitterUrl = new URL("https://twitter.com/intent/tweet");
twitterUrl.searchParams.set("text", clickbaitPrompt);

const mailtoUrl = new URL("mailto:");
mailtoUrl.searchParams.set(
  "subject",
  `Check out this ${postType} on Near Social`
);
mailtoUrl.searchParams.set(
  "body",
  `Take a look this ${postType}.
${externalLink}
`
);

const shareSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
    stroke="currentColor"
    strokeWidth="0.363"
  >
    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
  </svg>
);

const Button = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background: inherit;
  color: inherit;
  &:hover {
    opacity: 1 !important;
    color: DeepSkyBlue;
    background: rgba(0, 191, 255, 0.1);
  }
`;

return (
  blockHeight !== "now" && (
    <span>
      <Button data-bs-toggle="dropdown" aria-expanded="false" title="Share">
        <span>{shareSvg}</span>
        <span className="count" />
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
    </span>
  )
);
