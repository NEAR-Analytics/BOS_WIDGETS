const props = {
  copyBtn: `const props ={
      text:"Button0009"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0009" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0009" />
  ),
  text: `const props ={
    text:"Button0009"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0009" props={props}/>
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
