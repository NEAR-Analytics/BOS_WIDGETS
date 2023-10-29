State.init({
  projects: [],
});
const contractId = "bugeye.learnclub.near";

const getProjectsList = (page, limit) => {
  return Near.view(contractId, "get_projects", {
    page,
    limit,
  });
};

const getProposalsByProject = (project_id, status, page, limit) => {
  return Near.view(contractId, "get_proposals_by_project", {
    project_id,
    status,
    page,
    limit,
  });
};

const testView = () => {
  State.update({
    projects: getProjectsList(1, 10),
  });
  console.log(getProposalsByProject(1, 1, 1, 10));
  console.log(state.projects);
};

return (
  <div>
    <button onClick={testView}>test view</button>
  </div>
);
