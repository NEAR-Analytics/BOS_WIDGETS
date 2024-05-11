const [typesObject, setTypesObject] = useState(
  Social.get("*/type/*", "final") || null
);

const [creator, setCreator] = useState("");

useEffect(() => {
  function fetchTypes() {
    const data = Social.get("*/type/*", "final");
    setTypesObject(data);
  }
  fetchTypes();
}, []);

const typeCreators = Object.keys(typesObject);

const onChangeInput = (creator) => {
  setCreator(creator);
};

const filteredTypes = typeCreators.filter(
  (type) => type.indexOf(creator) !== -1
);

const total_types = typeCreators.length;

const filtered_types = filteredTypes.length;

return (
  <>
    <div className="m-2">
      <h3 className="mb-3">Explore Types</h3>
      <input
        type="text"
        value={creator}
        onChange={(e) => onChangeInput(e.target.value)}
        placeholder="Search by Account ID"
      />
      <div className="m-1 mt-3">
        <h5 className="mb-2">Creators</h5>
        {!creator ? (
          <p>
            <b>Total:</b> {total_types}
          </p>
        ) : (
          <p>
            <b>Filtered:</b> {filtered_types}
          </p>
        )}
        <ul>
          {filteredTypes.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);
