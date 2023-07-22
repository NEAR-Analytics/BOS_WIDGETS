State.init({
    currentView: "home"
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

return (
  <>
    <Widget src="mattb.near/widget/Geoquete.Components.Header" 
        props={{
            onRefresh: (tab) => State.update({ currentView: tab })
        }}
    />
    {state.currentView in views ? views[state.currentView] : "404"}
  </>
);
