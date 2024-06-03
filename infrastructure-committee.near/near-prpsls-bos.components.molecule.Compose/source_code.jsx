/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes/common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "infrastructure-committee.near";
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
/* END_INCLUDE: "includes/common.jsx" */

const EmbeddCSS = `
  .CodeMirror {
   margin-inline:10px;
   border-radius:5px;
  }

  .editor-toolbar {
    border: none !important;
  }
`;

const Wrapper = styled.div`
  .nav-link {
    color: inherit !important;
  }

  .card-header {
    padding-bottom: 0px !important;
  }
`;

const Compose = ({
  data,
  onChange,
  autocompleteEnabled,
  placeholder,
  height,
  embeddCSS,
  showProposalIdAutoComplete,
  onChangeKeyup,
  handler,
}) => {
  State.init({
    data: data,
    selectedTab: "editor",
    autoFocus: false,
  });

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(state.data);
    }
  }, [state.data]);

  useEffect(() => {
    // for clearing editor after txn approval/ showing draft state
    if (data !== state.data || handler !== state.handler) {
      State.update({ data: data, handler: handler });
    }
  }, [data, handler]);

  return (
    <Wrapper>
      <div className="card">
        <div className="card-header" style={{ position: "relative" }}>
          <div>
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <button
                  class={`nav-link ${
                    state.selectedTab === "editor" ? "active" : ""
                  }`}
                  onClick={() =>
                    State.update({ selectedTab: "editor", autoFocus: true })
                  }
                >
                  Write
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={`nav-link ${
                    state.selectedTab === "preview" ? "active" : ""
                  }`}
                  onClick={() => State.update({ selectedTab: "preview" })}
                >
                  Preview
                </button>
              </li>
            </ul>
          </div>
        </div>

        {state.selectedTab === "editor" ? (
          <>
            <Widget
              src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.SimpleMDE`}
              props={{
                data: { handler: state.handler, content: state.data },
                onChange: (content) => {
                  State.update({ data: content, handler: "update" });
                },
                placeholder: placeholder,
                height,
                embeddCSS: embeddCSS || EmbeddCSS,
                showAutoComplete: autocompleteEnabled,
                showProposalIdAutoComplete: showProposalIdAutoComplete,
                autoFocus: state.autoFocus,
                onChangeKeyup: onChangeKeyup,
              }}
            />
          </>
        ) : (
          <div className="card-body">
            <Widget
              src={`${REPL_DEVHUB}/widget/devhub.components.molecule.MarkdownViewer`}
              props={{
                text: state.data,
              }}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

return Compose(props);
