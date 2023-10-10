const { accountId } = context;
const { isRegistered } = props;
if (!accountId) {
  return "You need to login with your Near wallet first!";
}

const contractId = "app.chess-game.near";
const gameWidget = "chess-game.near/widget/ChessGame";
const buttonWidget = "chess-game.near/widget/ChessGameButton";
const challengeWidget = "chess-game.near/widget/ChessGameChallenge";
const aiWidget = "chess-game.near/widget/ChessGameAi";

const minBlockDiffCancel = 60 * 60 * 24 * 3;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem 0;

  h2, h3, h4 {
    align-self: center;
  }
`;
const GameSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

State.init({
  gameIds: null,
  game_id: null,
});

const selectGame = (gameId) => {
  State.update({
    game_id: gameId,
  });
};
const resign = () => {
  Near.call(contractId, "resign", {
    game_id: state.game_id,
  });
  // TODO await tx before navigation
  selectGame(null);
};

if (state.game_id) {
  const res = fetch("https://rpc.mainnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "status",
      params: [],
    }),
  });
  if (!res.ok || res.body.error) {
    return `Something went wrong: ${res.body.error}`;
  }
  console.log("res", res);
  const currentBlockHeight = res.body.result.sync_info.latest_block_height;
  const currentBlockTime = new Date(
    res.body.result.sync_info.latest_block_time
  );
  const gameInfo = Near.view(contractId, "game_info", {
    game_id: state.game_id,
  });
  if (!gameInfo) return;
  console.log("gameInfo", gameInfo);
  console.log("blockHeight", currentBlockHeight);
  console.log("blockTime", currentBlockTime);
  const blockDiffCancel =
    gameInfo.last_block_height - currentBlockHeight + minBlockDiffCancel;
  console.log("blockDiffCancel", blockDiffCancel);
  const cancelDate = new Date(
    currentBlockTime.valueOf() + blockDiffCancel * 1_100
  );
  console.log("cancelDate", cancelDate.toLocaleString());
  return (
    <Content>
      <Widget
        src={buttonWidget}
        props={{
          onClick: () => selectGame(null),
          alignSelf: "center",
          content: "Close",
        }}
      />
      <Widget
        src={buttonWidget}
        props={{
          onClick: resign,
          alignSelf: "center",
          content: "Resign",
        }}
      />
      <Widget src={gameWidget} props={{ game_id: state.game_id }} />
    </Content>
  );
}

if (isRegistered) {
  Near.asyncView(contractId, "get_game_ids", {
    account_id: accountId,
  }).then((gameIds) =>
    State.update({
      gameIds,
    })
  );
} else {
  State.update({
    gameIds: [],
  });
}
if (!state.gameIds) {
  return <Widget src="chess-game.near/widget/ChessGameLoading" />;
}

const renderGameIds = (gameIds) =>
  gameIds.map((gameId) => {
    const gameInfo = Near.view(contractId, "game_info", {
      game_id: gameId,
    });
    return (
      <Widget
        src={buttonWidget}
        props={{
          onClick: () => selectGame(gameId),
          flexDirection: "column",
          content: (
            <>
              <div>ID: {gameId[0]}</div>
              {gameInfo && (
                <div>
                  VS:{" "}
                  {gameInfo.black.Ai ? (
                    <>AI ({gameInfo.black.Ai})</>
                  ) : (
                    <>
                      Player
                      {gameInfo.black.Human === accountId ? (
                        <> ({gameInfo.white.Human})</>
                      ) : (
                        <> ({gameInfo.black.Human})</>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          ),
        }}
      />
    );
  });

return (
  <Content>
    <h2>Select Game:</h2>
    <GameSelector>
      {state.gameIds.length > 0 ? (
        renderGameIds(state.gameIds)
      ) : (
        <span>
          No open games found.
          <br />
          Challenge your first opponent or create an AI game!
        </span>
      )}
    </GameSelector>
  </Content>
);
