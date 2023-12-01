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

// Inline CSS for styling
const containerStyles = {
  backgroundColor: "#f2f2f2",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const buttonStyles = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  margin: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

const resultStyles = {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "20px",
};

// Render the component
return (
  <div style={containerStyles}>
    <h1>Rock, Paper, Scissors</h1>
    <div>
      <h5>Your Choice : {userChoice}</h5>
      <h5>Computer's Choice : {computerChoice}</h5>
      <p style={resultStyles}>Result: {result}</p>
    </div>
    <div>
      <h5>Player Score: {playerScore}</h5>
      <h5>Computer Score: {computerScore}</h5>
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
  </div>
);
