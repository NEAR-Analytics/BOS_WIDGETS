// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd

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
const [showTooltip, setShowTooltip] = useState(false);

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

const handleShowTooltip = () => {
  setShowTooltip(true);
};

const handleHideTooltip = () => {
  setTimeout(() => {
    setShowTooltip(false);
  }, 3000); // 3000 milliseconds = 3 seconds
};

const tooltip = (
  <Tooltip
    id="tooltip"
    className="p-3 border bg-light"
    style={{ backgroundColor: "lightgrey" }}
  >
    <a
      href="https://optimism.easscan.org/attestations"
      target="_blank"
      rel="noopener noreferrer"
    >
      Find Attestations on Optimism.
    </a>
  </Tooltip>
);

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
      <OverlayTrigger
        className="p-3 border bg-light"
        placement="right"
        overlay={tooltip}
        show={showTooltip}
        onToggle={(nextShow) =>
          nextShow ? handleShowTooltip() : handleHideTooltip()
        }
      >
        <button className="btn btn-primary m-1" onClick={getAttestation}>
          Get Attestation
        </button>
      </OverlayTrigger>
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
