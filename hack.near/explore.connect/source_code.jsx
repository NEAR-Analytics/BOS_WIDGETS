const [typesObject, setTypesObject] = useState(
  Social.get("*/type/*", "final") || null
);

const [creator, setCreator] = useState(props.accountId || "");

useEffect(() => {
  function fetchTypes() {
    const data = Social.get("*/type/*", "final");
    setTypesObject(data);
  }
  fetchTypes();
}, []);

const typeCreators = Object.keys(typesObject);
const types = Object.entries(typesObject);

const onChangeInput = (creator) => {
  setCreator(creator);
};

const filteredCreators = typeCreators.filter(
  (type) => type.indexOf(creator) !== -1
);

const total_creators = typeCreators.length;

const filtered_creators = filteredCreators.length;

return (
  <>
    <div className="m-3">
      <input
        type="text"
        value={creator}
        onChange={(e) => onChangeInput(e.target.value)}
        placeholder="Search by Account ID"
      />
      <div className="m-3 mt-4">
        <h5 className="mb-2">Creators</h5>
        {!creator ? (
          <p>
            <b>Total:</b> {total_creators}
          </p>
        ) : (
          <p>
            <b>Filtered:</b> {filtered_creators}
          </p>
        )}
        <div>
          {filteredCreators.map((creator, index) => (
            <div
              key={i}
              className="d-flex border-bottom justify-content-between"
            >
              <div style={{ maxWidth: "80%" }} className="m-1 p-2">
                <span>
                  <Widget
                    src="hack.near/widget/profile.builder"
                    props={{
                      accountId: creator,
                    }}
                  />
                </span>
              </div>
              <div className="m-1 p-3">
                <Widget
                  src="hack.near/widget/attest"
                  props={{ accountId: creator }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
