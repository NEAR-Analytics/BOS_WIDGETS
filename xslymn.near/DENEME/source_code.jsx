const user = "xslymn.near";
const props = { name: "XSLYMN" };

return (
  <>
    <div class="container min-vw-100">
      <h3> Composing Widgets </h3>
      <p> Widgets can be composed </p>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
