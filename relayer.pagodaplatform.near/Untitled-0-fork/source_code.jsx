const calculateResult = (
  userChoice,
  computerChoice,
  setResult,
  setFlashColor
) => {
  let result;
  if (userChoice === computerChoice) {
    result = "Нічия";
  } else if (
    (userChoice === "Камінь" && computerChoice === "Ножиці") ||
    (userChoice === "Бумага" && computerChoice === "Камінь") ||
    (userChoice === "Ножиці" && computerChoice === "Бумага")
  ) {
    result = "Ви виграли";
  } else {
    result = "Виграв комп'ютер";
  }
  const flashColor =
    result === "Виграв комп'ютер"
      ? "#FF6347"
      : result === "Ви виграли"
      ? "#4CAF50"
      : result === "Нічия"
      ? "#FFD700"
      : null;
  setResult(result);
  setFlashColor(flashColor);
};

const [userChoice, setUserChoice] = useState(null);
const [computerChoice, setComputerChoice] = useState(null);
const [result, setResult] = useState(null);
const [flashColor, setFlashColor] = useState(null);
const choices = ["Камінь", "Бумага", "Ножиці"];

useEffect(() => {
  if (userChoice !== null && computerChoice !== null) {
    calculateResult(userChoice, computerChoice, setResult, setFlashColor);
  }
}, [userChoice, computerChoice]);

const computerTurn = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  setComputerChoice(choices[randomIndex]);
};

const handleChoice = (choice) => {
  setUserChoice(choice);
  computerTurn();
};

return (
  <div
    style={{
      backgroundColor: flashColor ? flashColor : "#CDEAC0",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100vw",
      minHeight: "100vh", // Замінено height на minHeight, щоб контент завжди був видимим навіть при невеликому об'ємі
      paddingTop: "20px", // Доданий відступ зверху
      transition: "background-color 0.3s ease",
    }}
  >
    <div
      style={{
        border: "3px solid #4CAF50",
        backgroundColor: "#CDEAC0",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Камінь, Ножиці, Бумага
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {choice}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>
          Ваш вибір: <b>{userChoice}</b>
        </p>
        <p>
          Вибір комп'ютера: <b>{computerChoice}</b>
        </p>
        <div
          style={{
            marginTop: "10px",
            backgroundColor: flashColor ? flashColor : "transparent",
            padding: "5px 10px",
            borderRadius: "5px",
            display: "inline-block",
            border: "3px solid #4CAF50",
            color: "white",
            transition: "background-color 0.3s ease",
          }}
        >
          Результат: <b>{result}</b>
        </div>
      </div>
    </div>
    {result && (
      <span style={{ marginTop: "10px" }}>
        {" "}
        {/* Доданий marginTop для відступу зверху */}
        <a
          href="https://twitter.com/NEARProtocol"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <img
            src="https://img.icons8.com/color/48/000000/twitter--v2.png"
            alt="Twitter"
            style={{
              cursor: "pointer",
              marginBottom: "10px",
            }}
          />
        </a>
        <a
          href="https://t.me/NearSocial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <img
            src="https://img.icons8.com/color/48/000000/telegram-app--v5.png"
            alt="Telegram"
            style={{
              cursor: "pointer",
              marginBottom: "10px",
            }}
          />
        </a>
        <a
          href="https://near.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block" }}
        >
          <img
            src="https://near.org/_next/static/media/near-logo.1416a213.svg"
            alt="Near"
            style={{
              cursor: "pointer",
              marginBottom: "10px",
            }}
          />
        </a>
      </span>
    )}
  </div>
);
