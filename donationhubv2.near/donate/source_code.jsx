/**
 * Require a project link
 */
const donationHubContractAccountId =
  props.donationHubContractAccountId || "donationhubv3.near".split("/", 1)[0];

/* END_INCLUDE: "core/lib/autocomplete" */

const postId = props.postId ?? null;

initState({
  seekingFunding: false,
  selectedElements: [],

  name: props.name ?? "",
  description: props.description ?? "",
  amount: props.amount ?? "",
  token: props.token ?? "",
  supervisor: props.supervisor ?? "kanapitch.near",
  chainPicked: "",
  bitkub_address: props.bitkub_address ?? "",
  jfin_address: props.jfin_address ?? "",
  eth_address: props.eth_address ?? "",
  postId: props.id ?? 0,
  receiver: "",
});

const sender = Ethers.send("eth_requestAccounts", [])[0];

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "erc20Abi not ok";
}

if (state.error) {
  return (
    <div>
      Dear user, we regret to inform you that we have received an error callback
      from the API. Our team is currently investigating the issue and working on
      resolving it as soon as possible. We apologize for any inconvenience this
      may have caused and thank you for your patience while we work to address
      the problem.
    </div>
  );
}

if (!sender) return <Web3Connect connectLabel="Please Connect Your Wallet" />;

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.chainId === 1) {
  State.update({
    chainPicked: "ETH",
    receiver: eth_address,
  });
} else if (state.chainId === 96) {
  State.update({
    chainPicked: "KUB",
    receiver: bitkub_address,
  });
} else if (state.chainId === 3501) {
  State.update({
    chainPicked: "JFIN",
    receiver: jfin_address,
  });
} else {
  return (
    <div>
      <h3>
        Wrong Network - We currently support the Ethereum, Bitkub Chain, and
        JFIN Chain exclusively. Kindly confirm that you are connected to the
        intended network before proceeding.
      </h3>
    </div>
  );
}

const chainChoice = (
  <div class="d-flex flex-column mb-2">
    <div className="col-lg-6  mb-2"></div>
    Token: <b>{state.chainPicked}</b>
    <span class="text-muted fw-normal">
      (You can change the token by changing the network)
    </span>
  </div>
);

const donateAmount = (
  <div class="d-flex flex-column mb-2">
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

async function sendTokens() {
  //   const erc20 = new ethers.Contract(
  //     "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
  //     erc20Abi.body,
  //     Ethers.provider().getSigner()
  //   );
  let amount = ethers.utils.parseUnits(state.donate_amount, 18);
  //   console.log("hello " + amount);
  //   erc20.transfer(state.receiver, amount);
  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: state.receiver,
      value: amount,
    })
    .then((tx) => {
      console.log("tx ", tx);
      if (state.chainId === 1) {
        State.update({ txHash: "https://etherscan.io/tx/" + tx.hash });
      } else if (state.chainId === 96) {
        State.update({ txHash: "https://www.bkcscan.com/tx/" + tx.hash });
      } else {
        State.update({ txHash: "https://www.exp.jfinchain.com/tx/" + tx.hash });
      }
    })
    .catch((error) => {
      console.log(error);
      //State.update({ error: true });
      State.update({
        errorText: "Can't make the transaction. Kindly check your balance.",
      });
    });
}

console.log("eth " + state.eth_address);
console.log("kub " + bitkub_address);
console.log("jfin " + jfin_address);

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
              <div className="row">
                {chainChoice}
                {donateAmount}
              </div>
              <div>
                <b>{state.errorText}</b>
              </div>
              <button
                style={{
                  width: "7rem",
                  backgroundColor: "#0C7283",
                  color: "#f3f3f3",
                }}
                className="btn btn-light mb-2 p-3"
                onClick={sendTokens}
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
