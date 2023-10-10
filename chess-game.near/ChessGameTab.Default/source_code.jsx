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
