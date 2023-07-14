return (
  <div>
    <h1>Website 2</h1>
    <p>
      Page 2 - consists of four elements. Another Text, Two buttons, of which
      the first is unchanged, and the second with changed customization) and +
      one more additional button.
    </p>
    <Widget src="alsakhaev.near/widget/AnotherText" />
    <Widget src="alsakhaev.near/widget/ExampleButton" />
    <Widget
      src="alsakhaev.near/widget/ExampleButton"
      props={{ label: "Customized Button" }}
    />
    <Widget src="alsakhaev.near/widget/AnotherButton" />
  </div>
);
