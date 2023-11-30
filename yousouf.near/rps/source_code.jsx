const choices = ["rock", "paper", "scissors"];

// Set initial state using the useState hook
const [userChoice, setUserChoice] = useState(null);
const [computerChoice, setComputerChoice] = useState(null);
const [result, setResult] = useState(null);

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
  } else {
    setResult("Computer wins!");
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
      <p>Your Choice: {userChoice}</p>
      <p>Computer's Choice: {computerChoice}</p>
      <p style={resultStyles}>Result: {result}</p>
    </div>
    <div>
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
