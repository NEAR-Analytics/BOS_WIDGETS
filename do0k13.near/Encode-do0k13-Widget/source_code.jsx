//Encode x NEAR Bootcamp Widget

//Contract foked from https://gist.github.com/encody/bd4f10aa446e8002386e973200cdf6b9
const contract =
  "ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801";
//start Near Staking Const
const Stake = styled.div`
  .headTab {
    width: 100%;
    display: flex;
    margin-bottom: 40px;
  }
`;

const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const { hideBanner } = props;

const Wrap = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;
const SummaryWrapper = styled.div`
  margin-bottom: ${!!hideBanner ? "50px" : ""};
`;
const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  color: #ffffff;
  font-weight: 700;
  margin: 0;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
  }
`;

const { tabName } = state;
State.init({
  tabName: "stake", // stake | unstake,
  nearBalance: "",
});

const updateTabName = (tabName) =>
  State.update({
    tabName,
  });

//Ends Near Staking Const
//Get messages from the contract defining a number of messages
const messages = Near.view(contract, "get_messages", { limit: 30 });

const Message = styled.div`
  display: flex;
  gap: 1.2em;
`;
const Chat = styled.div`
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;
const MessageCnt = styled.div`
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: ${state.textSize}px;
`;
const Header = styled.div`
  width: 100%;
  padding: 50px 10px;
  font-weight: 600;
  font-size: 30px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #ffffff;
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
    <Header>
      <p>Near Encode Bootcamp</p>
      <p>July-August 2023</p>
      <button>Chat</button>
      <button>Notifications</button>
      <button>Stake</button>
    </Header>
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
    <Stake>
      <div class="headTab">
        <Title>Staking</Title>
        <Tab>
          <Widget
            src={`ref-admin.near/widget/LiNEAR.Tab`}
            props={{
              updateTabName,
              tabName: tabName,
            }}
          ></Widget>
        </Tab>
      </div>
      <Wrap>
        <Widget
          src="ref-admin.near/widget/LiNEAR"
          props={{
            updateTabName,
            tabName: tabName,
          }}
        ></Widget>
        <Widget
          src="ref-admin.near/widget/XREF"
          props={{
            updateTabName,
            tabName: tabName,
          }}
        ></Widget>
        <Widget
          src="ref-admin.near/widget/NearX"
          props={{
            tabName,
          }}
        ></Widget>
      </Wrap>
    </Stake>
  </Chat>
);
