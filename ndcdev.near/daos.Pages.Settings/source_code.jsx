let { contractName, content } = VM.require(
  `ndcdev.near/widget/daos.Config`
);
if (!contractName) return <Widget src="flashui.near/widget/Loading" />;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  @media screen and (max-width: 786px) {
    padding: 1rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  textarea {
    font-family: monospace;
    font-size: 12px;
  }

  div[role="tablist"] {
    width: 100%;
    overflow-x: scroll;

    button {
      text-wrap: nowrap;
    }
  }
`;

const daos = Near.view(contractName, "get_dao_list", {});

if (!daos) return <Widget src="flashui.near/widget/Loading" />;

const myDAOs = daos.filter((dao) => dao.owners.includes(context.accountId));

if (myDAOs.length === 0)
  return (
    <Container>
      <Wrapper>
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2>You're not allowed for DAO settings</h2>
          <p>Ask DAO member to add you through settings</p>
        </div>
      </Wrapper>
    </Container>
  );

const [selectedDao, setSelectedDao] = useState(myDAOs[0]);

const handleSelectDao = (e) =>
  setSelectedDao(myDAOs.find((dao) => dao.id === parseInt(e.target.value)));

return (
  <Container>
    <Wrapper>
      <h2>Settings</h2>

      <div className="form-element">
        <label className="form-label">Select DAO</label>
        <select
          className="form-control"
          value={selectedDao.id}
          onChange={handleSelectDao}
        >
          {myDAOs.map((dao) => (
            <option value={dao.id}>{dao.title}</option>
          ))}
        </select>
      </div>

      <Widget
        src="near/widget/DIG.Tabs"
        props={{
          variant: "line",
          size: "default",
          items: [
            {
              name: "General",
              value: 1,
              content: (
                <Widget
                  src="ndcdev.near/widget/daos.Components.Settings.General"
                  props={{ selectedDao }}
                />
              ),
              icon: "ph ph-gear",
            },
            {
              name: "Members",
              value: 2,
              content: (
                <Widget
                  src="ndcdev.near/widget/daos.Components.Settings.Members"
                  props={{ selectedDao }}
                />
              ),
              icon: "ph ph-users",
            },
            {
              name: "Contacts",
              value: 3,
              content: (
                <Widget
                  src="ndcdev.near/widget/daos.Components.Settings.Contacts"
                  props={{ selectedDao }}
                />
              ),
              icon: "ph ph-link",
            },
            {
              name: "Content",
              value: 4,
              content: (
                <Widget
                  src="ndcdev.near/widget/daos.Components.Settings.Content"
                  props={{ selectedDao }}
                />
              ),
              icon: "ph ph-clipboard-text",
            },
          ],
        }}
      />
    </Wrapper>
  </Container>
);
