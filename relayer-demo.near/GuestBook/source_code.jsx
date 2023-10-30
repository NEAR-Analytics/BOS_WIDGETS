const contract = "guest-book.near";
const messages = Near.view(
  contract,
  "getMessages",
  {}
).reverse();
console.log(messages);

State.init({
  newMessage: "",
});

const addNewMessage = () => {
  if (state.newMessage.trim() == "") {
    return;
  }

  Near.call(contract, "addMessage", {
    text: state.newMessage,
  });
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

const nearAmount = (yocto) =>
  (parseInt(yocto) / Math.pow(10, 24)).toFixed(2);

return (
  <div class="p-3">
    <h3 class="text-center">Relayer Demo</h3>
    <br />
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
      </table>
    </div>
  </div>
);
