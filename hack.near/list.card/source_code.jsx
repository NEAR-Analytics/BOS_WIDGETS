const accountId = props.accountId ?? context.accountId ?? "every.near";

const listId = props.listId ?? 1;

const list = Near.view("lists.potlock.near", "get_list", {
  list_id: listId,
});

const [showAdmins, setShowAdmins] = useState(false);
const [showDetails, setShowDetails] = useState(false);

const toggleAdmins = () => setShowAdmins(!showAdmins);
const toggleDetails = () => setShowDetails(!showDetails);

return (
  <>
    {list && (
      <div className="card">
        <div className="d-flex flex-row justify-content-between card-header">
          <h5 className="mt-2">{list.name}</h5>
          <div className="mt-1">
            <a
              href={`/hack.near/widget/list.view?listId=${listId}`}
              className="btn btn-sm btn-success m-1"
            >
              View
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between">
            <div className="card-text mt-1">
              <p>{list.description}</p>{" "}
              <i>
                <b>Created:</b>
                {new Date(list.created_at).toLocaleString()}
              </i>
            </div>
            <div style={{ textAlign: "right" }} className="card-info">
              <div>
                <button
                  onClick={toggleAdmins}
                  className="btn btn-sm btn-outline-dark m-1"
                >
                  {!showAdmins ? (
                    <i class="bi bi-caret-down-fill"> Admins</i>
                  ) : (
                    <i class="bi bi-caret-up-fill"> Admins</i>
                  )}
                </button>
                <button
                  onClick={toggleDetails}
                  className="btn btn-sm btn-outline-dark m-1"
                >
                  {!showDetails ? (
                    <i class="bi bi-caret-down-fill"> Details</i>
                  ) : (
                    <i class="bi bi-caret-up-fill"> Details</i>
                  )}
                </button>
              </div>
              {showAdmins && (
                <div className="mt-1">
                  {list.admins.map((admin, i) => (
                    <div className="admin-profile" key={i}>
                      <Widget
                        src="mob.near/widget/N.ProfileLine"
                        props={{ accountId: admin, hideAccountId: true }}
                      />
                    </div>
                  ))}
                </div>
              )}
              {showDetails && (
                <div className="mt-1">
                  <div>
                    <b>Default Registration Status:</b>
                    {list.default_registration_status}
                  </div>
                  <div>
                    <b>Admin-only Registrations:</b>
                    {JSON.stringify(list.admin_only_registrations)}
                  </div>
                  <div>
                    <b>Total Registrations:</b> {list.total_registrations_count}
                  </div>
                  <div>
                    <b>Total Upvotes:</b> {list.total_upvotes_count}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
