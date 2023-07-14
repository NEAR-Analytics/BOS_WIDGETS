return (
  <div>
    <h1>Website 1</h1>
    <p>
      Page 1 - consists of three elements. Text and Two buttons (different
      customizations of the same widget).
    </p>
    <Widget src="alsakhaev.near/widget/HelloWorldText" />
    <Widget
      src="alsakhaev.near/widget/ExampleButton"
      props={{ label: "Button 1" }}
    />
    <Widget
      src="alsakhaev.near/widget/ExampleButton"
      props={{ label: "Button 2" }}
    />
  </div>
);
