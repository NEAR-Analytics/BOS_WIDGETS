const currentPill = props.currentNavPill ?? "";

const isDebug = props.isDebug;

const writersWhiteList = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "zarmade.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "fiftycent.near",
  "ozymandius.near",
];

const sayALotWorkers = [
  "silkking.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  "blaze.near",
  "ayelen.near",
  "kenrou-it.near",
];

if (isDebug) {
  writersWhiteList = sayALotWorkers;
}

const authorForWidget = "sayalot.near";
// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const pills = [
  {
    id: "articles",
    title: "Articles",
    widgetName: "SayALot",
  },
  {
    id: "authors",
    title: "Authors",
    widgetName: "SayALot_Authors",
  },
];

const Button = styled.button`
  margin: 0px 1rem;
  padding: 0;
  border: 0;
  background-color: white;
  
  a {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;

    border: 2px solid transparent;
    font-weight: 500;
    padding: 0.3rem 0.5rem;
    background-color: #010A2D;
    border-radius: 12px;
    color: white;
    text-decoration: none;   
  }

  a:hover {
    color: #010A2D;
    background-color: white;
  }
`;

const accountId = props.accountId ?? context.accountId;

return (
  <div
    className="navbar navbar-expand-md border-bottom mb-3"
    style={{ backgroundColor: "white" }}
  >
    <div className="container-fluid">
      <a
        className="navbar-brand text-decoration-none"
        href={
          isDebug
            ? `#/${authorForWidget}/widget/SayALot?isDebug=true`
            : `#/${authorForWidget}/widget/SayALot`
        }
      >
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: metadata.image,
            className: "w-25 h-25",
            style: {
              objectFit: "cover",
            },
            thumbnail: false,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreiaqxa4st4vp4rtq2iyobdgqe5tpfg55mmyvfg25upd2qplcxylyfi",
            alt: widgetName,
          }}
        />
        <i>lots to say...</i>
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
                href={
                  isDebug
                    ? `#/${authorForWidget}/widget/${widgetName}?isDebug=true`
                    : `#/${authorForWidget}/widget/${widgetName}`
                }
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
                  href={
                    isDebug
                      ? `#/${authorForWidget}/widget/SayALot_CreateArticle?isDebug=true`
                      : `#/${authorForWidget}/widget/SayALot_CreateArticle`
                  }
                >
                  + Create Article
                </a>
              </div>
            )}
        </ul>
      </div>
      {accountId &&
        writersWhiteList.some((whiteAddr) => whiteAddr === accountId) && (
          <Button>
            <a
              href={
                isDebug
                  ? `#/${authorForWidget}/widget/SayALot_CreateArticle?isDebug=true`
                  : `#/${authorForWidget}/widget/SayALot_CreateArticle`
              }
            >
              + Create Article
            </a>
          </Button>
        )}
      <div className="d-none d-md-block">
        <div>
          <i>neardocs v0.02</i>
        </div>
      </div>
    </div>
  </div>
);
