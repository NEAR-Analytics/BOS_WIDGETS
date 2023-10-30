const props = {
  copyBtn: `const props ={
      text:"Next"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0015" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0015" />
  ),
  text: `const props ={
    text:"Button0015"
  };
return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0015" props={props}/>
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
