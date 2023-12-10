const sampleWords = [
  {
    word: "TUKUNYA",
    description: "Abunda ake dafa abinci aciki.",
  },
  {
    word: "KANO",
    description: "Wane birni ne cibiyar kasuwanci a Najeriya.",
  },
  {
    word: "BOS",
    description: "Takaitaccen harafin Blockchain Operating System.",
  },
  {
    word: "ABUJA",
    description: "Ya sunan Babban Birnin Najeriya",
  },
  {
    word: "RAMA",
    description: "Abincin Hausawa na gargajiya da ake ci da karago.",
  },
  {
    word: "LAKIDIRI",
    description: "Menene sunan bucket da hausa.'",
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
        color: "#ffe",
        backgroundColor: chosenLetters.includes(letter) ? "#000" : "#ccc",
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

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#333",
  color: "#fff",
};

const buttonStyles = {
  padding: "12px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#ffe",
  borderRadius: "4px",
  cursor: "pointer",
  // transition: "background-color 0.2s ease-in-out",
};

const letterStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60px",
  height: "60px",
  margin: "0 5px",
  borderRadius: "50%",
  fontSize: "24px",
  fontWeight: "bold",
  backgroundColor: "#ccc",
  color: "#000",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
};

const hintButtonStyles = {
  padding: "12px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
};

return (
  <div style={containerStyles}>
    <div
      style={{
        marginBottom: "20px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#ffe",
      }}
    >
      Points : {score}
    </div>
    <h5 style={{ color: "#ffe" }}>Time Remaining: {countdown} seconds</h5>

    <div
      className="button-section"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        Hints Remaining: {hints}{" "}
        <button
          onClick={hintFunction}
          disabled={hints === 0}
          style={{
            ...hintButtonStyles,
            backgroundColor: hints ? "#000" : "#ccc",
            cursor: hints ? "pointer" : "not-allowed",
          }}
        >
          Get Hint
        </button>
        <button
          onClick={restartGameFunction}
          style={{
            ...buttonStyles,
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#000",
          }}
        >
          Next
        </button>
        <button
          onClick={removeCharacterFunction}
          disabled={!chosenLetters.length}
          style={{
            ...buttonStyles,
            border: "none",
            borderRadius: "8px",
            backgroundColor: chosenLetters.length ? "#000" : "#ccc",
            cursor: chosenLetters.length ? "pointer" : "not-allowed",
          }}
        >
          Remove Letter
        </button>
        {!msg && (
          <button
            onClick={guessFunction}
            disabled={!chosenLetters.length}
            style={{
              ...buttonStyles,
              border: "none",
              borderRadius: "8px",
              backgroundColor: chosenLetters.length ? "#000" : "#ccc",
              cursor: chosenLetters.length ? "pointer" : "not-allowed",
            }}
          >
            Guess
          </button>
        )}
      </div>
    </div>
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
            ...letterStyles,
            opacity: chosenLetters.includes(letter) ? 1 : 0,
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
        color: "#ffe",
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
          color: "#ffe",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <p>{msg}</p>
        {displayWord && <p>Correct word was: {wordData.word}</p>}
      </div>
    )}
    <div
      className="letter-selection"
      style={{
        color: "grey",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "30px",
      }}
    >
      {displayLettersFunction()}
      {score >= 5 ? <Widget src={`yousouf.near/widget/nft`} /> : ""}
    </div>
  </div>
);
