// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd
const { getSchema, fetchABI } = VM.require(
  "flowscience.near/widget/f.getSchema"
);

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
const [account, setAccount] = useState(null);
const [recipient, setRecipient] = useState("");
const [schema, setSchema] = useState("");
const [schemaDetails, setSchemaDetails] = useState(null);
const [expirationTime, setExpirationTime] = useState("");
const [revocable, setRevocable] = useState(false);
const [data, setData] = useState("");
const [showTooltip, setShowTooltip] = useState(false);

// Function to fetch schema details
const handleSchemaFetch = () => {
  fetchABI()
    .then((abi) => {
      if (!abi) throw new Error("ABI not fetched");
      return getSchema(contractAddress, abi, schema);
    })
    .then((result) => {
      if (result.error) {
        setError(result.error);
      } else {
        setSchemaDetails(result.schema);
        setError(""); // Clear any existing errors
      }
    })
    .catch((err) => {
      console.error("Error in schema fetching process:", err);
      setError("Error fetching schema details.");
    });
};

const handleSubmit = (event) => {
  event.preventDefault();

  // Note: Fetch the ABI asynchronously (consider moving this to a component initialization phase)
  fetch(
    "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/deployments/optimism/EAS.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://optimism.drpc.org"
      );
      const signer = provider.getSigner(user);
      const contract = new ethers.Contract(contractAddress, data.abi, signer);

      const tx = {
        to: contractAddress,
        data: contract.interface.encodeFunctionData("attest", [
          {
            schema,
            data: {
              recipient,
              expirationTime: Number(expirationTime),
              revocable,
              refUID:
                "0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd",
              data: ethers.utils.defaultAbiCoder.encode(["string"], [data]),
              value: ethers.utils.parseEther(value.toString()),
            },
          },
        ]),
      };

      signer
        .sendTransaction(tx)
        .then((result) => {
          console.log("Transaction sent:", result);
          setAttestation(result); // Assuming you handle the response to display attestation info
        })
        .catch((error) => {
          console.error("Transaction error:", error);
          setError("Transaction failed: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to fetch ABI:", error);
      setError("Failed to load contract ABI: " + error.message);
    });
};

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
      <h3>Create Attestation</h3>
      <div>
        <div>
          <label>
            Recipient Address:
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter the recipient's Ethereum address"
            />
          </label>
          <label>
            Schema Hash:
            <input
              type="text"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder="Enter the schema hash for the attestation"
            />
            <button onClick={handleSchemaFetch}>Fetch Schema</button>
          </label>
          <label>
            Expiration Time:
            <input
              type="number"
              value={expirationTime}
              onChange={(e) => setExpirationTime(e.target.value)}
              placeholder="Unix timestamp for when the attestation expires"
            />
          </label>
          <div>
            <p>Revocable:</p>
            <label>
              <input
                type="radio"
                name="revocable"
                checked={revocable === true}
                onChange={() => setRevocable(true)}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="revocable"
                checked={revocable === false}
                onChange={() => setRevocable(false)}
              />
              False
            </label>
          </div>
          <label>
            Attestation Data:
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Data associated with the attestation"
            ></textarea>
          </label>
          <button onClick={handleSubmit}>Submit Attestation</button>
        </div>
        {schemaDetails && (
          <div>
            <h4>Schema Details:</h4>
            <pre>{JSON.stringify(schemaDetails, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
    {error && <p className="error">{error}</p>}

    <div className="m-2">
      <p>
        <strong>Helpful Links:</strong>
        <a
          href="https://docs.attest.org/docs/core--concepts/attestations"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about attestations
        </a>
      </p>
    </div>
  </>
);
