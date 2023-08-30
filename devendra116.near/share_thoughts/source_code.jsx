const contract =
  "ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801";

State.init({
  message: "",
  messageLimit: 3, // Initial message limit
});

let user_account = context.accountId;
const messages = Near.view(contract, "get_messages", {
  limit: state.messageLimit,
});

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  background-color: ${({ isSpecial }) =>
    isSpecial ? "#e6f7ff" : "white"}; /* Light Blue: #e6f7ff */
  border: 1px solid #e0e0e0;
  padding: 1em;
  border-radius: 8px;
  margin-bottom: 1em;
`;

const MessageContent = styled.p`
  margin-top: 0.5em;
`;

const SendControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0.5em;
`;

const loadMoreMessages = () => {
  State.update({ messageLimit: state.messageLimit + 3 });
};

const sendMessage = () => {
  if (state.message.length !== 0) {
    Near.call(contract, "send", {
      text: state.message,
    });
  }
};

return (
  <div>
    <h3 style={{ justifyContent: "center", alignItems: "center" }}>
      Share your thoughts with others
    </h3>
    <pre>{JSON.stringify(Social.get(`mob.near/widget/**`), null, 2)}</pre>
    {messages
      .slice(0, state.messageLimit)
      .reverse()
      .map((message) => (
        <Message key={message.id} isSpecial={message.author === user_account}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Widget
              src="calebjacob.near/widget/AccountProfile"
              props={{
                accountId: message.author,
              }}
            />
            <Widget
              src="andyh.near/widget/TimeAgo"
              props={{
                blockHeight: message.block_height,
              }}
            />
          </div>
          <MessageContent>{message.text}</MessageContent>
        </Message>
      ))}
    {/* {state.messageLimit < messages.length && ( */}
    <button onClick={loadMoreMessages}>Load More</button>
    {/* )} */}
    <SendControls>
      <input
        type="text"
        placeholder="Type your message..."
        onInput={(e) => State.update({ message: e.target.value })}
        value={state.message}
      />
      <button onClick={sendMessage}>Send</button>
    </SendControls>
  </div>
);
