State.init({
    currentView: "home",
    isConnected: false,
    account: ""
});

let views = {
  home: (
    <>
      {console.log(state.account)}
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

return (
  <>
    <Widget src="mattb.near/widget/Geoquete.Components.Header" 
        props={{
            onRefresh: (tab) => State.update({ currentView: tab }),
            onConnect: (connection) => State.update({connection: connection})
        }}
    />
    {state.currentView in views ? views[state.currentView] : "404"}
  </>
);
