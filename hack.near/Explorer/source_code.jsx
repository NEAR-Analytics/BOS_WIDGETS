const [typesObject, setTypesObject] = useState(
  Social.get("*/type/*", "final") || null
);

const [creator, setCreator] = useState(props.accountId || "*");

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

const filteredTypes = typeCreators.filter(
  (type) => type.indexOf(creator) !== -1
);

const total_types = typeCreators.length;

const filtered_types = filteredTypes.length;

return (
  <>
    <div className="m-2">
      <ul>
        {types.map((typeEntry, index) => {
          // Extract the root identifier (e.g., "devs.near")
          const rootIdentifier = typeEntry[0];

          // Access the 'type' object that may contain multiple keys
          const typesObject = typeEntry[1].type;

          // Extract each type name and create list items for each
          return Object.keys(typesObject).map((typeName) => {
            // Construct the path string for each type
            const path = `${rootIdentifier}/type/${typeName}`;

            return <li key={`${rootIdentifier}-${typeName}`}>{path}</li>;
          });
        })}
      </ul>
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
