const cronosContractAddress = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "",
        internalType: "struct MyERC20.PlayerInfo[]",
        components: [
          { type: "address", name: "playerAddress", internalType: "address" },
          { type: "string", name: "koreanName", internalType: "string" },
          { type: "string", name: "englishName", internalType: "string" },
          { type: "string", name: "birthDate", internalType: "string" },
          { type: "string", name: "position", internalType: "string" },
          { type: "string", name: "team", internalType: "string" },
          {
            type: "uint256",
            name: "totalDonationAmount",
            internalType: "uint256",
          },
        ],
      },
    ],
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

console.log(state.players);

const Card = styled.div`
    width: 150px;
    height: 200px;
    border: solid 1px #bbb;
    cursor: pointer;
`;

const Cards = () => {
  if (state.players !== undefined) {
    return (
      <div style={{ display: "flex" }}>
        {state.players.map((player) => {
          return <Card>{player[1]}</Card>;
        })}
      </div>
    );
  }
};

return (
  <>
    <Web3Connect connectLabel="Connect Wallet" />
    <button>전체보기</button>
    <button>공격수</button>
    <button>수비수</button>
    <button>골키퍼</button>
    <Cards />
  </>
);
p;
