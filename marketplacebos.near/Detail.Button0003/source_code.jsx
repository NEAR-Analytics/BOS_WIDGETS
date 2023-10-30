const props = {
  copyBtn: `  const props ={
    text: "Button 0003",
    fontsize: "16px",
    fontweight:"600"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0003" props={props} />`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0003" />
  ),
  text: `  const props ={
    text: "Button 0003",
    fontsize: "16px",
    fontweight:"600"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0003" props={props} />`,
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardDetail"
      props={props}
    />
  </>
);
