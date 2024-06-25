/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes/common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "infrastructure-committee.near";
const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT =
  "infrastructure-committee.near";
const REPL_RPC_URL = "https://rpc.mainnet.near.org";
const REPL_NEAR = "near";
const RFP_IMAGE =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const RFP_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_rfps_with_latest_snapshot";

const RFP_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_rfp_snapshots";

const PROPOSAL_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_proposals_with_latest_snapshot";

const PROPOSAL_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_proposal_snapshots";
const RFP_TIMELINE_STATUS = {
  ACCEPTING_SUBMISSIONS: "ACCEPTING_SUBMISSIONS",
  EVALUATION: "EVALUATION",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  CANCELLED: "CANCELLED",
};

const PROPOSAL_TIMELINE_STATUS = {
  DRAFT: "DRAFT",
  REVIEW: "REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELLED",
  APPROVED_CONDITIONALLY: "APPROVED_CONDITIONALLY",
  PAYMENT_PROCESSING: "PAYMENT_PROCESSING",
  FUNDED: "FUNDED",
};

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(QUERYAPI_ENDPOINT, {
    method: "POST",
    headers: { "x-hasura-role": `polyprogrammist_near` },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

const CANCEL_RFP_OPTIONS = {
  CANCEL_PROPOSALS: "CANCEL_PROPOSALS",
  UNLINK_PROPOSALS: "UNLINK_PROPOSALSS",
  NONE: "NONE",
};

function parseJSON(json) {
  if (typeof json === "string") {
    try {
      return JSON.parse(json);
    } catch (error) {
      return json;
    }
  } else {
    return json;
  }
}

function isNumber(value) {
  return typeof value === "number";
}

const PROPOSALS_APPROVED_STATUS_ARRAY = [
  PROPOSAL_TIMELINE_STATUS.APPROVED,
  PROPOSAL_TIMELINE_STATUS.APPROVED_CONDITIONALLY,
  PROPOSAL_TIMELINE_STATUS.PAYMENT_PROCESSING,
  PROPOSAL_TIMELINE_STATUS.FUNDED,
];

function getLinkUsingCurrentGateway(url) {
  const data = fetch(`https://httpbin.org/headers`);
  const gatewayURL = data?.body?.headers?.Origin ?? "";
  return `https://${
    gatewayURL.includes("near.org") ? "dev.near.org" : "near.social"
  }/${url}`;
}
/* END_INCLUDE: "includes/common.jsx" */

const title = props.title;
const links = props.links;
const href = props.href;

const [showMenu, setShowMenu] = useState(false);

const { href: linkHref } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);

linkHref || (linkHref = () => {});

const Dropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    &.active {
      color: #fff;

      &:hover {
        text-decoration: none;
        color: #096d50 !important;
      }
    }
  }
`;

const DropdownMenu = styled.div`
  z-index: 50;
  position: absolute;
  top: 2.25rem;

  &.active {
    padding: 0.5rem 1rem;
    padding-top: 1rem;
    border-radius: 1rem;
    background: rgba(217, 217, 217, 0.7);
    backdrop-filter: blur(5px);
    width: max-content;
    animation: slide-down 300ms ease;
    transform-origin: top center;
  }

  @keyframes slide-down {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const DropdownLink = styled.div`
  color: inherit;
  text-decoration: none;

  &.active {
    color: #555555;
  }

  &:hover {
    text-decoration: none;
    color: #096d50 !important;
  }
`;

return (
  <Dropdown
    onMouseEnter={() => setShowMenu(true)}
    onMouseLeave={() => setShowMenu(false)}
  >
    {href ? (
      <DropdownLink className={href === props.page && "active"} href={href}>
        <Link
          style={{ textDecoration: "none" }}
          to={linkHref({
            widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
            params: { page: href },
          })}
        >
          {title}
        </Link>
      </DropdownLink>
    ) : (
      <p className={`m-0 py-2 nav-dropdown`} style={{ cursor: "default" }}>
        {title} ↓
      </p>
    )}
    {showMenu && links.length !== 0 && (
      <DropdownMenu className={`${showMenu && "active"}`}>
        <div className="d-flex flex-column gap-3">
          {links.map((link) => (
            // Check if the link is external
            <DropdownLink
              className={link.href === props.page && "active"}
              key={`${link.title}-${link.href}`}
            >
              {link.href.startsWith("http://") ||
              link.href.startsWith("https://") ? (
                // External link: Render an <a> tag
                <a
                  href={link.href}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              ) : (
                // Internal link: Render the <Link> component
                <Link
                  style={{ textDecoration: "none" }}
                  to={linkHref({
                    widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
                    params: { page: link.href },
                  })}
                >
                  {link.title}
                </Link>
              )}
            </DropdownLink>
          ))}
        </div>
      </DropdownMenu>
    )}
  </Dropdown>
);
