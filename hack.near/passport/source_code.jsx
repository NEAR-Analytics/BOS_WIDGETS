const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

const passportDecoderAbi = fetch(
  "https://raw.githubusercontent.com/gitcoinco/eas-proxy/main/deployments/abi/GitcoinPassportDecoder.json"
);
if (!passportDecoderAbi.ok) {
  return "ERROR";
}

const iface = new ethers.utils.Interface(passportDecoderAbi.body);

State.init({
  address: "0xc979F9D3Db24Ef602FD365caA9D86532c73b6D7E",
});

const decoderContractAddress = "0x5558D441779Eca04A329BcD6b47830D2C6607769";

const getPassport = () => {
  const contract = new ethers.Contract(
    decoderContractAddress,
    passportDecoderAbi.body,
    Ethers.provider().getSigner()
  );

  const passport = contract.getPassport(state.address);
  return passport;
};

const getScore = () => {
  const contract = new ethers.Contract(
    decoderContractAddress,
    passportDecoderAbi.body,
    Ethers.provider().getSigner()
  );

  let score = contract.getScore(state.address);
  return score;
};

const checkPassport = () => {
  const contract = new ethers.Contract(
    decoderContractAddress,
    passportDecoderAbi.body,
    Ethers.provider().getSigner()
  );

  let isHuman = contract.isHuman(state.address);
  return isHuman;
};

return (
  <div>
    <button onClick={getPassport}>Get Passport</button>
    <button onClick={getScore}>Get Score</button>
    <button onClick={checkPassport}>Check Passport</button>
    <p>{JSON.stringify(score)}</p>
    <p>{JSON.stringify(score)}</p>
    <p>{JSON.stringify(isHuman)}</p>
  </div>
);
