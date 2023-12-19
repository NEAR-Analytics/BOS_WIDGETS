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
  <div>
    <Create id="create">
      <div>
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
      </div>

      <br />
      <hr />

      <div>
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
      </div>
      <br />
      <hr />

      <div>
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
      </div>
      <br />
      <hr />

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
  </div>
);
