const sampleWords = [
  {
    word: "TUKUNYA",
    description: "Abunda ake dafa abinci aciki.",
  },
  {
    word: "WORLD",
    description: "The planet we live on, which is full of land and water.",
  },
  {
    word: "JAVASCRIPT",
    description:
      "A popular programming language for building interactive websites and provides behavior to applications.",
  },
  {
    word: "REACT",
    description:
      "A JavaScript library in which we have written this project code",
  },
  {
    word: "PROGRAMMING",
    description:
      "The process of developing code to assist computers to perform tasks.",
  },
  {
    word: "GEEKSFORGEEKS",
    description: "An educational website for computer science 'geeks.'",
  },
];

const getRandomWord = () => {
  const randomPlace = Math.floor(Math.random() * sampleWords.length);
  return sampleWords[randomPlace];
};

const [wordData, setWordData] = useState(getRandomWord());
const [msg, setMsg] = useState("");
const [chosenLetters, setChosenLetters] = useState([]);
const [hints, setHints] = useState(3);
const [displayWord, setDisplayWord] = useState(false);
const [gameOver, setGameOver] = useState(false);
const [wrongGuesses, setWrongGuesses] = useState(0);
const [countdown, setCountdown] = useState(60);
const [score, setScore] = useState(0);

useEffect(() => {
  if (wrongGuesses >= 3) {
    setMsg("Game Over! You made too many wrong guesses.");
  }
}, [wrongGuesses]);

useEffect(() => {
  if (countdown > 0) {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  } else {
    setMsg("Game Over! Time's up.");
  }
}, [countdown]);

const letterSelectFunction = (letter) => {
  if (!chosenLetters.includes(letter)) {
    setChosenLetters([...chosenLetters, letter]);
    if (!wordData.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  }
};

const hintFunction = () => {
  if (hints > 0) {
    const hiddenLetterIndex = wordData.word
      .split("")
      .findIndex((letter) => !chosenLetters.includes(letter));
    setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
    setHints(hints - 1);
  }
};

const removeCharacterFunction = () => {
  setChosenLetters(chosenLetters.slice(0, -1));
};

const displayLettersFunction = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return Array.from(letters).map((letter, index) => (
    <button
      key={index}
      onClick={() => letterSelectFunction(letter)}
      disabled={chosenLetters.includes(letter)}
      style={{
        padding: "10px 15px",
        margin: "5px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: chosenLetters.includes(letter) ? "#1976d2" : "#2196f3",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
      }}
    >
      {letter}
    </button>
  ));
};

const checkWordGuessedFunction = () => {
  return wordData.word
    .split("")
    .every((letter) => chosenLetters.includes(letter));
};

const guessFunction = () => {
  if (checkWordGuessedFunction()) {
    setMsg("Congratulations, you get the word correct !   🔥 ");
    setScore(score + 1); // Increase the score
    sleep(2);
    restartGameFunction();
  } else {
    setMsg("You fail !. try again!");
    setDisplayWord(true);
  }
};

const restartGameFunction = () => {
  setWordData(getRandomWord());
  setMsg("");
  setChosenLetters([]);
  setHints(3);
  setDisplayWord(false);
  setGameOver(false);
  setWrongGuesses(0);
  setCountdown(60);
};

const sleep = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
    }}
  >
    <h1
      style={{
        fontSize: "36px",
        marginBottom: "30px",
        color: "rgb(21, 228, 2)",
      }}
    >
      Wasan Kalmomi akan BOS
    </h1>
    <div
      style={{
        marginBottom: "20px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      }}
    >
      Score: {score}
    </div>
    <h5>Time Remaining: {countdown} seconds</h5>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
      }}
    >
      {Array.from(wordData.word).map((letter, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60px",
            height: "60px",
            margin: "0 5px",
            borderRadius: "50%",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#333",
            opacity: chosenLetters.includes(letter) ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          {chosenLetters.includes(letter) ? letter : ""}
        </div>
      ))}
    </div>
    <p
      className="word-description"
      style={{
        fontSize: "18px",
        fontStyle: "bold",
        color: "rgb(0, 0, 0)",
        marginBottom: "20px",
      }}
    >
      Hint: {wordData.description}
    </p>
    {msg && (
      <div
        className="message"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <p>{msg}</p>
        {displayWord && <p>Correct word was: {wordData.word}</p>}
      </div>
    )}

    <div
      className="button-section"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={restartGameFunction}
          style={{
            padding: "12px 20px",
            margin: "0 10px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#f44336",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Next
        </button>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
          }}
        ></div>

        <button
          onClick={removeCharacterFunction}
          disabled={!chosenLetters.length}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: chosenLetters.length ? "#d32f2f" : "#ccc",
            border: "none",
            borderRadius: "4px",
            cursor: chosenLetters.length ? "pointer" : "not-allowed",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Remove Letter
        </button>
      </div>
      <div
        className="letter-selection"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {displayLettersFunction()}
      </div>
      <div
        style={{
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Hints Remaining: {hints}{" "}
        <button
          onClick={hintFunction}
          disabled={hints === 0}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: hints ? "#4caf50" : "#ccc",
            border: "none",
            borderRadius: "4px",
            cursor: hints ? "pointer" : "not-allowed",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Get Hint
        </button>
      </div>
      {!msg && (
        <button
          onClick={guessFunction}
          disabled={!chosenLetters.length}
          style={{
            padding: "12px 30px",
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: chosenLetters.length ? "#e64a19" : "#ccc",
            border: "none",
            borderRadius: "4px",
            cursor: chosenLetters.length ? "pointer" : "not-allowed",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Guess
        </button>
      )}
    </div>
  </div>
);
