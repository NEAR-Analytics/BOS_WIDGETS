const creatorId = context.accountId ?? "every.near";

State.init({
  name,
  description,
  admins: [creatorId],
  newAdmin: "",
});

function addAdmin(newAdmin) {
  if (newAdmin && !state.admins.includes(newAdmin)) {
    State.update({
      admins: [...state.admins, newAdmin],
    });
  }
}

function removeAdmin(adminKey) {
  const updatedAdmins = state.admins.filter((admin) => admin !== adminKey);

  State.update({
    admins: updatedAdmins,
  });
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

const adminId = props.adminId ?? state.newAdmin;
const isValid = isNearAddress(adminId);

const createList = () =>
  Near.call("lists.potlock.near", "create_list", {
    name: state.name,
    description: state.description,
    cover_image_url: null,
    admins: state.admins,
    default_registration_status: "Pending",
    admin_only_registrations: false,
  });

return (
  <div className="m-2 mb-3">
    <div className="d-flex flex-row justify-content-between me-3">
      <h4 className="m-1">
        <b>Create Lists</b>
      </h4>
      <div>
        <button
          disabled={state.admins.length === 0}
          onClick={createList}
          className="m-1 me-3 btn btn-sm btn-success"
        >
          <i class="bi bi-stars"></i>
        </button>
      </div>
    </div>
    <hr />
    <div className="m-3 me-4">
      <h5 className="mb-2">Name</h5>
      <div className="mb-3">
        <input
          placeholder="title"
          onChange={(e) => State.update({ name: e.target.value })}
        />
      </div>
      <h5 className="mb-2">Description</h5>
      <div className="mb-3">
        <input
          placeholder="about"
          onChange={(e) => State.update({ description: e.target.value })}
        />
      </div>
      <h5 className="mb-2">Admins</h5>
      <div className="d-flex align-items-center mt-2">
        <input
          placeholder={`${creatorId}`}
          onChange={(e) => State.update({ newAdmin: e.target.value })}
        />
        <button
          disabled={!isValid}
          className="btn btn-sm btn-dark m-1 ms-3"
          onClick={() => addAdmin(state.newAdmin)}
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>
      <br />
      <div>
        {state.admins.map((admin, index) => (
          <div
            key={index}
            className="d-flex flex-row justify-content-between mb-3"
          >
            <Widget
              src="mob.near/widget/Profile"
              props={{ accountId: admin }}
            />
            <div>
              <button
                className="btn btn-sm btn-danger m-1"
                onClick={() => removeAdmin(admin)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
