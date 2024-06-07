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
const REPL_SOCIAL_CONTRACT = "social.near";
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
  return `https://${
    gatewayURL.includes("near.org") ? "dev.near.org" : "near.social"
  }/${url}`;
}
/* END_INCLUDE: "includes/common.jsx" */

const { Tile } = VM.require(
  `${REPL_DEVHUB}/widget/devhub.components.molecule.Tile`
) || { Tile: () => <></> };

const item = {
  path: `${REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT}/profile/**`,
};

const profile = Social.get(item.path);

if (!profile.description) {
  <div
    style={{ height: "50vh" }}
    className="d-flex justify-content-center align-items-center w-100"
  >
    <Widget src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Spinner`} />
  </div>;
}

const initialData = profile.description;
const [content, setContent] = useState(null);
const [showCommentToast, setCommentToast] = useState(false);
const [handler, setHandler] = useState(null);
const [isTxnCreated, setTxnCreated] = useState(false);

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
`;

const hasDataChanged = () => {
  return content !== initialData;
};

const handlePublish = () => {
  setTxnCreated(true);
  Near.call([
    {
      contractName: REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
      methodName: "set_social_db_profile_description",
      args: { description: content },
      gas: 270000000000000,
    },
  ]);
};

useEffect(() => {
  if (isTxnCreated) {
    const checkForAboutInSocialDB = () => {
      Near.asyncView(REPL_SOCIAL_CONTRACT, "get", {
        keys: [item.path],
      }).then((result) => {
        try {
          const submittedAboutText = content;
          const lastAboutTextFromSocialDB =
            result[REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT].profile.description;
          if (submittedAboutText === lastAboutTextFromSocialDB) {
            setTxnCreated(false);
            setCommentToast(true);
            return;
          }
        } catch (e) {}
        setTimeout(() => checkForAboutInSocialDB(), 2000);
      });
    };
    checkForAboutInSocialDB();
  }
}, [isTxnCreated]);

useEffect(() => {
  if (!content && initialData) {
    setContent(initialData);
    setHandler("update");
  }
}, [initialData]);

function Preview() {
  return (
    <Tile className="p-3" style={{ background: "white" }}>
      <Widget
        src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.Markdown`}
        props={{
          content: content,
        }}
      />
    </Tile>
  );
}

return (
  <Container>
    <Widget
      src={`${REPL_NEAR}/widget/DIG.Toast`}
      props={{
        title: "About page updated successfully",
        type: "success",
        open: showCommentToast,
        onOpenChange: (v) => setCommentToast(v),
        trigger: <></>,
        providerProps: { duration: 3000 },
      }}
    />
    <ul className="nav nav-tabs" id="editPreviewTabs" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="edit-tab"
          data-bs-toggle="tab"
          data-bs-target="#edit"
          type="button"
          role="tab"
          aria-controls="edit"
          aria-selected="true"
        >
          Edit
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="preview-tab"
          data-bs-toggle="tab"
          data-bs-target="#preview"
          type="button"
          role="tab"
          aria-controls="preview"
          aria-selected="false"
        >
          Preview
        </button>
      </li>
    </ul>
    <div className="tab-content" id="editPreviewTabsContent">
      <div
        className="tab-pane show active py-4"
        id="edit"
        role="tabpanel"
        aria-labelledby="edit-tab"
      >
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.SimpleMDE`}
          props={{
            data: { handler: handler, content: content },
            onChangeKeyup: (v) => {
              setContent(v);
            },
            showAutoComplete: true,
          }}
        />

        <div
          className={"d-flex align-items-center justify-content-end gap-3 mt-4"}
        >
          <Widget
            src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
            props={{
              classNames: { root: "btn-success" },
              disabled: !hasDataChanged(),
              icon: {
                type: "bootstrap_icon",
                variant: "bi-check-circle-fill",
              },
              label: "Publish",
              onClick: handlePublish,
            }}
          />
        </div>
      </div>
      <div
        className="tab-pane"
        id="preview"
        role="tabpanel"
        aria-labelledby="preview-tab"
        style={{ position: "relative" }}
      >
        <div className="w-100 h-100 py-4">
          <Preview />
        </div>
      </div>
    </div>
  </Container>
);
