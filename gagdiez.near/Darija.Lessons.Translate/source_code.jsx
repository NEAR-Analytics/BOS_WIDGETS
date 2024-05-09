const { shuffle, SelectionStyle: Selected } = VM.require('gagdiez.near/widget/Darija.Lessons.Utils');

if (context.loading) return <div>Loading...</div>;

const knowledge = props.knowledge;
const native_lang = "spanish";
const learn_lang = "darija";
const max_lives = 4;

const [idx, setIdx] = useState(0);
const [lives, setLives] = useState(max_lives);
const [wordEvaluating, setEvaluating] = useState(knowledge[0]);
const [wordSelected, setSelected] = useState([]);
const [result, setResult] = useState("secondary");
const [step, setStep] = useState("verify");
const [toTestAgain, setToTest] = useState([]);
const [showFinalScore, setShowFinalScore] = useState(false);
const [possibleOptions, setPossibleOptions] = useState(knowledge[1][learn_lang].split(" ").concat(knowledge[0][learn_lang].split(" ")));

const createOptions = (answer) => {
  if(!answer) return

  // chop the answer into words
  let words = answer[learn_lang].split(" ");
  const length = words.length;

  while (words.length < length + 4) {
    const rIdx = Math.floor(Math.random() * knowledge.length);
    const options = knowledge[rIdx][learn_lang].split(" ");

    for (let i = 0; i < options.length; i++) {
      if (!words.includes(options[i])) {
        words.push(options[i]);
        continue;
      }
    }
  }

  // store a shuffled version
  setPossibleOptions(shuffle(words));
};

const passNext = () => {
  const id = idx + 1;
  let answer = (id < knowledge.length)? knowledge[id] : toTestAgain.pop();

  if (result === "danger") setLives(lives - 1);

  setIdx(id);
  setSelected([]);
  setStep("verify");
  setEvaluating(answer);
  setResult("secondary");
  setToTest(toTestAgain);
  createOptions(answer);
};

const checkAnswer = () => {
  if (!wordSelected) return;

  const fullSentence = wordSelected.join(" ")
  const rightAnswer = wordEvaluating[learn_lang]

  if (fullSentence === rightAnswer) {
    setResult("success");
  } else {
    setResult("danger");
    toTestAgain.push(wordEvaluating);
    setToTest(toTestAgain);
  }

  setStep("next");
};

const Restart = () => {
  setIdx(0);
  setLives(4);
  setEvaluating(knowledge[0]);
  setSelected([]);
  setResult("secondary");
  setStep("verify");
  setToTest([]);
  setPossibleOptions(knowledge[0][learn_lang].split(" "));
};

if (lives === 0) {
  return (
    <div className="container text-center">
      <h1 className="py-3"> Ya no tienes vidas! </h1>
      <button onClick={Restart}> Restart </button>
    </div>
  );
}

if (wordEvaluating === undefined) {
  return (
    <div className="container text-center">
      <h1 className="py-3"> ¡Ganaste! </h1>
      <button onClick={Restart}> Restart </button>
    </div>
  );
}

const step2Label = { verify: "Verificar", next: "Siguiente" };
const step2Fc = { verify: checkAnswer, next: passNext };

const selectOption = (opt) => {
  if (step !== "verify") return
  if (wordSelected.includes(opt)) return

  const selected = wordSelected
  selected.push(opt)
  setSelected(selected)
}

function removeElement(array, elem) {
  const index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array
}

return (
  <>
    <div className="container p-3">
      <div className="text-right"> Vidas:
        {Array.from(Array(lives).keys()).map((i) => (
          <span className="me-1">❤️</span>
        ))}{Array.from(Array(max_lives - lives).keys()).map((i) => (
          <span className="me-1">🩶</span>
        ))}
      </div>

      <h6 className="text-center mt-3 mb-2"> {wordEvaluating[native_lang]} </h6>

      <div style={{ minHeight: "3.5rem", border: "1px solid #ccc", borderRadius: ".5rem" }}>
        <div className="text-center p-1">
          {wordSelected.map((wrd) =>
            <Selected
              className={`btn btn-outline-secondary text-center m-1 ${result}`}
              onClick={() => setSelected(removeElement(wordSelected, wrd))}
            >
              {wrd}
            </Selected>
          )}
        </div>
      </div>

      <div class="pt-2 text-center w-75 mx-auto mt-2">
        {possibleOptions.map(opt => (
          <button
            className={`btn btn-outline-info me-1 mt-1 mb-2`}
            onClick={() => { selectOption(opt) }}
          >
            {opt}
          </button>
        ))}
      </div>

      <button className={`mt-3 btn btn-${result}`} onClick={step2Fc[step]}> {step2Label[step]} </button>
    </div>
  </>
);
