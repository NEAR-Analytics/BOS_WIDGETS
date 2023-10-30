const props = {
  copyBtn: `const props ={
      fontsize: "16px",
      text:"Button0008"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0008" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0008" />
  ),
  text: `const props ={
    fontsize: "16px",
    text:"Button0008"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0008" props={props}/>
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
