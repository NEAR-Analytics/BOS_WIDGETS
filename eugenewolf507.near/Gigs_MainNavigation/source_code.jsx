const currentPill = props.currentNavPill ?? "";
const writersWhiteList = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "james.near",
  "ndcplug.near",
  "eugenewolf507.near",
];
const authorForWidget = "neardigitalcollective.near";
const pills = [
  // {
  //   id: "articles",
  //   title: "Gigs",
  //   widgetName: "Gigs",
  // },
  // {
  //   id: "authors",
  //   title: "Authors",
  //   widgetName: "Gigs_Authors",
  // },
];

const accountId = props.accountId ?? context.accountId;

return (
  <div
    className="navbar navbar-expand-md border-bottom mb-3 mb-xl-4 pb-3 pb-xl-4"
    style={{ backgroundColor: "white" }}
  >
    <div className="container-fluid">
      <a
        className="navbar-brand text-decoration-none"
        href={`#/${authorForWidget}/widget/Gigs`}
      >
        {"<NDC Gigs 🖳>"}
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
                  href={`#/${authorForWidget}/widget/Gigs_CreateArticle`}
                >
                  + Create Gig
                </a>
              </div>
            )}
        </ul>
      </div>
      {accountId &&
        writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
          <>
            <Widget
              src="nui.sking.near/widget/Input.Button"
              props={{
                children: "+ Create Gig",
                variant: "primary",
                className: "me-3 me-xl-4",
                size: "sm",
                href: `#/${authorForWidget}/widget/Gigs_CreateArticle`,
              }}
            />
          </>
        )}
      <div className="d-none d-md-block">
        <Widget
          src="nui.sking.near/widget/Element.User"
          props={{
            accountId: accountId,
            options: {
              size: "md",
              showSocialName: true,
              showImage: true,
              showHumanBadge: true,
            },
          }}
        />
      </div>
    </div>
  </div>
);
