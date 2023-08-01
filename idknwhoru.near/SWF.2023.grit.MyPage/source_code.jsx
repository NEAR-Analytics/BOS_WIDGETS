State.init({
  page: 0,
});

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

const address = "0x8EBb9B46A1743179607645F73aba40777b5C501E";

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

const MyPageWrapper = styled.div`
    .my-page-title-wrapper {
        display: flex;
        width: 40%;
        justify-content: space-between
    }

    .my-page-title {
        font-size: 32px;
    }

    .my-page-sub-title {
        font-size: 24px;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
`;

const CardSelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  align-content: flex-start
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
        background-color: ${({ isPlaying }) =>
          isPlaying === ture ? "blue" : "yellow"};
        color: ${({ isPlaying }) => (isPlaying === ture ? "#fff" : "#666")};
        text-align: center;
        border: 1px solid blue;
        border-radius: 7px;
    }

    .player-detail-wrapper {
        display: flex;
        justify-content: center;
        margin: 3px;
        margin-bottom: 0;
    }
`;

const PlayingWrapper = styled.div`
    width: 65%;
    height: 100%;

    .league-nav-wrapper {
        display: flex;
        justify-content: center;
    }

    .league-nav-button {
        padding: 10px 20px;
        border-radius: 25px;
        margin-bottom: 40px;
    }

    .field-wrapper {
        height: 600px;
        border: 1px solid;
    }

    .field-wrapper img {
        width: 100%;
        height: 100%;
    }
`;

const LeagueWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  .league-title {
    font-size: 24px;
    color: #999;
    margin-left: 40px;
  }

  .league-holder-label {
    font-size: 24px;
    color: #999;
    margin-left: 40px;
  }

  .league-holders {
    font-size: 24px;
    color: #fff;
  }

  .league-date {
    font-size: 24px;
    color: #999;
    margin-left: 40px;
  }

  hr {
    border-top: 1px solid #fff;
    opacity: 1;
  }
`;

const Player = () => {
  if (state.players === undefined) {
    return "선수 불러오는 중..";
  }

  if (state.players.length === 0) {
    return "후원한 선수가 없습니다.";
  }

  return (
    <>
      {state.page === 0 ? (
        <MyPageWrapper>
          <div className="my-page-title-wrapper">
            <h1 className="my-page-title">마이페이지</h1>
            <h2 className="my-page-sub-title">
              5명을 선택해 라인업을 구성하세요.
            </h2>
          </div>
          <ContentWrapper>
            <CardSelectWrapper>
              {state.players.map((player, idx) => {
                console.log(player[6]);
                return (
                  <CardWrapper isPlaying={player[6]}>
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
            <PlayingWrapper>
              <div className="league-nav-wrapper">
                <button
                  className="league-nav-button"
                  onClick={() => {
                    State.update({ page: 1 });
                  }}
                >
                  원오원리그 바로참가하기
                </button>
              </div>
              <div className="field-wrapper">
                <img
                  src={`https://ipfs.near.social/ipfs/bafybeifuuvunlhpvt6y442u3fjlrpsnwvpxvzvrzueyjfbyx274g5a4vfe`}
                />
              </div>
            </PlayingWrapper>
          </ContentWrapper>
        </MyPageWrapper>
      ) : (
        <LeagueWrapper>
          <Widget src={`idknwhoru.near/widget/SWF.2023.grit.LeagueBanner`} />
        </LeagueWrapper>
      )}
    </>
  );
};

return <Player />;
