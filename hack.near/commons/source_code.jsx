const accountId = props.accountId ?? context.accountId ?? "every.near";

const attestations = Social.keys(`*/graph/commons/*`, "final", {
  values_only: true,
});

const [matrix, setMatrix] = useState([]);
const [attestors, setAttestors] = useState([]);
const [builders, setBuilders] = useState([]);

useEffect(() => {
  const attestorSet = new Set();
  const builderSet = new Set();

  Object.entries(attestations).forEach(([attestor, data]) => {
    attestorSet.add(attestor);
    Object.keys(data.graph.commons).forEach((builder) => {
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
  <div className="m-2 p-1">
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={{ padding: "8px" }}></th>
          {attestors.map((attestor, index) => (
            <th key={index} style={{ padding: "8px" }}>
              {attestor}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td style={{ padding: "8px" }}>
              <b>{builders[rowIndex]}</b>
            </td>
            {row.map((cell, cellIndex) => (
              <td style={{ padding: "8px" }} key={cellIndex}>
                {accountId !== cell.attestorId ? (
                  <Widget
                    src="hack.near/widget/BuilderBadge"
                    props={{
                      accountId: cell.builderId,
                      attestorId: cell.attestorId,
                    }}
                  />
                ) : (
                  <Widget
                    src="hack.near/widget/attest"
                    props={{
                      accountId: cell.builderId,
                      attestorId: cell.attestorId,
                    }}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
