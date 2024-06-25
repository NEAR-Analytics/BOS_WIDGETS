if (!context.accountId) {
  return (
    <Widget
      src="builddao.near/widget/components.LoginAction"
      loading=""
      props={{
        text: "Please log in in order to see your projects!",
      }}
    />
  );
}
const { fetchProjects } = VM.require("builddao.near/widget/lib.projects") || {
  fetchProjects: () => [],
};
const projects = fetchProjects();
projects = projects.filter(
  (project) => project.accountId === context.accountId
);
return (
  <Widget
    src="builddao.near/widget/page.projects.MainViewContainer"
    loading=""
    props={{
      subheading: "Find your projects",
      description: "Projects created by you or which you own",
      projects: projects,
      showOpenRoles: true,
      showCreateProject: true,
      showEditProjectAction: true,
    }}
  />
);
