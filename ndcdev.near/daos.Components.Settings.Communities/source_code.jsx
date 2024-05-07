let { contractName } = VM.require(`ndcdev.near/widget/daos.Config`);
if (!contractName) return <Widget src="flashui.near/widget/Loading" />;

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

  .title {
    b {
      font-weight: 600;
    }
    font-weight: 300;

    a {
      text-decoration: underline;
    }
  }

  .caret {
    width: 25px;
  }

  .header {
    border-radius: 6px;
    padding: 8px 14px;
    border-bottom: 1px solid #e3e3e0;
  }
`;

const Project = styled.div`
  border-radius: 6px;
  padding: 8px 14px;
  border-bottom: 1px solid #e3e3e0;
  color: ${(props) => (props.active ? "#000" : "rgb(125 125 125)")};
  background: ${(props) => (props.active ? "" : "#F8F8F8")};

  i {
    color: #000;
  }
`;

const AutoComplete = styled.div`
  margin: 5px 0;
`;

const [editedProjectId, setEditedProjectId] = useState(false);

const [daoProjects, setDAOProjects] = useState([]);
const [handle, setHandle] = useState("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [logoUrl, setLogoUrl] = useState("");
const [bannerUrl, setBannerUrl] = useState("");
const [accounts, setAccounts] = useState("");
const [owners, setOwners] = useState("");
const [verticals, setVerticals] = useState("");
const [metadata, setMetadata] = useState({});

const projects = Near.view(contractName, "get_dao_communities", {
  dao_list: [selectedDao.id],
});

useEffect(() => {
  if (projects && daoProjects.length === 0) setDAOProjects(projects);
}, [projects]);

function handleChange(e) {
  const value = e.target.value;

  setMemberText(value);
}

const handleSave = () => {
  Near.call(contractName, "add_community", {
    dao_id: selectedDao.id,
    community_input: {
      handle,
      title,
      description,
      logo_url: logoUrl,
      banner_url: bannerUrl,
      accounts: accounts.length > 0 ? accounts.split(",") : [],
    },
    owners: owners.length > 0 ? owners.split(",") : [],
    verticals: verticals.length > 0 ? verticals.split(",") : [],
    metadata,
  });
};

const handleReset = () => {
  setHandle("");
  setTitle("");
  setDescription("");
  setLogoUrl("");
  setBannerUrl("");
  setAccounts("");
  setOwners("");
  setVerticals("");
  setMetadata({});
  setEditedProjectId(false);
};

const handleEdit = () => {
  Near.call(contractName, "edit_community", {
    id: editedProjectId,
    title,
    description,
    logo_url: logoUrl,
    banner_url: bannerUrl,
    owners: owners.split(","),
    verticals: verticals.split(","),
    accounts: accounts.split(","),
    metadata,
  });
};

const handleChangeStatus = (project) => {
  Near.call(contractName, "change_community_status", {
    id: project.id,
    status: project.status === "Active" ? "Inactive" : "Active",
  });
};

return (
  <Form className="d-flex flex-column gap-3">
    <div className="mb-4 d-flex flex-column">
      <div className="header d-flex justify-content-between align-items-center">
        <div className="w-50">
          <b>Community Name</b>
        </div>
        <b>Status</b>
        <b>Actions</b>
      </div>
      {daoProjects.flatMap((project) => (
        <Project active={project.status === "Active"}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center w-50">
              <img
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "100%",
                }}
                src={project.logo_url}
              />
              <span>{project.title}</span>
            </div>
            <div>{project.status}</div>
            <div className="d-flex gap-3 align-items-center">
              <i
                role="button"
                className="ph ph-pencil-simple"
                onClick={() => {
                  setTitle(project.title);
                  setHandle(project.handle);
                  setAccounts(project.accounts.join(","));
                  setDescription(project.description);
                  setLogoUrl(project.logo_url);
                  setBannerUrl(project.banner_url);
                  setOwners(project.owners.join(","));
                  setVerticals(project.verticals.join(","));
                  setMetadata(project.metadata);
                  setEditedProjectId(project.id);
                }}
              />
              <i
                role="button"
                className={
                  project.status === "Active" ? "ph ph-eye" : "ph ph-eye-slash"
                }
                onClick={() => handleChangeStatus(project)}
              />
            </div>
          </div>
        </Project>
      ))}
      <div className="mt-3 text-muted fst-italic">
        <small>* Inactive projects will be hidden from public view</small>
      </div>
    </div>
    <div className="form-element">
      <Widget
        src="ndcdev.near/widget/daos.Components.PageTitle"
        props={{ text: `${editedProjectId ? "Edit" : "Add new"} Community` }}
      />
      <div className="d-flex flex-column gap-2">
        <div>
          <label className="form-label">Community Title *</label>
          <input
            className="form-control"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Community Handle *</label>
          <input
            className="form-control"
            disabled={editedProjectId}
            placeholder="Handle"
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Contracts (separated by coma) *</label>
          <input
            className="form-control"
            placeholder="Contracts (separated by coma)"
            type="text"
            value={accounts}
            onChange={(e) => setAccounts(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">
            Community Owners (separated by coma)
          </label>
          <input
            className="form-control"
            placeholder="Community Owners (separated by coma)"
            type="text"
            value={owners}
            onChange={(e) => setOwners(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Verticals (separated by coma)</label>

          <input
            className="form-control"
            placeholder="Verticals (separated by coma)"
            type="text"
            value={verticals}
            onChange={(e) => setVerticals(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Website</label>
          <input
            className="form-control"
            placeholder="Title"
            type="text"
            value={metadata.website}
            onChange={(e) =>
              setMetadata({ ...metadata, website: e.target.value })
            }
          />
        </div>
        <div>
          <label className="form-label">Description</label>
          <div className="d-flex flex-wrap">
            <Widget
              src={`ndcdev.near/widget/daos.Components.MarkdownEditor`}
              props={{
                element: { value: description ?? "" },
                handleChange: (_el, value) => setDescription(value),
              }}
            />
          </div>
        </div>
        <div>
          <label className="form-label">Logo URL</label>
          <input
            className="form-control"
            placeholder="Logo URL"
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Banner URL</label>
          <input
            className="form-control"
            placeholder="Banner URL"
            type="text"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
          />
        </div>
      </div>
    </div>

    <button
      className="btn btn-secondary"
      disabled={!editedProjectId}
      onClick={handleReset}
    >
      Reset Changes
    </button>
    <button
      className="btn btn-primary"
      onClick={() => {
        editedProjectId ? handleEdit() : handleSave();
      }}
    >
      <i className="ph ph-pencil-simple fs-5" />
      Save
    </button>
  </Form>
);
