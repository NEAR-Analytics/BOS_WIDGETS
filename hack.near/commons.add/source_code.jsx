const [showInput, setShowInput] = useState(false);
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

const attest = () => {
  Social.set(data);
};

const validate = (account) => {
  const accountRegex =
    /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

  if (typeof account !== "string") {
    setValid(false);
    return false;
  }

  if (account.trim().length < 2) {
    setValid(false);
    return false;
  }

  if (account.trim().length > 64) {
    setValid(false);
    return false;
  }

  if (!accountRegex.test(account.trim())) {
    setValid(false);
    return false;
  }

  if (forbiddenIds.has(account.trim())) {
    setValid(false);
    return false;
  }

  setValid(true);
  return true;
};

const handleSave = () => {
  if (validate(newBuilder)) {
    const account = newBuilder.trim();
    Social.set({
      graph: {
        commons: {
          [account]: "",
        },
      },
    });
    setNewBuilder("");
    setShowInput(false);
  }
};

return (
  <>
    <button
      disabled={loading}
      className={`mb-2 m-1 btn btn-sm ${
        attested ? "btn-dark" : "btn-outline-dark"
      }`}
      onClick={() => setShowInput(!showInput)}
    >
      {showInput ? "CANCEL" : "ADD"}
    </button>
    {showInput && (
      <div className="m-1">
        <div className="mb-3">
          <Widget
            src="mob.near/widget/ProfileSearch"
            props={{
              limit: 10,
              onChange: ({ result }) => State.update({ profiles: result }),
            }}
          />
        </div>
        {state.profiles && state.profiles.length > 0 && (
          <div className="mb-2">
            {state.profiles.map(({ accountId }, i) => (
              <div
                key={accountId}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div className="me-2 text-truncate">
                  <Widget
                    src="mob.near/widget/N.ProfileLine"
                    props={{ accountId }}
                  />
                </div>
                <div className="d-none text-nowrap d-md-block">
                  <Widget src="hack.near/widget/attest" props={{ accountId }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </>
);
