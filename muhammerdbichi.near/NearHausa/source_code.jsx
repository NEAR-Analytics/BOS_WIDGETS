const Button = styled.button`
  width: 100%;
  margin: 5px 0;
  padding: 20px;
  background-color: #0a1929ff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #98abab;
  }
`;

const account = context.accountId;
const [score, setScore] = useState(0);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [showResults, setShowResults] = useState(false);
const [claimed, setClaimed] = useState(false);

const congratulateUser = () => {
  if (score >= 4) {
    // User scored more than 80%, reward with 0.002 near token
    alert(
      "Congratulations! You scored more than 80%! You have been rewarded with 0.002 NEAR tokens."
    );
    setClaimed(true);
  } else {
    alert("Keep trying! You need to score more than 80% to claim NEAR tokens.");
  }
};

const claimReward = () => {
  if (score >= 4) {
    setClaimed(true);
  }
};

const questions = [
  {
    text: "Meyasa Aka Samar Da NearHausa?",
    options: [
      { id: 0, text: "Domin Yan Kano Kadai", isCorrect: false },
      { id: 1, text: "Domin Alumar Hausa", isCorrect: true },
      { id: 2, text: "Domin Yan Africa", isCorrect: false },
      {
        id: 3,
        text: "Domin Koyar da crypto a harshen Hausa",
        isCorrect: false,
      },
    ],
  },
  {
    text: "Wane ne shugan NearHuasa?",
    options: [
      { id: 0, text: "Engr. Bakaka", isCorrect: true },
      { id: 1, text: "Aminu Bin", isCorrect: false },
      { id: 2, text: "Alexander Skidanov", isCorrect: false },
      { id: 3, text: "Elon Musk", isCorrect: false },
    ],
  },
  {
    text: "Yaushe Aka Samar Da NearHuasa?",
    options: [
      { id: 0, text: "2023", isCorrect: false },
      { id: 1, text: "2022", isCorrect: true },
      { id: 2, text: "2021", isCorrect: false },
      { id: 3, text: "2o22", isCorrect: false },
    ],
  },
  {
    text: "Akan wanne wanne yarjejeniya aka yi NEAR Blockchain?",
    options: [
      { id: 0, text: "Proof of Stake (PoS)", isCorrect: false },
      { id: 1, text: "Delegated Proof of Stake (DPOS)", isCorrect: false },
      { id: 2, text: "Nightshade", isCorrect: true },
      { id: 3, text: "Snowflake to Avalanche", isCorrect: false },
    ],
  },
  {
    text: "Wanne babban Mukami Dan NearHausa Yataba Rikewa?",
    options: [
      { id: 0, text: "NEARHausa Lead", isCorrect: false },
      { id: 1, text: "Co-Founder", isCorrect: false },
      { id: 2, text: "Grant Manager", isCorrect: true },
      { id: 3, text: "CEO", isCorrect: false },
    ],
  },
];

const optionClicked = (isCorrect) => {
  if (isCorrect) {
    setScore(score + 1);
  }

  if (currentQuestion + 1 < questions.length) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    setShowResults(true);
  }
};

const restartGame = () => {
  setScore(0);
  setCurrentQuestion(0);
  setShowResults(false);
};

const Question = styled.div`
  margin: 0 auto;

  width: 80%; 
  height: auto;

  background-color: black;
  padding: 16px;
  border-radius: 16px;
  color: white;
`;

const H1 = styled.h1`
  text-align: center;
`;
const H2 = styled.h2`
  text-align: center;
`;

let titlegame = props.titlegame || "Near Hausa Quiz";

return (
  <>
    <div className="App">
      {!account ? (
        <div>
          Mungano cewa kodai baka da wallet na Near ko kuma ba baka shiga wallet
          din ka ba
          <a href="https://wallet.near.org/">
            {" "}
            <button>Create / Connect Wallet</button>
          </a>
        </div>
      ) : (
        <>
          <H1>{titlegame}</H1>
          <H2>Maki: {score} </H2>

          {showResults ? (
            <div className="final-results">
              <H1>Sakamakon Karshe</H1>
              <H2>
                {score} Acikin {questions.length} correct - (
                {(score / questions.length) * 100}%)
                {/* for above 80% claim token */}
                {score >= 4 && !claimed && (
                  <>
                    <h3>Muna tayaka murna kaci jarabawa, kasamu 0.002 Near</h3>
                    <button onClick={claimReward}>
                      Claim Your NEAR Tokens
                    </button>
                  </>
                )}
                {/* Display claimed message if user has claimed */}
                {claimed && <p>NEAR Tokens Claimed!</p>}
                {score < 4 && !claimed && (
                  <p className="text-red">
                    Kasamu maki kasada 4 don haka baka da lada. Sake Gwadawa!
                  </p>
                )}
              </H2>

              <Button onClick={() => restartGame()}>Restart Quiz</Button>
            </div>
          ) : (
            <Question className="question-card">
              <h2>
                Tambaya: {currentQuestion + 1} Acikin {questions.length}
              </h2>
              <h3 className="question-text">
                {questions[currentQuestion].text}
              </h3>

              <div>
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => optionClicked(option.isCorrect)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </Question>
          )}
        </>
      )}
    </div>
  </>
);
