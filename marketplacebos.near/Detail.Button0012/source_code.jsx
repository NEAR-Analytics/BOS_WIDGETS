const props = {
  copyBtn: `
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0012"/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0012" />
  ),
  text: `return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0012"/>
    );`,
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardDetail"
      props={props}
    />
  </>
);
