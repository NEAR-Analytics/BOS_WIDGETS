const user = "joelblenman21.near";
const props = { name: "Joel" };

return (
  <>
    <div class="container min-vw-100">
      <Widget src={`${user}/widget/LandingPageHeader`} props={props} />
      <Widget src={`${user}/widget/ItemGrid`} props={props} />
    </div>
  </>
);
