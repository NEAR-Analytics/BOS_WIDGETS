const user = "gagdiez.near";
const props = { name: "Anna" };

return (
  <>
    <div class="container min-vw-100">
      <h5> Components can be composed </h5>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
