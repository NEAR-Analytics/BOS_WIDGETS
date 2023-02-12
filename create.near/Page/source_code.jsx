const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return (
    <div className="mx-auto">
      <Widget
        src="create.near/widget/ProjectCard"
        props={{
          accountId,
          project,
          link: true,
          showEditButton: !props.project,
        }}
      />
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
      <div className="mt-3">
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
