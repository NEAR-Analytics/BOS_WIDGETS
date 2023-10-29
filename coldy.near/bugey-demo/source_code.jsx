State.init({
  projects: [],
});

const contractId = "bugeye.learnclub.near";

const testView = () => {
  const value = Near.view("bugeye.learnclub.near", "get_projects", {
    page: 1,
    limit: 10,
  });
  console.log(value);
};

return (
  <div>
    <button onClick={testView}>test view</button>
  </div>
);
