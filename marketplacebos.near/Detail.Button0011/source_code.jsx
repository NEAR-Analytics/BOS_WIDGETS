const props = {
  copyBtn: `const props ={
      text:"Button0011"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0011" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0011" />
  ),
  text: `const props ={
    text:"Button0011"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0011" props={props}/>
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
