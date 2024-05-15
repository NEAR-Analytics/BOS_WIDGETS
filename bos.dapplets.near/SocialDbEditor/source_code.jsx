const contractId = "social.dapplets.near";

const [query, setQuery] = useState(
  `${context.accountId}/settings/dapplets.near/mutation/Sandbox/**`
);

const originalData = Near.view(contractId, "get", {
  keys: [query],
});

const [modifiedJson, setModifiedJson] = useState("");

useEffect(() => {
  setModifiedJson(JSON.stringify(originalData, null, 2));
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
  Near.call(
    contractId,
    "set",
    {
      data: removeDuplicates(JSON.parse(modifiedJson), originalData),
    },
    null, // gas
    "10000000000000000000000" // deposit 0.01 near
  );
};

return (
  <div>
    <div style={{ marginBottom: "1rem" }}>
      <label for="query">Contract ID</label>
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
