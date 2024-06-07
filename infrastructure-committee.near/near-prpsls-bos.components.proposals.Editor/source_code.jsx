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

const { href } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);
href || (href = () => {});

const { getGlobalLabels } = VM.require(
  `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.core.lib.contract`
) || { getGlobalLabels: () => {} };

const { id, timestamp, rfp_id } = props;

const isEditPage = typeof id === "string";
const author = context.accountId;
const FundingDocs =
  "https://github.com/near/Infrastructure-Working-Group/wiki/Funding-Process-%E2%80%90-Company";
const ToCDocs =
  "https://docs.google.com/document/d/1jcazxTemEsOf72nfAIbv6CR1og_w4qVXg7GjXuVoGeI/edit?usp=sharing";
const CoCDocs =
  "https://docs.google.com/document/d/1S0Ky1xPLRlCRSbX6nLOAxBba7b0dYb4SpGJzaAPqI9k/edit?usp=sharing";
if (!author) {
  return (
    <Widget src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.LoginScreen`} />
  );
}
let editProposalData = null;
let draftProposalData = null;
const draftKey = "INFRA_PROPOSAL_EDIT";

const rfpLabelOptions = getGlobalLabels();

if (isEditPage) {
  editProposalData = Near.view(
    REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
    "get_proposal",
    {
      proposal_id: parseInt(id),
    }
  );
}

const Container = styled.div`
  input {
    font-size: 14px !important;
  }

  .card.no-border {
    border-left: none !important;
    border-right: none !important;
    margin-bottom: -3.5rem;
  }

  textarea {
    font-size: 14px !important;
  }

  .full-width-div {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .text-sm {
    font-size: 13px;
  }

  @media screen and (max-width: 768px) {
    .h6 {
      font-size: 14px !important;
    }

    .h5 {
      font-size: 16px !important;
    }

    .text-sm {
      font-size: 11px;
    }

    .gap-6 {
      gap: 0.5rem !important;
    }
  }

  .border-bottom {
    border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color);
  }

  .text-xs {
    font-size: 10px;
  }

  .flex-2 {
    flex: 2;
  }

  .flex-1 {
    flex: 1;
  }
  .bg-grey {
    background-color: #f4f4f4;
  }

  .border-bottom {
    border-bottom: 1px solid grey;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .proposal-card {
    &:hover {
      background-color: #f4f4f4;
    }
  }

  .border-1 {
    border: 1px solid #e2e6ec;
  }
  .green-btn {
    background-color: #03ba16 !important;
    border: none;
    color: white;
    &:active {
      color: white;
    }
  }

  .black-btn {
    background-color: #000 !important;
    border: none;
    color: white;
    &:active {
      color: white;
    }
  }

  .dropdown-toggle:after {
    position: absolute;
    top: 46%;
    right: 5%;
  }

  .drop-btn {
    max-width: none !important;
  }

  .dropdown-menu {
    width: 100%;
    border-radius: 0.375rem !important;
  }

  .input-icon {
    display: flex;
    height: 100%;
    align-items: center;
    border-right: 1px solid #dee2e6;
    padding-right: 10px;
  }

  /* Tooltip container */
  .custom-tooltip {
    position: relative;
    display: inline-block;
  }

  /* Tooltip text */
  .custom-tooltip .tooltiptext {
    visibility: hidden;
    width: 250px;
    background-color: #fff;
    color: #6c757d;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    font-size: 12px;
    border: 0.2px solid #6c757d;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: -30px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Tooltip arrow */
  .custom-tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 15%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .custom-tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .form-check-input:checked {
    background-color: #04a46e !important;
    border-color: #04a46e !important;
  }

  .gap-6 {
    gap: 2.5rem;
  }

  a.no-space {
    display: inline-block;
  }
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const tokensOptions = [
  { label: "NEAR", value: "NEAR" },
  { label: "USDT", value: "USDT" },
  {
    label: "USDC",
    value: "USDC",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

const [linkedRfp, setLinkedRfp] = useState(rfp_id ? parseInt(rfp_id) : null);
const [labels, setLabels] = useState([]);
const [title, setTitle] = useState(null);
const [description, setDescription] = useState(null);
const [summary, setSummary] = useState(null);
const [consent, setConsent] = useState({ toc: false, coc: false });
const [linkedProposals, setLinkedProposals] = useState([]);
const [receiverAccount, setReceiverAccount] = useState(context.accountId);
const [requestedSponsorshipAmount, setRequestedSponsorshipAmount] =
  useState(null);
const [requestedSponsorshipToken, setRequestedSponsorshipToken] = useState(
  tokensOptions[2]
);
const [allowDraft, setAllowDraft] = useState(true);

const [loading, setLoading] = useState(true);
const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(false);
const [isDraftBtnOpen, setDraftBtnOpen] = useState(false);
const [selectedStatus, setSelectedStatus] = useState("draft");
const [isReviewModalOpen, setReviewModal] = useState(false);
const [isCancelModalOpen, setCancelModal] = useState(false);

const [showProposalViewModal, setShowProposalViewModal] = useState(false); // when user creates/edit a proposal and confirm the txn, this is true
const [proposalId, setProposalId] = useState(null);
const [proposalIdsArray, setProposalIdsArray] = useState(null);
const [isTxnCreated, setCreateTxn] = useState(false);
const [oldProposalData, setOldProposalData] = useState(null);
const [supervisor, setSupervisor] = useState(null);

if (allowDraft) {
  draftProposalData = Storage.privateGet(draftKey);
}

const isModerator = Near.view(
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  "is_allowed_to_write_rfps",
  {
    editor: context.accountId,
  }
);

const memoizedDraftData = useMemo(
  () => ({
    id: editProposalData.id ?? null,
    snapshot: {
      linked_rfp: linkedRfp,
      name: title,
      description: description,
      labels: labels,
      summary: summary,
      requested_sponsorship_usd_amount: requestedSponsorshipAmount,
      requested_sponsorship_paid_in_currency: requestedSponsorshipToken.value,
      receiver_account: receiverAccount,
    },
  }),
  [
    linkedRfp,
    title,
    summary,
    description,
    labels,
    requestedSponsorshipAmount,
    requestedSponsorshipToken,
    receiverAccount,
  ]
);

useEffect(() => {
  if (allowDraft) {
    let data = editProposalData || JSON.parse(draftProposalData);
    let snapshot = data.snapshot;
    if (data) {
      if (timestamp) {
        snapshot =
          data.snapshot_history.find((item) => item.timestamp === timestamp) ??
          data.snapshot;
      }
      if (
        draftProposalData &&
        editProposalData &&
        editProposalData.id === JSON.parse(draftProposalData).id
      ) {
        snapshot = {
          ...editProposalData.snapshot,
          ...JSON.parse(draftProposalData).snapshot,
        };
      }
      if (!isNumber(linkedRfp)) {
        setLinkedRfp(snapshot.linked_rfp);
      }
      setLabels(snapshot.labels ?? []);
      setTitle(snapshot.name);
      setSummary(snapshot.summary);
      setDescription(snapshot.description);
      setReceiverAccount(snapshot.receiver_account);
      setRequestedSponsorshipAmount(snapshot.requested_sponsorship_usd_amount);
      setSupervisor(snapshot.supervisor);

      const token = tokensOptions.find(
        (item) => item.value === snapshot.requested_sponsorship_paid_in_currency
      );
      setRequestedSponsorshipToken(token ?? tokensOptions[2]);
      if (isEditPage) {
        setConsent({ toc: true, coc: true });
      }
    }
  }
}, [editProposalData, draftProposalData, allowDraft]);

// show loader until LS data is set in state
useEffect(() => {
  const handler = setTimeout(() => {
    setAllowDraft(false);
    setLoading(false);
  }, 500);

  return () => clearTimeout(handler);
}, []);

useEffect(() => {
  if (showProposalViewModal) {
    return;
  }
  setDisabledSubmitBtn(
    isTxnCreated ||
      !title ||
      !description ||
      !summary ||
      !(labels ?? []).length ||
      !requestedSponsorshipAmount ||
      !receiverAccount ||
      !consent.toc ||
      !consent.coc
  );
  const handler = setTimeout(() => {
    Storage.privateSet(draftKey, JSON.stringify(memoizedDraftData));
  }, 10000);

  return () => clearTimeout(handler);
}, [
  memoizedDraftData,
  draftKey,
  draftProposalData,
  consent,
  isTxnCreated,
  showProposalViewModal,
]);

// set RFP labels, disable link rfp change when linked rfp is past accepting stage
const [disabledLinkRFP, setDisableLinkRFP] = useState(false);

useEffect(() => {
  if (linkedRfp) {
    Near.asyncView(REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT, "get_rfp", {
      rfp_id: linkedRfp.value ?? linkedRfp,
    }).then((i) => {
      const timeline = parseJSON(i.snapshot.timeline);
      setDisableLinkRFP(
        !isModerator &&
          timeline.status !== RFP_TIMELINE_STATUS.ACCEPTING_SUBMISSIONS
      );
      setLabels(i.snapshot.labels);
    });
  }
}, [linkedRfp]);

useEffect(() => {
  if (
    editProposalData &&
    editProposalData?.snapshot?.linked_proposals?.length > 0
  ) {
    editProposalData.snapshot.linked_proposals.map((item) => {
      useCache(
        () =>
          Near.asyncView(
            REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
            "get_proposal",
            {
              proposal_id: parseInt(item),
            }
          ).then((proposal) => {
            setLinkedProposals([
              ...linkedProposals,
              {
                label: "# " + proposal.id + " : " + proposal.snapshot.name,
                value: proposal.id,
              },
            ]);
          }),
        item + "linked_proposals",
        { subscribe: false }
      );
    });
  }
}, [editProposalData]);

const InputContainer = ({ heading, description, children }) => {
  return (
    <div className="d-flex flex-column gap-1 gap-sm-2 w-100">
      <b className="h6 mb-0">{heading}</b>
      {description && (
        <div className="text-muted w-100 text-sm">{description}</div>
      )}
      {children}
    </div>
  );
};

// show proposal created after txn approval for popup wallet
useEffect(() => {
  if (isTxnCreated) {
    if (editProposalData) {
      setOldProposalData(editProposalData);
      if (
        editProposalData &&
        typeof editProposalData === "object" &&
        oldProposalData &&
        typeof oldProposalData === "object" &&
        JSON.stringify(editProposalData) !== JSON.stringify(oldProposalData)
      ) {
        setCreateTxn(false);
        setProposalId(editProposalData.id);
        setShowProposalViewModal(true);
      }
    } else {
      const proposalIds = Near.view(
        REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
        "get_all_proposal_ids"
      );
      if (Array.isArray(proposalIds) && !proposalIdsArray) {
        setProposalIdsArray(proposalIds);
      }
      if (
        Array.isArray(proposalIds) &&
        Array.isArray(proposalIdsArray) &&
        proposalIds.length !== proposalIdsArray.length
      ) {
        setCreateTxn(false);
        setProposalId(proposalIds[proposalIds.length - 1]);
        setShowProposalViewModal(true);
      }
    }
  }
  setLoading(false);
});

useEffect(() => {
  if (props.transactionHashes) {
    setLoading(true);
    useCache(
      () =>
        asyncFetch(REPL_RPC_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "dontcare",
            method: "tx",
            params: [props.transactionHashes, context.accountId],
          }),
        }).then((transaction) => {
          const transaction_method_name =
            transaction?.body?.result?.transaction?.actions[0].FunctionCall
              .method_name;

          const is_edit_or_add_post_transaction =
            transaction_method_name == "add_proposal" ||
            transaction_method_name == "edit_proposal";

          if (is_edit_or_add_post_transaction) {
            setShowProposalViewModal(true);
            Storage.privateSet(draftKey, null);
          }
          // show the latest created proposal to user
          if (transaction_method_name == "add_proposal") {
            useCache(
              () =>
                Near.asyncView(
                  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
                  "get_all_proposal_ids"
                ).then((proposalIdsArray) => {
                  setProposalId(
                    proposalIdsArray?.[proposalIdsArray?.length - 1]
                  );
                }),
              props.transactionHashes + "proposalIds",
              { subscribe: false }
            );
          } else {
            setProposalId(id);
          }
          setLoading(false);
        }),
      props.transactionHashes + context.accountId,
      { subscribe: false }
    );
  } else {
    if (showProposalViewModal) {
      setShowProposalViewModal(false);
    }
  }
}, [props.transactionHashes]);

const DropdowntBtnContainer = styled.div`
  font-size: 13px;
  min-width: 150px;

  .custom-select {
    position: relative;
  }

  .select-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius-top: 5px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;
  }

  .no-border {
    border: none !important;
  }

  .options-card {
    position: absolute;
    top: 100%;
    left: 0;
    width: 200%;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 0.5rem;
    z-index: 99;
    font-size: 13px;
    border-radius:0.375rem !important;
  }

  .left {
    right: 0 !important;
    left: auto !important;
  }

  @media screen and (max-width: 768px) {
    .options-card {
      right: 0 !important;
      left: auto !important;
    }
  }

  .option {
    margin-block: 5px;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.3s ease;
    border-radius: 0.375rem !important;
  }

  .option:hover {
    background-color: #f0f0f0; /* Custom hover effect color */
  }

  .option:last-child {
    border-bottom: none;
  }

  .selected {
    background-color: #f0f0f0;
  }

  .disabled {
    background-color: #f4f4f4 !important;
    cursor: not-allowed !important;
    font-weight: 500;
    color: #b3b3b3;
  }

  .disabled .circle {
    opacity: 0.5;
  }

  .circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .grey {
    background-color: #818181;
  }

  .green {
    background-color: #04a46e;
  }

  a:hover {
    text-decoration: none;
  }

}
`;

const LoadingButtonSpinner = (
  <span
    class="submit-proposal-draft-loading-indicator spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>
);

const SubmitBtn = () => {
  const btnOptions = [
    {
      iconColor: "grey",
      label: "Submit Draft",
      description:
        "The author can still edit the proposal and build consensus before sharing it with sponsors.",
      value: "draft",
    },
    {
      iconColor: "green",
      label: "Ready for Review",
      description:
        "Start the official review process with sponsors. This will lock the editing function, but comments are still open.",
      value: "review",
    },
  ];

  const handleOptionClick = (option) => {
    setDraftBtnOpen(false);
    setSelectedStatus(option.value);
    handleSubmit(option.value);
  };

  const toggleDropdown = () => {
    setDraftBtnOpen(!isDraftBtnOpen);
  };

  const handleSubmit = (status) => {
    const isDraft = status === "draft";
    if (isDraft) {
      onSubmit({ isDraft });
      cleanDraft();
    } else {
      setReviewModal(true);
    }
  };

  const selectedOption = btnOptions.find((i) => i.value === selectedStatus);

  return (
    <DropdowntBtnContainer>
      <div
        className="custom-select"
        tabIndex="0"
        onBlur={() => setDraftBtnOpen(false)}
      >
        <div
          className={
            "select-header d-flex gap-1 align-items-center submit-draft-button " +
            (disabledSubmitBtn && "disabled")
          }
        >
          <div
            onClick={() => !disabledSubmitBtn && handleSubmit(selectedStatus)}
            className="p-2 d-flex gap-2 align-items-center "
          >
            {isTxnCreated ? (
              LoadingButtonSpinner
            ) : (
              <div className={"circle " + selectedOption.iconColor}></div>
            )}
            <div className={`selected-option`}>{selectedOption.label}</div>
          </div>
          <div
            className="h-100 p-2"
            style={{ borderLeft: "1px solid #ccc" }}
            onClick={!disabledSubmitBtn && toggleDropdown}
          >
            <i class={`bi bi-chevron-${isDraftBtnOpen ? "up" : "down"}`}></i>
          </div>
        </div>

        {isDraftBtnOpen && (
          <div className="options-card">
            {btnOptions.map((option) => (
              <div
                key={option.value}
                className={`option ${
                  selectedOption.value === option.value ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <div className={`d-flex gap-2 align-items-center`}>
                  <div className={"circle " + option.iconColor}></div>
                  <div className="fw-bold">{option.label}</div>
                </div>
                <div className="text-muted text-xs">{option.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DropdowntBtnContainer>
  );
};

const onSubmit = ({ isDraft, isCancel }) => {
  setCreateTxn(true);
  console.log("submitting transaction");
  const linkedProposalsIds = linkedProposals.map((item) => item.value) ?? [];
  const body = {
    proposal_body_version: "V1",
    linked_rfp: linkedRfp?.value,
    category: "Infrastructure Committee",
    name: title,
    description: description,
    summary: summary,
    linked_proposals: linkedProposalsIds,
    requested_sponsorship_usd_amount: requestedSponsorshipAmount,
    requested_sponsorship_paid_in_currency: requestedSponsorshipToken.value,
    receiver_account: receiverAccount,
    requested_sponsor: "infrastructure-committee.near",
    supervisor: supervisor,
    timeline: isCancel
      ? {
          status: "CANCELLED",
          sponsor_requested_review: false,
          reviewer_completed_attestation: false,
        }
      : isDraft
      ? { status: "DRAFT" }
      : {
          status: "REVIEW",
          sponsor_requested_review: false,
          reviewer_completed_attestation: false,
        },
  };
  const args = {
    labels: linkedRfp ? [] : (labels ?? []).map((i) => i.value ?? i),
    body: body,
  };
  if (isEditPage) {
    args["id"] = editProposalData.id;
  }

  Near.call([
    {
      contractName: REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
      methodName: isEditPage ? "edit_proposal" : "add_proposal",
      args: args,
      gas: 270000000000000,
    },
  ]);
};

function cleanDraft() {
  Storage.privateSet(draftKey, null);
}

if (loading) {
  return (
    <div
      style={{ height: "50vh" }}
      className="d-flex justify-content-center align-items-center w-100"
    >
      <Widget
        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Spinner`}
      />
    </div>
  );
}

const [collapseState, setCollapseState] = useState({});

const CollapsibleContainer = ({ title, children, noPaddingTop }) => {
  return (
    <div
      className={
        "border-bottom py-4 " +
        (noPaddingTop && "pt-0 ") +
        (collapseState[title] && " pb-0")
      }
    >
      <div className={"d-flex justify-content-between "}>
        <div className="h5 text-muted mb-2 mb-sm-3">{title}</div>
        <div
          className="d-flex d-sm-none cursor-pointer"
          onClick={() =>
            setCollapseState((prevState) => ({
              ...prevState,
              [title]: !prevState[title],
            }))
          }
        >
          {!collapseState[title] ? (
            <i class="bi bi-chevron-up h4"></i>
          ) : (
            <i class="bi bi-chevron-down h4"></i>
          )}
        </div>
      </div>
      <div className={!collapseState[title] ? "" : "d-none"}>{children}</div>
    </div>
  );
};

const CategoryDropdown = useMemo(() => {
  return (
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.MultiSelectCategoryDropdown`}
      props={{
        selected: labels,
        onChange: (v) => setLabels(v),
        disabled: linkedRfp, // when RFP is linked, labels are disabled
        linkedRfp: linkedRfp,

        availableOptions: rfpLabelOptions,
      }}
    />
  );
}, [draftProposalData, linkedRfp, labels]);

const TitleComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
      props={{
        className: "flex-grow-1",
        value: title,
        onBlur: (e) => {
          setTitle(e.target.value);
        },
        skipPaddingGap: true,
        inputProps: {
          max: 80,
        },
      }}
    />
  );
}, [draftProposalData]);

const SummaryComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
      props={{
        className: "flex-grow-1",
        value: summary,
        multiline: true,
        onBlur: (e) => {
          setSummary(e.target.value);
        },
        skipPaddingGap: true,
        inputProps: {
          max: 500,
        },
      }}
    />
  );
}, [draftProposalData]);

const DescriptionComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.Compose`}
      props={{
        data: description,
        onChange: setDescription,
        autocompleteEnabled: true,
        autoFocus: false,
        showProposalIdAutoComplete: true,
      }}
    />
  );
}, [draftProposalData]);

const ConsentComponent = useMemo(() => {
  return (
    <div className="d-flex flex-column gap-2">
      <Widget
        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Checkbox`}
        props={{
          value: "toc",
          label: (
            <>
              I’ve agree to{" "}
              <a
                href={ToCDocs}
                className="text-decoration-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Infrastructure Committee’s Terms and Conditions
              </a>
              and commit to honoring it
            </>
          ),
          isChecked: consent.toc,
          onClick: (value) =>
            setConsent((prevConsent) => ({
              ...prevConsent,
              toc: value,
            })),
        }}
      />
      <Widget
        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Checkbox`}
        props={{
          value: "coc",
          label: (
            <>
              I’ve read{" "}
              <a
                href={CoCDocs}
                className="text-decoration-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Infrastructure Committee’s Code of Conduct
              </a>
              and commit to honoring it
            </>
          ),
          isChecked: consent.coc,
          onClick: (value) =>
            setConsent((prevConsent) => ({
              ...prevConsent,
              coc: value,
            })),
        }}
      />
    </div>
  );
}, [draftProposalData]);

const ProfileComponent = useMemo(() => {
  return (
    <Widget
      src="mob.near/widget/Profile.ShortInlineBlock"
      props={{
        accountId: author,
      }}
    />
  );
}, []);

const LinkRFPComponent = useMemo(() => {
  return (
    <div className="d-flex flex-column gap-1">
      <Widget
        src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.LinkedRfpDropdown`}
        props={{
          onChange: setLinkedRfp,
          linkedRfp: linkedRfp,
          disabled: disabledLinkRFP,
          onDeleteRfp: () => setLabels([]),
        }}
      />
    </div>
  );
}, [draftProposalData, disabledLinkRFP]);

const LinkedProposalsComponent = useMemo(() => {
  return (
    <div className="d-flex flex-column gap-1">
      <div className="text-muted w-100 text-sm">
        Link any relevant proposals (e.g. previous milestones).
      </div>
      <Widget
        src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.LinkedProposalsDropdown`}
        props={{
          onChange: setLinkedProposals,
          linkedProposals: linkedProposals,
        }}
      />
    </div>
  );
}, [draftProposalData]);

const ReceiverAccountComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.AccountInput`}
      props={{
        value: receiverAccount,
        placeholder: "Enter Address",
        onUpdate: setReceiverAccount,
      }}
    />
  );
}, [draftProposalData]);

const AmountComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
      props={{
        className: "flex-grow-1",
        value: requestedSponsorshipAmount,
        onChange: (e) => {
          setRequestedSponsorshipAmount(e.target.value);
        },
        skipPaddingGap: true,
        inputProps: {
          type: "text",
          prefix: "$",
          inputmode: "numeric",
          pattern: "[0-9]*",
        },
      }}
    />
  );
}, [draftProposalData]);

const CurrencyComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.DropDown`}
      props={{
        options: tokensOptions,
        selectedValue: requestedSponsorshipToken,
        onUpdate: (v) => {
          setRequestedSponsorshipToken(v);
        },
      }}
    />
  );
}, [draftProposalData]);

return (
  <Container className="w-100 py-4 px-0 px-sm-2 d-flex flex-column gap-3">
    <Heading className="px-2 px-sm-0">
      {isEditPage ? "Edit" : "Create"} Proposal
    </Heading>
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.proposals.ViewProposalModal`}
      props={{
        isOpen: showProposalViewModal,
        isEdit: isEditPage,
        proposalId: proposalId,
      }}
    />
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.ConfirmReviewModal`}
      props={{
        isOpen: isReviewModalOpen,
        onCancelClick: () => setReviewModal(false),
        onReviewClick: () => {
          setReviewModal(false);
          cleanDraft();
          onSubmit({ isDraft: false });
        },
      }}
    />
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.ConfirmCancelModal`}
      props={{
        isOpen: isCancelModalOpen,
        onCancelClick: () => setCancelModal(false),
        onConfirmClick: () => {
          setCancelModal(false);
          onSubmit({ isCancel: true });
        },
      }}
    />
    <div className="card no-border rounded-0 px-2 p-lg-0 full-width-div">
      <div className="container-xl py-4 d-flex flex-wrap gap-6 w-100">
        <div
          style={{ minWidth: "350px" }}
          className="flex-2 w-100 order-2 order-md-1"
        >
          <div className="d-flex gap-2 w-100">
            <div className="d-none d-sm-flex">
              <Widget
                src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.Profile`}
                props={{
                  accountId: author,
                }}
              />
            </div>
            <div className="d-flex flex-column gap-4 w-100">
              <div className="border-bottom pb-4">
                <InputContainer
                  heading="Link RFP (Optional)"
                  description={
                    "Link this proposal if it is a response to a specific RFP. You can only link to active RFPs in the “Accepting Submission” stage. You can only link to one RFP."
                  }
                >
                  {LinkRFPComponent}
                </InputContainer>
              </div>
              <InputContainer
                heading="Category"
                description={
                  <>
                    Select the relevant categories that best align with your
                    contribution to the NEAR developer community. Need guidance?
                    See{" "}
                    <a
                      href={FundingDocs}
                      className="text-decoration-underline no-space"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Funding Docs
                    </a>
                    .
                  </>
                }
              >
                {CategoryDropdown}
              </InputContainer>
              <InputContainer
                heading="Title"
                description="Highlight the essence of your proposal in a few words. This will appear on your proposal’s detail page and the main proposal feed. Keep it short, please :)"
              >
                {TitleComponent}
              </InputContainer>
              <InputContainer
                heading="Summary"
                description="Explain your proposal briefly. This is your chance to make a good first impression on the community. Include what needs or goals your work will address, your solution, and the benefit for the NEAR developer community."
              >
                {SummaryComponent}
              </InputContainer>
              <InputContainer
                heading="Description"
                description={
                  <>
                    Expand on your summary with any relevant details like your
                    contribution timeline, key milestones, team background, and
                    a clear breakdown of how the funds will be used. Proposals
                    should be simple and clear (e.g. 1 month). For more complex
                    projects, treat each milestone as a separate proposal.
                  </>
                }
              >
                {DescriptionComponent}
              </InputContainer>
              <InputContainer heading="Final Consent">
                {ConsentComponent}
              </InputContainer>
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <div>
                  {isEditPage && (
                    <Widget
                      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
                      props={{
                        classNames: {
                          root: "btn-outline-danger shadow-none border-0 btn-sm",
                        },
                        label: (
                          <div className="d-flex align-items-center gap-1">
                            <i class="bi bi-trash3"></i> Cancel Proposal
                          </div>
                        ),
                        onClick: () => setCancelModal(true),
                      }}
                    />
                  )}
                </div>
                <div
                  className="d-flex gap-2"
                  style={{
                    height: isDraftBtnOpen ? "25vh" : "auto",
                    alignItems: isDraftBtnOpen ? "flex-start" : "center",
                  }}
                >
                  <Link
                    to={
                      isEditPage
                        ? href({
                            widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
                            params: {
                              page: "proposal",
                              id: parseInt(id),
                            },
                          })
                        : href({
                            widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
                            params: {
                              page: "proposals",
                            },
                          })
                    }
                  >
                    <Widget
                      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
                      props={{
                        classNames: {
                          root: "d-flex h-100 text-muted fw-bold btn-outline shadow-none border-0 btn-sm",
                        },
                        label: "Discard Changes",
                        onClick: cleanDraft,
                      }}
                    />
                  </Link>
                  <SubmitBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ minWidth: "350px" }}
          className="flex-1 w-100 order-1 order-md-2"
        >
          <CollapsibleContainer noPaddingTop={true} title="Author Details">
            <div className="d-flex flex-column gap-3 gap-sm-4">
              <InputContainer heading="Author">
                {ProfileComponent}
              </InputContainer>
            </div>
          </CollapsibleContainer>
          <div className="my-2">
            <CollapsibleContainer title="Link Proposals (Optional)">
              {LinkedProposalsComponent}
            </CollapsibleContainer>
          </div>
          <div className="my-2">
            <CollapsibleContainer title="Funding Details">
              <div className="d-flex flex-column gap-3 gap-sm-4">
                <InputContainer
                  heading="Recipient NEAR Wallet Address"
                  description="Enter the address that will receive the funds. We’ll need this to send a test transaction once your proposal is approved."
                >
                  {ReceiverAccountComponent}
                </InputContainer>
                <InputContainer
                  heading={
                    <div className="d-flex gap-2 align-items-center">
                      Recipient Verification Status
                      <div className="custom-tooltip">
                        <i class="bi bi-info-circle-fill"></i>
                        <span class="tooltiptext">
                          To get approved and receive payments on our platform,
                          you must complete KYC/KYB verification using Fractal,
                          a trusted identity verification solution. This helps
                          others trust transactions with your account. Click
                          "Get Verified" to start. <br />
                          <br />
                          Once verified, your profile will display a badge,
                          which is valid for 365 days from the date of your
                          verification. You must renew your verification upon
                          expiration OR if any of your personal information
                          changes.
                        </span>
                      </div>
                    </div>
                  }
                  description=""
                >
                  <div className="border border-1 p-3 rounded-2">
                    <Widget
                      src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.VerificationStatus`}
                      props={{
                        receiverAccount: receiverAccount,
                        showGetVerifiedBtn: true,
                        imageSize: 30,
                      }}
                    />
                  </div>
                </InputContainer>
                <InputContainer
                  heading="Total Amount (USD)"
                  description={
                    <>
                      Enter the exact amount you are seeking. See
                      <a
                        href={FundingDocs}
                        className="text-decoration-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Funding Documentation
                      </a>
                      for guidelines.
                    </>
                  }
                >
                  {AmountComponent}
                </InputContainer>
                <InputContainer
                  heading="Currency"
                  description="Select your preferred currency for receiving funds. Note: The exchange rate for NEAR tokens will be the closing rate at the day of the invoice."
                >
                  {CurrencyComponent}
                </InputContainer>
              </div>
            </CollapsibleContainer>
          </div>
        </div>
      </div>
    </div>
  </Container>
);
