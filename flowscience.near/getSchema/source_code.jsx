// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd
// Example schema UID:

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
      const [uid, schema, resolver, revocable] = result;
      const mappedSchema = {
        uid,
        schema,
        resolver,
        revocable,
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
      <button className="btn btn-primary m-1" onClick={getAttestation}>
        Get Schema
      </button>
      <p className="m-1">{error}</p>
    </div>
    <div>
      {attestation && (
        <div className="App">
          <easRenderAttestation attestation={schemaRecord} />
        </div>
      )}
    </div>
  </>
);
