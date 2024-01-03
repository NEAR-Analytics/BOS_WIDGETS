const { normalize } =
  VM.require("devhub.near/widget/core.lib.stringUtils") || (() => {});

const CenteredMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 384px;
`;

if (!context.accountId) {
  return (
    <CenteredMessage height={"384px"}>
      <h2>Please sign in to create a post.</h2>
    </CenteredMessage>
  );
}

const postTypeOptions = {
  Idea: {
    name: "Idea",
    icon: "bi-lightbulb",

    description:
      "Get feedback from the community about a problem, opportunity, or need.",
  },

  Solution: {
    name: "Solution",
    icon: "bi-rocket",

    description:
      "Provide a specific proposal or implementation to an idea, optionally requesting funding. If your solution relates to an existing idea, please reply to the original post with a solution.",
  },
};

const typeSwitch = (optionName) => {
  State.update({
    postType: optionName,
  });
};

function initLabels() {
  const labels = [];
  if (props.labels) {
    labels.push(...props.labels.split(","));
  }
  if (props.referral) {
    labels.push(`referral:${props.referral}`);
  }
  return labels;
}

State.init({
  seekingFunding: false,
  labels: initLabels(),
  postType: "Idea",
  name: props.name ?? "",
  description: props.description ?? "",
  amount: props.amount ?? "",
  token: props.token ?? "USDT",
  supervisor: props.supervisor ?? "neardevdao.near",
  warning: "",
  mentionInput: "", // text next to @ tag
  mentionsArray: [], // all the mentions in the description
});

const autocompleteEnabled = true;

const AutoComplete = styled.div`
  z-index: 5;

  > div > div {
    padding: calc(var(--padding) / 2);
  }
`;

function textareaInputHandler(value) {
  const words = value.split(/\s+/);
  const allMentions = words
    .filter((word) => word.startsWith("@"))
    .map((mention) => mention.slice(1));
  const newMentions = allMentions.filter(
    (item) => !state.mentionsArray.includes(item)
  );

  State.update({
    text: value,
    showAccountAutocomplete: newMentions?.length > 0,
    mentionsArray: allMentions,
    mentionInput: newMentions?.[0] ?? "",
  });
}

function autoCompleteAccountId(id) {
  // to make sure we update the @ at correct index
  let currentIndex = 0;
  const updatedDescription = state.description.replace(
    /(?:^|\s)(@[^\s]*)/g,
    (match) => {
      if (currentIndex === state.mentionsArray.indexOf(state.mentionInput)) {
        currentIndex++;
        return ` @${id}`;
      } else {
        currentIndex++;
        return match;
      }
    }
  );

  State.update({
    handler: "autocompleteSelected",
    description: updatedDescription,
    showAccountAutocomplete: false,
  });
}

const { href } = VM.require("devhub.near/widget/core.lib.url");

if (!href) {
  return <p>Loading modules...</p>;
}

// This must be outside onClick, because Near.view returns null at first, and when the view call finished, it returns true/false.
// If checking this inside onClick, it will give `null` and we cannot tell the result is true or false.
let grantNotify = Near.view("social.near", "is_write_permission_granted", {
  predecessor_id: "devgovgigs.near",
  key: context.accountId + "/index/notify",
});
if (grantNotify === null) {
  return;
}

const onSubmit = () => {
  let body = {
    name: state.name,
    description: generateDescription(
      state.description,
      state.amount,
      state.token,
      state.supervisor,
      state.seekingFunding
    ),
  };

  if (state.postType === "Solution") {
    body = {
      ...body,
      post_type: "Solution",
      solution_version: "V1",
    };
  } else {
    // Idea
    body = {
      ...body,
      post_type: "Idea",
      idea_version: "V1",
    };
  }

  let txn = [];

  txn.push({
    contractName: "devgovgigs.near",
    methodName: "add_post",
    args: {
      parent_id: null,
      labels: state.labels,
      body: body,
    },
    gas: Big(10).pow(14),
  });

  if (grantNotify === false) {
    txn.unshift({
      contractName: "social.near",
      methodName: "grant_write_permission",
      args: {
        predecessor_id: "devgovgigs.near",
        keys: [context.accountId + "/index/notify"],
      },
      gas: Big(10).pow(14),
      deposit: Big(10).pow(22),
    });
  }

  Near.call(txn);
};

const onIdeaClick = () => {
  State.update({ postType: "Idea", seekingFunding: false });
};

const onSolutionClick = () => {
  State.update({ postType: "Solution" });
};

const checkLabel = (label) => {
  Near.asyncView("devgovgigs.near", "is_allowed_to_use_labels", {
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
  const normalizedLabels = labels.map((o) =>
    o.customOption ? normalize(o.label) : normalize(o)
  );
  const uniqueLabels = [...new Set(normalizedLabels)];

  if (uniqueLabels.length < state.labels.length) {
    const removedLabel = state.labels.find(
      (label) => !uniqueLabels.includes(label)
    );

    const allowed = Near.asyncView(
      "devgovgigs.near",
      "is_allowed_to_use_labels",
      {
        editor: context.accountId,
        labels: [removedLabel],
      }
    );

    if (allowed) {
      State.update({ labels: uniqueLabels });
    } else {
      State.update({
        warning: `The label "${removedLabel}" is protected and can only be updated by moderators`,
      });
    }
  } else {
    State.update({ labels: uniqueLabels });
  }
};

const existingLabels =
  Near.view("devgovgigs.near", "get_all_allowed_labels", {
    editor: context.accountId,
  }) ?? [];
const allowedLabels = existingLabels.filter((it) => it !== "blog"); // remove blog label so users cannot publish blogs from feed

function NameEditor() {
  return (
    <div className="col-lg-12 mb-2">
      <label htmlFor="title" className="fs-6 fw-bold mb-1">
        Title
      </label>
      <input
        name="title"
        id="title"
        data-testid="name-editor"
        type="text"
        value={state.name}
        onChange={(event) => State.update({ name: event.target.value })}
      />
    </div>
  );
}

function DescriptionEditor() {
  return (
    <div className="col-lg-12 mb-2">
      <label htmlFor="description" className="fs-6 fw-bold mb-1">
        Description
      </label>
      <Widget
        src="devhub.near/widget/devhub.components.molecule.MarkdownEditor"
        props={{
          data: { handler: state.handler, content: state.description },
          onChange: (content) => {
            State.update({ description: content, handler: "update" });
            textareaInputHandler(content);
          },
        }}
      />
      {autocompleteEnabled && state.showAccountAutocomplete && (
        <AutoComplete>
          <Widget
            src="devhub.near/widget/devhub.components.molecule.AccountAutocomplete"
            props={{
              term: state.mentionInput,
              onSelect: autoCompleteAccountId,
              onClose: () => State.update({ showAccountAutocomplete: false }),
            }}
          />
        </AutoComplete>
      )}
    </div>
  );
}

function LabelsEditor() {
  return (
    <div className="col-lg-12 mb-2">
      <label htmlFor="labels" className="fs-6 fw-bold mb-1">
        Labels
      </label>
      <Typeahead
        multiple
        onInputChange={checkLabel}
        onChange={setLabels}
        options={allowedLabels}
        placeholder="near.social, widget, NEP, standard, protocol, tool"
        selected={state.labels}
        positionFixed
        allowNew={(results, props) => {
          return (
            !allowedLabels.includes(props.text) &&
            props.text.toLowerCase() !== "blog" && // dont allow adding "Blog"
            props.selected.filter((selected) => selected.name === props.text)
              .length == 0 &&
            Near.view("devgovgigs.near", "is_allowed_to_use_labels", {
              editor: context.accountId,
              labels: [props.text],
            })
          );
        }}
      />
    </div>
  );
}

function FundraisingToggle() {
  return (
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
}

function Fundraising() {
  return (
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
          <option value="USDC">USDC</option>
        </select>
      </div>
      <div className="col-lg-6 mb-2">
        Requested amount{" "}
        <span class="text-muted fw-normal">(Numbers Only)</span>
        <input
          data-testid="requested-amount-editor"
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
            onChange={(event) =>
              State.update({ supervisor: event.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

function generateDescription(text, amount, token, supervisor, seekingFunding) {
  const fundingText =
    amount > 0 && token ? `###### Requested amount: ${amount} ${token}\n` : "";
  const supervisorText = supervisor
    ? `###### Requested sponsor: @${supervisor}\n`
    : "";
  return seekingFunding ? `${fundingText}${supervisorText}${text}` : text;
}

const [tab, setTab] = useState("editor");

return (
  <div class="bg-light d-flex flex-column flex-grow-1 w-100">
    <div class="mx-2 mx-md-5 mb-5">
      {props.transactionHashes ? (
        <>
          Post created successfully. Back to{" "}
          <Link
            style={{
              color: "#3252A6",
            }}
            className="fw-bold"
            to={href({
              widgetSrc: "devhub.near/widget/app",
              params: { page: "feed" },
            })}
          >
            feed
          </Link>
        </>
      ) : (
        <>
          <div className="card">
            <div className="card-header pb-0">
              <div>
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <button
                      class={`nav-link ${tab === "editor" ? "active" : ""}`}
                      onClick={() => setTab("editor")}
                    >
                      Editor
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class={`nav-link ${tab === "preview" ? "active" : ""}`}
                      onClick={() => setTab("preview")}
                    >
                      Preview
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card border-light">
              {tab === "editor" && (
                <>
                  <div class="card-body">
                    <p class="card-title fw-bold fs-6">
                      What do you want to create?
                    </p>
                    <div class="d-flex flex-row gap-2">
                      {Object.values(postTypeOptions).map((option) => (
                        <button
                          className={`btn btn-${
                            state.postType === option.name
                              ? "primary"
                              : "outline-secondary"
                          }`}
                          data-testid={`btn-${option.name.toLowerCase()}`}
                          key={option.name}
                          onClick={() => typeSwitch(option.name)}
                          style={
                            state.postType === option.name
                              ? {
                                  backgroundColor: "#0C7283",
                                  color: "#f3f3f3",
                                }
                              : null
                          }
                          type="button"
                        >
                          <i className={`bi ${option.icon}`} />
                          <span>{option.name}</span>
                        </button>
                      ))}
                    </div>
                    <p class="text-muted w-100 my-1">
                      {postTypeOptions[state.postType].description}
                    </p>
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
                    <div className="row mt-3">
                      <NameEditor />
                      <DescriptionEditor />
                      <LabelsEditor />
                      {state.postType === "Solution" && <FundraisingToggle />}
                      {state.seekingFunding && <Fundraising />}
                    </div>
                    <button
                      data-testid="submit-create-post"
                      style={{
                        width: "7rem",
                        backgroundColor: "#0C7283",
                        color: "#f3f3f3",
                      }}
                      disabled={
                        (state.seekingFunding &&
                          (!state.amount || state.amount < 1)) ||
                        state.name === "" ||
                        state.description === ""
                      }
                      className="btn btn-light mb-2 p-3"
                      onClick={onSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
              {tab === "preview" && (
                <div class="card-body">
                  <p class="card-title fw-bold fs-6">Preview</p>
                  <div>
                    <Widget
                      src="devhub.near/widget/devhub.entity.post.Post"
                      props={{
                        isPreview: true,
                        id: 0, // irrelevant
                        post: {
                          author_id: context.accountId,
                          likes: [],
                          snapshot: {
                            labels: state.labels,
                            post_type: state.postType,
                            name: state.name,
                            description: generateDescription(
                              state.description,
                              state.amount,
                              state.token,
                              state.supervisor,
                              state.seekingFunding
                            ),
                          },
                        },
                      }}
                    />
                  </div>
                  <button
                    data-testid="submit-create-post"
                    style={{
                      width: "7rem",
                      backgroundColor: "#0C7283",
                      color: "#f3f3f3",
                    }}
                    disabled={
                      (state.seekingFunding &&
                        (!state.amount || state.amount < 1)) ||
                      state.name === "" ||
                      state.description === ""
                    }
                    className="btn btn-light my-2 p-3"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
