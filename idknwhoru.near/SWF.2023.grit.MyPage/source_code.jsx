const address = "0x21Ddc0803447C70b38121766CA99C827aD6f02a8";

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
          { type: "string", name: "position", internalType: "string" },
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

const CardSelectWrapper = styled.div`
  display: flex;
`;

const CardWrapper = styled.div`
  width: 50%;
  border: 1px solid;
`;

const Player = () => {
  if (state.players === undefined || state.players.length === 0) {
    return "후원한 선수가 없습니다.";
  }

  return (
    <div>
      <h1>마이페이지</h1>
      <h2>5명을 선택해 라인업을 구성하세요.</h2>
      <CardSelectWrapper>
        {state.players.map((player) => {
          console.log(player);
          return (
            <CardWrapper>
              <p>
                {player[1]} ({player[0]}): {ethers.utils.formatEther(player[3])}{" "}
                CRO
              </p>
              <button>상세보기</button>
            </CardWrapper>
          );
        })}
      </CardSelectWrapper>
      <button>원오원리그 바로참가하기</button>
      <div></div>
    </div>
  );
};

return <Player />;
