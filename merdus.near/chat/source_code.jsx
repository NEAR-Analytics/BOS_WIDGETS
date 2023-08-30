const contract =
  "ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801";

const messages = Near.view(contract, "get_messages");

State.init({ text: "", textSize: 13, widgetSize: 10 });

const onChange = ({ target }) => {
  State.update({ text: target.value });
};

const ChatContainer = styled.div`
  background-color: #000;
  color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2em;
`;

const MessageTextContainer = styled.div`
  background-color: #355;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: ${state.textSize}px;
`;

const WidgetContainer = styled.div`
  font-size: ${state.widgetSize}px;
`;

const sendMessage = () => {
  const text = state.text;
  Near.call(contract, "send", { text });
};

const SendMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const FontSizeInput = styled.input`
  width: 40px; /* Adjust the width as needed */
`;

const SendMessageButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
`;

return (
  <ChatContainer>
    {messages.map((message) => (
      <Message key={message.id}>
        <Widget
          src="calebjacob.near/widget/AccountProfile"
          props={{
            accountId: message.author,
          }}
        />
        <MessageTextContainer>{message.text}</MessageTextContainer>
        <WidgetContainer>
          <Widget
            src="andyh.near/widget/TimeAgo"
            props={{
              blockHeight: message.block_height,
            }}
          />
        </WidgetContainer>
      </Message>
    ))}
    <hr />
    <SendMessageContainer>
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
      <SendMessageButton onClick={sendMessage}>Send</SendMessageButton>
    </SendMessageContainer>
  </ChatContainer>
);
