State.init({
    currentView: "home",
    isConnected: false,
    connection: () => null,
    account: ""
});

let views = {
  home: (
    <>
      <Widget src="mattb.near/widget/Geoquete.Components.CreateQuest" />
    </>
  ),
  create: (
    <>
      <Widget src="mattb.near/widget/Geoquete.Components.CreateQuest" />
    </>
  ),
  join: (
    <>
      <Widget src="mattb.near/widget/Geoquete.Components.QuestList" />
    </>
  ),
};


// Init
if (state.account == "") {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ account: accounts[0] });
  }
}

const Main = styled.div`
  padding:4rem 0;
`;

return (
  <>
    <Widget src="mattb.near/widget/Geoquete.Components.Header" 
      props={{
        onRefresh: (tab) => State.update({ currentView: tab })
      }}
    />
    <Main>
      {state.currentView in views ? views[state.currentView] : "404"}
    </Main>
  </>
);
