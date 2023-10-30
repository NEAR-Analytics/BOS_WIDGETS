const props = {
  copyBtn: `const props ={
      fontsize: "17px",
      fontweight: "1000",
      text:"Button0017"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0017" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0017" />
  ),
  text: `const props ={
    fontsize: "17px",
    fontweight: "1000",
    text:"Button0017"
  };
return(
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0017" props={props}/>
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
