const widget = (src, props, other) => (
  <Widget src={src} props={props} {...other} />
);


const projectsObj = props.handle["project"].getAll();
const projects = Object.keys(projectsObj || {}).map((k) => ({
  ...projectsObj[k].data,
  template: projectsObj[k].template.src,
  id: k,
}));

return widget("createit.near/widget/manager.ui", {
  handleCreateProject: props.handle["project"].create,
  projects,
  navigate: props.navigate,
});
