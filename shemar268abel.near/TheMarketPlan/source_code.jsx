const user = "joelblenman21.near";
const props = { name: "Joel" };

return (
  <>
    <div class="container min-vw-100">
      <Widget
        src={`shemar268abel.near/widget/LandingPageHeader`}
        props={props}
      />
      <Widget src={`${user}/widget/ItemGrid`} props={props} />
    </div>
  </>
);
