const [accountId, setAccountId] = useState(
  props.accountId ?? context.accountId ?? "every.near"
);
const [type, setType] = useState(props.type ?? "type");
const [id, setId] = useState(props.id ?? "*");

const path = props.path ?? `${accountId}/${type}/${id}`;

const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  try {
    const value = Social.get(path, "final");
    setData(value);
    setError(null);
  } catch (err) {
    setError("ERROR FETCHING DATA");
    setData(null);
  }
}, [accountId, type, id]);

const handleInputChange = (event) => {
  setId(event.target.value);
};

const text = data
  ? `\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``
  : "NO DATA FOUND";

return (
  <>
    {!props.hide && (
      <div className="m-2">
        <h5>
          {accountId}/{type}/___
        </h5>
        <input
          type="text"
          value={id}
          label={`${accountId}/${type}/_____`}
          onChange={handleInputChange}
          placeholder={`explore ${context.accountId ? "your" : "our"} data`}
        />
      </div>
    )}
    <div className="m-3">
      <Markdown text={text} />
    </div>
    <div className="m-3">
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  </>
);
