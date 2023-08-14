const daoId = props.daoId;
const balance = props.balance;

if (!daoId) {
  return "DAO ID not provided";
}
// -- Pikespeak API
const baseApi = "https://api.pikespeak.ai";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const fetchApiConfig = {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
};

const constructURL = (baseURL, paramObj) => {
  let params = "";
  for (const [key, value] of Object.entries(paramObj ?? {})) {
    params += `${key}=${value}&`;
  }
  params = params.slice(0, -1);
  return `${baseURL}?${params}`;
};

const fether = {
  balances: (accounts) => {
    return fetch(
      constructURL(`${baseApi}/account/balances`, { accounts }),
      fetchApiConfig
    );
  },
  proposalsStatus: (daoId) => {
    return fetch(
      constructURL(`${baseApi}/daos/proposals/status/${daoId}`),
      fetchApiConfig
    );
  },
};
const balances = fether.balances([daoId]);
const proposalsStatus = fether.proposalsStatus(daoId);
let activeProposalsCount;
let totalProposalsCount;

proposalsStatus &&
  proposalsStatus.body?.forEach((p) => {
    activeProposalsCount += p["InProgress"] ? parseInt(p["InProgress"]) : 0;
    totalProposalsCount += p["Total"] ? parseInt(p["Total"]) : 0;
  });
// --

// -- Social DB
const profile = Social.get(`${daoId}/profile/**`, "final");
// --

// -- Smart Contract
const policy = Near.view(daoId, "get_policy");
let members = [];
policy &&
  policy.roles.forEach((role) => {
    if (typeof role.kind.Group === "object") {
      members = members.concat(role.kind.Group);
    }
  });
members = [...new Set(members)];
// --

const shorten = (str, len) => {
  if (str.length <= len) {
    return str;
  }
  return str.slice(0, len) + "...";
};

const shortenNumber = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return (n / 1e3).toFixed(1) + "k";
  if (n >= 1e6 && n < 1e9) return (n / 1e6).toFixed(1) + "m";
  if (n >= 1e9 && n < 1e12) return (n / 1e9).toFixed(1) + "b";
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "t";
};

const daoLink = ({ daoId, tab }) => {
  return `/#/shemar268abel.near/widget/DAO.index?daoId=${daoId}${
    tab && `&tab=${tab}`
  }`;
};

const Wrapper = styled.div`
  border: 1px solid transparent;
  background-color: #0c0c0c;

  &:hover {
    border: 1px solid red;
  }

  .dao-card-stats {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 0.5rem;
    color: #4498e0cc;
    row-gap: 0.2rem;

    & > p:nth-child(1),
    & > p:nth-child(2),
    & > p:nth-child(3) {
      font-size: 0.8rem;
      color: yellow;
      margin: 0;
    }

    & > p:nth-child(4),
    & > p:nth-child(5),
    & > p:nth-child(6) {
      font-size: 0.8rem;
      font-weight: 600;
      margin: 0;
    }

    p > b {
      font-size: 1.15rem;
    }
  }

  a {
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: red;
  }
`;

return (
  <Wrapper className="ndc-card d-flex flex-column gap-2 h-100">
    <div className="d-grid justify-content-between text-center dao-card-stats mb-3 mt-auto">
      <p>DAO Funds</p>
      <p>Members/Groups</p>
      <p>Active proposals</p>
      <p>
        {balances && (
          <>
            <b className="me-1">{shortenNumber(balances.body.totalUsd)}</b>USD
          </>
        )}
      </p>
      <p>
        <b>{members.length}</b>/{policy.roles.length - 1}
      </p>
      <p>
        <b>{activeProposalsCount}</b>/{totalProposalsCount}
      </p>
    </div>
    <div className="d-flex gap-2 justify-content-around gap-3 mb-3">
      <a href={daoLink({ daoId, tab: "projects" })}>
        <i className="bi me-1 bi-image" />
        Projects
      </a>
      <a href={daoLink({ daoId, tab: "bounties" })}>
        <i className="bi me-1 bi-briefcase" />
        Bounties
      </a>
      <a href={daoLink({ daoId, tab: "proposals" })}>
        <i className="bi me-1 bi-question-circle" />
        Proposals
      </a>
    </div>
    <div className="d-flex gap-2 justify-content-between">
      <Widget
        src="nui.sking.near/widget/Social.FollowButton"
        props={{
          variant: "info flex-1 w-100",
          size: "lg",
          accountId: daoId,
        }}
      />
      <Widget
        src="nui.sking.near/widget/Input.Button"
        props={{
          variant: "info outline flex-1 w-100",
          size: "lg",
          buttonProps: {
            style: {
              fontWeight: 500,
            },
          },
          children: <>View Profile</>,
          href: daoLink({ daoId }),
        }}
      />
    </div>
  </Wrapper>
);
