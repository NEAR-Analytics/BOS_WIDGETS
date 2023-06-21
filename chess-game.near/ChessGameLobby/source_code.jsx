const { accountId } = context;
if (!accountId) {
  return "You need to login with your Near wallet first!";
}

const contractId = "app.chess-game.near";
const chessGameWidget = "chess-game.near/widget/ChessGame";
const chessGameReplayWidget = "chess-game.near/widget/ChessGameReplay";
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
const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "unset")};
  border: 1px solid black;
  border-radius: 4px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  max-width: 220px;

  > * {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
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
const Challenge = styled.div`
  display: flex;
`;

const isRegistered = Near.view(contractId, "storage_balance_of", {
  account_id: accountId,
});
const challenges0 = Near.view(contractId, "get_challenges", {
  account_id: accountId,
  is_challenger: true,
});
const challenges1 = Near.view(contractId, "get_challenges", {
  account_id: accountId,
  is_challenger: false,
});
const openChallenges = [
  ...challenges0.map((id) => ({
    challenge_id: id,
    is_challenger: true,
  })),
  ...challenges1.map((id) => ({
    challenge_id: id,
    is_challenger: false,
  })),
];

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
      <Button onClick={registerAccount} fontSize="1.2rem">
        Register Account
      </Button>
    </LobbyView>
  );
}

console.log("STATE", state);
State.init({
  game_id: null,
  replay_game_id: null,
  challenged_id: "",
  difficulty: "Easy",
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
const GameCreator = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > *:not(h2) {
    margin: 0.2rem 0;
  }

  h2, h3, h4 {
    align-self: center;
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
const updateChallengedId = ({ target }) => {
  State.update({ challenged_id: target.value });
};
const resign = () => {
  Near.call(contractId, "resign", {
    game_id: state.game_id,
  });
};
const challenge = () => {
  Near.call(contractId, "challenge", {
    challenged_id: state.challenged_id,
  });
};
const createAiGame = () => {
  Near.call(contractId, "create_ai_game", {
    difficulty: state.difficulty,
  });
};
const acceptChallenge = (challenge_id) => {
  Near.call(contractId, "accept_challenge", {
    challenge_id,
  });
};
const rejectChallenge = (challenge_id, is_challenger) => {
  Near.call(contractId, "reject_challenge", {
    challenge_id,
    is_challenger,
  });
};
const selectDifficulty = (event) => {
  State.update({
    difficulty: event.target.value,
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
      <Button onClick={selectGame(gameId, isFinished)}>
        <div>ID: {gameId[0]}</div>
        {displayPlayers && (
          <>
            <div>White: {gameId[1]}</div>
            {gameId[2] && <div>Black: {gameId[2]}</div>}
          </>
        )}
        {gameInfo && <div>VS: AI ({gameInfo.black.Ai})</div>}
      </Button>
    );
  });

const renderOpenChallenges = (challenges) => {
  return (
    <GameSelector>
      {challenges.map(({ challenge_id, is_challenger }) => {
        return (
          <Challenge>
            <span>{challenge_id}</span>
            {!is_challenger && (
              <Button onClick={acceptChallenge(challenge_id)}>Accept</Button>
            )}
            <Button onClick={rejectChallenge(challenge_id, is_challenger)}>
              Reject
            </Button>
          </Challenge>
        );
      })}
    </GameSelector>
  );
};

let content;
if (state.game_id) {
  content = (
    <Content alignItems="stretch">
      <Button alignSelf="center" onClick={returnToLobby}>
        Return To Lobby
      </Button>
      <Button alignSelf="center" onClick={resign}>
        Resign
      </Button>
      <Widget src={chessGameWidget} props={{ game_id: state.game_id }} />
    </Content>
  );
} else if (state.replay_game_id) {
  content = (
    <Content alignItems="stretch">
      <Button alignSelf="center" onClick={returnToLobby}>
        Return To Lobby
      </Button>
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
      <GameCreator>
        <h2>PvP:</h2>
        <h3>Open challenges:</h3>
        {openChallenges.length === 0 ? (
          <span>
            No open challenges found.
            <br />
            Challenge your first opponent now below!
          </span>
        ) : (
          renderOpenChallenges(openChallenges)
        )}
        <span>Account ID:</span>
        <input onChange={updateChallengedId} value={state.challenged_id} />
        <Button onClick={challenge} fontSize="1.4rem">
          Challenge!
        </Button>
      </GameCreator>
      <GameCreator>
        <h2>Create New AI Game:</h2>
        <span>Difficulty:</span>
        <select onChange={selectDifficulty} value={state.difficulty}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <span>
          <i>Higher difficulties consume more gas!</i>
        </span>
        <Button onClick={createAiGame} fontSize="1.4rem">
          Create
        </Button>
      </GameCreator>
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
    <h1>Chess On Chain</h1>
    <Header>
      <a href="https://github.com/Tarnadas/chess-on-chain" target="_blank">
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
