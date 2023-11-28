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

const ChatBox = styled.div`
.message-chat {
  width: 100%;
  overflow: hidden;
}

.chat-body {
  width: calc(100% + 17px);
  min-height: 290px;
  background-color: #fbfcff;
  margin-bottom: 30px;
  padding: 30px 5px 5px 5px;
  overflow-y: scroll;
}

.message {
  position: relative;
  width: 100%;
  display: inline-block;
}

.message br {
  clear: both;
}

.message .message-body {
  position: relative;
  width: auto;
  max-width: calc(100% - 150px);
  float: left;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dbe3e8;
  margin: 0 5px 20px 15px;
  color: #788288;
}

.message .medium-image {
  float: left;
  margin-left: 10px;
}

.message .message-info {
  width: 100%;
  height: 22px;
}

.message .message-info > h5 > i {
  font-size: 11px;
  font-weight: 700;
  margin: 0 2px 0 0;
  color: #a2b8c5;
}

.message .message-info > h5 {
  color: #a2b8c5;
  margin: 8px 0 0 0;
  font-size: 12px;
  float: right;
  padding-right: 10px;
}

.message .message-info > h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 7px 13px 0 10px;
  color: #65addd;
  float: left;
}

.message hr {
  margin: 4px 2%;
  width: 96%;
  opacity: 0.75;
}

.message .message-text {
  text-align: left;
  padding: 3px 13px 10px 13px;
  font-size: 14px;
}

.message.my-message .message-body {
  float: right;
  margin: 0 15px 20px 5px;
}

.message.my-message .medium-image {
  float: right;
  margin-left: 5px;
  margin-right: 10px;
}

.message.my-message .message-info > h5 {
  float: left;
  padding-left: 10px;
  padding-right: 0;
}

.message.my-message .message-info > h4 {
  float: right;
}

.message.info .message-body {
  background-color: #2da9e9;
  border: 1px solid #2da9e9;
  color: #fff;
}


.message.success .message-body {
  background-color: #0ec8a2;
  border: 1px solid #0ec8a2;
  color: #fff;
}


.message.warning .message-body {
  background-color: #ff9e2a;
  border: 1px solid #ff9e2a;
  color: #fff;
}



.message.danger .message-body {
  background-color: #f95858;
  border: 1px solid #f95858;
  color: #fff;
}

.message.dark .message-body {
  background-color: #314557;
  border: 1px solid #314557;
  color: #fff;
}


.message.info .message-info > h4, .message.success .message-info > h4,
.message.warning .message-info > h4, .message.danger .message-info > h4,
.message.dark .message-info > h4 {
  color: #fff;
}

.message.info .message-info > h5, .message.info .message-info > h5 > i,
.message.success .message-info > h5, .message.success .message-info > h5 > i,
.message.warning .message-info > h5, .message.warning .message-info > h5 > i,
.message.danger .message-info > h5, .message.danger .message-info > h5 > i,
.message.dark .message-info > h5, .message.dark .message-info > h5 > i {
  color: #fff;
  opacity: 0.9;
}

.chat-footer {
  position: relative;
  width: 100%;
  padding: 0 80px;
}

.chat-footer .send-message-text {
  position: relative;
  display: block;
  width: 100%;
  min-height: 55px;
  max-height: 75px;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 95px 5px 10px;
  font-size: 13px;
  resize: vertical;
  outline: none;
  border: 1px solid #e0e6eb;
}

.chat-footer .send-message-button {
  display: block;
  position: absolute;
  width: 35px;
  height: 35px;
  right: 100px;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid rgba(0,0,0,0.05);
  outline: none;
  font-weight: 600;
  border-radius: 50%;
  padding: 0;
}

.chat-footer .send-message-button > i {
  font-size: 16px;
  margin: 0 0 0 -2px;
}

.chat-footer label.upload-file input[type="file"] {
  position: fixed;
  top: -1000px;
}

.chat-footer .upload-file {
  display: block;
  position: absolute;
  right: 150px;
  height: 30px;
  font-size: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
  opacity: 0.25;
}

.chat-footer .upload-file:hover {
  opacity: 1;
}
`;

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
          msg: "",
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

const message1 = (text) => {
  /* {["funded", "funded."].includes(message[1].toLowerCase()) ? (
            <span class="text-success fw-bold">
              CONGRATS! YOU GOT FUNDING! CHECK YOU WALLET!
            </span>
          ) : (
            message[1]
          )}*/
  return (
    <div class="message info">
      <div class="message-body">
        <div class="message-info">
          <h4> Stephen </h4>
        </div>
        <hr />
        <div class="message-text">{text}</div>
      </div>
    </div>
  );
};

const message2 = (text) => {
  return (
    <div class="message my-message">
      <div class="message-body">
        <div class="message-body-inner">
          <div class="message-info">
            <h4> {context.accountId} </h4>
          </div>
          <hr />
          <div class="message-text">{text}</div>
        </div>
      </div>
    </div>
  );
};

return (
  <div>
    <h1 class="pb-3">
      <a href="/quex.near/widget/Index">Quex AI AGENT</a>
    </h1>
    <div class="alert alert-success">
      Current Treasury: {state.nearBalance} NEAR
    </div>
    <div class="alert alert-info">
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
    </div>
    <ChatBox class="message-chat">
      <div class="chat-body">
        {message1("Hi there! How can I help?")}

        {(messages ?? []).map((message) =>
          message[0] == "Bot" ? message1(message[1]) : message2(message[1])
        )}
      </div>
    </ChatBox>
    <div class="pb-0 mb-0">
      <div>Message:</div>
      <textarea
        style={{ width: "500px", height: "120px" }}
        onChange={(e) => State.update({ msg: e.target.value })}
      />
    </div>
    <div>
      <small>Use English only</small>
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
