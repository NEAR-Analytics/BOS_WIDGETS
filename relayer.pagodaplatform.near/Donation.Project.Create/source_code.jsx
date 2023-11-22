/**
 * Require a project link
 */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId || "devgovgigs.near".split("/", 1)[0];

const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId || "devgovgigs.near".split("/", 1)[0];
const prependTitle = "BOSHACKS Submission: ";

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };

  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };

  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }

  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }

  if (props.referral) {
    linkProps.referral = props.referral;
  }

  const linkPropsQuery = Object.entries(linkProps)
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

/* INCLUDE: "core/lib/autocomplete" */
const autocompleteEnabled = true;
const AutoComplete = styled.div`
  z-index: 5;

  > div > div {
    padding: calc(var(--padding) / 2);
  }
`;

function textareaInputHandler(value) {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(value);
  State.update({ text: value, showAccountAutocomplete });
}
function textareaInputHandlerTeam(value) {
  const showAccountAutocompleteTeam = /@[\w][^\s]*$/.test(value);
  State.update({ text1: value, showAccountAutocompleteTeam });
}
function autoCompleteAccountIdTeam(id) {
  let description = state.teammates.replace(/[\s]{0,1}@[^\s]*$/, "");
  let teammates = `${description} @${id}`.trim() + " ";
  State.update({ teammates, showAccountAutocompleteTeam: false });
}

function autoCompleteAccountId(id) {
  let description = state.description.replace(/[\s]{0,1}@[^\s]*$/, "");
  description = `${description} @${id}`.trim() + " ";
  State.update({ description, showAccountAutocomplete: false });
}
/* END_INCLUDE: "core/lib/autocomplete" */

const DRAFT_STATE_STORAGE_KEY = "DRAFT_STATE";
const parentId = props.parentId ?? null;
const postId = props.postId ?? null;
const mode = props.mode ?? "Create";

const referralLabels = props.referral ? [`${props.referral}`] : [];
const labelStrings = (props.labels ? props.labels.split(",") : []).concat(
  referralLabels
);
// const labelStringsText = "boshacks";
// const labelStringsInit =
// const labelsInit = labelStringsInit.map((s) => {
//   return { name: s };
// });

const labels = labelStrings.map((s) => {
  return { name: s };
});

const elements = [
  "Charity",
  "Tuition",
  "Funding",
  "Research",
  /*"CreativesDAO",
  "GenaDrop",
  "NDC GWG",
  "Mailchain",
  "Indexer.xyz",
  "NEAR ReFI",
  "ProofOfVibes"*/
];

const handleSelect = (id) => {
  // check if already selected
  if (state.selectedElements.includes(id)) {
    // if already selected, remove check
    const updatedElements = state.selectedElements.filter(
      (elementId) => elementId !== id
    );
    // update in local storage so it can be picked up by the cart
    const bountyString = JSON.stringify(updatedElements);
    console.log("Bounty String: " + bountyString);
    // update in state, so there is a smooth experience
    State.update({
      selectedElements: updatedElements,
      bounty: bountyString,
    });
  } else {
    // not selected, so add to array
    const updatedElements = [...state.selectedElements, id];
    // update in local storage so it can be picked up by the cart
    const bountyString = JSON.stringify(updatedElements);
    console.log("Bounty String: " + bountyString);
    // update in state, so there is a smooth experience
    State.update({
      selectedElements: updatedElements,
      bounty: bountyString,
    });
  }
};

initState({
  seekingFunding: false,
  selectedElements: [],
  projectUrl: "",
  demoUrl: "",

  //
  author_id: context.accountId,
  // Should be a list of objects with field "name".
  labels,
  // Should be a list of labels as strings.
  // Both of the label structures should be modified together.
  labelStrings,
  postType: "Solution",
  name: props.name ?? "",
  description: props.description ?? "",
  bounty: props.bounty ?? "",
  teammates: "",
  amount: props.amount ?? "",
  token: props.token ?? "USDT",
  supervisor: props.supervisor ?? "neardevgov.near",
  githubLink: props.githubLink ?? "",
  warning: "",
  waitForDraftStateRestore: true,
});

if (state.waitForDraftStateRestore) {
  const draftstatestring = Storage.privateGet(DRAFT_STATE_STORAGE_KEY);
  if (draftstatestring != null) {
    if (props.transactionHashes) {
      State.update({ waitForDraftStateRestore: false });
      Storage.privateSet(DRAFT_STATE_STORAGE_KEY, undefined);
    } else {
      try {
        const draftstate = JSON.parse(draftstatestring);
        State.update(draftstate);
      } catch (e) {
        console.error("error restoring draft", draftstatestring);
      }
    }
    State.update({ waitForDraftStateRestore: false });
  }
}

// This must be outside onClick, because Near.view returns null at first, and when the view call finished, it returns true/false.
// If checking this inside onClick, it will give `null` and we cannot tell the result is true or false.
let grantNotify = Near.view("social.near", "is_write_permission_granted", {
  predecessor_id: nearDevGovGigsContractAccountId,
  key: context.accountId + "/index/notify",
});
if (grantNotify === null) {
  return;
}

const onSubmit = () => {
  Storage.privateSet(DRAFT_STATE_STORAGE_KEY, JSON.stringify(state));

  let labels = state.labelStrings;

  let body = {
    name: prependTitle + state.name,
    description: generateDescription(
      state.description,
      state.amount,
      state.token,
      state.supervisor,
      state.bounty,
      state.teammates,
      state.projectUrl,
      state.demoUrl
    ),
  };

  if (state.postType === "Solution") {
    body = {
      ...body,
      post_type: "Submission",
      submission_version: "V1",
    };
  } else {
    // Idea
    body = {
      ...body,
      post_type: "Idea",
      idea_version: "V1",
    };
  }

  if (!context.accountId) return;

  let txn = [];
  if (mode == "Create") {
    txn.push({
      contractName: nearDevGovGigsContractAccountId,
      methodName: "add_post",
      args: {
        parent_id: parentId,
        labels,
        body: body,
      },
      deposit: Big(10).pow(21).mul(3),
      gas: Big(10).pow(12).mul(100),
    });
  } else if (mode == "Edit") {
    txn.push({
      contractName: nearDevGovGigsContractAccountId,
      methodName: "edit_post",
      args: {
        id: postId,
        labels,
        body: body,
      },
      deposit: Big(10).pow(21).mul(2),
      gas: Big(10).pow(12).mul(100),
    });
  }
  if (mode == "Create" || mode == "Edit") {
    if (grantNotify === false) {
      txn.unshift({
        contractName: "social.near",
        methodName: "grant_write_permission",
        args: {
          predecessor_id: nearDevGovGigsContractAccountId,
          keys: [context.accountId + "/index/notify"],
        },
        deposit: Big(10).pow(23),
        gas: Big(10).pow(12).mul(30),
      });
    }
    Near.call(txn);
  }
};

const onIdeaClick = () => {
  State.update({ postType: "Idea", seekingFunding: false });
};

const onSolutionClick = () => {
  State.update({ postType: "Solution" });
};

const normalizeLabel = (label) =>
  label
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const checkLabel = (label) => {
  Near.asyncView(nearDevGovGigsContractAccountId, "is_allowed_to_use_labels", {
    editor: context.accountId,
    labels: [label],
  }).then((allowed) => {
    if (allowed) {
      State.update({ warning: "" });
    } else {
      State.update({
        warning:
          'The label "' +
          label +
          '" is protected and can only be added by moderators',
      });
      return;
    }
  });
};

const setLabels = (labels) => {
  labels = labels.map((o) => {
    o.name = normalizeLabel(o.name);
    return o;
  });
  if (labels.length < state.labels.length) {
    let oldLabels = new Set(state.labels.map((label) => label.name));
    for (let label of labels) {
      oldLabels.delete(label.name);
    }
    let removed = oldLabels.values().next().value;
    Near.asyncView(
      nearDevGovGigsContractAccountId,
      "is_allowed_to_use_labels",
      { editor: context.accountId, labels: [removed] }
    ).then((allowed) => {
      if (allowed) {
        let labelStrings = labels.map(({ name }) => name);
        State.update({ labels, labelStrings });
      } else {
        State.update({
          warning:
            'The label "' +
            removed +
            '" is protected and can only be updated by moderators',
        });
        return;
      }
    });
  } else {
    let labelStrings = labels.map((o) => {
      return o.name;
    });
    State.update({ labels, labelStrings });
  }
};
const existingLabelStrings =
  Near.view(nearDevGovGigsContractAccountId, "get_all_allowed_labels", {
    editor: context.accountId,
  }) ?? [];
const existingLabelSet = new Set(existingLabelStrings);
const existingLabels = existingLabelStrings.map((s) => {
  return { name: s };
});

const labelEditor = (
  <div className="col-lg-12 mb-2">
    <p className="fs-4 fw-bold mb-1">Labels</p>
    <Typeahead
      multiple
      labelKey="name"
      onInputChange={checkLabel}
      onChange={setLabels}
      options={existingLabels}
      placeholder="boshacks, submission, team-formation"
      selected={state.labels}
      positionFixed
      allowNew={(results, props) => {
        return (
          !existingLabelSet.has(props.text) &&
          props.selected.filter((selected) => selected.name === props.text)
            .length == 0 &&
          Near.view(
            nearDevGovGigsContractAccountId,
            "is_allowed_to_use_labels",
            { editor: context.accountId, labels: [props.text] }
          )
        );
      }}
    />
  </div>
);

const nameDiv = (
  <div className="col-lg-6 mb-2">
    <p className="fs-4 fw-bold mb-1">Project Name</p>
    <input
      type="text"
      value={state.name}
      onChange={(event) => State.update({ name: event.target.value })}
    />
  </div>
);

const descriptionDiv = (
  <div className="col-lg-12 mb-2">
    <p className="fs-4 fw-bold mb-1">Description</p>
    <p class="text-muted w-75 my-1"> Tell us about project story </p>
    <textarea
      value={state.description}
      type="text"
      rows={6}
      className="form-control"
      onInput={(event) => textareaInputHandler(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Escape") {
          State.update({ showAccountAutocomplete: false });
        }
      }}
      onChange={(event) => State.update({ description: event.target.value })}
    />
    {autocompleteEnabled && state.showAccountAutocomplete && (
      <AutoComplete>
        <Widget
          src="near/widget/AccountAutocomplete"
          props={{
            term: state.text.split("@").pop(),
            onSelect: autoCompleteAccountId,
            onClose: () => State.update({ showAccountAutocomplete: false }),
          }}
        />
      </AutoComplete>
    )}
  </div>
);
const teamDiv = (
  <div className="col-lg-12 mb-2">
    <p className="fs-4 fw-bold mb-1">Teammates</p>
    <p class="text-muted w-75 my-1"> @ the near addresses of your teammates</p>
    <textarea
      value={state.teammates}
      type="text"
      rows={2}
      className="form-control"
      onInput={(event) => textareaInputHandlerTeam(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Escape") {
          State.update({ showAccountAutocomplete: false });
        }
      }}
      onChange={(event) => State.update({ teammates: event.target.value })}
    />
    {autocompleteEnabled && state.showAccountAutocompleteTeam && (
      <AutoComplete>
        <Widget
          src="near/widget/AccountAutocomplete"
          props={{
            term: state.text1.split("@").pop(),
            onSelect: autoCompleteAccountIdTeam,
            onClose: () => State.update({ showAccountAutocomplete: false }),
          }}
        />
      </AutoComplete>
    )}
  </div>
);
const projectDiv = (
  <div className="col-lg-12 mb-2">
    <p className="fs-4 fw-bold mb-1">Project Link</p>
    <p class="text-muted w-75 my-1"> Put a URL of your project </p>
    <textarea
      value={state.projectUrl}
      type="text"
      rows={1}
      className="form-control"
      onInput={(event) => textareaInputHandlerTeam(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Escape") {
          State.update({ showAccountAutocomplete: false });
        }
      }}
      onChange={(event) => State.update({ projectUrl: event.target.value })}
    />
  </div>
);
const demoDiv = (
  <div className="col-lg-12 mb-2">
    <p className="fs-4 fw-bold mb-1">
      Where will your project have the most impact?
    </p>
    <p class="text-muted w-75 my-1">Location </p>
    <textarea
      value={state.demoUrl}
      type="text"
      rows={1}
      className="form-control"
      onInput={(event) => textareaInputHandlerTeam(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Escape") {
          State.update({ showAccountAutocomplete: false });
        }
      }}
      onChange={(event) => State.update({ demoUrl: event.target.value })}
    />
  </div>
);
const bountiesDiv = (
  <div className="col-lg-12 mb-2">
    <p className="fs-4 fw-bold mb-1">Please select a category</p>
    <p class="text-muted w-75 my-1"> </p>
    <div className="border">
      {elements?.map((it) => (
        <div key={it} className="d-flex align-items-center mb-3">
          <p className="mb-0">{it}</p>
          <input
            type="checkbox"
            checked={state.selectedElements.includes(it)}
            onChange={() => handleSelect(it)}
            className="form-check-input ms-3"
          />
        </div>
      ))}
    </div>
  </div>
);

const isFundraisingDiv = (
  // This is jank with just btns and not radios. But the radios were glitchy af
  <>
    <div class="mb-2">
      <p class="fs-6 fw-bold mb-1">
        Are you seeking funding for your solution?
        <span class="text-muted fw-normal">(Optional)</span>
      </p>
      <div class="form-check form-check-inline">
        <label class="form-check-label">
          <button
            className="btn btn-light p-0"
            style={{
              backgroundColor: state.seekingFunding ? "#0C7283" : "inherit",
              color: "#f3f3f3",
              border: "solid #D9D9D9",
              borderRadius: "100%",
              height: "20px",
              width: "20px",
            }}
            onClick={() => State.update({ seekingFunding: true })}
          />
          Yes
        </label>
      </div>
      <div class="form-check form-check-inline">
        <label class="form-check-label">
          <button
            className="btn btn-light p-0"
            style={{
              backgroundColor: !state.seekingFunding ? "#0C7283" : "inherit",
              color: "#f3f3f3",
              border: "solid #D9D9D9",
              borderRadius: "100%",
              height: "20px",
              width: "20px",
            }}
            onClick={() => State.update({ seekingFunding: false })}
          />
          No
        </label>
      </div>
    </div>
  </>
);

const fundraisingDiv = (
  <div class="d-flex flex-column mb-2">
    <div className="col-lg-6  mb-2">
      Currency
      <select
        onChange={(event) => State.update({ token: event.target.value })}
        class="form-select"
        aria-label="Default select"
      >
        <option selected value="USDT">
          USDT
        </option>
        <option value="NEAR">NEAR</option>
      </select>
    </div>
    <div className="col-lg-6 mb-2">
      Requested amount <span class="text-muted fw-normal">(Numbers Only)</span>
      <input
        type="number"
        value={parseInt(state.amount) > 0 ? state.amount : ""}
        min={0}
        onChange={(event) =>
          State.update({
            amount: Number(
              event.target.value.toString().replace(/e/g, "")
            ).toString(),
          })
        }
      />
    </div>
    <div className="col-lg-6 mb-2">
      <p class="mb-1">
        Requested sponsor <span class="text-muted fw-normal">(Optional)</span>
      </p>
      <p style={{ fontSize: "13px" }} class="m-0 text-muted fw-light">
        If you are requesting funding from a specific sponsor, please enter
        their username.
      </p>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          @
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Enter username"
          value={state.supervisor}
          onChange={(event) => State.update({ supervisor: event.target.value })}
        />
      </div>
    </div>
  </div>
);

function generateDescription(
  text,
  amount,
  token,
  supervisor,
  bounty,
  teammates,
  projectUrl,
  demoUrl
) {
  const bountyLine = `\n###### 💸 Bounties:\n ${bounty}\n`;
  const teammateLine = `\n###### 👭 Teammates:\n ${teammates}\n`;

  const projectLine = `\n###### 🔗 Project Link:\n ${projectUrl}\n`;
  const demoLine = `\n###### 🎥 Demo Link:\n ${demoUrl}\n`;
  const newText = text;
  if (bounty.length > 0) newText += bountyLine;

  if (teammates.length > 0) newText += teammateLine;
  if (projectUrl.length > 0) newText += projectLine;
  if (demoUrl.length > 0) newText += demoLine;

  const funding = `###### Requested amount: ${amount} ${token}\n###### Requested sponsor: @${supervisor}\n`;
  if (amount > 0 && token && supervisor) return funding + text;
  return newText;
}

return (
  <div class="bg-light d-flex flex-column flex-grow-1">
    <div class="mx-5 mb-5">
      {props.transactionHashes ? (
        <>
          Succesfull submission. Back to{" "}
          <a
            style={{
              color: "#3252A6",
            }}
            className="fw-bold"
            href={href("Feed")}
          >
            feed
          </a>
        </>
      ) : (
        <>
          <p>{state.seekingFunding}</p>
          <div class="card border-light">
            <div class="card-body">
              <h1 class="card-title fw-bold fs-1">Submit BOS HACKS Project</h1>

              {state.warning && (
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {state.warning}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => State.update({ warning: "" })}
                  ></button>
                </div>
              )}
              <div className="row">
                {nameDiv}
                {descriptionDiv}
                {bountiesDiv}
                {teamDiv}
                {projectDiv}
                {demoDiv}
                {labelEditor}

                {state.seekingFunding && fundraisingDiv}
              </div>
              <button
                style={{
                  width: "7rem",
                  backgroundColor: "#0C7283",
                  color: "#f3f3f3",
                }}
                className="btn btn-light mb-2 p-3"
                onClick={onSubmit}
              >
                Post
              </button>
            </div>
            <div class="bg-light d-flex flex-row p-1 border-bottom"></div>
            <div class="card-body">
              <p class="text-muted m-0">Preview</p>
              <div>
                {widget("entity.post.Post", {
                  isPreview: true,
                  id: 0, // irrelevant
                  post: {
                    author_id: state.author_id,
                    likes: [],
                    snapshot: {
                      editor_id: state.editor_id,
                      labels: state.labelStrings,
                      post_type: state.postType,
                      name: prependTitle + state.name,
                      description: generateDescription(
                        state.description,
                        state.amount,
                        state.token,
                        state.supervisor,
                        state.bounty,
                        state.teammates,
                        state.projectUrl,
                        state.demoUrl
                      ),
                      github_link: state.githubLink,
                    },
                  },
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
