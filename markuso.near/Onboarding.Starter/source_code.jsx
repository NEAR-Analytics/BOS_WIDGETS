let greeting = "Hello,";

return (
  <>
    {/* src="near/widget/Onboarding.ComponentCard" to be pasted below */}
    <Widget src="near/widget/Onboarding.ComponentCard" />
    <br />
    <h1>{greeting + " " + props.name}</h1>
    <a href="https://horn.technology" className="text-blue-500">
      {" "}
      horn.technology
    </a>
  </>
);
