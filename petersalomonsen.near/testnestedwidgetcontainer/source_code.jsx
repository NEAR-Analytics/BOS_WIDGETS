const currentData = Social.get("petersalomonsen.near/experimental/*");

return (
  <>
    <div>{JSON.stringify(currentData)}</div>
    <Widget src="petersalomonsen.near/widget/testnestedwidget" />
  </>
);
