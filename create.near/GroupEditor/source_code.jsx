const accountId = context.accountId;

if (!accountId) {
  return "Please log in with a NEAR account to edit your group.";
}

let group = Social.getr(`${accountId}/group`);

if (group === null) {
  return "Loading";
}

State.init({
  group,
});

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Edit Group</h4>
      </div>
      <div className="mb-2">
        <Widget
          src="create.near/widget/MetadataEditor"
          props={{
            initialMetadata: group,
            onChange: (group) => State.update({ group }),
            options: {
              name: { label: "Name" },
              description: { label: "About" },
              image: { label: "Image" },
              leaders: { label: "Leaders" },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <CommitButton data={{ group: state.group }}>Save group</CommitButton>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/create.near/widget/Group?accountId=${accountId}`}
        >
          View group
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="create.near/widget/Group"
          props={{ accountId, group: state.group }}
        />
      </div>
    </div>
  </div>
);
