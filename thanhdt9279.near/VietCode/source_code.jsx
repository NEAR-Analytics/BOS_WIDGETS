// const user = "gagdiez.near";
const user = "thanhdt9279.near";
const props = { name: "Learn NEAR" };

return (
  <>
    <div class="container min-vw-100">
      <h3> Widgets </h3>
      <p> Here is a Widget </p>
      <hr />

      <Widget src={`${user}/widget/Thanhdt_Test9279`} props={props} />
    </div>
  </>
);
