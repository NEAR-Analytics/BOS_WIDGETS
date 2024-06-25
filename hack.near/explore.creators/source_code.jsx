const type = props.type || "type";
const id = props.id || "*";

const [searchTerm, setSearchTerm] = useState("");
const [showModal, setShowModal] = useState(false);
const [selectedPath, setSelectedPath] = useState("");

const [object, setObject] = useState(
  Social.get(`*/${type}/${id}`, "final") || {}
);
const [filteredResults, setFilteredResults] = useState([]);

useEffect(() => {
  const results = {};
  Object.entries(object).forEach(([creator, detail]) => {
    const entries = detail[type] || {};
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

  setFilteredResults(
    Object.entries(results)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([id, data]) => ({
        id,
        accounts: Array.from(data.accounts),
        count: data.count,
      }))
  );
}, [searchTerm, object]);

const handleInputChange = (event) => {
  setSearchTerm(event.target.value);
};

const setPath = (path) => {
  setSelectedPath(path);
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
    {filteredResults.map(({ id, accounts, count }) => (
      <div key={id}>
        <div className="d-flex flex-row justify-content-between">
          <h5 className="mt-2">
            <b>{id}</b>
          </h5>
          <div>
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
                        height: "38px",
                        width: "38px",
                      },
                      imageClassName: "",
                    }}
                  />
                </span>
              </Profiles>
            ))}
          </div>
        </div>
      </div>
    ))}
  </>
);
