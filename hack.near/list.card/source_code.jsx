const accountId = props.accountId ?? context.accountId ?? "every.near";

const listId = props.listId ?? 1;

const list = Near.view("lists.potlock.near", "get_list", {
  list_id: listId,
});

const [showAdmins, setShowAdmins] = useState(false);
const [showDetails, setShowDetails] = useState(false);

const toggleAdmins = () => {
  setShowAdmins(!showAdmins);
  if (showDetails) {
    setShowDetails(false);
  }
};

const toggleDetails = () => {
  setShowDetails(!showDetails);
  if (showAdmins) {
    setShowAdmins(false);
  }
};

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

return (
  <>
    {list && (
      <div className="card">
        <div className="d-flex flex-row justify-content-between card-header">
          <h5 className="mt-2 ms-2">
            <b>{list.id}.</b>
            {list.name}
            <span className="m-1">
              {list.admin_only_registrations ? (
                <i class="bi bi-lock-fill"></i>
              ) : (
                <i class="bi bi-unlock"></i>
              )}
            </span>
          </h5>
          <div className="mt-1">
            <a
              href={`/hack.near/widget/list.view?listId=${listId}`}
              className="btn btn-sm btn-primary me-2"
            >
              <i class="bi bi-eye-fill"></i>
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between ms-2">
            <div className="card-text">
              <p>{list.description}</p>
              <i>
                <i class="bi bi-clock-history"></i>
                {timeSince(new Date(list.updated_at || list.created_at))}
              </i>
            </div>
            <div style={{ textAlign: "right" }} className="card-info me-2">
              <div className="mb-3">
                Admins:
                <Widget
                  src="hack.near/widget/faces"
                  props={{ accounts: list.admins }}
                />
              </div>
              <b>{list.total_registrations_count} Projects</b>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
