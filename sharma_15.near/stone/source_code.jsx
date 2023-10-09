// You can import your CSS file here
const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  background-color: coral;
  color: #120f0f;
`;

const H1 = styled.h1`
  color: #333;
`;

const H2 = styled.h2`
  color: darkred;
`;

const Game = styled.div`
  margin: 20px;
  display: flex;
`;

const Result = styled.div`
  margin: 20px;
  font-size: 24px;
  color: rgb(41, 65, 5);
`;

const Choice = styled.p`
  font-size: 18px;
`;

const [computerChoice, setComputerChoice] = useState("");
const [result, setResult] = useState("");

// Define the playRound function
const playRound = (playerChoice) => {
  // Generate a random computer choice (rock, paper, or scissors)
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomIndex];

  // Determine the winner
  let roundResult = "";
  if (playerChoice === computerChoice) {
    roundResult = "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    roundResult = "You win!";
  } else {
    roundResult = "Computer wins!";
  }

  // Update the state with the results
  setComputerChoice(computerChoice);
  setResult(roundResult);
};

const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

if (!greeting || context.loading) {
  return "Loading...";
}

// Use and manipulate state
State.init({ greeting });

const onInputChange = ({ target }) => {
  State.update({ greeting: target.value });
};

const onBtnClick = () => {
  Near.call(contract, "set_greeting", {
    greeting: state.greeting,
  });
};

// Define components
const greetingForm = (
  <>
    <div class="border border-black p-3">
      <label>If you are winner enter your name</label>
      <input placeholder="Winner name" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Save
      </button>
    </div>
  </>
);

const notLoggedInWarning = (
  <p class="text-center py-2"> Login to change the greeting </p>
);

return (
  <div>
    <H1>
      Rock, Paper, Scissors(with the help of FDAO webinar conducted in GJUST)
    </H1>
    <Game>
      <div id="player">
        <H2>You</H2>
        <Button onClick={() => playRound("rock")}>Rock</Button>
        <Button onClick={() => playRound("paper")}>Paper</Button>
        <Button onClick={() => playRound("scissors")}>Scissors</Button>
      </div>
      <div id="computer">
        <H2>Computer</H2>
        <Choice>Computer's Choice: {computerChoice || "?"}</Choice>
      </div>
    </Game>
    <Result>
      <p>{result}</p>
    </Result>

    {context.accountId ? greetingForm : notLoggedInWarning}

    <div class="container border border-info p-3">
      <h3 class="text-center">
        The winner name is
        <span class="text-decoration-underline"> {state.greeting} </span>
      </h3>
    </div>
  </div>
);
