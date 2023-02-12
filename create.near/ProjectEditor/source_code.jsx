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
    <div>
      <h4>Edit Project</h4>
    </div>
    <div className="mb-2">
      <Widget
        src="gov.near/widget/MetadataEditor"
        props={{
          initialMetadata: project,
          onChange: (project) => State.update({ project }),
          options: {
            name: { label: "Project Name" },
            featuredWidget: {
              label: "Project Source: <accountId>.near/widget/<WidgetName>",
            },
            image: { label: "Widget Logo" },
            backgroundImage: { label: "Background Image" },
            description: { label: "About the Widget" },
            tags: {
              label: "Tags",
              tagsPattern: "*/project/tags/*",
              placeholder: "near, dev, art, edu, nft, defi, gov",
            },
            linktree: {
              links: [
                {
                  label: "Twitter",
                  prefix: "https://twitter.com/",
                  name: "twitter",
                },
                {
                  label: "Github",
                  prefix: "https://github.com/",
                  name: "github",
                },
                {
                  label: "Telegram",
                  prefix: "https://t.me/",
                  name: "telegram",
                },
                {
                  label: "Website",
                  prefix: "https://",
                  name: "website",
                },
              ],
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
