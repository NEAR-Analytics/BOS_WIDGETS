const renderComponent = (a) => {
  console.log("rendering compd!");
  return new Promise((res) => setTimeout(() => res(<h2>{a}</h2>), 1000));
  return <h2>{a}</h2>;
};

return <Widget src="andyh.near/widget/Hooks" props={{ renderComponent }} />;
