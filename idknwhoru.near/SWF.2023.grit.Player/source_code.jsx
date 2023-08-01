const player = props.player;

const cronosContractAddress = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "string", name: "", internalType: "string" },
      { type: "uint256", name: "", internalType: "uint256" },
    ],
    name: "getPlayerInfo",
    inputs: [{ type: "address", name: "player", internalType: "address" }],
  },
];

const selectPrice = (price) => {
  State.update({
    price,
  });
};

const getPlayerInfo = (_) => {
  const cronosContract = new ethers.Contract(
    cronosContractAddress,
    cronosContractABI,
    Ethers.provider().getSigner()
  );

  cronosContract.getPlayerInfo(player.address).then((player) => {
    console.log(player);
    State.update({ player });
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

getPlayerInfo();

return (
  <>
    {state.player !== undefined ? (
      <>
        <h1>
          {state.player[0]} {state.player[1]}
        </h1>
        <p>포지션:{state.player[3]}</p>
        <p>소속팀: {state.player[4]}</p>
        <p>생년월일: {state.player[2]}</p>
      </>
    ) : null}
  </>
);
p;
