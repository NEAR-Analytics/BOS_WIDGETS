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

const [squares, setSquares] = useState(Array(9).fill(null));
const [xIsNext, setXIsNext] = useState(true);

const handleClick = (index) => {
  if (squares[index] || calculateWinner(squares) || isBoardFull(squares)) {
    return;
  }

  const newSquares = [...squares];
  newSquares[index] = xIsNext ? "X" : "O";
  setSquares(newSquares);
  setXIsNext(!xIsNext);
};

const winner = calculateWinner(squares);
const isFull = isBoardFull(squares);

let status;
if (winner) {
  status = `Winner: ${winner === "X" ? "PLAYER 1" : "PLAYER 2"}`;
} else if (isFull) {
  status = "It's a draw!";
} else {
  status = `Next player: ${xIsNext ? "PLAYER 1" : "PLAYER 2"}`;
}

return (
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
        backgroundColor: winner ? "#8eff8e" : "#fff",
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
        style={{ fontSize: "24px", marginBottom: "20px", gridColumn: "span 3" }}
      >
        {status}
      </div>

      {squares.map((value, index) => (
        <button
          key={index}
          className="square"
          onClick={() => handleClick(index)}
          style={{
            backgroundColor: winner ? "#8eff8e" : "#fff",
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
);
