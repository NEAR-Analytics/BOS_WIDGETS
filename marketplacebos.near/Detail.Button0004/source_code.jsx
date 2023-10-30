const props = {
  copyBtn: `  const props ={
    text: "Button 0004"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0004" props={props} />`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0004" />
  ),
  text: `  const props ={
    text: "Button 0004"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0004" props={props} />`,
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardDetail"
      props={props}
    />
  </>
);
