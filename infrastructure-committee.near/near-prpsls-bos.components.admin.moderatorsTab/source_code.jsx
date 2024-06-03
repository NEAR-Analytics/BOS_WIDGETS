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
/* END_INCLUDE: "includes/common.jsx" */

const { Tile } = VM.require(
  `${REPL_DEVHUB}/widget/devhub.components.molecule.Tile`
) || { Tile: () => <></> };

const { accessControlInfo, createEditTeam } = props;

const [editModerators, setEditModerators] = useState(false);
const [moderators, setModerators] = useState(
  accessControlInfo.members_list["team:moderators"].children || []
);

const handleEditModerators = () => {
  createEditTeam({
    teamName: "moderators",
    description:
      "The moderator group has permissions to create and edit RFPs, edit and manage proposals, and manage admins.",
    members: moderators,
    contractCall: "edit_member",
  });
};

const handleCancelModerators = () => {
  setEditModerators(false);
  setModerators(accessControlInfo.members_list["team:moderators"].children);
};

return (
  <>
    <h3>Moderators</h3>
    <div className="card-body">
      <h6>
        The moderator group has permissions to create and edit RFPs, edit and
        manage proposals, and manage admins.
      </h6>
      <Widget
        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.PostControls`}
        props={{
          icon: "bi bi-gear-wide-connected",
          className: "mb-3",

          title: "Edit members",
          onClick: () => setEditModerators(!editModerators),
          testId: "edit-members",
        }}
      />
    </div>
    <Tile className="p-3" style={{ background: "white" }}>
      {editModerators ? (
        <>
          <Widget
            src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.admin.AccountsEditor`}
            props={{
              data: {
                maxLength: 100,
                placeholder: "member.near",
                list: moderators,
              },
              setList: setModerators,
              // Could add a check to see if it is an valid account id.
              validate: (newItem) => true,
              invalidate: () => null,
            }}
          />
          <div
            className={
              "d-flex align-items-center justify-content-end gap-3 mt-4"
            }
          >
            <Widget
              src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
              props={{
                classNames: {
                  root: "btn-outline-danger shadow-none border-0",
                },
                label: "Cancel",
                onClick: handleCancelModerators,
              }}
            />
            <Widget
              src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
              props={{
                classNames: { root: "btn-success" },
                icon: {
                  type: "bootstrap_icon",
                  variant: "bi-check-circle-fill",
                },
                label: "Submit",
                onClick: handleEditModerators,
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div class="pt-4">Members</div>
          {moderators && (
            <div class="vstack">
              {moderators.length ? (
                moderators.map((child) => (
                  <Tile className="w-25 p-3 m-1" minHeight={10}>
                    <Widget
                      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.ProfileLine`}
                      props={{ accountId: child }}
                    />
                  </Tile>
                ))
              ) : (
                <div>No moderators</div>
              )}
            </div>
          )}
        </>
      )}
    </Tile>
  </>
);
