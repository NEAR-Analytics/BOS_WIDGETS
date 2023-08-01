const cronosContractAddress = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

const images = [
  "https://ipfs.near.social/ipfs/bafkreifdek56fab4d55vun6to66dzizhy76ly65gdy3eo6lv5vnzbxgrty",
  "https://ipfs.near.social/ipfs/bafkreibslifqs6pz37vy2mrrlmogtatlg5s2d5fc4bfiv4rzcgzubgekeu",
  "https://ipfs.near.social/ipfs/bafkreibshwzbeoxguy5mot6nilssix3ilmpt6w5xv6bazvt2edbnaa5spe",
  "https://ipfs.near.social/ipfs/bafkreic5tco2sgvxdacogftgk3rlsjohb3ptqomr4o5vwtkrzvlfajnl7y",
  "https://ipfs.near.social/ipfs/bafkreigpfirgs42t4rfbbixixm4w5ukqxsbflvvn2nxl7zdktalncxqh2a",
  "https://ipfs.near.social/ipfs/bafkreias744aadzv7ivxuyoqtzwbbd6lawph5hewidapwwgyj5rnt73iri",
  "https://ipfs.near.social/ipfs/bafkreicl2wdomm22rlz2h3gt62uilbharqgh4gmfbx7j7mbnbrkkfxq564",
  "https://ipfs.near.social/ipfs/bafkreiew5g7eizlh6ms7al5y23g7juioejle2bhv3cbyqoq55upxt2dlyu",
];

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
    width: 25%;
    height: 100%;
    border: solid 1px #bbb;
    cursor: pointer;
`;

const Cards = () => {
  if (state.players !== undefined) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {state.players.map((player, idx) => {
          if (idx > 7) {
            return null;
          }
          return (
            <Card>
              <img src={images[idx]} width={"100%"}></img>
              <h1>{player[1]}</h1>
              <h2>{ethers.utils.formatEther(player[6])} CRO</h2>
              <h3>{player[5]}</h3>
              <h3>{player[4]}</h3>
              <h3>{player[3]}</h3>
            </Card>
          );
        })}
      </div>
    );
  }
};

return (
  <>
    <h1>가장 핫한 선수</h1>
    <button>전체보기</button>
    <button>공격수</button>
    <button>수비수</button>
    <button>골키퍼</button>
    <Cards />
  </>
);
p;
