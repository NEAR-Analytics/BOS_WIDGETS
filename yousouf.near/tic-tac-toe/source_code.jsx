const calculateWinner = (squares) => {
  const lines = [];

  for (let i = 0; i < 5; i++) {
    lines.push([i, i + 5, i + 10, i + 15, i + 20]); // Vertical lines
    lines.push([i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4]); // Horizontal lines
  }

  for (let i = 0; i < 5; i++) {
    lines.push([i * 6, i * 6 + 1, i * 6 + 2, i * 6 + 3, i * 6 + 4]); // Diagonal from top-left to bottom-right
    lines.push([i, i + 7, i + 14, i + 21, i + 28]); // Diagonal from top-right to bottom-left
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d] &&
      squares[a] === squares[e]
    ) {
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

const [squares, setSquares] = useState(Array(25).fill(null));
const [xIsNext, setXIsNext] = useState(true);
const [isGameOver, setGameOver] = useState(false);
const [playerScore, setPlayerScore] = useState(0);
const [computerScore, setComputerScore] = useState(0);

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
  newSquares[index] = xIsNext ? "X" : "O";
  setSquares(newSquares);
  setXIsNext(!xIsNext);

  if (!isBoardFull(newSquares) && !calculateWinner(newSquares)) {
    // Computer's move
    const computerMove = getRandomMove(newSquares);
    newSquares[computerMove] = "O";
    setSquares(newSquares);
    setXIsNext(true);
  }
};

useEffect(() => {
  const winner = calculateWinner(squares);
  const full = isBoardFull(squares);

  if (winner) {
    if (winner === "X") {
      setPlayerScore(playerScore + 1);
    } else if (winner === "O") {
      setComputerScore(computerScore + 1);
    }
  }

  if (full || winner) {
    setGameOver(true);
  }
}, [squares]);

const resetGame = () => {
  setSquares(Array(25).fill(null));
  setGameOver(false);
  setXIsNext(true);
};

const resetScores = () => {
  setPlayerScore(0);
  setComputerScore(0);
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

// ... (your existing code)

return (
  <div
    style={{
      background: "#333",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
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
          backgroundColor: isGameOver ? "#8eff8e" : "#444",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
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
            gridColumn: "span 5",
            color: "#fff",
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
              backgroundColor: isGameOver ? "#8eff8e" : "#666",
              border: "1px solid #ccc",
              fontSize: "24px",
              fontWeight: "bold",
              padding: "20px",
              textAlign: "center",
              width: "60px",
              height: "60px",
              cursor: "pointer",
              transition: "background-color 0.3s ease-in-out",
              color: "#fff",
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
    <div style={{ marginTop: "20px", textAlign: "center", color: "#fff" }}>
      <div>
        <strong>Player Points :</strong> {playerScore}
      </div>
      <div>
        <strong>Computer Points :</strong> {computerScore}
      </div>
    </div>
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        onClick={resetGame}
        style={{
          background: "#5cb85c",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
      <button
        onClick={resetScores}
        style={{
          background: "#d9534f",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Reset Points
      </button>
      {playerScore >= 5 ? <Widget src={`yousouf.near/widget/nft`} /> : ""}
    </div>
  </div>
);
