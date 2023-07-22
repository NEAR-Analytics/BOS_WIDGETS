let views = {
  home: (
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
    <Widget src="mattb.near/widget/Geoquete.Components.Header" />
    {views["join"]}
  </>
);
