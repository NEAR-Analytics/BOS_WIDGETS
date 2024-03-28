const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

const easAbi = fetch(
  "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/deployments/optimism/EAS.json"
);

const contractAddress = "0x4200000000000000000000000000000000000021";
const parsedAbi = JSON.parse(easAbi.body);
const abi = parsedAbi.abi;

const [attestation, setAttestation] = useState(null);
const [error, setError] = useState("");
const [uid, setUid] = useState("");

const bytes32Uid = ethers.utils.formatBytes32String(uid).slice(0, 64); // '0x' + 64 hex characters
const easContract = new ethers.Contract(
  contractAddress,
  abi,
  Ethers.provider().getSigner()
);

function getAttestation() {
  abi
    .getAttestation(bytes32Uid)
    .then((result) => {
      setAttestation(result);
      setError("");
    })
    .catch((error) => {
      console.error("error fetching attestation:", error);
      setError("Failed to retrieve data. Please try with a verified address.");
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
