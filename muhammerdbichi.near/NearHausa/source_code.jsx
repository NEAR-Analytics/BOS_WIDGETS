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

const [score, setScore] = useState(0);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [showResults, setShowResults] = useState(false);
if (
  Social.keys(`${context.accountId}.near/graph/follow/muhammerdbichi.near`) ===
  true
) {
  questions = true;
}
const questions = [
  {
    text: "Why is NearHausa?",
    options: [
      { id: 0, text: "Near Community For kano based", isCorrect: false },
      { id: 1, text: "Near Community For Hausa People", isCorrect: true },
      { id: 2, text: "Near Community For Northern Nigeria", isCorrect: false },
      { id: 3, text: "To Teach Crypto In Hausa", isCorrect: false },
    ],
  },
  {
    text: "Who is NearHuasa Lead?",
    options: [
      { id: 0, text: "Engr. Bakaka", isCorrect: true },
      { id: 1, text: "Aminu Bin", isCorrect: false },
      { id: 2, text: "Alexander Skidanov", isCorrect: false },
      { id: 3, text: "Elon Musk", isCorrect: false },
    ],
  },
  {
    text: "Which technology is the NEAR Protocol built upon?",
    options: [
      { id: 0, text: "Proof of Work", isCorrect: false },
      { id: 1, text: "Proof of Stake", isCorrect: true },
      { id: 2, text: "Delegated Proof of Stake", isCorrect: false },
      { id: 3, text: "Proof of Authority", isCorrect: false },
    ],
  },
  {
    text: "What is the name of the consensus algorithm used by the NEAR Protocol?",
    options: [
      { id: 0, text: "Proof of Stake (PoS)", isCorrect: false },
      { id: 1, text: "Delegated Proof of Stake (DPOS)", isCorrect: false },
      { id: 2, text: "Nightshade", isCorrect: true },
      { id: 3, text: "Snowflake to Avalanche", isCorrect: false },
    ],
  },
  {
    text: "What language do developers need to know to write smart contracts on the NEAR Protocol?",
    options: [
      { id: 0, text: "Python", isCorrect: false },
      { id: 1, text: "C++", isCorrect: false },
      { id: 2, text: "Rust", isCorrect: true },
      { id: 3, text: "Java", isCorrect: false },
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
  <div className="App">
    <H1>Quiz {titlegame}</H1>
    <H2>Score: {score}</H2>

    {showResults ? (
      <div className="final-results">
        <H1>Final Results</H1>
        <H2>
          {score} out of {questions.length} correct - (
          {(score / questions.length) * 100}%)
        </H2>
        <Button onClick={() => restartGame()}>Restart game</Button>
      </div>
    ) : (
      <Question className="question-card">
        <h2>
          Question: {currentQuestion + 1} out of {questions.length}
        </h2>
        <h3 className="question-text">{questions[currentQuestion].text}</h3>

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
  </div>
);
