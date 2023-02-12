const accountId = context.accountId;

let project = Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading";
}

State.init({
  project,
});

return (
  <div className="row">
    <div className="mb-2">
      <Widget
        src="gov.near/widget/MetadataEditor"
        props={{
          initialMetadata: project,
          onChange: (project) => State.update({ project }),
          options: {
            featuredWidget: {
              label: "Project Source: <accountId>.near/widget/<WidgetName>",
            },
          },
        }}
      />
    </div>
    <div className="mb-2">
      <CommitButton data={{ project: state.project }}>
        Save Project
      </CommitButton>
      <a
        className="btn btn-outline-primary ms-2"
        href={`#/gov.near/widget/ProjectPage?accountId=${accountId}`}
      >
        View Project
      </a>
    </div>
  </div>
);
