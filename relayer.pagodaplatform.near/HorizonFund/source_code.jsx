const profileContract = "0xd0373346638A6925Fb39f8c1a27918CBEB6F8F61";
const projectContract = "0x4a05A1963d899Fc10bDF9dD0690022f96620b0FC";

const profileAbi = fetch(
  "https://aqua-fresh-crawdad-962.mypinata.cloud/ipfs/QmXgnL76jhGoXnR4SuAPULx2rRkQErf5iaVKeoXtyPh15H"
);

const projectAbi = fetch(
  "https://aqua-fresh-crawdad-962.mypinata.cloud/ipfs/Qmeq1Wfa8rq1yg3qNx73UyHcwohDaZjxXxE3wiFPbCRCTd"
);

if (!projectAbi.ok && !profileAbi.ok) {
  return "Loading...";
}

const projectIface = new ethers.utils.Interface(projectAbi.body);
const profileIface = new ethers.utils.Interface(profileAbi.body);

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (state.projects === undefined && state.sender) {
  const contract = new ethers.Contract(
    projectContract,
    projectAbi.body,
    Ethers.provider().getSigner()
  );
  contract.getAllProjects().then((res) => {
    State.update({ projects: res });
    console.log(res);
  });
}

if (state.profile === undefined && state.sender) {
  const contract = new ethers.Contract(
    profileContract,
    profileAbi.body,
    Ethers.provider().getSigner()
  );
  contract.getUser(0).then((res) => {
    State.update({ profile: res });
    console.log(res);
  });
}

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/Qmdpe64Mm46fvWNVaCroSGa2JKgauUUUE5251Cx9nTKNrs"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

const createProject = () => {
  if (
    state.projectTitle === "" ||
    state.projectAbout === "" ||
    state.projectImg === "" ||
    state.projectCat === ""
  )
    return console.log("One or more fields is empty.");

  const contract = new ethers.Contract(
    projectContract,
    projectAbi.body,
    Ethers.provider().getSigner()
  );

  console.log("DCFCFRCrfc");

  contract
    .add_task(
      state.projectTitle,
      state.projectAbout,
      state.sender,
      state.projectImg,
      0,
      state.projectCat
    )
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
      const contract = new ethers.Contract(
        projectContract,
        projectAbi.body,
        Ethers.provider().getSigner()
      );
      contract.getAllProjects().then((res) => {
        State.update({ projects: res });
      });
    });
};

return (
  <Theme>
    <div className="Container">
      <span style={{ fontWeight: 800, fontSize: "1.4rem" }}>HorizonFund</span>
      {state.profile && (
        <div>
          <h1 style={{ fontWeight: 800, fontSize: "1.2rem", color: "green" }}>
            Your Profile
          </h1>
          <img
            style={{
              padding: 0,
              margin: 0,
              borderRadius: "50%",
              height: "5rem",
              width: "5rem",
            }}
            src={state.profile[4]}
            alt={state.profile[0]}
          />
          <p style={{ padding: 0, margin: 0 }}>Username : {state.profile[0]}</p>
          <p style={{ padding: 0, margin: 0 }}>About : {state.profile[1]}</p>
          <p style={{ padding: 0, margin: 0 }}>Address : {getSender()}</p>
          <p>Joined On : {new Date().toLocaleDateString()}</p>
        </div>
      )}
      {!!state.sender ? (
        <div>
          {
            <div style={{ width: "60%", margin: "auto" }}>
              <input
                style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
                value={state.projectTitle}
                onChange={(e) => State.update({ projectTitle: e.target.value })}
                placeholder="Project Name"
              />
              <input
                style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
                value={state.projectAbout}
                onChange={(e) => State.update({ projectAbout: e.target.value })}
                placeholder="About Project"
              />
              <input
                style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
                value={state.projectImg}
                onChange={(e) => State.update({ projectImg: e.target.value })}
                placeholder="Project ImageURL"
              />
              <select
                style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
                value={state.projectCat}
                onChange={(e) => State.update({ projectCat: e.target.value })}
                placeholder="Project ImageURL"
              >
                <option value="">--Select--</option>
                <option value={0}>DESIGNANDTECH</option>
                <option value={1}>FILM</option>
                <option value={2}>ART</option>
                <option value={3}>GAME</option>
              </select>
              <button
                onClick={createProject}
                style={{
                  backgroundColor: "rgb(0, 191, 121)",
                  border: "none",
                  width: "100%",
                  margin: "0.5rem 0",
                }}
              >
                Create Project
              </button>
            </div>
          }

          <h1 style={{ fontWeight: 800, fontSize: "1.2rem", color: "green" }}>
            All Projects
          </h1>
          <div>
            {state.projects && state.projects.length === 0 ? (
              <p>No Projects</p>
            ) : (
              state.projects.map((project, idx) => (
                <div
                  style={{
                    width: "18rem",
                    borderRadius: "1rem",
                    border: "1px solid #eee",
                    padding: "0.5rem",
                    height: "fit-content",
                  }}
                  key={idx}
                >
                  <img
                    style={{ borderRadius: "0.6rem", width: "100%" }}
                    src={project[7]}
                    alt="projectImage"
                  />
                  <p
                    style={{
                      fontWeight: "700",
                      fontSize: "1.3rem",
                      margin: "0.3rem 0",
                    }}
                  >
                    {project[2]}
                  </p>
                  <h6 styles={{ margin: "0", padding: "0" }}>
                    About : {project[3]}
                  </h6>
                  <p styles={{ margin: "0px", padding: "0px" }}>
                    Funds Raised: {ethers.BigNumber.from(project[4]).toNumber()}{" "}
                    ETH
                  </p>
                  <p styles={{ margin: "0px", padding: "0px" }}>
                    Owner:{" "}
                    {() =>
                      project[6].substring(0, 6) +
                      "..." +
                      project[6].substring(
                        state.sender.length - 4,
                        state.sender.length
                      )
                    }
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <Web3Connect
          className="LidoStakeFormSubmitContainer"
          connectLabel="Connect with Web3"
        />
      )}
    </div>
  </Theme>
);
