const [hideInfo, setHideInfo] = useState(false);

const accountId = props.accountId ?? context.accountId ?? "every.near";
const graphId = props.graphId ?? "commons";

const attestations = Social.keys(`*/graph/${graphId}/*`, "final", {
  values_only: true,
});

if (!attestations) {
  return "";
}

const [matrix, setMatrix] = useState([]);
const [attestors, setAttestors] = useState([]);
const [builders, setBuilders] = useState([]);

useEffect(() => {
  const attestorSet = new Set();
  const builderSet = new Set();

  Object.entries(attestations).forEach(([attestor, data]) => {
    attestorSet.add(attestor);
    Object.keys(data.graph[graphId]).forEach((builder) => {
      builderSet.add(builder);
    });
  });

  setAttestors(Array.from(attestorSet));
  setBuilders(Array.from(builderSet));

  const newMatrix = Array.from(builderSet).map((builder) =>
    Array.from(attestorSet).map((attestor) => ({
      attestorId: attestor,
      builderId: builder,
    }))
  );

  setMatrix(newMatrix);
}, []);

return (
  <div className="m-2">
    <Widget src="hack.near/widget/commons.add" />
    <div>
      {builders.map((a) => (
        <div
          key={a}
          className="m-2 d-flex flex-row justify-content-between align-items-center my-2"
        >
          <div
            className="m-1 d-flex align-items-center"
            style={{
              maxWidth: "50%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {context.accountId && (
              <Widget src="hack.near/widget/attest" props={{ accountId: a }} />
            )}
            <span
              style={{
                fontFamily: "Courier",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="ms-3"
            >
              <Widget src="hack.near/widget/profile" props={{ accountId: a }} />
            </span>
          </div>
          <div>
            <Widget src="hack.near/widget/profiles" props={{ accountId: a }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
