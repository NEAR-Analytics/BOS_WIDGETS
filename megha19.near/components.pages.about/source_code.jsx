const profile = Social.getr(`infrastructure-committee.near/profile`, "final", {
  subscribe: true,
});
if (!profile) {
  <div
    style={{ height: "50vh" }}
    className="d-flex justify-content-center align-items-center w-100"
  >
    <Widget src={`devhub.near/widget/devhub.components.molecule.Spinner`} />
  </div>;
}
return (
  <div style={{ width: "-webkit-fill-available" }} className="p-3">
    <Widget
      src={`devhub.near/widget/devhub.components.molecule.SimpleMDEViewer`}
      props={{
        content: profile.description,
      }}
    />
  </div>
);
