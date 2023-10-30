const props = {
  copyBtn: `const props ={
      color: "#ecf0f1",
      text:"Button0010"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0010" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0010" />
  ),
  text: `const props ={
    color: "#ecf0f1",
    text:"Button0010"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0010" props={props}/>
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
