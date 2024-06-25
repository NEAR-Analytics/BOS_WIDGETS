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

const proposalId = props.proposalId;
const rfpId = props.rfpId;
const draftKey = "INFRA_COMMENT_DRAFT" + proposalId;
let draftComment = "";

const ComposeEmbeddCSS = `
  .CodeMirror {
    border: none !important;
    min-height: 50px !important;
  }

  .editor-toolbar {
    border: none !important;
  }

  .CodeMirror-scroll{
    min-height: 50px !important;
    max-height: 300px !important;
  }
`;

const notifyAccountIds = props.notifyAccountIds ?? [];
const accountId = context.accountId;
const item = props.item;
const [allowGetDraft, setAllowGetDraft] = useState(true);
const [comment, setComment] = useState(null);
const [isTxnCreated, setTxnCreated] = useState(false);
const [handler, setHandler] = useState("update"); // to update editor state on draft and txn approval
const [showCommentToast, setCommentToast] = useState(false);

if (allowGetDraft) {
  draftComment = Storage.privateGet(draftKey);
}

useEffect(() => {
  if (draftComment) {
    setComment(draftComment);
    setAllowGetDraft(false);
    setHandler("refreshEditor");
  }
}, [draftComment]);

useEffect(() => {
  if (draftComment === comment) {
    return;
  }
  const handler = setTimeout(() => {
    Storage.privateSet(draftKey, comment);
  }, 1000);

  return () => {
    clearTimeout(handler);
  };
}, [comment]);

useEffect(() => {
  if (handler === "update") {
    return;
  }
  const handler = setTimeout(() => {
    setHandler("update");
  }, 3000);

  return () => {
    clearTimeout(handler);
  };
}, [handler]);

if (!accountId) {
  return (
    <div
      style={{
        marginLeft: 10,
        backgroundColor: "#ECF8FB",
        border: "1px solid #E2E6EC",
      }}
      className="d-flex align-items-center gap-1 p-4 rounded-2 flex-wrap flex-md-nowrap"
    >
      <Link to="https://near.org/signup">
        <Widget
          src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
          props={{
            classNames: { root: "grey-btn" },
            label: "Sign up",
          }}
        />
      </Link>
      <div className="fw-bold">to join this conversation.</div>
      <div>Already have an account?</div>
      <a className="text-decoration-underline" href="https://near.org/signin">
        Log in to comment
      </a>
    </div>
  );
}

function extractMentions(text) {
  const mentionRegex =
    /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  mentionRegex.lastIndex = 0;
  const accountIds = new Set();
  for (const match of text.matchAll(mentionRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
      match[1].length >= 2 &&
      match[1].length <= 64
    ) {
      accountIds.add(match[1].toLowerCase());
    }
  }
  return [...accountIds];
}

function extractTagNotifications(text, item) {
  return extractMentions(text || "")
    .filter((accountId) => accountId !== context.accountId)
    .map((accountId) => ({
      key: accountId,
      value: {
        type: "mention",
        item,
      },
    }));
}

function composeData() {
  setTxnCreated(true);
  const data = {
    post: {
      comment: JSON.stringify({
        type: "md",
        text: comment,
        item,
      }),
    },
    index: {
      comment: JSON.stringify({
        key: item,
        value: {
          type: "md",
        },
      }),
    },
  };

  const notifications = extractTagNotifications(comment, {
    type: "social",
    path: `${accountId}/post/comment`,
  });

  if (notifyAccountIds.length > 0) {
    notifyAccountIds.map((account) => {
      if (account !== context.accountId) {
        notifications.push({
          key: account,
          value: proposalId
            ? {
                type: "proposal/reply",
                item,
                proposal: proposalId,
                widgetAccountId: REPL_INFRASTRUCTURE_COMMITTEE,
              }
            : {
                type: "rfp/reply",
                item,
                rfp: rfpId,
                widgetAccountId: REPL_INFRASTRUCTURE_COMMITTEE,
              },
        });
      }
    });
  }

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  Social.set(data, {
    force: true,
    onCommit: () => {
      setCommentToast(true);
      setComment("");
      setHandler("refreshEditor");
      setTxnCreated(false);
    },
    onCancel: () => {
      setTxnCreated(false);
    },
  });
}

useEffect(() => {
  if (props.transactionHashes && comment) {
    setComment("");
  }
}, [props.transactionHashes]);

const LoadingButtonSpinner = (
  <span
    class="comment-btn-spinner spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>
);

const Compose = useMemo(() => {
  return (
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.molecule.Compose`}
      props={{
        data: comment,
        onChangeKeyup: setComment,
        autocompleteEnabled: true,
        placeholder: "Add your comment here...",
        height: "250",
        embeddCSS: ComposeEmbeddCSS,
        handler: handler,
        showProposalIdAutoComplete: true,
      }}
    />
  );
}, [draftComment, handler]);

return (
  <div className="d-flex gap-2">
    <Widget
      src={`${REPL_NEAR}/widget/DIG.Toast`}
      props={{
        title: "Comment Submitted Successfully",
        type: "success",
        open: showCommentToast,
        onOpenChange: (v) => setCommentToast(v),
        trigger: <></>,
        providerProps: { duration: 3000 },
      }}
    />
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.Profile`}
      props={{
        accountId: accountId,
      }}
    />
    <div className="d-flex flex-column gap-2 w-100">
      <b className="mt-1">Add a comment</b>
      {Compose}
      <div className="d-flex gap-2 align-content-center justify-content-end">
        <Widget
          src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
          props={{
            label: isTxnCreated ? LoadingButtonSpinner : "Comment",
            ["data-testid"]: "compose-comment",
            disabled: !comment || isTxnCreated,
            classNames: { root: "green-btn btn-sm" },
            onClick: () => {
              composeData();
            },
          }}
        />
      </div>
    </div>
  </div>
);
