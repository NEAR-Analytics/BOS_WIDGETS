const address = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

const abi = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "",
        internalType: "struct MyERC20.DonationInfo[]",
        components: [
          { type: "address", name: "player", internalType: "address" },
          { type: "string", name: "playerName", internalType: "string" },
          { type: "string", name: "playerKoreanName", internalType: "string" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "address", name: "donor", internalType: "address" },
        ],
      },
    ],
    name: "getMyDonationPlayers",
    inputs: [],
  },
];

const getMyPlayers = () => {
  const cronosContract = new ethers.Contract(
    address,
    abi,
    Ethers.provider().getSigner()
  );

  cronosContract.getMyDonationPlayers().then((players) => {
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

getMyPlayers();

const Player = () => {
  if (state.players === undefined || state.players.length === 0) {
    return "후원한 선수가 없습니다.";
  }

  return (
    <div>
      <h1>선수 후원금액 목록</h1>
      {state.players.map((player) => {
        return (
          <p>
            {player[1]} ({player[0]}): {ethers.utils.formatEther(player[3])} CRO
          </p>
        );
      })}
    </div>
  );
};

return <Player />;
