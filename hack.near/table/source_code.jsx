const accountId = props.accountId ?? context.accountId ?? "every.near";
const [newMember, setNewMember] = useState("");

const social = Social.getr(`${accountId}/graph`);

if (!social) {
  return "";
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
  max-width: 100px;
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

const MenuItem = styled.div`
  margin-right: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

return (
  <>
    <Container>
      <MenuBar>
        <MenuItem>Graphs</MenuItem>
        <MenuItem>DAOs</MenuItem>
        <MenuItem>NFTs</MenuItem>
        <MenuItem>SBTs</MenuItem>
      </MenuBar>
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
        <button
          onClick={createList}
          className="p-1 ms-1 mt-1 mb-1 btn btn-sm btn-outline-light"
        >
          +
        </button>
      </TabBar>
      <SheetContainer>
        <h5>
          {accountId}/graph/{graphId}
        </h5>
        <b>{members.length} members</b>
        {members.map((member, index) => (
          <div className="m-1" key={index}>
            <Widget
              src="mob.near/widget/N.ProfileLine"
              props={{ accountId: member }}
            />
          </div>
        ))}
        <input
          type="text"
          placeholder="new member account ID"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <Widget
          src="hack.near/widget/ConnectButton"
          props={{ accountId: newMember || "every.near", graphId }}
        />
      </SheetContainer>
    </Container>
  </>
);
