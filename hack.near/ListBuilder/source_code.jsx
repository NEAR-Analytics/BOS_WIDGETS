const accountId = props.accountId ?? context.accountId ?? "every.near";

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

return (
  <>
    <div className="m-2">
      <div className="d-flex flex-row justify-content-between">
        <div className="m-2">
          <h3>
            <b>List Builder</b>
          </h3>
          ↳
          <a href="https://github.com/PotLock/core/tree/main/contracts/lists">
            view README on GitHub
          </a>
        </div>
        <div className="m-3">
          <a
            href="https://app.potlock.org"
            style={{ color: "#000", textDecoration: "none" }}
          >
            <Widget
              src="mob.near/widget/Profile.ShortInlineBlock"
              props={{ accountId: "potlock.near" }}
            />
          </a>
        </div>
      </div>
      <br />
      <div className="m-2">
        <div className="mt-2 mb-3">
          <h5>
            <i>Sample</i>
          </h5>
        </div>
        <div>
          <Widget src="hack.near/widget/list.card" props={{ listId: 1 }} />
        </div>
        <br />
        <div>
          <h4>
            <b>Explore Lists</b>
          </h4>
          <b className="m-1">Filter by Owner</b>
          <div className="m-2">
            <input
              type="text"
              placeholder="<example>.near"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
          <b className="m-1">Filter by Registrant</b>
          <div className="m-2">
            <input
              type="text"
              placeholder="<example>.near"
              value={registrant}
              onChange={(e) => setRegistrant(e.target.value)}
            />
          </div>
        </div>
        <div>
          {listsByOwner.length > 0 ? (
            <div className="m-3">
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
            <div className="m-3">
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
            <div className="m-3">
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
    </div>
  </>
);
