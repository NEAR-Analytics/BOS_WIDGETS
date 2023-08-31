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
const Chat = styled.div`
  background-color: #000;
  color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;
const MessageCnt = styled.div`
  background-color: #355;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: ${state.textSize}px;
`;
const WidgetCnt = styled.div`
  font-size: ${state.widgetSize}px;
`;
const SendMsgCnt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;
const MessageButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
`;
const FontSizeInput = styled.input`
  width: 40px; /* Adjust the width as needed */
`;

return (
  /* <>
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
); */
  <Chat>
    {messages.map((message) => (
      <Message key={message.id}>
        <Widget
          src="calebjacob.near/widget/AccountProfile"
          props={{
            accountId: message.author,
          }}
        />
        <MessageCnt>{message.text}</MessageCnt>
        <WidgetCnt>
          <Widget
            src="andyh.near/widget/TimeAgo"
            props={{
              blockHeight: message.block_height,
            }}
          />
        </WidgetCnt>
      </Message>
    ))}
    <hr />
    <SendMsgCnt>
      <input
        onChange={onChange}
        type="text"
        placeholder="Type your message..."
      />
      <FontSizeInput
        type="number"
        min="10"
        max="40"
        value={state.textSize}
        onChange={(event) =>
          State.update({ textSize: parseInt(event.target.value) })
        }
      />
      <FontSizeInput
        type="number"
        min="10"
        max="40"
        value={state.widgetSize}
        onChange={(event) =>
          State.update({ widgetSize: parseInt(event.target.value) })
        }
      />
      <MessageButton onClick={sendMessage}>Send</MessageButton>
    </SendMsgCnt>
  </Chat>
);
