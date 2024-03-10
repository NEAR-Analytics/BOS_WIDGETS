const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

const passportDecoderAbi = fetch(
  "https://raw.githubusercontent.com/gitcoinco/eas-proxy/main/deployments/abi/GitcoinPassportDecoder.json"
);
if (!passportDecoderAbi.ok) {
  return "ERROR";
}
const [address, setAddress] = useState(user);
const [passport, setPassport] = useState(null);
const [score, setScore] = useState(null);
const [verified, setVerified] = useState(null);
const [error, setError] = useState("");

const contractAddress = "0x5558D441779Eca04A329BcD6b47830D2C6607769";
const parsedAbi = JSON.parse(passportDecoderAbi.body);
const decoderAbi = parsedAbi["0x1a4"];

const decoder = new ethers.Contract(
  contractAddress,
  decoderAbi,
  Ethers.provider().getSigner()
);

function getPassport() {
  decoder
    .getPassport(address)
    .then((result) => {
      setPassport(result);
      setError("");
    })
    .catch((error) => {
      console.error("error fetching passport:", error);
      setError("Failed to retrieve data. Please try with a verified address.");
    });
}

function getScore() {
  decoder
    .getScore(address)
    .then((result) => {
      setScore(result);
      setError("");
    })
    .catch((error) => {
      console.error("error fetching score:", error);
      setError("Failed to fetch score. Please try with a verified address.");
    });
}

function getStatus() {
  decoder
    .isHuman(address)
    .then((result) => {
      setVerified(result);
      setError("");
    })
    .catch((error) => {
      console.error("error checking status:", error);
      setError("Failed to check status. Please try with a verified address.");
    });
}

return (
  <>
    <div className="m-2">
      <h3>Gitcoin Passport Decoder</h3>
      <input
        type="text"
        placeholder="input Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
    <div className="m-2">
      <button
        disabled={address === ""}
        className="btn btn-primary m-1"
        onClick={getStatus}
      >
        Check Passport
      </button>
      <button
        disabled={address === ""}
        className="btn btn-primary m-1"
        onClick={getScore}
      >
        Fetch Score
      </button>
      <button
        disabled={address === ""}
        className="btn btn-primary m-1"
        onClick={getPassport}
      >
        Review Data
      </button>
      <p className="m-1">{error}</p>
    </div>
    <div className="m-2">
      {verified && (
        <p className="m-2">
          <b>Verified:</b> {JSON.stringify(verified)}
        </p>
      )}
      {score && (
        <p className="m-2">
          <b>Score:</b> {JSON.stringify(score)}
        </p>
      )}
      {passport && (
        <p className="m-2">
          <b>Data:</b> {JSON.stringify(passport)}
        </p>
      )}
    </div>
    <hr />
    <div className="m-3">
      <h4>
        <a href="https://docs.passport.gitcoin.co/building-with-passport/smart-contracts/contract-reference">
          Contract Reference
        </a>
      </h4>
      <p>
        <i>using Optimism (0x1a4)</i>
      </p>
      <h5>
        ABI --
        <a href="https://github.com/gitcoinco/eas-proxy/blob/main/deployments/abi/GitcoinPassportDecoder.json">
          GitHub
        </a>
      </h5>
      <pre>{JSON.stringify(decoderAbi, null, 2)}</pre>
    </div>
  </>
);
