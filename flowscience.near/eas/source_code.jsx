//const { getAttestation } = VM.require("flowscience.near/widget/generateUID");
// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd
const { easRenderAttestation } = VM.require(
  "flowscience.near/widget/easRenderAttestation"
);

const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

const chain = Ethers.provider()
  .getNetwork()
  .then((chainIdData) => {
    console.log(chainIdData.chainId);
  });

console.log("chain:", chain);

const abi = fetch(
  "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/deployments/optimism/EAS.json"
);
const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);
const signer = provider.getSigner(user);
console.log("chain:", chain);
console.log("signer:", signer);

const contractAddress = "0x4200000000000000000000000000000000000021";
const parsedAbi = JSON.parse(abi.body);
const contract = new ethers.Contract(contractAddress, parsedAbi.abi, signer);
console.log(contract);
const [attestation, setAttestation] = useState(null);
const [error, setError] = useState("");
const [uid, setUid] = useState("");
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

const App = () => {
  const attestationDetails = {
    uid: attestation.uid,
    schema: state.attestation.schema,
    time: attestation.timestamp, // Example Unix timestamp = 1633036800
    expirationTime: props.expiration, // Example Unix timestamp
    revocationTime: props.revocation, // 0 indicates not revoked
    refUID: props.refUID,
    recipient: props.recipient, // Blockchain account, if self = {context.accountId}
    attester: props.attester, // Blockchain account, if self = {context.accountId}
    revocable: props.revocable, // Boolean
    data: props.data, // Example hex data = "0xdeadbeef"
  };
};

return (
  <>
    <div className="m-2">
      <h3>Get Attestation</h3>
      <input
        type="text"
        placeholder="input UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
    </div>
    <div className="m-2">
      <button className="btn btn-primary m-1" onClick={getAttestation}>
        Get Attestation
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
