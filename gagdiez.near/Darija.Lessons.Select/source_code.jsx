if (context.loading) {
  return <div>Loading...</div>;
}

const knowledge = props.knowledge;

if (knowledge.length < 4) return "Add more than 4 options";

const [score, setScore] = useState(0);
const [possibleOptions, setPossibleOptions] = useState(knowledge.slice(0, 4));

const [idx, setIdx] = useState(0);

const [wordEvaluating, setEvaluating] = useState(knowledge[0]);
const [wordSelected, setSelected] = useState(null);
const [check, setCheck] = useState("");
const [step, setStep] = useState("verify");
const [toTestAgain, setToTest] = useState([]);
const [showFinalScore, setShowFinalScore] = useState(false);
const [language, setLanguage] = useState("darija");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

const createOptions = (answer) => {
  // the answer is one of the options
  let options = [answer];

  // add 3 random options
  while (options.length < 4) {
    const rIdx = Math.floor(Math.random() * knowledge.length);
    if (!options.some((e, i, a) => e[language] === knowledge[rIdx][language])) {
      options.push(knowledge[rIdx]);
    }
  }

  // store a shuffled version
  const shuffled = shuffle(options);
  setPossibleOptions(shuffled);
};

const passNext = () => {
  const id = idx + 1;
  setIdx(id);

  if (id >= knowledge.length && toTestAgain.length === 0) {
    return setShowFinalScore(true);
  }

  let answer;

  if (id < knowledge.length) {
    answer = knowledge[id];
  } else {
    answer = toTestAgain.pop();
    setToTest(toTestAgain);
  }

  setEvaluating(answer);
  setSelected(null);
  setStep("verify");
  setCheck("");
  setLanguage(otherLanguage(language));
  createOptions(answer);
};

const checkAnswer = () => {
  if(!wordSelected) return;

  if (wordSelected[language] === knowledge[idx][language]) {
    setScore(score + 1);
    setCheck("correct");
  } else {
    setCheck("wrong");
    toTestAgain.push(knowledge[idx]);
    setToTest(toTestAgain);
  }

  setStep("next");
};

const Restart = () => {
  setIdx(0);
  setScore(0);
  setToTest([]);
  setEvaluating(knowledge[0]);
  setSelected(null);
  setStep("verify");
  setCheck("");
  createOptions(knowledge[0]);
  setShowFinalScore(false);
};

const Selection = styled.div`
  &:hover {
    cursor: pointer;
    background-color: rgb(216 244 255);
  }

  &.selected {
    background-color: rgb(216 244 255);
  }

  &.correct {
    background-color: rgb(216 255 216);
  }

  &.wrong {
    background-color: rgb(255 216 216);
  }
`;

if (showFinalScore) {
  return (
    <div className="container">
      <div class="row">
        <div class="col-6">
          Final Score: {score}
          <button onClick={Restart}> Restart </button>
        </div>
      </div>
    </div>
  );
}

const step2Label = { verify: "Verificar", next: "Siguiente" };
const step2Fc = { verify: checkAnswer, next: passNext };
const otherLanguage = (L) => (L === "darija" ? "spanish" : "darija");

return (
  <>
    <div className="container p-3">
      <div className="text-right">Score: {score}</div>
      <h5 className="text-center"> {wordEvaluating[language]} </h5>

      <div class="row pt-2">
        {possibleOptions.map((opt) => (
          <div className="col-sm-12 col-md-6 p-2">
            <Selection
              className={`card text-center ${
                opt[language] === wordSelected[language] && "selected"
              } ${opt[language] === wordSelected[language] && check}`}
              onClick={() => {step === "verify" && setSelected(opt)}}
            >
              <h5 className="card-title pt-2">
                {" "}
                {opt.emoji} {opt[otherLanguage(language)]}{" "}
              </h5>
            </Selection>
          </div>
        ))}
      </div>

      <button onClick={step2Fc[step]}> {step2Label[step]} </button>
    </div>
  </>
);
