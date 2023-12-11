State.init({
  bootstraping: true,
  loggedIn: false,
});

const contract = props.contract || "chat-simple.ws-protocol-63";

const verifyKey = () => {
  setTimeout(() => {
    State.update({ bootstraping: false, loggedIn: result });
  }, "5000");

  // Near.hasValidCalimeroFak(contract).then((result) => {
  //   State.update({ bootstraping: false, loggedIn: result });
  //   if (result) {
  //     updateMemberList().then((members) => {
  //       if (!isMember(context.accountId, members)) {
  //         Near.fakCalimeroCall(contract, "join");
  //       }
  //     });
  //     updateChannelList();
  //   }
  // });
};

if (state.bootstraping) {
  verifyKey();
}

const MainContainer = styled.div`
  padding: 1rem;
  width: 100%;
`;

return (
  <MainContainer>
    {context.accountId ? (
      <>
        {state.bootstraping ? (
          <h1>Loading...</h1>
        ) : (
          <div className="container">Hello Welcome, {props.name}</div>
        )}
      </>
    ) : (
      <h1>Please login to continue</h1>
    )}
  </MainContainer>
);
