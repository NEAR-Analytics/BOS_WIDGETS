const accountId = props.accountId ?? context.accountId ?? "every.near";

const listId = props.listId ?? 1;

const list = Near.view("lists.potlock.near", "get_list", {
  list_id: listId,
});

return (
  <>
    {list && (
      <div className="card">
        <div className="card-header">
          <h3>{list.name}</h3>
        </div>
        <div className="card-body">
          <p className="card-text">{list.description}</p>
          <h5 className="card-title">Admins:</h5>
          <div className="d-flex flex-row">
            {list.admins.map((admin, i) => (
              <div className="admin-profile" key={i}>
                <Widget
                  src="mob.near/widget/Profile.ShortInlineBlock"
                  props={{ accountId: admin }}
                />
              </div>
            ))}
          </div>
          <hr />
          <div className="card-info">
            <div>
              <b>Created At:</b> {new Date(list.created_at).toLocaleString()}
            </div>
            <div>
              <b>Default Registration Status:</b>{" "}
              {list.default_registration_status}
            </div>
            <div>
              <b>Admin-only Registrations:</b>{" "}
              {JSON.stringify(list.admin_only_registrations)}
            </div>
            <div>
              <b>Total Registrations:</b> {list.total_registrations_count}
            </div>
            <div>
              <b>Total Upvotes:</b> {list.total_upvotes_count}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
