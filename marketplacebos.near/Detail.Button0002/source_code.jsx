const props = {
  copyBtn: `  const props ={
    text: "Button 0002",
    width: "8em",
    height:"3em"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0002" props={props} />`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0002" />
  ),
  text: `  const props ={
    text: "Button 0002",
    width: "8em",
    height:"3em"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0002" props={props} />`,
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardDetail"
      props={props}
    />
  </>
);
