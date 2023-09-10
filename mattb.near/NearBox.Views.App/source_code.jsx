const { MailChain, onMessageSent, onLogout } = props;
const WIDGET_OWNER = "mattb.near";

State.init({
  displayMessage: null,
  writeMessage: true,
  messages: Storage.privateGet("messages") || [],
});

const Main = styled.div`
    width:100%;
    height:calc(100vh - 70px);
    background-color:#fff;
`;

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    padding:.5rem 1rem;
    box-sizing:border-box;
    border-top:5px solid #0178D4;
    background-color:#fff;

    div:first-of-type {
        transform:scale(.8);
        transform-origin: center left;
    }
`;

const Body = styled.div`
    display:flex;
`;

const Logout = styled.div`
  display:flex;
  align-items:center;
  font-size:.8rem;
  padding:.5rem 1rem;
  background-color:#fafafa;
  border-radius:10px;

  * {
    opacity:.6;
    transition: all .2s;

    :hover {
      opacity:1;
      transition: all .2s;
    }
  }

  p {
    margin:0;
    margin-right:.5rem;
    font-weight:bold;
  }

  img {
    cursor:pointer;
    width:17px;
    height:17px;
  }
`;

const WriteMessage = styled.div`
  position:fixed;
  bottom:0;
  right:20px;
`;

return (
  <Main>
    <Header>
      <Widget src={`${WIDGET_OWNER}/widget/NearBox.Components.Logo`} />

      <Logout>
        {Mailchain.user.address}
        <p>mattb@mailchain.com</p>
        <img
          src="https://ipfs.near.social/ipfs/bafkreiem7zs4oxkkgsr2hgret2z2h3fj76kngsbmkdstfijcsyakioklzu"
          onClick={() => onLogout({ logged: false })}
        />
      </Logout>
    </Header>
    <Body>
      <Widget
        src={`${WIDGET_OWNER}/widget/NearBox.Components.Sidebar`}
        props={{
          onRefresh: (state) => State.update(state),
        }}
      />

      <Widget
        src={`${WIDGET_OWNER}/widget/NearBox.Components.MessageList`}
        props={{
          messages: state.messages,
          onRefresh: (data) => State.update(data),
        }}
      />

      {state.displayMessage && (
        <Widget
          src={`${WIDGET_OWNER}/widget/NearBox.Components.ReadMessage`}
          props={{
            message: state.displayMessage,
          }}
        />
      )}

      {state.writeMessage && (
        <WriteMessage>
          <Widget
            src={`${WIDGET_OWNER}/widget/NearBox.Components.WriteMessage`}
            props={{
              MailChain: MailChain,
              onMessageSent: (message) => {
                State.update({
                  messages: [...state.messages, message],
                });
                onMessageSent();
              },
              onRefresh: (refresh) => {
                State.update(refresh);
              },
            }}
          />
        </WriteMessage>
      )}
    </Body>
  </Main>
);
