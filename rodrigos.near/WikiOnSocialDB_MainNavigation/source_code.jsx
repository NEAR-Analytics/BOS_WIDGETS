const currentPill = props.currentNavPill ?? "";
const writersWhiteList = props.writersWhiteList ?? [
  "testwiki.near",
  "eugenewolf507.near",
];
const authorForWidget = "rodrigos.near";
const pills = [
  {
    id: "articles",
    title: "Articles",
    widgetName: "WikiOnSocialDB",
  },
  {
    id: "authors",
    title: "Authors",
    widgetName: "WikiOnSocialDB_Authors",
  },
];

const accountId = props.accountId ?? context.accountId;

return (
  <div className="navbar navbar-expand-md border-bottom mb-3">
    <div className="container-fluid">
      <a
        className="navbar-brand text-decoration-none"
        href={`#/${authorForWidget}/widget/WikiOnSocialDB`}
      >
        {"<WikiOnSocialDB>"}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {pills.map(({ id, title, widgetName }, i) => (
            <li className="nav-item">
              <a
                href={`#/${authorForWidget}/widget/${widgetName}`}
                className={`nav-link ${
                  id === currentPill
                    ? "active text-decoration-underline"
                    : "text-decoration-none"
                } `}
              >
                {title}
              </a>
            </li>
          ))}
          {accountId &&
            writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
              <div className="d-block d-md-none">
                <a
                  className="btn btn-outline-dark"
                  href={`#/${authorForWidget}/widget/WikiOnSocialDB_CreateArticle`}
                >
                  + Create Article
                </a>
              </div>
            )}
        </ul>
      </div>
      {accountId &&
        writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
          <div className="mx-2 d-none d-md-block">
            <a
              className="btn btn-outline-dark"
              href={`#/${authorForWidget}/widget/WikiOnSocialDB_CreateArticle`}
            >
              + Create Article
            </a>
          </div>
        )}
      <div className="d-none d-md-block">
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId, tooltip: true }}
        />
      </div>
    </div>
  </div>
);
