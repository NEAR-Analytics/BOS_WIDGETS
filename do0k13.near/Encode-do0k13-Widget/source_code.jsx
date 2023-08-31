//Encode x NEAR Bootcamp Widget

//Contract foked from https://gist.github.com/encody/bd4f10aa446e8002386e973200cdf6b9
const contract =
  "ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801";

//Get messages from the contract defining a number of messages
const messages = Near.view(contract, "get_messages", { limit: 30 });

const Message = styled.div`
  display: flex;
  gap: 1.2em;
`;

return (
  <>
    <pre>{JSON.stringify(messages, null, 2)}</pre>
    {messages.map((message) => (
      <Message>
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
        <p>{message.text}</p>
      </Message>
    ))}
  </>
);
