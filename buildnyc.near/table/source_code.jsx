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
        <div className="d-flex flex-row">
          <a href="/">
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: props.image,
                style: { width: "39px" },
                className: "m-1",
                fallbackUrl:
                  "https://builders.mypinata.cloud/ipfs/QmQmKGGJXhkhGrTbE4MgJ3G1wUUu8eo7mNKwRSCB5tihCw",
              }}
            />
          </a>
          <a
            href="/buildcity.near/widget/app"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <h5 className="m-2">Build City</h5>
          </a>
        </div>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: "buildnyc.near", hideAccountId: true }}
        />
      </div>
      <br />
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
        <b>
          {members.length} {members.length === 1 ? "member" : "members"}
        </b>
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
