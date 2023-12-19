if (context.loading) {
  return <div>Loading...</div>;
}

let knowledge = [
  {
    darija: "baba",
    spanish: "papa",
    emoji: "👨🏽",
  },
  {
    darija: "mama",
    spanish: "mama",
    emoji: "👩🏽",
  },
  {
    darija: "ukht",
    spanish: "hermana",
    emoji: "👭🏽",
  },
  {
    darija: "khu",
    spanish: "hermano",
    emoji: "👬🏽",
  },
  {
    darija: "bnt",
    spanish: "hija",
    emoji: "👧🏽",
  },
  {
    darija: "wld",
    spanish: "hijo",
    emoji: "👦🏽",
  },
  {
    darija: "mra",
    spanish: "esposa",
    emoji: "👰🏽",
  },
  {
    darija: "rajl",
    spanish: "esposo",
    emoji: "🤵🏽",
  },
  {
    darija: "nsib",
    spanish: "cuñado",
    emoji: "👨🏽",
  },
  {
    darija: "nsiba",
    spanish: "cuñada",
    emoji: "👩🏽",
  },
  {
    darija: "shix",
    spanish: "suegro",
    emoji: "👴🏼",
  },
  {
    darija: "3guza",
    spanish: "suegra",
    emoji: "👵🏽",
  },
  {
    darija: "3rusa",
    spanish: "nuera",
    emoji: "👩🏽",
  },
  {
    darija: "jdd",
    spanish: "abuelo",
    emoji: "👴🏼",
  },
  {
    darija: "jdda",
    spanish: "abuela",
    emoji: "👵🏽",
  },
  {
    darija: "hafid",
    spanish: "nieto",
    emoji: "👶🏽",
  },
  {
    darija: "hafidt",
    spanish: "nieta",
    emoji: "👶🏽",
  },
  {
    darija: "3mm",
    spanish: "tio (paterno)",
    emoji: "👨🏽",
  },
  {
    darija: "3mma",
    spanish: "tia (paterna)",
    emoji: "👩🏽",
  },
  {
    darija: "khal",
    spanish: "tio (materno)",
    emoji: "👨🏽",
  },
  {
    darija: "khala",
    spanish: "tia (materna)",
    emoji: "👩🏽",
  },
  {
    darija: "bnt ukht",
    spanish: "sobrina (hermana)",
    emoji: "👧🏽",
  },
  {
    darija: "wld ukht",
    spanish: "sobrino (hermana)",
    emoji: "👦🏽",
  },
  {
    darija: "bnt khu",
    spanish: "sobrina (hermano)",
    emoji: "👧🏽",
  },
  {
    darija: "wld khu",
    spanish: "sobrino (hermano)",
    emoji: "👦🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "wld 3mmi",
    spanish: "primo (tio paterno)",
    emoji: "👦🏽",
  },
];

if (knowledge.length < 4) return "Add more than 4 options";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

const [score, setScore] = useState(0);
const [possibleOptions, setPossibleOptions] = useState(knowledge.slice(0, 4));

const [idx, setIdx] = useState(0);

const [wordEvaluating, setEvaluating] = useState(knowledge[0]);
const [wordSelected, setSelected] = useState(null);
const [check, setCheck] = useState("");
const [step, setStep] = useState("verify");
const [toTestAgain, setToTest] = useState([]);
const [showFinalScore, setShowFinalScore] = useState(false);

const createOptions = (answer) => {
  // the answer is one of the options
  let options = [answer];

  // add 3 random options
  while (options.length < 4) {
    const rIdx = Math.floor(Math.random() * knowledge.length);
    if (!options.some((e, i, a) => e.darija === knowledge[rIdx].darija)) {
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
  createOptions(answer);
  console.log(toTestAgain);
};

const checkAnswer = () => {
  if (wordSelected.darija === knowledge[idx].darija) {
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

return (
  <>
    <div className="container p-3">
      <div className="text-right">Score: {score}</div>
      <h5 className="text-center"> Darija: {wordEvaluating.darija} </h5>

      <div class="row pt-2">
        {possibleOptions.map((opt) => (
          <div className="col-sm-12 col-md-6 p-2">
            <Selection
              className={`card text-center ${
                opt.darija === wordSelected.darija && "selected"
              } ${opt.darija === wordSelected.darija && check}`}
              onClick={() => setSelected(opt)}
            >
              <h5 className="card-title pt-2">
                {" "}
                {opt.emoji} {opt.spanish}{" "}
              </h5>
            </Selection>
          </div>
        ))}
      </div>

      <button onClick={step2Fc[step]}> {step2Label[step]} </button>
    </div>
  </>
);
