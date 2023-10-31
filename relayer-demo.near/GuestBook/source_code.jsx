const contract = "guest-book.near";
const relayerAccountId = "relayer.pagodaplatform.near";
const messages = Near.view(contract, "getMessages", {})
  .reverse()
  .filter(
    (message) => message.sender === context.accountId
  );

State.init({
  newMessage: "",
});

const addNewMessage = () => {
  if (state.newMessage.trim() == "") {
    return;
  }

  const call = Near.call(contract, "addMessage", {
    text: state.newMessage,
  });

  console.log("call", call);
};

const userAccountStatus = fetch(
  "https://rpc.mainnet.near.org",
  {
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
        account_id: context.accountId,
      },
    }),
  }
);

const relayerAccountStatus = fetch(
  "https://rpc.mainnet.near.org",
  {
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
        account_id: relayerAccountId,
      },
    }),
  }
);

const nearAmount = (yocto) =>
  (parseInt(yocto) / Math.pow(10, 24)).toFixed(2);

// show message if userAccountStatus.body.result.amount is not zero

return (
  <div class="p-3">
    <h3 class="text-center">
      Relayer - no crypto no problem
    </h3>
    <br />
    <h6>
      {relayerAccountId} with a balance of{" "}
      {nearAmount(relayerAccountStatus.body.result.amount)}{" "}
      NEAR
    </h6>
    <h6></h6>
    {context.accountId ? (
      <div class="border border-black p-3">
        <h3>
          Add a message as {context.accountId} with a
          balance of{" "}
          {nearAmount(userAccountStatus.body.result.amount)}{" "}
          NEAR
        </h3>
        <div class="row">
          <div>
            <input
              placeholder="Message"
              onChange={(e) =>
                State.update({ newMessage: e.target.value })
              }
            />
          </div>
        </div>
        <button
          class="btn btn-primary mt-2"
          onClick={async () => {
            addNewMessage();
          }}
        >
          Add Message
        </button>
      </div>
    ) : (
      <p class="text-center py-2">
        Log in to add a message
      </p>
    )}
    <br />
    <div class="border border-black p-3">
      <h3>Messages</h3>
      <table className="table table-sm">
        <thead>
          <tr class="p-3 mb-2 bg-primary text-white text-center">
            <th>Account ID</th>
            <th>Message</th>
          </tr>
        </thead>
        {messages.length == 0 ? (
          <tbody>
            <tr class="text-center">
              <td colSpan="2">No messages yet</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {messages.map((data, key) => {
              return (
                <tr class="text-center" key={key}>
                  <td>{data.sender}</td>
                  <td>{data.text}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  </div>
);
