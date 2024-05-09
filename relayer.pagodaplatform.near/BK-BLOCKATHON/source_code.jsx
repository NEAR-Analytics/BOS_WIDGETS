const ThemedText = styled.div`
    color:blue;
    font-weight:bold;
    font-size: 50px;
`;

const signer = Ethers.send("eth_requestAccounts", [])[0];

if (!signer) {
  return (
    <div>
      <h3>Please connect your wallet</h3>
      <Web3Connect />
      <ThemedText>BY TEAM FINX</ThemedText>
    </div>
  );
}

const FlexDiv = styled.div`
    display flex;
`;

const Btn = styled.button`
    margin-left: 5px;
`;

const contractAddr = "0x8653e49780bb82a7227bCDCa20C44dA21aeC18C8";

const contractAbi = fetch(
  "https://gist.githubusercontent.com/warunsinx/e0f0d5a2b203e59280eaa9d88c07d64e/raw/bc5635099aef1a70c4b14020f9f1e9c8e693c467/BOSDemo.abi.json"
);

const contract = new ethers.Contract(
  contractAddr,
  contractAbi.body,
  Ethers.provider().getSigner()
);

const getMessage = () => {
  contract.getMessage().then((res) => {
    State.update({ message: res });
  });
};

getMessage();

const updateMessage = () => {
  contract.setMessage(state.input).then((tx) => {
    tx.wait().then(() => {
      getMessage();
    });
  });
};

return (
  <div>
    <p>Current Message: {state.message}</p>
    <p>Leave us a message on Biktkub Chain Testnet !</p>
    <FlexDiv>
      <input
        placeholder="Enter your message.."
        type="text"
        value={state.input}
        onChange={(e) => State.update({ input: e.target.value })}
      />
      <Btn onClick={updateMessage}>Send</Btn>
    </FlexDiv>
    <ThemedText>BY TEAM FINX</ThemedText>
  </div>
);
