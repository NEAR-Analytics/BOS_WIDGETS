const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const { fetchProjects } = VM.require("builddao.near/widget/lib.projects") || {
  fetchProjects: () => [],
};
const projects = fetchProjects();
return (
  <Widget
    src="builddao.near/widget/page.projects.MainViewContainer"
    loading=""
    props={{
      subheading: "Discover Projects",
      description:
        "Easily create, share, and track all projects within our vibrant builder community",
      projects: projects,
      showOpenRoles: true,
      showCreateProject: true,
    }}
  />
);
