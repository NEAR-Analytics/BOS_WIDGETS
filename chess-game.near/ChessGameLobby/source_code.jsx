const { accountId } = context;
if (!accountId) {
  return "You need to login with your Near wallet first!";
}

const contractId = "app.chess-game.near";
const chessGameWidget = "chess-game.near/widget/ChessGame";
const chessGameReplayWidget = "chess-game.near/widget/ChessGameReplay";
const chessGameChallengeWidget = "chess-game.near/widget/ChessGameChallenge";
const chessGameAiWidget = "chess-game.near/widget/ChessGameAi";
const buttonWidget = "chess-game.near/widget/ChessGameButton";
const profileIcon = "chess-game.near/widget/ProfileIcon";
const githubIcon = "chess-game.near/widget/GithubIcon";
const twitterIcon = "chess-game.near/widget/TwitterIcon";

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
const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;

  a {
    display: block;
    align-items: center;
    color: inherit;
    text-decoration: inherit;
    font-size: 1.4rem;
    border-radius: 0.4rem;
    border: 1px solid lightblue;
    padding: 0.2rem;

    &:hover {
      border: 1px solid blue;
      color: darkblue;
    }
  }
`;

const isRegistered = Near.view(contractId, "storage_balance_of", {
  account_id: accountId,
});

const registerAccount = () => {
  Near.call(
    contractId,
    "storage_deposit",
    {},
    undefined,
    "50000000000000000000000"
  );
};

if (!isRegistered) {
  return (
    <LobbyView>
      <h1>Chess On Chain</h1>
      <Disclaimer>
        You need to pay storage deposit of 0.05N first before being allowed to
        play Chess On Chain
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

State.init({
  game_id: null,
  replay_game_id: null,
});

const gameIds = Near.view(contractId, "get_game_ids", {
  account_id: accountId,
});
const finishedGames = Near.view(contractId, "finished_games", {
  account_id: accountId,
}).sort((a, b) => b[0] - a[0]);
const recentFinishedGames = Near.view(contractId, "recent_finished_games", {});

const GameSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

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
      <Widget src={chessGameWidget} props={{ game_id: state.game_id }} />
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
      <Widget
        src={chessGameReplayWidget}
        props={{ game_id: state.replay_game_id }}
      />
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
      <Widget src={chessGameChallengeWidget} />
      <Widget src={chessGameAiWidget} />
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
    <h1>Protocol Pawns</h1>
    <Header>
      <Disclaimer>
        Play chess fully on chain powered by Near Protocol and the BOS. If you
        want to learn more please visit the profile page.
      </Disclaimer>
      <a href="https://chess-game.near.social" target="_blank">
        <Widget src={profileIcon} props={{ height: "2rem" }} />
        <span>Profile</span>
      </a>
      <a href="https://github.com/Protocol-Pawns" target="_blank">
        <Widget src={githubIcon} props={{ height: "2rem" }} />
        <span>Github</span>
      </a>
      <a href="https://twitter.com/protocolpawns" target="_blank">
        <Widget src={twitterIcon} props={{ height: "2rem" }} />
        <span>Twitter</span>
      </a>
    </Header>
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
