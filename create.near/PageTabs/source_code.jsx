const accountId = props.accountId ?? context.accountId;

const project = props.project ?? Social.getr(`${accountId}/project`);

const featuredWidget =
  project.featuredWidget || "create.near/widget/ProjectEditor";

if (project === null) {
  return { showEditButton };
}

const showEditButton =
  project !== undefined &&
  (!props.project || props.showEditButton) &&
  accountId &&
  accountId === context.accountId;

return (
  <>
    <div className="mt-3">
      <Widget
        src="create.near/widget/ProjectEditor"
        props={{
          accountId,
          project,
          link: true,
          showEditButton: !props.project,
        }}
      />
    </div>
    <div className="mt-3">
      <div>
        <Widget src={featuredWidget} />
      </div>
    </div>
  </>
);
