const props = {
  copyBtn: `
  const props ={
    padding: "0.6em 2em",
    fontsize: "0.5em",
    text:"Button0001"
  };
  <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0001" props={props}/>`,
  component: (
    <Widget src="marketplacebos.near/widget/Button.ButtonP.Button0001" />
  ),
  text: `  const props ={
    padding: "0.6em 2em",
    fontsize: "0.5em",
    text:"Button0001"
  };
  return(
<Widget src="marketplacebos.near/widget/Button.ButtonP.Button0001" props={props}/>
    );
  `,
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardDetail"
      props={props}
    />
    <br />
    <Widget
      src="marketplacebos.near/widget/CardMain.Review"
      props={{
        widget_id: "button0001",
        widget_link: "marketplacebos.near/widget/Button.ButtonP.Button0001",
        widget_name: "Button0001",
        logo_links:
          "https://ipfs.near.social/ipfs/bafkreiajmvq7bzyqhxrhrkwv76ztotn6nrcq7v5lsk4kzrk3mjgxxnog6a",
      }}
    />
  </>
);
