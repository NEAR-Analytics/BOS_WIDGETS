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

return (
  <>
    <ThemeWrapper>
      <GNBWrapper>
        <h1>
          <img
            src={`https://ipfs.near.social/ipfs/bafkreihqvsh66f4fmuuxsdplvc2biptfoseevy3jgqhye6qnmfzdzay72m`}
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
        <></>
      ) : null}
    </ThemeWrapper>
  </>
);
