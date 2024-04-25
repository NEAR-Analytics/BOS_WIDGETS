// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd

// Need to finish getAttestation refactor to imported component
//const { GetAttestation } = VM.require("flowscience.near/widget/getAttestation");
//const { attest } = VM.require("flowscience.near/widget/easAttest");
//const { getSchema } = VM.require("flowscience.near/widget/getSchema");
//const { register } = VM.require("flowscience.near/widget/easRegister");
//const { revoke } = VM.require("flowscience.near/widget/easRevoke");
//const { timestamp } = VM.require("flowscience.near/widget/easTimestamp");

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
*/
}

const abi = fetch(
  "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/deployments/optimism/EAS.json"
);
const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);
const signer = provider.getSigner(user);
// console.log("chain:", chain);
// console.log("signer:", signer);

const contractAddress = "0x4200000000000000000000000000000000000021";
const parsedAbi = JSON.parse(abi.body);
const contract = new ethers.Contract(contractAddress, parsedAbi.abi, signer);
//console.log(contract);
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
