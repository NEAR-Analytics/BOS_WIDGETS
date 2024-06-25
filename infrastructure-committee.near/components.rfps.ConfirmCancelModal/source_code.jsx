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

const isOpen = props.isOpen;
const onCancelClick = props.onCancelClick;
const onConfirmClick = props.onConfirmClick;
const linkedProposalIds = props.linkedProposalIds;

const Modal = styled.div`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 999;

  .black-btn {
    background-color: #000 !important;
    border: none;
    color: white;
    &:active {
      color: white;
    }
  }

  @media screen and (max-width: 768px) {
    h5 {
      font-size: 16px !important;
    }
  }

  .btn {
    font-size: 14px;
  }

  .bg-grey {
    background: rgb(244, 244, 244) !important;
    max-height: 300px;
    overflow-y: auto;
  }
`;

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
`;

const ModalDialog = styled.div`
  padding: 2em;
  z-index: 999;
  overflow-y: auto;
  max-height: 85%;
  margin-top: 5%;
  width: 50%;

  @media screen and (max-width: 768px) {
    margin: 2rem;
    width: 100%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4px;
`;

const ModalFooter = styled.div`
  padding-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: items-center;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0.5em;
  border-radius: 6px;
  border: 0;
  color: #344054;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const ConfirmButton = styled.button`
  padding: 0.7em;
  border-radius: 6px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  background-color: #12b76a;
  color: white;

  &:hover {
    background-color: #0e9f5d;
  }
`;

const ModalContent = styled.div`
  flex: 1;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 4px;
  overflow-y: auto;
  max-height: 50%;

  @media screen and (max-width: 768px) {
    font-size: 12px !important;
  }
`;

const NoButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  box-shadow: none;
`;

const [proposalStatus, setProposalStatus] = useState(null);

const OptionForm = useMemo(() => {
  return (
    <div className="d-flex flex-column gap-1 pl-2">
      <Widget
        src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.molecule.RadioButton`}
        props={{
          value: CANCEL_RFP_OPTIONS.CANCEL_PROPOSALS,
          label: (
            <div>
              <span className="fw-bold">Option 1: </span>Cancel all linked
              proposals
            </div>
          ),
          isChecked: proposalStatus === CANCEL_RFP_OPTIONS.CANCEL_PROPOSALS,
          onClick: (v) => {
            if (v) {
              setProposalStatus(CANCEL_RFP_OPTIONS.CANCEL_PROPOSALS);
            }
          },
        }}
      />
      <Widget
        src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.molecule.RadioButton`}
        props={{
          value: CANCEL_RFP_OPTIONS.UNLINK_PROPOSALS,
          label: (
            <div>
              <span className="fw-bold">Option 2: </span> Unlink all linked
              proposals (maintain their status)
            </div>
          ),
          isChecked: proposalStatus === CANCEL_RFP_OPTIONS.UNLINK_PROPOSALS,
          onClick: (v) => {
            if (v) {
              setProposalStatus(CANCEL_RFP_OPTIONS.UNLINK_PROPOSALS);
            }
          },
        }}
      />
      <Widget
        src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.molecule.RadioButton`}
        props={{
          value: CANCEL_RFP_OPTIONS.NONE,
          label: (
            <div>
              <span className="fw-bold">Option 3: </span> Leave all linked
              proposals as they are
            </div>
          ),
          isChecked: proposalStatus === CANCEL_RFP_OPTIONS.NONE,
          onClick: (v) => {
            if (v) {
              setProposalStatus(CANCEL_RFP_OPTIONS.NONE);
            }
          },
        }}
      />
    </div>
  );
}, [proposalStatus]);

return (
  <>
    <Modal hidden={!isOpen}>
      <ModalBackdrop />
      <ModalDialog className="card">
        <ModalHeader>
          <h5 className="mb-0">Are you sure you want to cancel this RFP?</h5>
        </ModalHeader>
        <ModalContent className="text-muted d-flex flex-column gap-2">
          The RFP status will change to “Cancelled” and it will no longer be
          active or relevant. Comments will remain open.
          <div className="bg-grey d-flex flex-column p-3 rounded-1 text-black">
            <div className="h6">
              Linked Proposals ({linkedProposalIds.length})
            </div>
            <Widget
              src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.molecule.LinkedProposals`}
              props={{
                linkedProposalIds: linkedProposalIds,
                showStatus: true,
              }}
            />
          </div>
          <div className="text-muted d-flex flex-column gap-2">
            <div className="text-lg">
              What would you like to do with the linked proposals?
            </div>
            {OptionForm}
          </div>
          <div className="text-sm mt-2">
            Note: To take specific actions on individual proposals, please
            manage them from their respective pages.
          </div>
        </ModalContent>
        <div className="d-flex gap-2 align-items-center justify-content-end mt-2">
          <Widget
            src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
            props={{
              classNames: { root: "btn-outline-secondary" },
              label: "Cancel",
              onClick: onCancelClick,
            }}
          />
          <Widget
            src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
            props={{
              classNames: { root: "btn-danger" },
              disabled: !proposalStatus,
              label: "Ready to Cancel",
              onClick: () => onConfirmClick(proposalStatus),
            }}
          />
        </div>
      </ModalDialog>
    </Modal>
  </>
);
