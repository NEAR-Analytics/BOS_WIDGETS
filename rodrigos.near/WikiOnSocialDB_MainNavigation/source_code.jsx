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
  <div class="navbar navbar-expand-lg border-bottom mb-3">
    <div class="container-fluid">
      <a
        class="navbar-brand text-decoration-none"
        href={`#/${authorForWidget}/widget/WikiOnSocialDB`}
      >
        {"<WikiOnSocialDB>"}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          {pills.map(({ id, title, widgetName }, i) => (
            <li className="nav-item">
              <a
                href={`#/${authorForWidget}/widget/${widgetName}`}
                class={`nav-link ${
                  id === currentPill
                    ? "active text-decoration-underline"
                    : "text-decoration-none"
                } `}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {accountId &&
        writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
          <a
            class="btn btn-outline-dark"
            href={`#/${authorForWidget}/widget/WikiOnSocialDB_CreateArticle`}
          >
            + Create Article
          </a>
        )}
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId, tooltip: true }}
      />
    </div>
  </div>
);
