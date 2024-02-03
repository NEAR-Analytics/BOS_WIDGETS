const user = "gagdiez.near";
const props = { name: "Boris" };

return (
  <>
    <div class="container ">
      <h3> eth5deMayo Workshop </h3>
      <p> GM! </p>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
