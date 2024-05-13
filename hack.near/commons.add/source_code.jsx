const [newBuilder, setNewBuilder] = useState("");
const [valid, setValid] = useState(false);

const attestorId = props.attestorId ?? context.accountId;

if (!attestorId) {
  return "";
}

const accountId = props.accountId ?? "every.near";
const graphId = props.graphId ?? "commons";

const graphEdge = Social.keys(
  `${attestorId}/graph/${graphId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${accountId}/graph/${graphId}/${attestorId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = graphEdge === null || inverseEdge === null;
const attested = graphEdge && Object.keys(graphEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = attested ? "undo" : graphId;

const data = props.data ?? {
  graph: { [graphId]: { [accountId]: attested ? null : "" } },
};

return (
  <div className="m-1">
    <div className="mb-3">
      <Widget
        src="hack.near/widget/ProfileSearch"
        props={{
          limit: 5,
          onChange: ({ result }) => State.update({ profiles: result }),
        }}
      />
    </div>
    {state.profiles && state.profiles.length > 0 && (
      <div className="mb-2">
        {state.profiles.map(({ accountId }, i) => (
          <div
            key={accountId}
            className="m-2 d-flex flex-row justify-content-between align-items-center"
          >
            <div className="m-2 d-flex align-items-center">
              {context.accountId && (
                <Widget
                  src="hack.near/widget/attest"
                  props={{
                    accountId,
                  }}
                />
              )}
              <span className="ms-2">
                <Widget
                  src="hack.near/widget/profiles"
                  props={{ builders: [accountId] }}
                />
              </span>
            </div>
            <div className="m-2 d-flex align-items-center">
              <Widget src="hack.near/widget/profiles" props={{ accountId }} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
