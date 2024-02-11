const contract = "guest-book.near";
const messages = Near.view(contract, "getMessages", {}).reverse();
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
  <div class="p-3">
    <h3 class="text-center">GuestBook</h3>
    <br />
    {context.accountId ? (
      <div class="border border-black p-3">
        <h3>New Message</h3>
        <div class="row">
          <div>
            <input
              placeholder="Message"
              onChange={(e) => State.update({ newMessage: e.target.value })}
            />
          </div>
        </div>
        <button
          class="btn btn-primary mt-2"
          onClick={async () => {
            addNewMessage();
          }}
        >
          Guardar
        </button>
      </div>
    ) : (
      <p class="text-center py-2">I DONT KNOW WHAT THIS MEANS</p>
    )}
    <br />
    <div class="border border-black p-3">
      <h3>Message List</h3>
      <table className="table table-sm">
        <thead>
          <tr class="p-3 mb-2 bg-primary text-white text-center">
            <th>Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, key) => {
            return (
              <tr class="text-center">
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
