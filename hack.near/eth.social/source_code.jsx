const accountId = props.accountId ?? context.accountId;
const user = Ethers.send("eth_requestAccounts", [])[0];

const identity = Social.index("identity", "eth");
const data = Social.getr("*/identity/eth", "final");

if (!identity) {
  return "";
}

const accounts = Object.keys(identity);
const EthereumSigner = VM.require("sdks.near/widget/SDKs.EthereumSigner.Main");

State.init({
  address: "",
  proof: false,
  verified: false,
  broken: false,
  signature: "",
});

if (Ethers.send("eth_accounts", []).length > 0) {
  let [account] = Ethers.send("eth_accounts", []);

  State.update({
    address: account,
  });
}

let message = `I own ${context.accountId} and this Ethereum account: ${state.address}`;

const generateSignature = () => {
  EthereumSigner.sign(message).then((signature) => {
    State.update({
      signature,
      proof: true,
    });
  });
};

const verifySignature = () => {
  console.log(message, state.signature);
  EthereumSigner.verify(message, state.signature, state.address)
    .then((result) => {
      console.log(result);
      State.update({
        verified: result,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const toggleSignature = () => {
  if (state.broken) {
    State.update({
      signature: state.signature.substring(0, state.signature.length - 1),
      broken: false,
    });
  } else {
    State.update({ signature: state.signature + "a", broken: true });
  }
};

const networkId = props.network ?? "eth";

const save = () => {
  const data = {
    identity: {
      [networkId]: {
        name: state.address,
        signature: state.signature,
      },
    },
    index: {
      identity: JSON.stringify({
        key: networkId,
        value: state.address,
      }),
    },
  };

  Social.set(data);
};

return (
  <>
    <div className="m-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="m-2 mt-3">
          <h2>
            <b>NEAR ♡ ETH</b>
          </h2>
        </div>
        <div className="m-2">
          {!user && (
            <div className="m-2 ms-3">
              <Web3Connect connectLabel="Connect" />
            </div>
          )}
          {state.address && (
            <div className="m-2">
              {!state.proof && (
                <div className="m-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => generateSignature()}
                  >
                    Begin
                  </button>
                </div>
              )}
              {state.proof && (
                <div className="m-2">
                  {!state.verified && !state.broken && (
                    <button
                      className="btn btn-primary me-1"
                      onClick={() => verifySignature()}
                    >
                      Verify
                    </button>
                  )}
                  {state.proof && state.verified && !state.broken && (
                    <button className="btn btn-success me-1" onClick={save}>
                      Submit
                    </button>
                  )}
                  {state.broken && (
                    <button
                      className="btn btn-danger me-1"
                      onClick={() => State.update({ proof: false })}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="btn btn-outline-dark ms-1"
                    onClick={() => toggleSignature()}
                  >
                    {state.broken ? "Redo" : "Undo"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="m-2">
        <h5>
          <b>
            <i>Join our EVM-based community!</i>
          </b>
        </h5>
        <p>
          <i>
            Please sign a message on Ethereum to verify ownership of your
            connected account. Then, as proof, record that signature in the
            <a href="https://near.social/mob.near/widget/Explorer">
              SocialDB contract
            </a>
            (<a href="https://github.com/NearSocial/social-db">GitHub</a>) on
            NEAR.
          </i>
        </p>
      </div>
      <hr />
      <div className="m-2">
        <h3>Members</h3>
        <div className="m-1 mt-3">
          <Widget src="hack.near/widget/rbit.profiles" props={{ limit: 132 }} />
        </div>
      </div>
    </div>
  </>
);
