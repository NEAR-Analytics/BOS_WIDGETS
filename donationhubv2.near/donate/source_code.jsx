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

  name: props.name ?? "",
  description: props.description ?? "",
  amount: props.amount ?? "",
  token: props.token ?? "USDT",
  supervisor: props.supervisor ?? "kanapitch.near",
  chain: "",
  bitkub_address: props.bitkub_address ?? "",
  jfin_address: props.jfin_address ?? "",
  eth_address: props.eth_address ?? "",
  postId: props.id ?? 0,
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

const donate = (
  <div class="d-flex flex-column mb-2">
    <div className="col-lg-6  mb-2">
      Chain-Currency
      <select
        onChange={(event) =>
          State.update({ token: event.target.value, chain: event.target.value })
        }
        class="form-select"
        aria-label="Default select"
      >
        <option selected value="ETH">
          ETH
        </option>
        <option value="KUB">KUB</option>
        <option value="JFIN">JFIN</option>
      </select>
    </div>
    <div className="col-lg-6 mb-2">
      Donated amount <span class="text-muted fw-normal">(Numbers Only)</span>
      <input
        type="number"
        step="0.000001"
        value={state.donate_amount !== null ? state.donate_amount : ""}
        min={0}
        onChange={(event) => {
          const newValue = event.target.value;
          // Ensure the input is a valid number
          if (/^\d*\.?\d{0,18}$/.test(newValue)) {
            State.update({
              donate_amount: newValue,
            });
          }
        }}
      />
    </div>
  </div>
);

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
              <h1 class="card-title fw-bold fs-1">Donation</h1>

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
              <div className="row">{donate}</div>
              <button
                style={{
                  width: "7rem",
                  backgroundColor: "#0C7283",
                  color: "#f3f3f3",
                }}
                className="btn btn-light mb-2 p-3"
                onClick={onSubmit}
              >
                Donate
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
