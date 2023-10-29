State.init({
  projects: [],
});

const getProjectsList = (page, limit) => {
  return Near.view("bugeye.learnclub.near", "get_projects", {
    page,
    limit,
  });
};

const contractId = "bugeye.learnclub.near";

const testView = () => {
  State.update({
    projects: getProjectsList(),
  });
  console.log(state.projects);
};

return (
  <div>
    <button onClick={testView}>test view</button>
  </div>
);
