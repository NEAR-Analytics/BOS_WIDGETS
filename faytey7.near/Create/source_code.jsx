const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return <a href="https://www.near.org/signin">Connect Wallet</a>;
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const description = profile.description;

const [orgName, setOrgName] = useState("");
const [orgSize, setOrgSize] = useState("");
const [orgMembers, setOrgMembers] = useState(members);
const [orgDesc, setOrgDesc] = useState("");
const [memberName, setMemberName] = useState("");
const [memberRole, setMemberRole] = useState("");
const [memberWalletAddress, setMemberWalletAddress] = useState("");
const [tasks, setTasks] = useState([]);
const [getTask, setGetTasks] = useState(null);
const [taskName, setTaskName] = useState("");
const [taskAssignee, setTaskAssignee] = useState("");
const [assigned, setAssigned] = useState(true);
const [totalOrg, setTotalOrg] = useState([]);
const [viewOrg, setViewOrg] = useState(null);

const Container = styled.div`
background: #e9e9e9;
`;

const Home = styled.div`
margin: 2em;
display: flex;
gap: 2em;
height: h-screen;
align-items: center;
justify-content: space-around;
`;

const Paragraph = styled.p`
font-size: 2em;
letter-spacing: 0.05em;
font-weight: bold;
color: #303030;
text-align: center;
width: 100%;
`;

const Gold = styled.span`
background: goldenrod;
padding: 0.1em 0.5em;
color: white;
border-radius: 0.2em;
text-stroke: 2px black;
`;

const Image = styled.img`
border-radius: 0.3em;
box-shadow: 1em 1em 3em rgba(0,0,0,0.3);
width: 100%;
`;

const About = styled.div`
background: rgba(0,0,0,0.8);
text: white;
padding: 2em;
`;

const H3 = styled.h3`
text-align: center;
color: white;
`;

const P = styled.p`
color: white;
font-size: 1.1em;
text-align: center;
padding: 1em 5em;
`;

const Create = styled.div`
padding: 2em;
`;

const Button = styled.button`
background: rgba(0,0,0,0.8);
color: white;
padding: 0.5em;
margin: 1em 0;
border: none;
border-radius: 0.3em;
`;

const Buttons = styled.button`
width: 100%;
background: rgba(0,0,0,0.8);
color: white;
padding: 0.5em;
margin: 1em 0;
border: none;
border-radius: 0.3em;
`;

const Footer = styled.div`
background: rgba(0,0,0,0.8);
padding: 2em 4em;
color: white;
text-align: center;
`;

const Heading = styled.h3`
text-align: center;
`;

const Input = styled.input`
margin: 1em 0;
display: block;
width: 100%;
padding: 0.3em;
border-radius: 0.5em;
border: none;
box-shadow: 0.1em 0.1em 0.3em rgba(0,0,0, 0.5);
`;

const Spans = styled.span`
font-weight: bold;
`;

const pills = [
  { id: "org", title: "Create Organisation" },
  { id: "member", title: "Add Member" },
  { id: "task", title: "Create Task" },
];

const Nav = styled.div`
  .nav-pills {
    background: rgba(0,0,0,0.8);
    font-weight: 500;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-link-color: #fbfbfb;
    --bs-nav-pills-link-active-color: #000;
    --bs-nav-pills-link-active-bg: #fbfbfb;
    --bs-nav-link-padding-y: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-top: 3px;
  }
  .nav-link.active {
    border-bottom: 3px solid rgba(0,0,0,0.8);
    border-left: 3px solid rgba(0,0,0,0.8);
    border-right: 3px solid rgba(0,0,0,0.8);
  }

  margin: 0 -12px; 
`;

const addOrganization = () => {
  setTotalOrg((prevOrganizations) => [
    ...prevOrganizations,
    { name: orgName, size: orgSize, members: orgMembers, description: orgDesc },
  ]);

  setOrgName("");
  setOrgSize("");
  setOrgDesc("");
  setOrgMembers([]);
};

const addMember = ({ index }) => {
  const newMember = {
    id: orgMembers.length + 1,
    name: memberName,
    role: memberRole,
    walletAddress: memberWalletAddress,
  };
  const newMemberList = [...orgMembers.members];

  newMemberList.splice(index, 0, newMember);

  setTotalOrg({ ...totalOrg, addMember: newMemberList });
};

const viewOrganisations = () => {
  const view = (
    <div>
      <p>{description}</p>
      {totalOrg.map((org, index) => (
        <div key={index}>
          <p>
            <Spans>Name:</Spans> {org.name}
          </p>

          <p>
            <Spans>Size:</Spans> {org.size}
          </p>

          <p>
            <Spans>Description:</Spans> {org.description}
          </p>
        </div>
      ))}
    </div>
  );
  setViewOrg(view);
};

const addTask = () => {
  setTasks((prevTask) => [
    ...prevTask,
    { name: taskName, assignnee: taskAssignee, status: assigned },
  ]);

  setTaskName("");
  setTaskAssignee("");
  setAssigned(false);
};

const getTasks = () => {
  const view = (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <p>
            <Spans>Name:</Spans> {task.name}
          </p>

          <p>
            <Spans>Assignee:</Spans> {task.assignnee}
          </p>
        </div>
      ))}
    </div>
  );
  setGetTasks(view);
};

return (
  <Container>
    <Create id="create">
      <Nav>
        <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
          {pills.map(({ id, title }, i) => (
            <li className="nav-item" role="presentation" key={i}>
              <button
                className={`nav-link ${i === 0 ? "active" : ""}`}
                id={`pills-${id}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#pills-${id}`}
                type="button"
                role="tab"
                aria-controls={`pills-${id}`}
                aria-selected={i === 0}
                onClick={() => {
                  const key = `load${id}`;
                  !state[key] && State.update({ [key]: true });
                }}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </Nav>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-org"
          role="tabpanel"
          aria-labelledby="pills-org-tab"
        >
          <div className="col-lg-8 mx-auto">
            {description && (
              <Widget
                key="desc"
                loading=""
                src="mob.near/widget/MainPage.N.Post"
                props={{
                  accountId,
                  pinned: true,
                  blockHeight: "now",
                  content: {
                    text: description,
                  },
                }}
              />
            )}
            <Widget
              key="feed"
              src="mob.near/widget/MainPage.N.Feed"
              props={{ accounts: [accountId] }}
            />
          </div>
          <Create>
            <Heading>Create Organization</Heading>

            <div>
              <label htmlFor="name">Name of Organization:</label>

              <Input
                type="text"
                id="name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="size">Size of Organization:</label>

              <Input
                type="number"
                id="size"
                value={orgSize}
                onChange={(e) => setOrgSize(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="desc">Description:</label>

              <Input
                type="text"
                id="desc"
                value={orgDesc}
                onChange={(e) => setOrgDesc(e.target.value)}
              />
            </div>

            <Buttons onClick={addOrganization}>Add Organization</Buttons>
          </Create>
        </div>
        <div
          className="tab-pane fade"
          id="pills-member"
          role="tabpanel"
          aria-labelledby="pills-member-tab"
        >
          <Create>
            <Heading>Add Member</Heading>

            <div>
              <label htmlFor="name">Name:</label>

              <Input
                type="text"
                id="name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="size">Role:</label>

              <Input
                type="role"
                id="role"
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="desc">Wallet Address:</label>

              <Input
                type="text"
                id="desc"
                value={memberWalletAddress}
                onChange={(e) => setMemberWalletAddress(e.target.value)}
              />
            </div>

            <Buttons onClick={addMember}>Add Member</Buttons>
          </Create>
        </div>
        <div
          className="tab-pane fade widget"
          id="pills-task"
          role="tabpanel"
          aria-labelledby="pills-task-tab"
        >
          <Create>
            <Heading>Create Task</Heading>

            <div>
              <label htmlFor="taskname">Name of Task:</label>

              <Input
                type="text"
                id="taskname"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="assignee">Assignee:</label>

              <Input
                type="text"
                id="assignee"
                value={taskAssignee}
                onChange={(e) => setTaskAssignee(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="status">Status:</label>

              <Input
                type="text"
                id="status"
                value={assigned}
                onChange={(e) => setAssigned(e.target.value)}
              />
            </div>

            <Buttons onClick={addTask}>Add Task</Buttons>
          </Create>
        </div>
      </div>

      <Home>
        <div>
          <Button onClick={viewOrganisations}>View Organizations</Button>
          <div>{viewOrg}</div>
        </div>
        <div>
          <Button onClick={getTasks}>View Tasks</Button>
          <div>{getTask}</div>
        </div>
      </Home>
    </Create>
  </Container>
);
