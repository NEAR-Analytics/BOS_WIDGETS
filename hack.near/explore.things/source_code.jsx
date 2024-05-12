const type = props.type || "type";

const [searchTerm, setSearchTerm] = useState("");
const [showModal, setShowModal] = useState(false);
const [selectedPath, setSelectedPath] = useState("");

const [object, setObject] = useState(Social.get(`*/${type}/*`, "final") || {});
const [filteredResults, setFilteredResults] = useState([]);

useEffect(() => {
  const things = Object.entries(object);
  const results = {};

  things.forEach(([creator, detail]) => {
    const entries = detail.type || {};
    Object.keys(entries).forEach((id) => {
      const path = `${creator}/${type}/${id}`;
      if (path.toLowerCase().includes(searchTerm.toLowerCase())) {
        if (!results[id]) {
          results[id] = { count: 0, accounts: new Set() };
        }
        results[id].count++;
        results[id].accounts.add(creator);
      }
    });
  });

  const sortedResults = Object.entries(results).sort(
    (a, b) => b[1].count - a[1].count
  );

  setFilteredResults(
    sortedResults.map(([id, data]) => ({
      id,
      accounts: Array.from(data.accounts),
      count: data.count,
    }))
  );
}, [searchTerm, object]);

const handleInputChange = (event) => {
  setSearchTerm(event.target.value);
};

const toggleModal = (path) => {
  setSelectedPath(path);
  setShowModal(!showModal);
};

const Profiles = styled.a`
    display: inline-block;
    position: relative;
    img {
        object-fit: cover;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    &:hover img {
        transform: scale(1.1);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
`;

return (
  <>
    <div className="m-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        {showModal && (
          <button className="m-2 btn-sm" onClick={() => toggleModal("")}>
            Reset
          </button>
        )}
      </div>
    </div>
    {showModal ? (
      <div className="m-3">
        <Widget
          src="hack.near/widget/explore.view"
          props={{ path: selectedPath, showInput: false }}
        />
      </div>
    ) : (
      <div className="m-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={`🔭  Search for a type of things...`}
        />
        {filteredResults.map(({ id, accounts, count }) => (
          <div key={id} className="m-3 mt-4">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h5 className="mt-1">
                <b>{id}</b>
              </h5>
              <div className="mt-3">
                {accounts.map((creator) => (
                  <Profiles
                    key={creator}
                    onClick={() => toggleModal(`${creator}/${type}/${id}`)}
                  >
                    <span className="d-inline-block">
                      <Widget
                        src="mob.near/widget/ProfileImage"
                        props={{
                          accountId: creator,
                          imageStyle: {
                            height: "1.888em",
                            width: "1.888em",
                          },
                          imageClassName: "",
                          tooltip: true,
                        }}
                      />
                    </span>
                  </Profiles>
                ))}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    )}
  </>
);
