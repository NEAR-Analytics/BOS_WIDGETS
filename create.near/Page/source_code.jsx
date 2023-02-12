const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return (
    <div className="mx-auto">
      <div className="mt-3">
        <Widget src="create.near/widget/Builders" />
      </div>
    </div>
  );
}

const project = props.project ?? Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <div className="mt-3 d-inline-block">
        <Widget
          src="create.near/widget/Project.InlineBlock"
          props={{
            accountId,
            project,
            showEditButton: !props.project,
          }}
        />
        <a
          className="btn btn-success mt-3"
          href="#/create.near/widget/PageEditor"
        >
          Update Your Featured Widget
        </a>
      </div>
      <div className="mt-3 ">
        <Widget
          src="create.near/widget/PageTabs"
          props={{
            accountId,
            project,
            showEditButton: !props.project,
          }}
        />
      </div>
    </div>
  </div>
);
