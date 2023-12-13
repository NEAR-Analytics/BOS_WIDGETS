const user = "gagdiez.near";
const props = { name: "Boris" };

return (
  <>
    <div class="container ">
      <h3> ITA Workshop </h3>
      <p> Bom Dia! </p>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
