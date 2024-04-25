// Example schema UID: 0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89

const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

// Move this to function components??
const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);

const signer = provider.getSigner(user);
// console.log("chain:", chain);
// console.log("signer:", signer);

const abi = fetch(
  "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/939c0fb110ea35e601e4476e81a4f83a6029f7ad/deployments/optimism/SchemaRegistry.json"
);
const contractAddress = "0x4200000000000000000000000000000000000020";
const parsedAbi = JSON.parse(abi.body);
const contract = new ethers.Contract(contractAddress, parsedAbi.abi, signer);
console.log(parsedAbi);
console.log(contract);

const [schemaRecord, setSchemaRecord] = useState(null);
const [error, setError] = useState("");
const [uid, setUid] = useState("");

function getSchema() {
  if (typeof uid !== "string" || uid.trim() === "") {
    console.error("UID must be a non-empty string.");
    setError("UID must be provided.");
    return;
  }

  contract
    .getSchema(uid)
    .then((result) => {
      const [uid, resolver, revocable, schema] = result;
      const mappedSchema = {
        uid,
        resolver,
        revocable,
        schema,
      };
      setSchemaRecord(mappedSchema);
      setError("");
    })
    .catch((error) => {
      console.error("error fetching schema:", error);
      setError("Failed to retrieve data. Please try with a verified uid.");
    });
}

return (
  <>
    <div className="m-2">
      <h3>Get Schema</h3>
      <input
        type="text"
        placeholder="input UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
    </div>
    <div className="m-2">
      <button className="btn btn-primary m-1" onClick={getSchema}>
        Get Schema
      </button>
      <p className="m-1">{error}</p>
    </div>
    <div>
      {schemaRecord && (
        <div className="App">
          <pre>{JSON.stringify(schemaRecord, null, 2)}</pre>
        </div>
      )}
    </div>
  </>
);
