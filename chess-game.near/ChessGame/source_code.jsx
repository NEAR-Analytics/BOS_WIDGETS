const { game_id } = props;
const contractId = "app.chess-game.near";
const chessBoardWidget = "chess-game.near/widget/ChessBoard";
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

if (state.board == null || state.gameInfo == null) {
  return "loading...";
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
  if (player.Human) {
    return (
      <div>
        Player {color}: {player.Human}
      </div>
    );
  } else if (player.Ai) {
    return (
      <div>
        Player {color}: AI ({player.Ai})
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
  console.log("event.target.value", event.target.value);
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
`;

const text = `
  _A valid move will be parsed from a string._
  
  _Possible valid formats include:_
  - \"e2e4\"
  - \"e2 e4\"
  - \"e2 to e4\"
  - \"castle queenside\"
  - \"castle kingside\"'
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
    </GameInfo>
    <Widget
      src={chessBoardWidget}
      props={{ board: state.board, assetType: state.assetType }}
    />
    <Footer>
      <h3>Your Move:</h3>
      <div>
        <TurnInput
          type="text"
          required
          id="turn"
          value={state.move}
          onChange={updateMove}
        />
        <SendButton onClick={playMove}>Play</SendButton>
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
