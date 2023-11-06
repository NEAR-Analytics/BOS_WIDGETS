const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR account :)";
}

const curatorId = props.curatorId ?? "hack.near";
const curationId = props.curationId ?? "dbos";
const curationType = props.curationType ?? "projects";

const path = `${curatorId}/curation/${curationId}/${curationType}`;
const init = Social.get(path, "optimistic");

if (!init) {
  return <p>Loading...</p>;
}

State.init({
  curatorId,
  curationId,
  curationType,
  things: JSON.parse(init) ?? [],
  newThing: "",
});

const isCurator = state.curatorId === accountId;

function addThing(newThing) {
  state.things.push(newThing);

  State.update({
    things: state.things,
  });
}

function removeThing(thingKey) {
  const updatedThings = state.things.filter((thing) => thing !== thingKey);

  State.update({
    things: updatedThings,
  });
}

const handleSave = () => {
  const data = {
    curation: {
      [state.curationId]: {
        [state.curationType]: state.things,
      },
    },
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
};

const items = things ? JSON.parse(things) : [];

return (
  <div className="d-flex flex-column">
    <h2>Curation</h2>
    <h3 className="m-2">{state.curationId}</h3>
    <input
      placeholder="title of curation"
      onChange={(e) => State.update({ curationId: e.target.value })}
    />
    <p className="m-2">
      <b>Who:</b> {state.curatorId}
    </p>
    <input
      placeholder="account ID of curator"
      onChange={(e) => State.update({ curatorId: e.target.value })}
    />
    <p className="m-2">
      <b>What:</b> {state.curationType}
    </p>
    <input
      placeholder="type of things curated"
      onChange={(e) => State.update({ curatorType: e.target.value })}
    />
    <hr />
    <div>
      {isCurator ? (
        <h4 className="mb-3">Update Your List</h4>
      ) : (
        <h4 className="mb-3">Propose Updates</h4>
      )}
      <input
        placeholder={`new thing ID for ${state.curationId} ${state.curationType}`}
        onChange={(e) => State.update({ newThing: e.target.value })}
      />
      <div className="d-flex align-items-center mt-2">
        <button
          className="btn btn-primary m-2"
          onClick={() => addThing(state.newThing)}
        >
          Add
        </button>
        {isCurator ? (
          <div>
            {Object.keys(state.things).length > 0 && (
              <div className="ml-3">
                {JSON.stringify(things) !== JSON.stringify(state.things) && (
                  <button className="btn btn-success m-2" onClick={handleSave}>
                    Save
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {Object.keys(state.things).length > 0 && (
              <div className="ml-3">
                {JSON.stringify(things) !== JSON.stringify(state.things) && (
                  <button
                    className="btn btn-success m-2"
                    onClick={handleProposal}
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    <div className="m-2">
      {state.things.length ? (
        <div>
          {state.things.map((thing, i) => {
            const [creatorId, type, thingId] = thing.split("/");
            return (
              <div className="d-flex m-2">
                <p className="mt-3 me-5">{thing}</p>
                <br />
                <button
                  className="btn btn-danger m-1"
                  onClick={() => removeThing(thing)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <i>nothing found</i>
        </div>
      )}
    </div>
  </div>
);
