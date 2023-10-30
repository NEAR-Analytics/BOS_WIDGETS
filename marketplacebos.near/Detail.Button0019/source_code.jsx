const props = {
  copyBtn: `const props ={
      text:"Button0019"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0019" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0019" />
  ),
  text: `const props ={
    text:"Button0019"
  };
return(
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0019" props={props}/>
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
