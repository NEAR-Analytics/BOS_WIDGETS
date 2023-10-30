const props = {
  copyBtn: `const props ={
      fontsize: "16px",
      text:"Create"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0025" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0025" />
  ),
  text: `const props ={
      fontsize: "16px",
      text:"Create"
    };
return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0025" props={props}/>
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
