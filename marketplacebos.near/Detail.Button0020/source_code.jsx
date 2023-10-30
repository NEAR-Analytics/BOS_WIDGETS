const props = {
  copyBtn: `const props ={
      text:"Button0020"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0020" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0020" />
  ),
  text: `const props ={

    text:"Button0020"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0020" props={props}/>
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
