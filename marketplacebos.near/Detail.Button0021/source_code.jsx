const props = {
  copyBtn: `const props ={
      width: "180px",
      height: "55px",
      fontsize: "15px",
      fontweight: "bold", 
      text:"Button0021"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0021" props={props}/>
      );`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0021" />
  ),
  text:`const props ={
      width: "180px",
      height: "55px",
      fontsize: "15px",
      fontweight: "bold", 
      text:"Button0021"
    };
    return(
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0021" props={props}/>
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
