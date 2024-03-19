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
    <h2>Камінь, Бумага, Ножиці</h2>
    <div style={{ marginBottom: "20px" }}>
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => handleChoice(choice)}
          style={{ margin: "5px" }}
        >
          {choice}
        </button>
      ))}
    </div>
    <div>
      <p>
        Ваш вибір:<b> {userChoice}</b>
      </p>
      <p>
        "Вибір ком'ютора":<b> {computerChoice}</b>
      </p>
      <p>
        Результат:<b> {result}</b>
      </p>
    </div>
  </div>
);
