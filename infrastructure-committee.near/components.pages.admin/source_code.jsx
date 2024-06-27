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

const accessControlInfo =
  Near.view(
    REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
    "get_access_control_info"
  ) ?? null;

if (!accessControlInfo.members_list) {
  return (
    <Widget src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Spinner`} />
  );
}

const rootMembers =
  Near.view(REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT, "get_root_members") ?? null;
const teamNames = Object.keys(rootMembers || {});

const isModerator = Near.view(
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  "is_allowed_to_write_rfps",
  {
    editor: context.accountId,
  }
);

const noPermissionBanner = (
  <div className="d-flex flex-column justify-content-center align-items-center">
    <h2 className="alert alert-danger p-3 h6">
      Your account does not have administration permissions.
    </h2>
  </div>
);

if (!isModerator) {
  return noPermissionBanner;
}

function createEditTeam({
  teamName,
  members,
  description,
  contractCall, // typescript edit_member || add_member
}) {
  let txn = [];

  const membersAndTeams = Object.keys(accessControlInfo.members_list);
  members.forEach((member) => {
    // if Contract panic member does not exist in the members_list
    if (!membersAndTeams.includes(member)) {
      // Add member
      txn.push({
        contractName: REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
        methodName: "add_member",
        args: {
          member: member,
          metadata: {
            member_metadata_version: "V0",
            description: description,
            permissions: {
              "*": ["use-labels", "edit-post"],
            },
            children: [],
            parents: [],
          },
        },
        gas: Big(10).pow(14),
      });
    }
  });

  // Check edit team
  Near.call([
    ...txn,
    {
      contractName: REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
      methodName: contractCall, // add_member || edit_member
      args: {
        member: `team:${teamName}`,
        metadata: {
          member_metadata_version: "V0",
          description: description,
          permissions: {
            "*": ["use-labels", "edit-post"],
          },
          children: members,
          parents: [],
        },
      },
      gas: Big(10).pow(14),
    },
  ]);
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
`;

const Tab = styled.button`
  color: rgb(0, 236, 151);
  &:hover {
    color: rgba(0, 236, 151, 0.5);
  }
`;

return (
  <Container>
    <div className="d-flex flex-column gap-4 p-4">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <Tab
            className="nav-link active"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Moderators
          </Tab>
        </li>
        <li class="nav-item" role="presentation">
          <Tab
            className="nav-link"
            id="about-tab"
            data-bs-toggle="tab"
            data-bs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected="false"
          >
            About
          </Tab>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <Widget
            src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.admin.ModeratorsConfigurator`}
            props={{
              accessControlInfo,
              createEditTeam,
            }}
          />
        </div>
        <div
          class="tab-pane fade"
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <Widget
            src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.admin.AboutConfigurator`}
            props={{
              accessControlInfo,
              createEditTeam,
            }}
          />
        </div>
      </div>
    </div>
  </Container>
);
