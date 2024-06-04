/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes/common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "megha19.near";
const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT = "truedove38.near";
const REPL_RPC_URL = "https://rpc.mainnet.near.org";
const REPL_NEAR = "near";
const RFP_IMAGE =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const RFP_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_rfps_with_latest_snapshot";

const RFP_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_rfp_snapshots";

const PROPOSAL_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_proposals_with_latest_snapshot";

const PROPOSAL_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_proposal_snapshots";
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
  `https://${
    gatewayURL.includes("near.org") ? "dev.near.org" : "near.social"
  }/${url}`;
}
/* END_INCLUDE: "includes/common.jsx" */

const value = props.value;
const placeholder = props.placeholder;
const onUpdate = props.onUpdate;

const [account, setAccount] = useState(value);
const [showAccountAutocomplete, setAutoComplete] = useState(false);
const [isValidAccount, setValidAccount] = useState(true);
const AutoComplete = styled.div`
  margin-top: 1rem;
`;

useEffect(() => {
  if (value !== account) {
    setAccount(value);
  }
}, [value]);

useEffect(() => {
  if (value !== account) {
    onUpdate(account);
  }
}, [account]);

useEffect(() => {
  const handler = setTimeout(() => {
    const valid = account.length === 64 || (account ?? "").includes(".near");
    setValidAccount(valid);
    setAutoComplete(!valid);
  }, 100);

  return () => {
    clearTimeout(handler);
  };
}, [account]);

return (
  <div>
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
      props={{
        className: "flex-grow-1",
        value: account,
        onChange: (e) => {
          setAccount(e.target.value);
        },
        skipPaddingGap: true,
        placeholder: placeholder,
        inputProps: {
          max: 64,
          prefix: "@",
        },
      }}
    />
    {account && !isValidAccount && (
      <div style={{ color: "red" }} className="text-sm mt-1">
        Please enter valid account ID
      </div>
    )}
    {showAccountAutocomplete && (
      <AutoComplete>
        <Widget
          src={`${REPL_DEVHUB}/widget/devhub.components.molecule.AccountAutocomplete`}
          props={{
            term: account,
            onSelect: (id) => {
              setAccount(id);
              setAutoComplete(false);
            },
            onClose: () => setAutoComplete(false),
          }}
        />
      </AutoComplete>
    )}
  </div>
);
