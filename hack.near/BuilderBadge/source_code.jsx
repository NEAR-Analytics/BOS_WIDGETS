const accountId = props.accountId ?? "every.near";
const attestorId = props.attestorId ?? "hack.near";
const graphId = props.graphId ?? "commons";

const graphEdge = Social.keys(
  `${attestorId}/graph/${graphId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const isBuilder = graphEdge && Object.keys(graphEdge).length > 0;

return (
  <>
    {accountId === attestorId ? (
      <Widget
        src="hack.near/widget/BuilderHat"
        props={{ isBuilder: true, color: "black" }}
      />
    ) : (
      <Widget
        src="hack.near/widget/BuilderHat"
        props={{ isBuilder, isActive: true }}
      />
    )}
  </>
);
