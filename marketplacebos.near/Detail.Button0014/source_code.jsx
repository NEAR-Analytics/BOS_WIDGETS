const props = {
  copyBtn: `const props ={
      text:"Button0014"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0014" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0014" />
  ),
  text: `const props ={
    text:"Button0014"
  };
return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0014" props={props}/>
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
