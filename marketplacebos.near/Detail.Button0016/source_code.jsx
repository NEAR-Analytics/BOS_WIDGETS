const props = {
  copyBtn: `const props ={
      width: "150px",
      height: "60px",
      fontsize: "1.2em",
      fontweight: "550",
      text:"Button0016"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0016" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0016" />
  ),
  text: `const props ={
  width: "150px",
  height: "60px",
  fontsize: "1.2em",
  fontweight: "550",
  text:"Button0016"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0016" props={props}/>
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
