const accountId = props.accountId ?? context.accountId;

const groupId = props.groupId ?? "6fd36ddf4884flm20pbe91e7b208b88d16";

const directory = Social.get(`${accountId}/thing/directory`);

State.init({
  groups: directory,
  added: false,
});

function addGroup(groupId) {
  state.groups.push(groupId);

  State.update({
    groups: state.groups,
    added: true,
  });
}

const handleSave = () => {
  const data = {
    thing: {
      directory: state.groups,
    },
  };

  Social.set(data);
};

return (
  <div>
    <div style={{ overflow: "auto", maxWidth: "100%" }}>
      <p>{JSON.stringify(state.added)}</p>
      <p>{groupId}</p>
      <p>{state.groups}</p>
    </div>
    <span>
      <button className="btn btn-primary" onClick={() => addGroup(groupId)}>
        Add
      </button>
      {!added ? (
        <button className="btn btn-success" onClick={handleSave}>
          Approve
        </button>
      ) : (
        <button
          disabled={added}
          className="btn btn-success"
          onClick={handleSave}
        >
          Done
        </button>
      )}
    </span>
    <br />
  </div>
);
