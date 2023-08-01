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

const address = "0x1D37CC6381b8B5795A6e0F54b313c54F00Bc848E";

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
          { type: "bool", name: "isPlaying", internalType: "bool" },
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
  width: 30%;
`;

const CardWrapper = styled.div`
    width: 50%;
    border: 1px solid;

    .card-image {
        width: 100%;
        height: 100%;
    }

    .card-wrapper {
        position: relative;
        display: inline-block; 
        width: 100%;
    }

    .card-wrapper img {
        width: 100%;
        height: 100%;
    }

    .player-info {
      position: absolute;
      top: 0px;
      width: 100%;
      height: Calc(100% - 40px);
      color: #fff;
    }

    .player-label {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .flex-item {
        flex: 1;
        display: flex;
        justify-content: space-around;
    }

    .flex-start {
        justify-content: start;
        align-items: start;
    }

    .flex-end {
        align-items: end;
    }

    .playing-tag {
        min-width: 60px;
        background-color: blue;
        text-align: center;
        border: 1px solid blue;
        border-radius: 7px;
    }

    .player-detail-wrapper {
        display: flex;
        justify-content: center;
        margin: 3px;
    }
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
        {state.players.map((player, idx) => {
          console.log(player[6]);
          return (
            <CardWrapper>
              <div className="card-wrapper">
                <img className="card-image" src={images[idx]} />
                <div className="player-info">
                  <div className="player-label">
                    <div className="flex-item flex-start">
                      <p className="playing-tag">
                        {player[6] === true ? "경기중" : "대기중"}
                      </p>
                    </div>
                    <div className="flex-item flex-end">
                      <p>{player[1]}</p>
                      <p>{player[3]}</p>
                    </div>
                  </div>
                </div>
                <div className="player-detail-wrapper">
                  <button>상세보기</button>
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </CardSelectWrapper>
      {/**<button>원오원리그 바로참가하기</button>**/}
      <div></div>
    </div>
  );
};

return <Player />;
