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
const page = props.page;

const [showMenu, setShowMenu] = useState(false);

const { href: linkHref } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);

linkHref || (linkHref = () => {});

const Logo = () => {
  const Wrapper = styled.div`
    .text-lg {
      font-size: 22px;
    }

    a:hover {
      text-decoration: none;
    }
  `;

  return (
    <Wrapper>
      <Link
        to={linkHref({
          widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/app`,
          params: { page: "about" },
        })}
      >
        <div className="d-flex gap-2 align-items-center">
          <img
            height={35}
            width={35}
            src="https://ipfs.near.social/ipfs/bafkreicgbhtzxgdb3noivjfx4xcwsx6nq5pnjttdc4fpgfq74ynqj5h6mq"
          />

          <b className="text-lg">infrastructure committee</b>
        </div>
      </Link>
    </Wrapper>
  );
};

const ProfileIcon = () => {
  const Wrapper = styled.svg`
    padding: 0.25rem;
    @media screen and (max-width: 768px) {
      display: none;
    }
  `;
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.ProfileCard`}
      props={{ iconOnly: true, accountId: context.accountId || null }}
    />
  );
};

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ height: 20, width: 20 }}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 12.2986H14V13.3732H2V12.2986ZM2 9.07471H14V10.1493H2V9.07471ZM2 5.85083H14V6.92546H2V5.85083ZM2 2.62695H14V3.70158H2V2.62695Z"
      fill="#818181"
    />
  </svg>
);

const Navbar = styled.div`
  padding: 1.5rem 0rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #f4f4f4;

  @media screen and (max-width: 768px) {
    padding: 1.875rem 1.375rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.button`
  all: unset;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

let links = [
  {
    title: "Proposals",
    href: "proposals",
    links: [],
  },
  {
    title: "RFPs",
    href: "rfps",
    links: [],
  },
  {
    title: "About",
    href: "about",
    links: [],
  },
];

const isModerator = Near.view(
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  "is_allowed_to_write_rfps",
  {
    editor: context.accountId,
  }
);

if (isModerator) {
  links = [
    {
      title: "Admin",
      href: "admin",
      links: [],
    },
    ...links,
  ];
}

const MobileNav = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  position: absolute;
  top: 0;
  right: 0;

  width: 207px;

  padding: 24px 36px 36px 16px;
  flex-direction: column;
  align-items: flex-end;
  gap: 2.5rem;
  flex-shrink: 0;

  border-radius: 0px 0px 0px 16px;
  background: rgba(41, 41, 41, 0.6);
  backdrop-filter: blur(5px);

  z-index: 50;
`;

const MobileLink = styled.a`
  color: #f4f4f4 !important;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  margin-bottom: 1rem;

  &.active {
    color: #00ec97 !important;
  }

  &:hover {
    text-decoration: none;
    color: #00ec97 !important;
  }
`;

return (
  <Navbar className="position-relative">
    <Logo />
    <div className="d-flex gap-3 align-items-center">
      <LinksContainer>
        {links.map((link) => (
          <Widget
            src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.molecule.NavbarDropdown`}
            props={{
              title: link.title,
              href: link.href,
              links: link.links,
              page: page,
            }}
          />
        ))}
      </LinksContainer>
      {context.accountId && <ProfileIcon />}
      <MobileMenu onClick={() => setShowMenu(!showMenu)}>
        <MenuIcon />
      </MobileMenu>
    </div>
    {showMenu && (
      <MobileNav>
        <div
          onClick={() => setShowMenu(!showMenu)}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-x" style={{ fontSize: 20, color: "#F4F4F4" }}></i>
        </div>
        <div className="d-flex flex-column gap-2">
          {links.map((link, idx) =>
            link.href ? (
              <MobileLink
                key={`mobile-link-${idx}`}
                className={link.href === props.page && "active"}
                href={`/${REPL_INFRASTRUCTURE_COMMITTEE}/widget/app?page=${link.href}`}
              >
                {link.title}
              </MobileLink>
            ) : (
              link.links.map((it, idx) =>
                it.href.startsWith("http://") ||
                it.href.startsWith("https://") ? (
                  <MobileLink
                    key={`nested-link-${idx}`}
                    className={link.href === props.page && "active"}
                    href={it.href}
                    target="no_blank"
                  >
                    /{it.title}
                  </MobileLink>
                ) : (
                  <MobileLink
                    key={`nested-link-${idx}`}
                    className={link.href === props.page && "active"}
                    href={`/${REPL_INFRASTRUCTURE_COMMITTEE}/widget/app?page=${it.href}`}
                  >
                    /{it.title}
                  </MobileLink>
                )
              )
            )
          )}
        </div>
      </MobileNav>
    )}
  </Navbar>
);
