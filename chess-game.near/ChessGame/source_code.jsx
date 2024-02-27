const { game_id, cancelDate } = props;

const contractId = "app.chess-game.near";
const chessBoardWidget = "chess-game.near/widget/ChessBoard";
const buttonWidget = "chess-game.near/widget/ChessGameButton";
const loadingWidget = "chess-game.near/widget/ChessGameLoading";

if (!game_id) return <div>"game_id" prop required</div>;

Near.asyncView(contractId, "get_board", {
  game_id,
})
  .then((board) => {
    State.update({
      board,
    });
  })
  .catch((err) => {
    console.log(err);
    State.update({
      error: err,
    });
  });
Near.asyncView(contractId, "game_info", {
  game_id,
})
  .then((gameInfo) => {
    State.update({
      gameInfo,
    });
  })
  .catch((err) => {
    console.log(err);
    State.update({
      error: err,
    });
  });

State.init({
  board: state.board,
  gameInfo: state.gameInfo,
  move: "",
  assetType: state.assetType ?? "default",
  error: state.error,
});

if (!state.board || !state.gameInfo) {
  return <Widget src={loadingWidget} />;
}
if (state.error) {
  return "The game no longer exists. Please return to lobby";
}

const BoardView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.4rem;
  margin: 1rem;
`;

const renderPlayer = (color, player) => {
  const usesOldSerialization = gameInfo.black.type == null;
  if (usesOldSerialization && player.Human) {
    return (
      <div>
        Player {color}: {player.Human}
      </div>
    );
  } else if (player.type === "Human") {
    return (
      <div>
        Player {color}: {player.value}
      </div>
    );
  } else if (usesOldSerialization && player.Ai) {
    return (
      <div>
        Player {color}: AI ({player.Ai})
      </div>
    );
  } else if (player.type === "Ai") {
    return (
      <div>
        Player {color}: AI ({player.value})
      </div>
    );
  } else {
    const err = new Error(`Unable to render player: ${player}`);
    console.error(err);
    return "";
  }
};

const TurnInput = styled.input`
  border-radius: 4px;
  border: 1px solid black;
`;
const SendButton = styled.button`
  border-radius: 4px;
`;

const updateMove = (event) => {
  State.update({
    move: event.target.value,
  });
};
const selectAsset = (event) => {
  State.update({
    assetType: event.target.value,
  });
};

const playMove = () => {
  if (!state.move) return;
  Near.call(
    contractId,
    "play_move",
    {
      game_id,
      mv: state.move,
    },
    "300000000000000"
  );
};

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  max-width: 400px;
`;

const text = `
  _A valid move will be parsed from a string._
  
  _Possible valid formats include:_
  - \"e2e4\"
  - \"e2 e4\"
  - \"e2 to e4\"
  - \"castle queenside\"
  - \"castle kingside\"'

  _If a game stalls because players stop sending moves, it can be stopped after ~3 days._
  _Cancelling a game won't affect your ELO rating, but resigning will result in a lost match._
`;
const assetText = `
  _Assets are free to use right now, but will later be unlocked via NFTs._
`;

return (
  <BoardView>
    <GameInfo>
      <div>ID: {game_id[0]}</div>
      {renderPlayer("White", state.gameInfo.white)}
      {renderPlayer("Black", state.gameInfo.black)}
      <div>Turn: {state.gameInfo.turn_color}</div>
      {cancelDate && <div>Cancellable: {cancelDate.toLocaleString()}</div>}
    </GameInfo>
    <Widget
      src={chessBoardWidget}
      props={{ board: state.board, assetType: state.assetType }}
    />
    <Footer>
      <h3>Your Move:</h3>
      <div class="text-center">
        <TurnInput
          type="text"
          required
          autocomplete="off"
          id="turn"
          value={state.move}
          onChange={updateMove}
        />
        <Widget
          src={buttonWidget}
          props={{
            onClick: playMove,
            fontSize: "1.2rem",
            content: "Play",
            inline: true,
          }}
        />
      </div>
      <Markdown text={text} />

      {
        // <h3>Assets:</h3>
        // <select onChange={selectAsset} value={state.assetType}>
        //   <option value="default">Regular</option>
        //   <option value="hk">Hollow Knight Style</option>
        // </select>
        // <Markdown text={assetText} />
      }
    </Footer>
  </BoardView>
);
