const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const defaultGroup = "6fd36ddf4884flm20pbe91e7b208b88d16";

const groupSettings = Social.get(`${accountId}/settings/every/group`);

if (group === null) {
  return "Loading";
}

initState({
  group: group ?? defaultGroup,
});

const resetGroup = () => {
  state.group = defaultGroup;
  State.update();
};

return (
  <div>
    <div>
      <h1>
        <b>Edit Default Group</b>
      </h1>
    </div>
    <div className="mb-2 d-flex align-items-center">
      <h5 className="m-3">
        <b>groupId:</b>
      </h5>
      <input type="text" value={state.group} placeholder={defaultGroup} />
      <CommitButton
        className="btn btn-success m-3"
        data={{ settings: { "near.social": { group: state.group } } }}
      >
        Save
      </CommitButton>
      {state.group !== defaultGroup && (
        <button className="btn btn-outline-primary" onClick={resetGroup}>
          Reset
        </button>
      )}
      {group === state.group && (
        <a className="btn btn-outline-primary ms-2" href={`#/`}>
          Open
        </a>
      )}
    </div>
    <hr />

    <h2>
      <b>Review</b>
    </h2>

    <div className="mb-2">
      <Widget src="hack.near/widget/group" props={{ groupId: state.group }} />
    </div>
  </div>
);
