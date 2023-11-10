State.init({ txHistory: [], viewNonce: 0 });
if (!context.accountId) {
  return (
    <>
      Please create an account on{" "}
      <a href="https://wallet.near.org/">https://wallet.near.org/</a> and login
    </>
  );
}

function getNearBalance(accountId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  };
  asyncFetch("https://rpc.mainnet.near.org", options).then((res) => {
    const { amount, storage_usage } = res.body.result;
    const COMMON_MIN_BALANCE = 0.05;

    let newBalance = "-";
    if (amount) {
      const availableBalance = Big(amount || 0).minus(
        Big(storage_usage).mul(Big(10).pow(19))
      );
      const balance = availableBalance
        .div(Big(10).pow(24))
        .minus(COMMON_MIN_BALANCE);
      newBalance = balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
    }
    State.update({
      nearBalance: newBalance,
    });
  });
}

const getPublicKeyUrl = "https://quex.nearspace.info/pk";
const contractId = "hack.quex.near";
getNearBalance(contractId);

if (!state.publicKey) {
  const publicKeyRequest = fetch(getPublicKeyUrl);
  if (!publicKeyRequest.ok) {
    return "Loading Public Key";
  } else {
    State.update({ publicKey: JSON.parse(publicKeyRequest.body)?.pk ?? "NaN" });
  }
}

const messages = Near.view(contractId, "getMessages", {
  account_id: context.accountId,
  viewNonce: state.viewNonce,
});
console.log("getMessages", messages, context.accountId);

const serverUrl = "https://quex.nearspace.info";

if (props.transactionHashes) {
  const txToLoad = props.transactionHashes;
  if (state.txHistory.includes(txToLoad)) {
    console.log("Already loaded");
  } else {
    console.log("txhash", txToLoad);

    const txHistory = state.txHistory;
    txHistory.push(txToLoad);
    State.update({ isLoading: true, txToLoad });

    asyncFetch(`${serverUrl}/?txhash=${txToLoad}&pk=${state.publicKey}`).then(
      (fetchData) => {
        const txData = fetchData.body;
        console.log(txData);
        let viewNonce = state.viewNonce;
        State.update({
          response: txData,
          isLoading: false,
          txToLoad: "",
          viewNonce: viewNonce + 1,
        });
      }
    );
  }
}

const Send = () => {
  Near.call(
    contractId,
    "addRequest",
    { msg: state.msg },
    100000000000000,
    100000000000000000000000
  );
};
return (
  <div>
    <h1 class="pb-3">
      <a href="/quex.near/widget/Index">Quex</a>
    </h1>
    <h4>Current Treasury: {state.nearBalance} NEAR</h4>
    <p>
      I am Stephen, an application manager at the Near Protocol Grant program.
      My role is to validate the grant proposal and provide a response of
      "funded" if the proposal meets our criteria or "declined" if it does not.
      To ensure the proposal aligns with our program's requirements, it must be
      innovative, decentralized, and valuable to the NEAR ecosystem. I'll ask
      additional questions about the proposal one by one. Before asking these
      questions, I will respond with a single word, and I'll make sure the
      proposal follows our grant program criteria. If a message does not
      describe the proposal, I'll reply with "Please, focus on your proposal,"
      ask one more question, and then make a decision.
    </p>
    <ul class="pb-3">
      <li>
        <span class="text-success">Stephen</span>: Hi there! How can I help?
      </li>
      {(messages ?? []).map((message) => (
        <li>
          {message[0] == "Bot" ? (
            <span class="text-success">Stephen:</span>
          ) : (
            "User:"
          )}

          {["funded", "funded."].includes(message[1].toLowerCase()) ? (
            <span class="text-success fw-bold">
              CONGRATS! YOU GOT FUNDING! CHECK YOU WALLET!
            </span>
          ) : (
            message[1]
          )}
        </li>
      ))}
    </ul>
    <div>
      <div>Message:</div>
      <textarea
        style={{ width: "500px", height: "120px" }}
        onChange={(e) => State.update({ msg: e.target.value })}
      />
    </div>
    <div>
      <button
        value="Send"
        onClick={Send}
        onChange={(e) => State.update({ msg: e.target.value })}
      >
        Send
      </button>
    </div>
    <p>Use English only</p>
    <div class="pt-4">
      {state.isLoading && <>Loading...</>}
      {state.isLoading && state.txToLoad && (
        <>Your pending tx: {state.txToLoad}</>
      )}
      {state.response && (
        <>
          Verification for debug: {JSON.parse(state.response)["logs"]}
          Response: <hr />
          <a
            target="_blank"
            href={`https://explorer.near.org/transactions/${
              JSON.parse(state.response)["id"]
            }`}
          >
            Response Id {JSON.parse(state.response)["id"]}
          </a>
        </>
      )}
    </div>
  </div>
);
