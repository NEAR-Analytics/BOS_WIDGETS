const choices = ["rock", "paper", "scissors"];

// Set initial state using the useState hook
const [userChoice, setUserChoice] = useState(null);
const [computerChoice, setComputerChoice] = useState(null);
const [result, setResult] = useState(null);
const [playerScore, setPlayerScore] = useState(0);
const [computerScore, setComputerScore] = useState(0);

// Function to handle user choice
const handleUserChoice = (choice) => {
  const computerRandomChoice =
    choices[Math.floor(Math.random() * choices.length)];

  setUserChoice(choice);
  setComputerChoice(computerRandomChoice);

  // Determine the winner
  if (choice === computerRandomChoice) {
    setResult("It's a tie!");
  } else if (
    (choice === "rock" && computerRandomChoice === "scissors") ||
    (choice === "paper" && computerRandomChoice === "rock") ||
    (choice === "scissors" && computerRandomChoice === "paper")
  ) {
    setResult("You win!");
    setPlayerScore((prevScore) => prevScore + 1);
  } else {
    setResult("Computer wins!");
    setComputerScore((prevScore) => prevScore + 1);
  }
};

const containerStyles = {
  backgroundColor: "rgba(51, 51, 51, 0.5)",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  color: "#ffe",
};

const buttonStyles = {
  backgroundColor: "grey",
  color: "#ffe",
  padding: "10px 20px",
  margin: "5px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  transition: "background-color 0.3s ease-in-out",
};

const resultStyles = {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "20px",
};

return (
  <div style={containerStyles}>
    <h1 style={{ marginBottom: "20px" }}>Rock, Paper, Scissors</h1>

    <hr />
    <div>
      <h5>Your Choice : {userChoice}</h5>
      <h5>Computer's Choice : {computerChoice}</h5>
      <br />
      <hr />
      <p style={resultStyles}>Result {result}</p>
    </div>
    <div style={{ marginTop: "20px" }}>
      <h5>Player Points : {playerScore}</h5>
      <h5>Computer Points : {computerScore}</h5>
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => handleUserChoice(choice)}
          style={buttonStyles}
        >
          {choice}
        </button>
      ))}
    </div>
    {playerScore >= 5 ? <Widget src={`yousouf.near/widget/nft`} /> : ""}
  </div>
);
