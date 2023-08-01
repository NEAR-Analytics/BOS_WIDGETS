const ThemeWrapper = styled.div`
    background-color: #202123;
`;

const GNBWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    gap: 15px;
  }

  ul h2 {
    cursor: pointer;
  }

  .btn-outline-secondary {
    width: 200px;
    border-radius: 30px;
    background-color: blue;
    color: #fff;
  }
`;

State.init({
  mode: 0,
});

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

return (
  <>
    <ThemeWrapper>
      <GNBWrapper>
        <h1>
          <img
            src={`https://ipfs.near.social/ipfs/bafkreifjjw45zgdvxlawo5g4qfcvd6ba7gqifbz7xsbqnvtflhrbcgkpq4`}
          />
        </h1>
        <ButtonWrapper>
          <ul>
            <h2
              onClick={() => {
                State.update({ mode: 0 });
              }}
            >
              선수투자
            </h2>
            <h2
              onClick={() => {
                State.update({ mode: 1 });
              }}
            >
              원오원 리그
            </h2>
          </ul>
          <ul>
            <h2
              onClick={() => {
                State.update({ mode: 2 });
              }}
            >
              마이페이지
            </h2>
            <Web3Connect
              connectLabel="Connect To Wallet"
              disconnectLabel="DisConnect Wallet"
            />
          </ul>
        </ButtonWrapper>
      </GNBWrapper>
      {state.mode === 0 ? (
        <Widget src={`idknwhoru.near/widget/SWF.2023.grit.PlayerList`} />
      ) : state.mode === 1 ? (
        <LeagueWrapper>
          <Widget src={`idknwhoru.near/widget/SWF.2023.grit.LeagueBanner`} />
        </LeagueWrapper>
      ) : (
        <Widget src={`idknwhoru.near/widget/SWF.2023.grit.MyPage`} />
      )}
    </ThemeWrapper>
  </>
);
