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

const { data, setList, validate, invalidate } = props;

const [newItem, setNewItem] = useState("");

const handleAddItem = () => {
  if (validate(newItem)) {
    setList([...data.list, newItem]);
    setNewItem("");
  } else {
    return invalidate();
  }
};

const handleDeleteItem = (index) => {
  const updatedData = [...data.list];
  updatedData.splice(index, 1);
  setList(updatedData);
};

const Item = styled.div`
  padding: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

return (
  <>
    {data.list.map((item, index) => (
      <Item key={index}>
        <div className="flex-grow-1">
          <Widget
            src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
            props={{
              className: "flex-grow-1",
              value: item,
              skipPaddingGap: true,
              placeholder: data.placeholder,
              inputProps: {
                prefix: data.prefix,
                disabled: true,
              },
            }}
          />
        </div>
        <button
          className="btn btn-outline-danger"
          onClick={() => handleDeleteItem(index)}
        >
          <i className="bi bi-trash-fill" />
        </button>
      </Item>
    ))}
    {data.list.length < data.maxLength && (
      <Item>
        <div className="flex-grow-1">
          <Widget
            src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.AccountInput`}
            props={{
              onUpdate: (value) => setNewItem(value),
              value: newItem,
              placeholder: data.placeholder,
            }}
          />
        </div>
        <button
          className="btn btn-success add-member"
          onClick={handleAddItem}
          disabled={newItem === ""}
          data-testid="add-to-list"
        >
          <i className="bi bi-plus" />
        </button>
      </Item>
    )}
  </>
);
