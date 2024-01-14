const { shuffle, SelectionStyle: Selection } = VM.require('gagdiez.near/widget/Darija.Lessons.Utils');

if (context.loading) return <div>Loading...</div>;

const knowledge = props.knowledge;
const native_lang = "spanish";
const learn_lang = "darija";
const max_lives = 4;

if (knowledge.length < 4) return "Add more than 4 options";

const [idx, setIdx] = useState(0);
const [lives, setLives] = useState(max_lives);
const [language, setLanguage] = useState(learn_lang);
const [possibleOptions, setPossibleOptions] = useState(knowledge.slice(0, 4));
const [wordEvaluating, setEvaluating] = useState(knowledge[0]);
const [wordSelected, setSelected] = useState(null);
const [result, setResult] = useState("secondary");
const [step, setStep] = useState("verify");
const [toTestAgain, setToTest] = useState([]);

const createOptions = (answer) => {
  if(!answer) return;

  // the answer is one of the options
  let options = [answer];

  // shuffle all the options that are not the answer
  const no_answer = shuffle(knowledge.filter( e => e[learn_lang] !== answer[learn_lang]));

  // pick 3
  options.push(...no_answer.slice(0, 3));

  // shuffle again
  setPossibleOptions(shuffle(options));
};

const passNext = () => {
  const id = idx + 1;

  let answer = (id < knowledge.length)? knowledge[id] : toTestAgain.pop();

  (result === "danger") && setLives(lives - 1);

  setIdx(id);
  setEvaluating(answer);
  setToTest(toTestAgain);
  setSelected(null);
  setStep("verify");
  setResult("secondary");
  setLanguage(otherLanguage(language));
  createOptions(answer);
};

const checkAnswer = () => {
  if (!wordSelected) return;

  if (wordSelected[language] === wordEvaluating[language]) {
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
  setLives(max_lives);
  setToTest([]);
  setStep("verify");
  setLanguage(learn_lang);
  setPossibleOptions(knowledge.slice(0, 4));
  setEvaluating(knowledge[0]);
  setSelected(null);
  setResult("secondary");
  createOptions(knowledge[0]);
};

if (lives === 0) {
  return (
    <div className="container text-center">
      <h3>Game Over</h3>
      <button className="btn btn-primary" onClick={Restart}>
        Restart
      </button>
    </div>
  );
}

if (wordEvaluating === undefined) {
  return (
    <div className="container text-center">
      <h3>¡Ganaste!</h3>
      <button className="btn btn-primary" onClick={Restart}>
        Restart
      </button>
    </div>
  );
}

const step2Label = { verify: "Verificar", next: "Siguiente" };
const step2Fc = { verify: checkAnswer, next: passNext };
const otherLanguage = L => L === native_lang ? learn_lang : native_lang;

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

      <h5 className="text-center pt-3"> {wordEvaluating[language]} </h5>

      <div class="row pt-1">
        {possibleOptions.map((opt) => (
          <div className="col-sm-12 col-md-6 p-2">
            <Selection
              className={`card text-center ${opt[language] === wordSelected[language] && "selected"
                } ${opt[language] === wordSelected[language] && result}`}
              onClick={() => { step === "verify" && setSelected(opt) }}
            >
              <h6 className="card-title pt-2 px-2">
                {opt.emoji} {opt[otherLanguage(language)]}
              </h6>
            </Selection>
          </div>
        ))}
      </div>

      <button class={`mt-2 btn btn-${result}`} onClick={step2Fc[step]}> {step2Label[step]} </button>
    </div>
  </>
);
