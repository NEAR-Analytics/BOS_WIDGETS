const SquareButton = styled.button`
  background: #fff;
  border: 3px solid black;
  float: left;
  font-size: 24px;
  line-height: 34px;
  height: 50px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 50px;
`;

const borderRow = {
  clear: "both",
  content: "",
  display: "table",
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getEmptySquares(squares) {
  return squares
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);
}

function getRandomMove(emptySquares) {
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
}

State.init({
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
});

function handleClick(i) {
  const squares = state.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = state.xIsNext ? "X" : "O";
  State.update({
    squares: squares,
    xIsNext: !state.xIsNext,
  });

  const winner = calculateWinner(state.squares);

  // CPU's turn
  if (!state.xIsNext && !winner) {
    setTimeout(() => {
      const emptySquares = getEmptySquares(squares);
      if (emptySquares.length > 0) {
        // Make a random move if no winning or blocking move found
        if (emptySquares.length > 0) {
          const randomMove = getRandomMove(emptySquares);
          squares[randomMove] = "O";
          State.update({
            squares: squares,
            xIsNext: !state.xIsNext,
          });
        }
      }
    }, 1000);
  }
}

function renderSquare(i) {
  return (
    <SquareButton onClick={() => handleClick(i)}>
      {state.squares[i]}
    </SquareButton>
  );
}

const winner = calculateWinner(state.squares);

if (winner) {
  State.update({
    winner: winner,
    status: "Winner: " + (winner == "X" ? "Player" : "CPU"),
  });
} else {
  State.update({
    status: "Turn: " + (state.xIsNext ? "Player" : "CPU"),
  });
}

return (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            State.update({
              squares: Array(9).fill(null),
              xIsNext: true,
              winner: null,
              status: null,
            })
          }
        >
          Reset Game
        </button>
      </div>
      <div style={borderRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div style={borderRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div style={borderRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        {state.status}
      </div>
    </div>
  </div>
);
