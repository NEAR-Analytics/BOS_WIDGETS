const props = {
  copyBtn: `const props ={
      width: "180px",
      height: "55px",
      text:"Button0006"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0006" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0006" />
  ),
  text: `const props ={
    width: "180px",
    height: "55px",
    text:"Button0006"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0006" props={props}/>
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
