const props = {
  copyBtn: `const props ={
      text:"Button0028"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0028" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0028" />
  ),
  text: `const props ={
    text:"Button0028"
  };
return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0028" props={props}/>
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
