return (
  <>
    <h1>My Home Page</h1>
    Hey,{" "}
    <Widget
      src="zavodil.near/widget/ProfileLine"
      props={{ accountId: context.accountId }}
    />
    <Widget src="zavodil.near/widget/swap" props={{}} />
  </>
);
