// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd

// Need to finish getAttestation refactor to imported component
//const { getAttestation } = VM.require("flowscience.near/widget/generateUID");
const { easRenderAttestation } = VM.require(
  "flowscience.near/widget/easRenderAttestation"
);

const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

{
  /*
const chain = Ethers.provider()
  .getNetwork()
  .{then}((chainIdData) => {
    console.log(chainIdData.chainId);
  });

const abi = fetch(
  "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/deployments/optimism/EAS.json"
);

const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);
const contractAddress = "0x4200000000000000000000000000000000000021";
const schemaContract = "0x4200000000000000000000000000000000000020";
const parsedAbi = JSON.parse(abi.body);
const contract = new ethers.Contract(contractAddress, parsedAbi.abi, signer);
console.log(contract);
const [attestation, setAttestation] = useState(null);

function getAttestation() {
  if (typeof uid !== "string" || uid.trim() === "") {
    console.error("UID must be a non-empty string.");
    setError("UID must be provided.");
    return;
  }

  contract
    .getAttestation(uid)
    .then((result) => {
      const [
        uid,
        schema,
        time,
        expirationTime,
        revocationTime,
        refUID,
        recipient,
        attester,
        revocable,
        data,
      ] = result;
      const mappedAttestation = {
        uid,
        schema,
        time: time.toNumber(),
        expirationTime: expirationTime.toNumber(),
        revocationTime: revocationTime.toNumber(),
        refUID,
        recipient,
        attester,
        revocable,
        data,
      };
      setAttestation(mappedAttestation);
      setError("");
    })
    .catch((error) => {
      console.error("error fetching attestation:", error);
      setError("Failed to retrieve data. Please try with a verified uid.");
    });
}

*/
}

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
    .register(uid)
    .then((result) => {
      const [
        uid,
        schema,
        time,
        expirationTime,
        revocationTime,
        refUID,
        recipient,
        attester,
        revocable,
        data,
      ] = result;
      const mappedSchema = {
        uid,
        schema,
        time: time.toNumber(),
        expirationTime: expirationTime.toNumber(),
        revocationTime: revocationTime.toNumber(),
        refUID,
        recipient,
        attester,
        revocable,
        data,
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
          <easRenderAttestation attestation={attestation} />
        </div>
      )}
    </div>
  </>
);
