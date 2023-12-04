const contract = "guest-book.near";
const total_messages = Near.view(contract, "totalMessages", {});
const messages = Near.view(contract, "getMessages", {
  from_index: total_messages - 10,
}).reverse();
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

return (
  <div class="p-3 mb-2 bg-dark text-white">
    <h3 class="text-center">Guest book (BOS + NEAR)</h3>
    <br />
    {context.accountId ? (
      <div class="border rounded border-white p-3 text-center">
        <h4>New message</h4>
        <div class="row">
          <div>
            <input
              placeholder="Type here..."
              onChange={(e) => State.update({ newMessage: e.target.value })}
            />
          </div>
        </div>
        <button
          class="btn btn-outline-primary mt-2"
          onClick={async () => {
            addNewMessage();
          }}
        >
          Save
        </button>
      </div>
    ) : (
      <p class="text-center p-3- mb-2 bg-danger text-white">
        Sign in to save a message
      </p>
    )}
    <br />
    <div class="border rounded border-white p-3 text-center">
      <h4>Message list</h4>
      <table class="table table-dark table-stripped">
        <thead class="thead-borderless">
          <tr class="p-3 mb-2 bg-primary text-white text-center">
            <th class="table-info">Account</th>
            <th class="table-info">Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, key) => {
            return (
              <tr class="text-center">
                <td class="table-primary">{data.sender}</td>
                <td class="table-secondary">{data.text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
