const { accountId } = context;
if (!accountId) {
  return "You need to login with your Near wallet first!";
}

const contractId = "app.chess-game.near";
const headerWidget = "chess-game.near/widget/ChessGameHeader";
const gameWidget = "chess-game.near/widget/ChessGame";
const replayWidget = "chess-game.near/widget/ChessGameReplay";
const challengeWidget = "chess-game.near/widget/ChessGameChallenge";
const aiWidget = "chess-game.near/widget/ChessGameAi";
const buttonWidget = "chess-game.near/widget/ChessGameButton";
const loadingWidget = "chess-game.near/widget/ChessGameLoading";

const LobbyView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  max-width: 550px;
  margin: 0 auto;
  box-sizing: border-box;

  h1 {
    align-self: center;
  }

  > * {
    margin: 1.2rem 0;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};

  > * {
    margin: 0.4rem 0;
  }
`;
const Disclaimer = styled.div`
  margin-top: 1rem;
  font-style: italic;
  font-size: 1.2rem;
`;

State.init({
  game_id: null,
  replay_game_id: null,
  isRegistered: state.isRegistered,
  gameIds: null,
  finishedGames: null,
  recentFinishedGames: null,
});

const updateIsRegistered = () => {
  Near.asyncView(contractId, "storage_balance_of", {
    account_id: accountId,
  }).then((res) => {
    State.update({
      isRegistered: !!res,
    });
  });
};
updateIsRegistered();
if (state.isRegistered == null) {
  return <Widget src={loadingWidget} />;
}

const registerAccount = () => {
  Near.call(
    contractId,
    "storage_deposit",
    {},
    undefined,
    "50000000000000000000000"
  );
  updateIsRegistered();
};

if (!state.isRegistered) {
  return (
    <LobbyView>
      <Widget src={headerWidget} />
      <Disclaimer>
        You need to pay storage deposit of 0.05N first before being allowed to
        play Chess On Chain.
        <br />
        If you don't get redirected after registering, please refresh the page.
      </Disclaimer>
      <Widget
        src={buttonWidget}
        props={{
          onClick: registerAccount,
          fontSize: "1.2rem",
          content: "Register Account",
        }}
      />
    </LobbyView>
  );
}

Near.asyncView(contractId, "get_game_ids", {
  account_id: accountId,
}).then((gameIds) =>
  State.update({
    gameIds,
  })
);
Near.asyncView(contractId, "finished_games", {
  account_id: accountId,
}).then((finishedGames) => {
  finishedGames.sort((a, b) => b[0] - a[0]);
  State.update({
    finishedGames,
  });
});
Near.asyncView(contractId, "recent_finished_games", {}).then(
  (recentFinishedGames) =>
    State.update({
      recentFinishedGames,
    })
);
if (
  state.gameIds == null ||
  state.finishedGames == null ||
  state.recentFinishedGames == null
) {
  return <Widget src={loadingWidget} />;
}

const GameSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  > * {
    margin: 1rem;
  }
`;

const selectGame = (gameId, isFinished) => () => {
  if (isFinished) {
    State.update({
      replay_game_id: gameId,
    });
  } else {
    State.update({
      game_id: gameId,
    });
  }
};
const returnToLobby = () => {
  State.update({
    game_id: null,
    replay_game_id: null,
  });
};
const resign = () => {
  Near.call(contractId, "resign", {
    game_id: state.game_id,
  });
  State.update({
    game_id: null,
  });
};

const renderGameIds = (gameIds, isFinished, displayPlayers) =>
  gameIds.map((gameId) => {
    let gameInfo;
    if (!isFinished) {
      gameInfo = Near.view(contractId, "game_info", {
        game_id: gameId,
      });
    }
    return (
      <Widget
        src={buttonWidget}
        props={{
          onClick: selectGame(gameId, isFinished),
          content: (
            <>
              <div>ID: {gameId[0]}</div>
              {displayPlayers && (
                <>
                  <div>White: {gameId[1]}</div>
                  {gameId[2] && <div>Black: {gameId[2]}</div>}
                </>
              )}
              {gameInfo && (
                <div>
                  VS:{" "}
                  {gameInfo.black.Ai ? (
                    <>AI ({gameInfo.black.Ai})</>
                  ) : (
                    <>Player ({gameInfo.black.Human})</>
                  )}
                </div>
              )}
            </>
          ),
        }}
      />
    );
  });

let content;
if (state.game_id) {
  content = (
    <Content alignItems="stretch">
      <Widget
        src={buttonWidget}
        props={{
          onClick: returnToLobby,
          alignSelf: "center",
          content: "Return To Lobby",
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
} else if (state.replay_game_id) {
  content = (
    <Content alignItems="stretch">
      <Widget
        src={buttonWidget}
        props={{
          onClick: returnToLobby,
          alignSelf: "center",
          content: "Return To Lobby",
        }}
      />
      <Widget src={replayWidget} props={{ game_id: state.replay_game_id }} />
    </Content>
  );
} else {
  content = (
    <>
      {gameIds.length > 0 && (
        <div>
          <h2>Select Game:</h2>
          <GameSelector>{renderGameIds(gameIds, false, false)}</GameSelector>
        </div>
      )}
      <Widget src={challengeWidget} />
      <Widget src={aiWidget} />
      {finishedGames.length > 0 && (
        <div>
          <h2>Replay your finished games:</h2>
          <GameSelector>
            {renderGameIds(finishedGames, true, false)}
          </GameSelector>
        </div>
      )}
      {recentFinishedGames.length > 0 && (
        <div>
          <h2>Replay recently finished games:</h2>
          <GameSelector>
            {renderGameIds(recentFinishedGames, true, true)}
          </GameSelector>
        </div>
      )}
    </>
  );
}
return (
  <LobbyView
    alignItems={state.game_id || state.replay_game_id ? "stretch" : "center"}
  >
    <Widget src={headerWidget} />
    {content}
    <Disclaimer>
      If you won or lost a game it will no longer be displayed. You can check
      the most recent transactions status on{" "}
      <a
        target="_blank"
        href="https://explorer.near.org/accounts/app.chess-game.near"
      >
        Near Explorer
      </a>{" "}
      or{" "}
      <a
        target="_blank"
        href="https://nearblocks.io/address/app.chess-game.near"
      >
        Nearblocks
      </a>
      .
    </Disclaimer>
  </LobbyView>
);
