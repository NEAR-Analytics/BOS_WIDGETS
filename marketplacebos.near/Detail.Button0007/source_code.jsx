const props = {
  copyBtn: `const props ={
      width: "13em",
      height: "4.2em",
      text:"Button0007"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0007" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0007" />
  ),
  text: `const props ={
    width: "13em",
    height: "4.2em",
    text:"Button0007"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0007" props={props}/>
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
