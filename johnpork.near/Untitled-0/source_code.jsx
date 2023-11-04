const user = "gagdiez.near";
const props = { name: "Anna" };

return (
  <>
    <div class="container min-vw-100">
      <h3> Composing Widgets </h3>
      <p> TEST </p>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
