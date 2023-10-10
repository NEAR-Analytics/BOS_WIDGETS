const { accountId } = context;
const { isRegistered } = props;
const game_id =
  props.game_id && typeof props.game_id === "string"
    ? JSON.parse(props.game_id)
    : props.game_id;

const contractId = "app.chess-game.near";
const replayWidget = "chess-game.near/widget/ChessGameReplay";
const buttonWidget = "chess-game.near/widget/ChessGameButton";
const loadingWidget = "chess-game.near/widget/ChessGameLoading";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem 0;
`;
const GameSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  > * {
    flex: 1 1 1000px;
  }
`;

State.init({
  game_id: state.game_id ?? game_id,
  finishedGames: state.finishedGames ?? null,
  recentFinishedGames: state.recentFinishedGames ?? null,
});

const selectGame = (gameId) => {
  State.update({
    game_id: gameId,
  });
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
      <Widget src={replayWidget} props={{ game_id: state.game_id }} />
    </Content>
  );
}

if (isRegistered && accountId) {
  Near.asyncView(contractId, "finished_games", {
    account_id: accountId,
  }).then((finishedGames) => {
    finishedGames.sort((a, b) => b[0] - a[0]);
    State.update({
      finishedGames,
    });
  });
} else {
  State.update({
    finishedGames: [],
  });
}
Near.asyncView(contractId, "recent_finished_games", {}).then(
  (recentFinishedGames) => {
    State.update({
      recentFinishedGames,
    });
  }
);

if (!state.finishedGames || !state.recentFinishedGames) {
  return <Widget src={loadingWidget} />;
}

const renderGameIds = (gameIds, displayPlayers) =>
  gameIds.map((gameId) => {
    return (
      <Widget
        src={buttonWidget}
        props={{
          onClick: () => selectGame(gameId),
          flexDirection: "column",
          content: (
            <>
              <div>ID: {gameId[0]}</div>
              {displayPlayers && (
                <>
                  <div>White: {gameId[1]}</div>
                  {gameId[2] && <div>Black: {gameId[2]}</div>}
                </>
              )}
            </>
          ),
        }}
      />
    );
  });

return (
  <>
    {state.finishedGames.length > 0 && (
      <div>
        <h2>Replay your finished games:</h2>
        <GameSelector>{renderGameIds(state.finishedGames, false)}</GameSelector>
      </div>
    )}
    {state.recentFinishedGames.length > 0 && (
      <div class="mt-4">
        <h2>Replay recently finished games:</h2>
        <GameSelector>
          {renderGameIds(state.recentFinishedGames, true)}
        </GameSelector>
      </div>
    )}
  </>
);
