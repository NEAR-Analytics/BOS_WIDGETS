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

return (
  <Theme>
    <div className="Container">
      <span style={{ fontWeight: 800, fontSize: "1.4rem" }}>HorizonFund</span>
      {state.sender ? (
        <div>
          <h1 style={{ fontWeight: 800, fontSize: "1.2rem", color: "green" }}>
            Projects
          </h1>
          <div>
            {state.projects.length === 0 ? (
              <p>No Projects</p>
            ) : (
              state.projects.map((project, idx) => (
                <div key={idx}>
                  <p>Name : {project[2]}</p>
                  <p>About : {project[3]}</p>
                  <p>
                    Funds Raised: {ethers.BigNumber.from(project[4]).toNumber()}{" "}
                    ETH
                  </p>
                  <img src={project[7]} alt="projectImage" />
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
