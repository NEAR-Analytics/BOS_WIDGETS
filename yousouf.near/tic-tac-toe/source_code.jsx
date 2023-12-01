const calculateWinner = (squares) => {
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
};

const isBoardFull = (squares) => {
  return squares.every((square) => square !== null);
};

const getRandomMove = (squares) => {
  const emptySquares = squares.reduce((acc, value, index) => {
    if (!value) acc.push(index);
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};
const [squares, setSquares] = useState(Array(9).fill(null));
const [xIsNext, setXIsNext] = useState(true);
const [isGameOver, setGameOver] = useState(false);

const handleClick = (index) => {
  if (
    squares[index] ||
    calculateWinner(squares) ||
    isBoardFull(squares) ||
    isGameOver
  ) {
    return;
  }

  const newSquares = [...squares];
  newSquares[index] = "X"; // Assuming the player is always X
  setSquares(newSquares);
  setXIsNext(false);

  if (!isBoardFull(newSquares) && !calculateWinner(newSquares)) {
    // Computer's move
    const computerMove = getRandomMove(newSquares);
    newSquares[computerMove] = "O"; // Assuming the computer is always O
    setSquares(newSquares);
    setXIsNext(true);
  }
};

useEffect(() => {
  const winner = calculateWinner(squares);
  const full = isBoardFull(squares);

  if (winner || full) {
    setGameOver(true);
  }
}, [squares]);

const resetGame = () => {
  setSquares(Array(9).fill(null));
  setGameOver(false);
  setXIsNext(true);
};

let status;
if (isGameOver) {
  const winner = calculateWinner(squares);
  if (winner) {
    status = `Winner: ${winner === "X" ? "Player" : "Computer"}`;
  } else {
    status = "It's a draw!";
  }
} else {
  status = `Next player: ${xIsNext ? "Player" : "Computer"}`;
}

return (
  <div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: isGameOver ? "#8eff8e" : "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          cursor: "pointer",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            gridColumn: "span 3",
          }}
        >
          {status}
        </div>

        {squares.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
            style={{
              backgroundColor: isGameOver ? "#8eff8e" : "#fff",
              border: "1px solid #ccc",
              fontSize: "24px",
              fontWeight: "bold",
              padding: "20px",
              textAlign: "center",
              width: "60px",
              height: "60px",
              cursor: "pointer",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>

    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  </div>
);
