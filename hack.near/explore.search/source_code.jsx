const initPath = props.path || "hack.near/widget/explore.things";

State.init({
  path: initPath,
});

return (
  <>
    <Widget
      src={`hack.near/widget/explore.history`}
      props={{
        path: state.path,
      }}
    />
  </>
);
