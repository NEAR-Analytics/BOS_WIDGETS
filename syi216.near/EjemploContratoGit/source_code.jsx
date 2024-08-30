//We declare the states of the actions and information of the git repository
const [account, setAccount] = useState(undefined);
const [gitData, setGitData] = useState(undefined);
const [activeAction, setActiveAction] = useState("start");
const [gitContract, setGitContract] = useState("");
const [isGitContract, setIsGitContract] = useState(false);
const [isCollab, setIsCollab] = useState(false);
const [inputData, setInputData] = useState("");
const [branches, setBranches] = useState([]);
const [collaborators, setCollaborators] = useState([]);
const [branchSelect, setBranchSelect] = useState(undefined);
const [collabSelect, setCollabSelect] = useState(undefined);
const [owner, setOwner] = useState("");
const [isExpanded, setIsExpanded] = useState("");

const toggleIsExpanded = (id) => {
  setIsExpanded(isExpanded == id ? "" : id);
};

const ownerCheck = (data, account) => {
  setIsCollab(data.includes(account));
};

//We define the Git Repository contract metadata
const contractData =
  "000200010000000000010500000001090000000000000000010c000000b11554000850646563656e7472616c697a65645f6769745f696f3c496e69745265706f50726f6772616d00000801146f776e657204011c4163746f7249640001106e616d65100118537472696e67000004082c677072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100000050200140850646563656e7472616c697a65645f6769745f696f485265706f416374696f6e526571756573747300011c1852656e616d650400100118537472696e67000000304372656174654272616e63680400100118537472696e670001003052656e616d654272616e6368040018014452656e616d654272616e6368496e7075740002003044656c6574654272616e636804001c014444656c6574654272616e6368496e7075740003001050757368040020012450757368496e7075740004003c416464436f6c6c61626f7261746f72040004011c4163746f7249640005004844656c657465436f6c6c61626f7261746f72040004011c4163746f72496400060000180850646563656e7472616c697a65645f6769745f696f4452656e616d654272616e6368496e70757400000801086964100118537472696e670001106e616d65100118537472696e6700001c0850646563656e7472616c697a65645f6769745f696f4444656c6574654272616e6368496e70757400000401246272616e63685f6964100118537472696e670000200850646563656e7472616c697a65645f6769745f696f2450757368496e70757400000801246272616e63685f6964100118537472696e6700011068617368100118537472696e670000240850646563656e7472616c697a65645f6769745f696f4c5265706f416374696f6e526573706f6e73657300011c1852656e616d6504010c6d7367100118537472696e67000000304372656174654272616e636804010c6d7367100118537472696e670001003052656e616d654272616e636804010c6d7367100118537472696e670002003044656c6574654272616e636804010c6d7367100118537472696e67000300105075736804010c6d7367280118436f6d6d69740004003c416464436f6c6c61626f7261746f7204010c6d7367100118537472696e670005004844656c657465436f6c6c61626f7261746f7204010c6d7367100118537472696e6700060000280850646563656e7472616c697a65645f6769745f696f18436f6d6d697400001001086964100118537472696e670001146f776e657204011c4163746f72496400011068617368100118537472696e67000128637265617465645f61742c010c75363400002c0000050600300850646563656e7472616c697a65645f6769745f696f1c50726f6772616d00001401146f776e657204011c4163746f7249640001106e616d65100118537472696e6700013c757365725f70726f6772616d5f696404011c4163746f724964000130636f6c6c61626f7261746f7234016842547265654d61703c4163746f7249642c204163746f7249643e0001206272616e6368657340016042547265654d61703c537472696e672c204272616e63683e000034042042547265654d617008044b01040456010400040038000000380000023c003c0000040804040040042042547265654d617008044b0110045601440004004c000000440850646563656e7472616c697a65645f6769745f696f184272616e636800001801086964100118537472696e670001146f776e657204011c4163746f7249640001106e616d65100118537472696e6700011c636f6d6d69747348012c5665633c436f6d6d69743e000128637265617465645f61742c010c753634000128757064617465645f61742c010c75363400004800000228004c00000250005000000408104400";

//The HTML elements with styles that will be used in the component are declared
const App = styled.div`
  --margin-app: clamp(16px, 4vw, 24px);
  --h-footer: 60px;
  --bg-card: rgb(25, 25, 25, .9);
  --primary: #0fffc7;
  --gradient: linear-gradient(to right, #22463d, #00f0b8);

  display: grid;
  place-items: center;
  place-content: center;
  min-height: calc(100dvh - var(--h-footer));
  background: linear-gradient(to top right, #fff, #f5f5f7);

  .wrapper {
    background: var(--bg-card);
    border-radius: .3rem;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    max-width: 500px;

    span {
      color: #fff
    }
  }

  ::-moz-selection { /* Code for Firefox */
    background: #ccf0e7;
  }
  
  ::selection {
    background: #ccf0e7;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`,
  Input = styled.div`
    display: flex;
    gap: 10px;
    border-radius: .75rem;
    padding: 5px;
    background: #fff;
    box-shadow: 0 0 10px -5px rgb(0,0,0,.4);

    input {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      border: none;
      height: 40px;
      font-size: 24px;
      font-weight: 500;
      padding-right: 0;
      margin: 5px;
      
      &::placeholder {
        font-size: 24px;
      }
      
      &:focus {
        box-shadow: none;
      }
    }
  `,
  Btn = styled.button`
    display: inlin-block;
    background: var(--primary);
    border: none;
    border-radius: .7rem;
    font-weight: 600;
    padding-inline: 10px;
    min-height: 45px;

    :hover {
      opacity: .9;
      filter: grayscale(0.5);
    }
  `,
  Footer = styled.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--h-footer);
  background: var(--primary);

  a {
    color: #000;
    background: #fff;
    padding: 10px 30px;
    border-radius: .75rem;
    translate: 0 -20px;
    box-shadow: 0 0 10px -5px rgb(0,0,0,.4);
  }
  
  #vara-icon {
    width: 50px;
    height: 50px;
  }
`;
const collapseContent = styled.div`
{
  transition-property: height;
  transition-duration: 200ms;
  overflow: hidden;
  background-color: #f2f2f2;
}
`;

const collapseHeader = styled.div`
{
 background-color: #424242;
}
`;

//Interface menu code section
const gitActionsMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Actions</h4>
    <div className="mb-4 d-flex flex-column gap-4 align-items-center">
      <Btn
        style={{ width: "348px" }}
        onClick={() => setActiveAction("pushData")}
      >
        Push Data
      </Btn>
      <Btn
        style={{ width: "348px" }}
        onClick={() => setActiveAction("viewBranches")}
      >
        View Branches
      </Btn>
      <div className="d-flex flex-row gap-2">
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("createBranch")}
        >
          Create Branch
        </Btn>
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("deleteBranch")}
        >
          Delete Branch
        </Btn>
      </div>
      <div className="d-flex flex-row gap-2">
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("addCollaborator")}
        >
          Add Collaborator
        </Btn>
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("deleteCollaborator")}
        >
          Delete Collaborator
        </Btn>
      </div>
      <div className="d-flex flex-row gap-2">
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("renameRepo")}
        >
          Rename Repo
        </Btn>
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("renameBranch")}
        >
          Rename Branch
        </Btn>
      </div>
      <Btn
        style={{ width: "348px" }}
        onClick={() => {
          setAccount(undefined);
          setGitData(undefined);
          setActiveAction("start");
          setGitContract("");
          setIsGitContract(false);
          setIsCollab(false);
          setInputData("");
          setBranches([]);
          setCollaborators([]);
          setBranchSelect(undefined);
          setCollabSelect(undefined);
          setOwner("");
          setIsExpanded("");
        }}
      >
        Go Back
      </Btn>
    </div>
  </>
);

//Code section of the create branch menu
const createBranchMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Create Branch</h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Branch name</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for create branch is declared
            signTransaction(
              gitContract,
              contractData,
              { CreateBranch: inputData },
              118156152120,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
            }, "4000");
          }}
        >
          Save Branch
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the add collaborator menu
const addCollaboratorMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Add Collaborator
    </h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Collaborator wallet</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for add collaborator is declared
            signTransaction(
              gitContract,
              contractData,
              { AddCollaborator: inputData },
              118156152120,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
            }, "4000");
          }}
        >
          Add Collaborator
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the rename repository menu
const renameRepoMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Rename Repository
    </h4>
    <p className="text-light m-0 text-center mb-2">
      It will take some time for the information update to be reflected.
    </p>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Repository name</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for rename repo is declared
            signTransaction(
              gitContract,
              contractData,
              { Rename: inputData },
              118156152120,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
            }, "4000");
          }}
        >
          Save Name
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Menu code section delete branch
const deleteBranchMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Delete Branch</h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select Branch</h5>
      <select onChange={(e) => setBranchSelectelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a branch
        </option>
        {branches.map((data) => {
          return <option value={data.id}>{data.name}</option>;
        })}
      </select>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for delete branch is declared
            signTransaction(
              gitContract,
              contractData,
              { DeleteBranch: { branch_id: branchSelect } },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setBranchSelect(undefined);
            }, "4000");
          }}
        >
          Delete Branch
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the menu delete collaborator
const deleteCollaboratorMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Delete Collaborator
    </h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select Collaborator</h5>
      <select onChange={(e) => setCollabSelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a collaborator
        </option>
        {collaborators.map((data) => {
          return (
            <option value={data}>
              {data.substr(0, 12) + "..." + data.substr(-12, 12)}
            </option>
          );
        })}
      </select>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for delete collaborator is declared
            signTransaction(
              gitContract,
              contractData,
              { DeleteCollaborator: collabSelect },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setCollabSelect(undefined);
            }, "4000");
          }}
        >
          Delete Collaborator
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the menu rename branch
const renameBranchMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Rename Branch</h4>
    <div className="mb-2 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select a Branch</h5>
      <select onChange={(e) => setBranchSelectelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a branch
        </option>
        {branches.map((data) => {
          return <option value={data.id}>{data.name}</option>;
        })}
      </select>
    </div>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Branch name</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for rename branch is declared
            signTransaction(
              gitContract,
              contractData,
              { RenameBranch: { id: branchSelect, name: inputData } },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
              setBranchSelect(undefined);
            }, "4000");
          }}
        >
          Rename Branch
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Push data menu code section
const pushDataMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Push Data</h4>
    <div className="mb-2 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select a Branch</h5>
      <select onChange={(e) => setBranchSelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a branch
        </option>
        {branches.map((data) => {
          return <option value={data.id}>{data.name}</option>;
        })}
      </select>
    </div>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Write the hash of your code</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for push data is declared
            signTransaction(
              gitContract,
              contractData,
              { Push: { branch_id: branchSelect, hash: inputData } },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
              setBranchSelect(undefined);
            }, "4000");
          }}
        >
          Save Data
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the branches menu
const branchesMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Available Branches
    </h4>
    <div
      className="d-flex flex-column gap-2"
      style={{ width: "384px", height: "321px", "overflow-y": "scroll" }}
    >
      {branches.map((data) => {
        return (
          <div>
            <collapseHeader
              className="d-flex flex-row text-light justify-content-between p-2"
              onClick={() => toggleIsExpanded(data.id)}
            >
              <h4 className="m-0">{data.name}</h4>
              <h4 className="m-0 fw-bold">↓</h4>
            </collapseHeader>
            <collapseContent
              style={{ height: isExpanded == data.id ? "auto" : "0px" }}
            >
              <div className="p-2">
                {data.commits.length == 0 ? (
                  <h5 className="fw-bold text-center py-2">
                    No commits have been made on this branch
                  </h5>
                ) : (
                  data.commits.reverse().map((commit) => {
                    const date = new Date(commit.createdAt);
                    return (
                      <>
                        <div className="d-flex flex-row gap-2">
                          <p className="fw-bold">Id:</p>
                          <p className="">{commit.id}</p>
                        </div>
                        <div className="d-flex flex-row gap-2">
                          <p className="fw-bold">Owner:</p>
                          <p className="">
                            {commit.owner.substr(0, 12) +
                              "..." +
                              commit.owner.substr(-12, 12)}
                          </p>
                        </div>
                        <div className="d-flex flex-row gap-2">
                          <p className="fw-bold">Date:</p>
                          <p className="">{date.toDateString()}</p>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <p className="fw-bold m-0">Content:</p>
                          <p className="m-0">{commit.hash}</p>
                        </div>
                        <hr />
                      </>
                    );
                  })
                )}
              </div>
            </collapseContent>
          </div>
        );
      })}
    </div>
    <Btn className="mt-2" onClick={() => setActiveAction("start")}>
      Back
    </Btn>
  </>
);

//Menu code section processing transaction
const transactionMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Processing transaction
    </h4>
    <p className="text-light m-0 text-center mb-2">
      Your transaction is being processed, press the button below once the
      transaction has been confirmed to reload the information
    </p>
    <VaraNetwork.Interaction
      trigger={({ readState }) => (
        <>
          <Btn
            onClick={() => {
              const info = readState(gitContract, contractData, "");
              //The information is reloaded after each transaction
              info.then((res) => {
                const collab = [res.owner];
                const extraCollab = Object.values(res.collaborator);
                ownerCheck(collab.concat(extraCollab), account.decodedAddress);
                setGitData({ owner: res.owner, name: res.name });
                setBranches(Object.values(res.branches));
                setCollaborators(extraCollab);
                setActiveAction("start");
              });
            }}
          >
            Go Back
          </Btn>
        </>
      )}
    />
  </>
);
