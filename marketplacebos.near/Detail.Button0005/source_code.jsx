const props = {
  copyBtn: `  const props ={
    text: "Button 0005",
    border:"4px solid #FAFAFA",
    boxshadow: "6px 6px #fafafa"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0005" props={props} />`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0005" />
  ),
  text: `  const props ={
    text: "Button 0005",
    border:"4px solid #FAFAFA",
    boxshadow: "6px 6px #fafafa"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0005" props={props} />`,
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardDetail"
      props={props}
    />
  </>
);
