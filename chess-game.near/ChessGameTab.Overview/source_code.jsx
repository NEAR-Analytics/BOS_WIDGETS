const { accountId } = context;
if (!accountId) {
  return "You need to login with your Near wallet first!";
}
const { selectGame } = props;

const contractId = "app.chess-game.near";
const buttonWidget = "chess-game.near/widget/ChessGameButton";
const challengeWidget = "chess-game.near/widget/ChessGameChallenge";
const aiWidget = "chess-game.near/widget/ChessGameAi";

if (state.isRegistered) {
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

const GameSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const renderGameIds = (gameIds) =>
  gameIds.map((gameId) => {
    const gameInfo = Near.view(contractId, "game_info", {
      game_id: gameId,
    });
    return (
      <Widget
        src={buttonWidget}
        props={{
          onClick: selectGame(gameId, isFinished),
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
  <>
    {state.gameIds.length > 0 && (
      <div>
        <h2>Select Game:</h2>
        <GameSelector>{renderGameIds(state.gameIds)}</GameSelector>
      </div>
    )}
    <Widget src={challengeWidget} />
    <Widget src={aiWidget} />
  </>
);
