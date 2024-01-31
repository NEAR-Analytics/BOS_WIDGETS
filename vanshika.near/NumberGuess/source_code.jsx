const [currentNumber, setCurrentNumber] = useState(null);
const [bet, setBet] = useState(null);
const [result, setResult] = useState(null);

const handleBet = (selectedBet) => {
  const randomNumber = Math.floor(Math.random() * 13) + 1;
  setBet(selectedBet);
  setCurrentNumber(randomNumber);
  checkResult(selectedBet, randomNumber);
};

const checkResult = (selectedBet, randomNumber) => {
  const isWin =
    (selectedBet === "below" && randomNumber < 7) ||
    (selectedBet === "seven" && randomNumber === 7) ||
    (selectedBet === "above" && randomNumber > 7);

  setResult(isWin ? "win" : "lose");
};

const compareNumberToSeven = () => {
  if (currentNumber < 7) {
    return "Smaller than 7";
  } else if (currentNumber === 7) {
    return "Equal to 7";
  } else {
    return "Greater than 7";
  }
};

return (
  <div
    style={{
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    }}
  >
    <div style={{ backgroundColor: "#FFA500", padding: "10px" }}>
      <img
        src="https://i.ibb.co/DgRqyWt/Screenshot-2024-01-27-213414.png"
        alt="Logo"
        style={{ width: "100px", height: "auto" }}
      />
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#fff" }}>
        Number Guessing Game
      </h1>
    </div>

    <div>
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          transition: "background-color 0.3s",
        }}
        onClick={() => handleBet("below")}
      >
        Below 7
      </button>
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#FFA500",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          transition: "background-color 0.3s",
        }}
        onClick={() => handleBet("seven")}
      >
        7
      </button>
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#2ecc71",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          transition: "background-color 0.3s",
        }}
        onClick={() => handleBet("above")}
      >
        Above 7
      </button>
    </div>

    {result && (
      <div style={{ marginTop: "20px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            color: result === "win" ? "#FFA500" : "#e74c3c",
            marginBottom: "10px",
          }}
        >
          {result === "win" ? "You Win!" : "You Lose!"}
        </h2>
        <p>{compareNumberToSeven()}</p>
        <p style={{ color: "#2ecc71" }}>
          Newly Generated Number: {currentNumber}
        </p>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            transition: "background-color 0.3s",
          }}
          onClick={() => {
            setCurrentNumber(null);
            setResult(null);
          }}
        >
          Play Again
        </button>
      </div>
    )}
  </div>
);
