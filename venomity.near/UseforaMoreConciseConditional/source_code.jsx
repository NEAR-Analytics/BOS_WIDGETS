function Mailbox(props) {
  return (
    <div>
      <h1>Hello!</h1>
      {props.unreadMessages.length > 0 && (
        <h2>You have {props.unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

function App() {
  // Example data: unreadMessages is an array of messages
  const data = {
    unreadMessages: ["Message 1", "Message 2", "Message 3"],
  };

  return (
    <div className="App">
      <Mailbox unreadMessages={data.unreadMessages} />
    </div>
  );
}

return App();
