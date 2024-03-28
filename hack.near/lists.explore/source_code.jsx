const accountId = props.accountId ?? context.accountId ?? "every.near";

const [newList, setNewList] = useState("");
const [activeTab, setActiveTab] = useState("explore");

const switchTab = (tabName) => {
  setActiveTab(tabName);
};

const [listId, setListId] = useState(1);
const [owner, setOwner] = useState("");
const [registrant, setRegistrant] = useState("");

const list = Near.view("lists.potlock.near", "get_list", {
  list_id: listId,
});

const lists = Near.view("lists.potlock.near", "get_lists", {
  from_index: 0,
  limit: 100,
});

const listsByOwner = Near.view("lists.potlock.near", "get_lists_for_owner", {
  owner_id: owner,
});

const listsByRegistrant = Near.view(
  "lists.potlock.near",
  "get_lists_for_registrant",
  {
    registrant_id: registrant,
  }
);

const upvotesByList = Near.view("lists.potlock.near", "get_upvotes_for_list", {
  list_id: listId,
  from_index: 0,
  limit: 100,
});

const upvotesByAccount = Near.view(
  "lists.potlock.near",
  "get_upvoted_lists_for_account",
  {
    account_id: accountId,
    from_index: 0,
    limit: 100,
  }
);

const registration = Near.view("lists.potlock.near", "get_registration", {
  registration_id: 1,
});

const registrationsByList = Near.view(
  "lists.potlock.near",
  "get_registrations_for_list",
  {
    list_id: listId,
    status,
    from_index: 0,
    limit: 100,
  }
);

const registrationsByRegistrant = Near.view(
  "lists.potlock.near",
  "get_registrations_for_registrant",
  {
    registrant_id: registrant,
    status,
    from_index: 0,
    limit: 100,
  }
);

const isRegistered = Near.view("lists.potlock.near", "is_registered", {
  list_id: listId,
  account_id: registrant,
  required_status, // defaults to Approved
});

const metadata = Near.view(
  "lists.potlock.near",
  "get_contract_source_metadata"
);

const handleNew = () =>
  Near.call("lists.potlock.near", "new", {
    version: "1.0.0",
    commit_hash: "7937ed404ce9090ad9bb9a116d494a1297111a7b",
    link: "https://github.com/PotLock/core",
  });

const createList = () =>
  Near.call("lists.potlock.near", "create_list", {
    name: newList.name,
    description: newList.description,
    cover_image_url: newList.backgroundImage,
    admins: newList.admins,
    default_registration_status: newList.defaultStatus,
    admin_only_registrations: newList.adminOnly,
  });

const updateList = () =>
  Near.call("lists.potlock.near", "update_list", {
    list_id: listId,
    name: newList.name,
    description: newList.description,
    cover_image_url: newList.backgroundImage,
    remove_cover_image: remove,
    default_registration_status: newList.defaultStatus,
    admin_only_registrations: newList.adminOnly,
  });

const deleteList = () =>
  Near.call("lists.potlock.near", "delete_list", {
    list_id: listId,
  });

const upvote = () =>
  Near.call("lists.potlock.near", "upvote", {
    list_id: listId,
  });

const removeUpvote = () =>
  Near.call("lists.potlock.near", "remove_upvote", {
    list_id: listId,
  });

const changeOwner = () =>
  Near.call("lists.potlock.near", "owner_change_owner", {
    list_id: listId,
    new_owner_id: newOwner,
  });

const addAdmins = () =>
  Near.call("lists.potlock.near", "owner_add_admins", {
    list_id: listId,
    admins: newAdmins,
  });

const removeAdmins = () =>
  Near.call("lists.potlock.near", "owner_remove_admins", {
    list_id: listId,
    admins: newAdmins,
  });

const clearAdmins = () =>
  Near.call("lists.potlock.near", "owner_clear_admins", {
    list_id: listId,
  });

const [showFilters, setShowFilters] = useState(false);

const toggleFilters = () => {
  setShowFilters(!showFilters);
};

return (
  <div className="m-2 mb-3">
    <div className="d-flex flex-row justify-content-between me-3">
      <h4 className="m-1">
        <b>Explore Lists</b>
      </h4>
      <button
        onClick={toggleFilters}
        className={`m-1 me-3 btn btn-sm ${
          !showFilters ? "btn-dark" : "btn-danger"
        }`}
      >
        {!showFilters ? (
          <i className="bi bi-filter"></i>
        ) : (
          <i className="bi bi-x"></i>
        )}
      </button>
    </div>
    {showFilters && (
      <div className="row m-2">
        <div className="col">
          <label htmlFor="filterByOwner" className="form-label">
            <b>Filter by Owner</b>
          </label>
          <input
            id="filterByOwner"
            type="text"
            className="form-control"
            placeholder={accountId}
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="filterByRegistrant" className="form-label">
            <b>Filter by Registrant</b>
          </label>
          <input
            id="filterByRegistrant"
            type="text"
            className="form-control"
            placeholder={accountId}
            value={registrant}
            onChange={(e) => setRegistrant(e.target.value)}
          />
        </div>
      </div>
    )}
    <hr />
    <div>
      {listsByOwner.length > 0 ? (
        <div className="m-2">
          {listsByOwner.map((list, i) => (
            <div key={i}>
              <Widget
                src="hack.near/widget/list.card"
                props={{ listId: list.id }}
              />
            </div>
          ))}
        </div>
      ) : listsByRegistrant.length > 0 ? (
        <div className="m-2">
          {listsByRegistrant.map((list, i) => (
            <div key={i}>
              <Widget
                src="hack.near/widget/list.card"
                props={{ listId: list.id }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="m-2">
          {lists.map((list, i) => (
            <div key={i}>
              <Widget
                src="hack.near/widget/list.card"
                props={{ listId: list.id }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
