State.init({
  jokes: [],
  newMessage: "",
});

const contract = "guest-book.near";
const messages = Near.view(
  contract,
  "getMessages",
  {}
).reverse();

const addNewMessage = () => {
  if (state.newMessage.trim() === "") {
    console.log("No message to add");
    return;
  }

  Near.call(contract, "addMessage", {
    text: state.newMessage,
  });
  // State.update({ newMessage: "" });
};

return (
  <div>
    <h1>Relayer Jokes</h1>
    <Widget
      src="near/widget/DIG.Input"
      props={{
        placeholder: "Post your joke or just say GM!",
        onInput: async (e) =>
          State.update({ newMessage: e.target.value }),
        value: state.newMessage,
      }}
    />
    <Widget
      src="near/widget/DIG.Button"
      props={{
        label: "Submit",
        onClick: (e) => addNewMessage(e),
        size: "large",
      }}
    />
    <div>
      <ul>
        {messages.map((data, key) => {
          return (
            <li class="text-center">
              <div>{data.sender}</div>
              <div>{data.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
