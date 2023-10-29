State.init({
  projects: [],
});

const contractId = 'bugeye.learnclub.near';

const getProjects = async () => {
  let i = 1;
  let limit = 20;
  let projects = {};
  while (i >= 1) {
    const data = Near.view({
      contractId: contractId,
      method: "get_projects",
      args: {
        page: i,
        limit: limit,
        account_id: window.mainWallet.accountId,
      },
    });
    const arrayAtIndex0 = data[0];
    for (let project of arrayAtIndex0) {
      projects[project["name"]] = project;
    }
    if (data[1] <= i) {
      break;
    }
    if (data[1] > i) {
      i++;
    }
  }
  return projects;
};


const testCall = () => {
  return Near.call("nearsocialexamples.near", "set_greeting", {
    message: "Hi Near Social",
  });
};

const testView = () => {
  State.update({
    prpjects: await getProjects(),
  });
};

return (
  <div>
    <button onClick={testCall}>test call</button>
  </div>
);
