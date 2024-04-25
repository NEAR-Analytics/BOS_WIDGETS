// This function returns JSON formatted attestation data for an input UID
// Example inputs for retrieving attestation data from Optimism are included here.
const loader = VM.require("sdks.near/widget/Loader");
//const signer = VM.require("sdks.near/widget/SDKs.EthereumSigner");

const abi = fetch(
  "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/deployments/optimism/EAS.json"
);
const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);

const contractAddress = "0x4200000000000000000000000000000000000021";
const parsedAbi = JSON.parse(abi.body);
const contract = new ethers.Contract(contractAddress, parsedAbi.abi, signer);
const [attestation, setAttestation] = useState(null);
const [error, setError] = useState("");
const [uid, setUid] =
  useState("") ||
  "0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd";

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

return { getAttestation };
