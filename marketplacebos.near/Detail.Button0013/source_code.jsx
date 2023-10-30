const props = {
  copyBtn: `const props ={
      text:"Button0013"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0013" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0013" />
  ),
  text: `const props ={
    text:"Button0013"
  };
return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0013" props={props}/>
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
