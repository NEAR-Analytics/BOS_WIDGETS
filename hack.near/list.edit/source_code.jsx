const creatorId = context.accountId ?? "every.near";
const listId = props.listId ?? 1;

const [list, setList] = useState(() =>
  Near.view("lists.potlock.near", "get_list", { list_id: listId })
);

const isOwner = list.owner === creatorId;

const [admins, setAdmins] = useState(list.admins);
const [newAdmin, setNewAdmin] = useState("");
const [name, setName] = useState(list.name);
const [description, setDescription] = useState(list.description);

function addAdmin() {
  if (newAdmin && !admins.includes(newAdmin) && isNearAddress(newAdmin)) {
    setAdmins([...admins, newAdmin]);
    setNewAdmin("");
  }
}

function removeAdmin(adminKey) {
  setAdmins(admins.filter((admin) => admin !== adminKey));
}

function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}

const createList = () => {
  Near.call("lists.potlock.near", "create_list", {
    name: name,
    description: description,
    cover_image_url: null,
    admins: admins,
    default_registration_status: "Pending",
    admin_only_registrations: false,
  });
};

return (
  <div className="m-3">
    <div className="d-flex flex-row justify-content-between">
      <h3>
        <b>List Editor</b>
      </h3>
      <div>
        {isOwner && (
          <button
            disabled={admins.length === 0}
            onClick={createList}
            className="btn btn-success me-2"
          >
            <i className="bi bi-stars"></i> Save
          </button>
        )}
      </div>
    </div>
    {isOwner ? (
      <div className="m-2">
        <h5 className="mb-2">Name</h5>
        <div className="mb-3">
          <input
            value={name}
            placeholder="title"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <h5 className="mb-2">Description</h5>
        <div className="mb-3">
          <input
            value={description}
            placeholder="about"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <h5 className="mb-2">Admins</h5>
        <div className="d-flex align-items-center mt-2">
          <input
            value={newAdmin}
            placeholder={`${creatorId}`}
            onChange={(e) => setNewAdmin(e.target.value)}
          />
          <button
            disabled={!isNearAddress(newAdmin)}
            className="btn btn-primary m-1 ms-3"
            onClick={addAdmin}
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
        <br />
        <div>
          {admins.map((admin, index) => (
            <div
              key={index}
              className="d-flex flex-row justify-content-between mb-3"
            >
              <Widget
                src="mob.near/widget/Profile"
                props={{ accountId: admin }}
              />
              <button
                className="btn btn-danger m-1"
                onClick={() => removeAdmin(admin)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>
        <p>
          <i>User is not the owner of list {listId}.</i>
        </p>
      </div>
    )}
  </div>
);
