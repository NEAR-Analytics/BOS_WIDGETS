const user = Ethers.send("eth_requestAccounts", [])[0];
console.log("User:", user);

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
  // Ensure uid is a non-empty string
  if (typeof uid !== "string" || uid.trim() === "") {
    console.error("UID must be a non-empty string.");
    setError("UID must be provided.");
    return;
  }

  contract
    .getAttestation(uid)
    .then((result) => {
      setAttestation(result);
      setError("");
    })
    .catch((error) => {
      console.error("error fetching attestation:", error);
      setError("Failed to retrieve data. Please try with a verified uid.");
    });
}

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
    <div className="m-2">
      {attestation && (
        <p className="m-2">
          <b>View Attestation:</b> {JSON.stringify(attestation)}
        </p>
      )}
    </div>
  </>
);
