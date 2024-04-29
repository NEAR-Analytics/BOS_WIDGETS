const accountId = props.accountId || context.accountId || "every.near";

const attestations = Social.keys(`*/graph/commons/*`, "final", {
  values_only: true,
});

if (attestations === null) {
  return "";
}

const attestationsCount = {};
const buildersSet = new Set();

Object.keys(attestations).forEach((account) => {
  const buildersData = attestations[account]?.graph?.commons;

  if (buildersData) {
    Object.keys(buildersData).forEach((builder) => {
      if (!attestationsCount[builder]) {
        attestationsCount[builder] = 0;
      }
      attestationsCount[builder]++;
      buildersSet.add(builder);
    });
  }
});

const rankedBuilders = Array.from(buildersSet).sort((a, b) => {
  return attestationsCount[b] - attestationsCount[a];
});

return (
  <div className="m-2">
    {rankedBuilders.map((builder, i) => (
      <div key={i} className="d-flex border-bottom justify-content-between">
        <div className="m-1 p-2">
          <span>
            <Widget
              src="mob.near/widget/N.ProfileLine"
              props={{
                accountId: builder,
              }}
            />
          </span>
          <p className="mt-1">
            <i>{attestationsCount[builder]} attestations</i>
          </p>
        </div>
        <div className="m-1 p-3">
          <Widget
            src="hack.near/widget/attest"
            props={{ accountId: builder }}
          />
        </div>
      </div>
    ))}
  </div>
);
