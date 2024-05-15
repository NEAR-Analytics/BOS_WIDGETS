const contractId = "social.dapplets.near";

const [query, setQuery] = useState(
  `${context.accountId}/settings/dapplets.near/mutation/Sandbox/targets`
);

const originalData = Near.view(contractId, "get", {
  keys: [query],
});

const [modifiedJson, setModifiedJson] = useState("");

const unpackValue = (obj, path) => {
  const [first, ...rest] = typeof path === "string" ? path.split("/") : path;
  return first ? unpackValue(obj[first], rest) : obj;
};

const packValue = (value, path) => {
  const rest = typeof path === "string" ? path.split("/") : path;
  const last = rest.pop();
  return last ? packValue({ [last]: value }, rest) : value;
};

useEffect(() => {
  const json = unpackValue(originalData, query);
  const formattedJson = JSON.stringify(JSON.parse(json), null, 2);
  setModifiedJson(formattedJson);
}, [originalData]);

const isArray = (a) => Array.isArray(a);

const isObject = (o) => !isArray(o) && typeof o === "object";

const removeDuplicates = (data, prevData) => {
  const obj = Object.entries(data).reduce((obj, [key, value]) => {
    const prevValue = isObject(prevData) ? prevData[key] : undefined;
    if (isObject(value)) {
      const newValue = isObject(prevValue)
        ? removeDuplicates(value, prevValue)
        : value;
      if (newValue !== undefined) {
        obj[key] = newValue;
      }
    } else if (value !== prevValue) {
      obj[key] = value;
    }

    return obj;
  }, {});
  return Object.keys(obj).length ? obj : undefined;
};

const handleSaveClick = () => {
  const compactJson = JSON.stringify(JSON.parse(modifiedJson));
  const dataToBeSaved = packValue(compactJson, query);

  Near.call(
    contractId,
    "set",
    {
      data: removeDuplicates(dataToBeSaved, originalData),
    },
    null, // gas
    "10000000000000000000000" // deposit 0.01 near
  );
};

return (
  <div class="container">
    <div style={{ marginBottom: "1rem" }}>
      <label for="query">Path</label>
      <input
        className="form-control"
        id="query"
        placeholder="bos.dapplets.near/settings/dapplets.near/mutation/Zoo/**"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <label for="codeInput">Data</label>
      <textarea
        id="codeInput"
        className="form-control"
        value={modifiedJson}
        onChange={(e) => setModifiedJson(e.target.value)}
        style={{ fontFamily: "monospace", fontSize: 14 }}
        rows="15"
      ></textarea>
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <button type="button" class="btn btn-primary" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  </div>
);
