const props = {
  copyBtn: `const props ={
      width: "110px",
      height: "40px",
      text:"Explore"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0023" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0023" />
  ),
  text: `const props ={
      width: "110px",
      height: "40px",
      text:"Explore"
    };
return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0023" props={props}/>
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
