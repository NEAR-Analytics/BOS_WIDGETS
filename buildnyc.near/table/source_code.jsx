const accountId = props.accountId ?? "buildnyc.near";
const [newMember, setNewMember] = useState("");

const social = Social.getr(`${accountId}/graph`);

if (!social) {
  return "no graphs found";
}

const graphs = Object.keys(social);

const [graphId, setGraphId] = useState(graphs[0]);
const members = Object.keys(Social.getr(`${accountId}/graph/${graphId}`));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MenuBar = styled.div`
  background-color: #fff;
  padding: 8px;
  display: flex;
`;

const TabBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: #000;
  padding: 8px;
`;

const SheetContainer = styled.div`
  flex-grow: 1;
  background-color: #fff;
  overflow: auto;
  margin: 8px;
`;

const Tab = styled.button`
  padding: 5px 8px;
  margin: 3px;
  background-color: #eaecef;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none; 

  &:hover {
    background-color: #d8dade;
  }

  &.active {
    background-color: #ffffff;
    font-weight: bold;
  }
`;

return (
  <>
    <Container>
      <div className="m-2 d-flex flex-row justify-content-between">
        <a href="/" style={{ color: "#000", textDecoration: "none" }}>
          Home
        </a>
        <Widget
          src="mob.near/widget/N.ProfileLine"
          props={{ accountId: "buildcity.near", hideAccountId: true }}
        />
      </div>
      <TabBar>
        {graphs.map((graph) => (
          <Tab
            key={graph}
            className={graphId === graph ? "active" : ""}
            onClick={() => setGraphId(graph)}
          >
            {graph}
          </Tab>
        ))}
      </TabBar>
      <SheetContainer>
        <br />
        <div className="d-flex flex-row gap-3">
          <input
            type="text"
            placeholder="Account ID"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          <Widget
            src="hack.near/widget/ConnectButton"
            props={{ accountId: newMember || "every.near", graphId }}
          />
        </div>
        <br />
        <b>{members.length} members</b>
        {members.map((member, index) => (
          <div
            className="m-1 d-flex flex-row justify-content-between"
            key={index}
          >
            <Widget
              src="mob.near/widget/N.ProfileLine"
              props={{ accountId: member }}
            />
            <Widget
              src="hack.near/widget/ConnectButton"
              props={{ accountId: member, graphId }}
            />
          </div>
        ))}
      </SheetContainer>
    </Container>
  </>
);
