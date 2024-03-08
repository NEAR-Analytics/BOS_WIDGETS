const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

const passportDecoderAbi = fetch(
  "https://raw.githubusercontent.com/gitcoinco/eas-proxy/main/deployments/abi/GitcoinPassportDecoder.json"
);
if (!passportDecoderAbi.ok) {
  return "ERROR";
}

const iface = new ethers.utils.Interface(passportDecoderAbi.body);

const [address, setAddress] = useState(
  "0xc979F9D3Db24Ef602FD365caA9D86532c73b6D7E"
);

const decoderContractAddress = "0x5558D441779Eca04A329BcD6b47830D2C6607769";

const getPassport = () => {
  const contract = new ethers.Contract(
    decoderContractAddress,
    new ethers.Interface(abi.DecoderAbi["0x1a4"]),
    provider
  );

  let passport = contract.getPassport(state.address);
  return passport;
};

const getScore = () => {
  const contract = new ethers.Contract(
    decoderContractAddress,
    new ethers.Interface(abi.DecoderAbi["0x1a4"]),
    provider
  );

  let score = contract.getScore(state.address);
  return score;
};

const checkPassport = () => {
  const contract = new ethers.Contract(
    decoderContractAddress,
    new ethers.Interface(abi.DecoderAbi["0x1a4"]),
    provider
  );

  let isHuman = contract.isHuman(state.address);
  return isHuman;
};

return (
  <>
    <div className="m-2">
      <input
        type="text"
        placeholder="input Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
    <div className="m-2">
      <button className="btn btn-primary m-2" onClick={getPassport}>
        Get Passport
      </button>
      <button className="btn btn-primary m-2" onClick={getScore}>
        Get Score
      </button>
      <button className="btn btn-primary m-2" onClick={checkPassport}>
        Check Passport
      </button>
    </div>
    <div className="m-2">
      <p className="m-2">{JSON.stringify(passport)}</p>
      <p className="m-2">{JSON.stringify(score)}</p>
      <p className="m-2">{JSON.stringify(isHuman)}</p>
    </div>
  </>
);
