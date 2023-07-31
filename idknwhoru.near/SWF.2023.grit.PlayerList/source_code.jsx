const cronosContractAddress = "0xCf10F98bA9044175a828462e991F48f01aF9BB73";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string[]", name: "", internalType: "string[]" }],
    name: "getAllPlayers",
    inputs: [],
  },
];

const getAllPlayers = () => {
  const cronosContract = new ethers.Contract(
    cronosContractAddress,
    cronosContractABI,
    Ethers.provider().getSigner()
  );

  cronosContract.getAllPlayers().then((players) => {
    State.update({ players });
  });
};

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer
    .getAddress()
    .then((address) => {
      State.update({ address });
    })
    .catch((err) => {
      console.log({ err });
    });
}

if (state.players === undefined) {
  getAllPlayers();
}

const Card = styled.div`
    width: 150px;
    height: 200px;
    border: solid 1px #bbb;
    cursor: pointer;
`;

console.log(state);

const Cards = () => {
  if (state.players !== undefined) {
    return (
      <div style={{ display: "flex" }}>
        {state.players.map((player) => {
          return <Card>{player}</Card>;
        })}
      </div>
    );
  }
};

return (
  <>
    <Web3Connect connectLabel="Connect Wallet" />
    <h1>Players</h1>
    <Cards />
  </>
);
p;
