const [userChoice, setUserChoice] = useState(null);
const [computerChoice, setComputerChoice] = useState(null);
const [result, setResult] = useState(null);

const choices = ["Камінь", "Бумага", "Ножиці"];

const computerTurn = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  setComputerChoice(choices[randomIndex]);
};

const handleChoice = (choice) => {
  setUserChoice(choice);
  computerTurn();
  calculateResult(choice, computerChoice);
};

const calculateResult = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    setResult("Нічия");
  } else if (
    (userChoice === "Камінь" && computerChoice === "Ножиці") ||
    (userChoice === "Бумага" && computerChoice === "Камінь") ||
    (userChoice === "Ножиці" && computerChoice === "Бумага")
  ) {
    setResult("Ви виграли");
  } else {
    setResult("Виграв комп'ютер");
  }
};

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <h2>Rock, Paper, Scissors</h2>
    <div>
      {choices.map((choice) => (
        <button key={choice} onClick={() => handleChoice(choice)}>
          {choice}
        </button>
      ))}
    </div>
    <div>
      <p>Ваш вибір: {userChoice}</p>
      <p>"Вибір ком'ютора": {computerChoice}</p>
      <p>Результат: {result}</p>
    </div>
  </div>
);
