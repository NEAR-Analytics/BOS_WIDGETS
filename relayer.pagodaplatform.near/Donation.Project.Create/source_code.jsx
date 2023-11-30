/**
 * Require a project link
 */
const donationHubContractAccountId =
  props.donationHubContractAccountId || "donationhubv2.near".split("/", 1)[0];

/* END_INCLUDE: "core/lib/autocomplete" */

const DRAFT_STATE_STORAGE_KEY = "DRAFT_STATE";
const parentId = props.parentId ?? null;
const postId = props.postId ?? null;
const mode = props.mode ?? "Create";

const referralLabels = props.referral ? [`${props.referral}`] : [];
const labelStrings = (props.labels ? props.labels.split(",") : []).concat(
  referralLabels
);

initState({
  seekingFunding: false,
  selectedElements: [],

  // Should be a list of objects with field "name".
  // Should be a list of labels as strings.
  //postType: "Solution",
  name: props.name ?? "",
  description: props.description ?? "",
  amount: props.amount ?? "",
  token: props.token ?? "USDT",
  supervisor: props.supervisor ?? "kanapitch.near",
});

// This must be outside onClick, because Near.view returns null at first, and when the view call finished, it returns true/false.
// If checking this inside onClick, it will give `null` and we cannot tell the result is true or false.
const onSubmit = () => {
  //Storage.privateSet(DRAFT_STATE_STORAGE_KEY, JSON.stringify(state));

  let body = {
    description: generateDescription(
      state.description,
      state.amount,
      state.token,
      state.supervisor
    ),
  };

  if (!context.accountId) return;

  let txn = [];
  if (mode == "Create") {
    txn.push({
      contractName: donationHubContractAccountId,
      methodName: "add_post",
      args: {
        name: state.name,
        description: body.description,
      },
      //   deposit: Big(10).pow(21).mul(3),
      //   gas: Big(10).pow(12).mul(100),
    });
  }
  Near.call(txn);
};

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
  </div>
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

function generateDescription(text, amount, token, supervisor) {
  const funding = `Requested amount: ${amount} ${token}~Requested sponsor: @${supervisor}\n`;
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
          >
            feed
          </a>
        </>
      ) : (
        <>
          <p>{state.seekingFunding}</p>
          <div class="card border-light">
            <div class="card-body">
              <h1 class="card-title fw-bold fs-1">Donation HUB</h1>

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
                {categoryDiv}
                {fundraisingDiv}
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
            <div class="card-body"></div>
          </div>
        </>
      )}
    </div>
  </div>
);
