let { content, contractName } = VM.require(
  `ndcdev.near/widget/daos.Config`,
);
if (!contractName || !content)
  return <Widget src="flashui.near/widget/Loading" />;

const { selectedDao } = props;

const Form = styled.div`
  border-radius: 20px;
  background: white;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .form-control.error {
    border: 1px solid red;
  }

  .header {
    border-radius: 6px;
    padding: 8px 14px;
    border-bottom: 1px solid #e3e3e0;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: row;

  .form-element {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const POC = styled.div`
  border-radius: 6px;
  padding: 8px 14px;
  border-bottom: 1px solid #e3e3e0;
  color: "#000";

  i {
    color: #000;
  }
`;

const [daoContactsName, setDaoContactsName] = useState("");
const [daoContactsTg, setDaoContactsTg] = useState("");

const [daoContacts, setDaoContacts] = useState({});

useEffect(() => {
  if (selectedDao) {
    setDaoContacts(
      selectedDao.metadata.contacts
        ? JSON.parse(selectedDao.metadata.contacts)
        : {},
    );
  }
}, [selectedDao]);

const handleAddPOC = () => {
  if (daoContactsName === "" && daoContactsTg === "") return;

  const poc = [
    ...(daoContacts.poc ?? []),
    ...[
      {
        name: daoContactsName,
        tg: daoContactsTg,
      },
    ],
  ];

  daoContacts.poc = poc;
  setDaoContacts(daoContacts);
  setDaoContactsTg("");
  setDaoContactsName("");
};

const handleSave = () => {
  Near.call(contractName, "edit_dao", {
    id: selectedDao.id,
    body: {
      title: selectedDao.title,
      handle: selectedDao.handle,
      dao_type: selectedDao.dao_type,
      description: selectedDao.description,
      logo_url: selectedDao.logo_url,
      banner_url: selectedDao.banner_url,
      account_id: selectedDao.account_id,
    },
    verticals: selectedDao.verticals,
    metrics: selectedDao.metrics,
    metadata: {
      ...selectedDao.metadata,
      contacts: JSON.stringify(daoContacts),
    },
  });
};

return (
  <Form className="d-flex flex-column gap-3">
    <div className="form-element">
      <label className="form-label">Website</label>
      <input
        className="form-control"
        type="text"
        value={daoContacts.website}
        onChange={(e) => {
          daoContacts.website = e.target.value;
          setDaoContacts(daoContacts);
        }}
      />
    </div>

    <div className="form-element">
      <label className="form-label">Admin wallet</label>
      <input
        className="form-control"
        type="text"
        value={daoContacts.admin}
        onChange={(e) => {
          daoContacts.admin = e.target.value;
          setDaoContacts(daoContacts);
        }}
      />
    </div>

    <div className="form-element">
      <label className="form-label">DAO Telegram</label>
      <input
        className="form-control"
        type="text"
        value={daoContacts.tg}
        onChange={(e) => {
          daoContacts.tg = e.target.value;
          setDaoContacts(daoContacts);
        }}
      />
    </div>

    <div className="form-element">
      <label className="form-label">DAO X (Twitter)</label>
      <input
        className="form-control"
        type="text"
        value={daoContacts.twitter}
        onChange={(e) => {
          daoContacts.twitter = e.target.value;
          setDaoContacts(daoContacts);
        }}
      />
    </div>

    <Widget
      src="ndcdev.near/widget/daos.Components.PageTitle"
      props={{ text: "Point of Contacts" }}
    />

    {daoContacts?.poc && daoContacts?.poc.length > 0 && (
      <div className="mb-4 d-flex flex-column">
        <div className="header d-flex gap-3 justify-content-between align-items-center">
          <div className="gap-3 d-flex w-100 justify-content-between align-items-center">
            <b>Name</b>
            <b>Telegram</b>
          </div>
          <div className="w-25 d-flex justify-content-end">
            <b>Actions</b>
          </div>
        </div>
        {daoContacts.poc.map((poc) => (
          <POC>
            <div className="d-flex gap-3 justify-content-between align-items-center">
              <div className="gap-3 d-flex  w-100 justify-content-between align-items-center">
                <span>{poc.name}</span>
                {poc.tg && (
                  <a href={`https://t.me/${poc.tg.replace("@", "")}`}>
                    <i className="ph ph-telegram-logo" />
                    {poc.tg.replace("@", "")}
                  </a>
                )}
              </div>
              <div className="w-25 d-flex justify-content-end">
                <i
                  role="button"
                  className="bi bi-x-lg"
                  onClick={() =>
                    setDaoContacts({
                      ...daoContacts,
                      poc: daoContacts.poc.filter((p) => p.tg != poc.tg),
                    })
                  }
                />
              </div>
            </div>
          </POC>
        ))}
      </div>
    )}
    <Contact className="w-100 gap-2">
      <div className="w-100 d-flex gap-2">
        <div className="form-element">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            value={daoContactsName}
            onChange={(e) => setDaoContactsName(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label className="form-label">Telegram handle</label>
          <input
            className="form-control"
            placeholder="@tg_handle"
            type="text"
            value={daoContactsTg}
            onChange={(e) => setDaoContactsTg(e.target.value)}
          />
        </div>
      </div>
      <div className="form-element d-flex align-items-end">
        <button
          className="btn btn-secondary"
          disabled={daoContactsName === "" && daoContactsTg === ""}
          onClick={handleAddPOC}
        >
          <i className="ph ph-plus fs-5" />
          Add POC
        </button>
      </div>
    </Contact>

    <button className="btn btn-primary" onClick={handleSave}>
      <i className="ph ph-pencil-simple fs-5" />
      Save
    </button>
  </Form>
);
