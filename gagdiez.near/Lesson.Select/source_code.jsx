if (context.loading) {
  return <div>Loading...</div>;
}

let knowledge = [
  { darija: "wld", spanish: "niño", english: "boy", emoji: "👦🏽" },
  { darija: "bnt", spanish: "niña", english: "girl", emoji: "👧🏽" },
  { darija: "dar", spanish: "casa", english: "house", emoji: "🏠" },
  { darija: "ktab", spanish: "libro", english: "book", emoji: "📚" },
  { darija: "medrasa", spanish: "escuela", english: "school", emoji: "🏫" },
  // { darija: "suq", spanish: "mercado", english: "market" },
  // { darija: "jerda", spanish: "parque", english: "park" },
  // { darija: "maktab", spanish: "oficina", english: "office" },
  // { darija: "jame3", spanish: "mezquita", english: "mosque" },
  // { darija: "sbettar", spanish: "hospital", english: "hospital" },
  // { darija: "banka", spanish: "banco", english: "bank" },
  // { darija: "supermarche", spanish: "supermercado", english: "supermarket" },
  // { darija: "otel", spanish: "hotel", english: "hotel" },
  // { darija: "khanut", spanish: "tienda", english: "shop" },
  // { darija: "lma", spanish: "agua", english: "water" },
  // { darija: "khubz", spanish: "pan", english: "bread" },
  // { darija: "tomobil", spanish: "automovil", english: "car" },
  // { darija: "ordinateur", spanish: "ordenador", english: "computer" },
  // { darija: "tilifon", spanish: "telefono", english: "phone" },
  // { darija: "sarut", spanish: "llave", english: "key" },
  // { darija: "flus", spanish: "dinero", english: "money" },
  // { darija: "biskit", spanish: "bicicleta", english: "bicycle" },
  // { darija: "qet/msh", spanish: "gato", english: "cat" },
  // { darija: "klb", spanish: "perro", english: "dog" },
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
          <button
            onClick={() => {
              href.location = href.location;
            }}
          >
            {" "}
            Restart{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

const step2Label = { verify: "Verificar", next: "Siguiente" };
const step2Fc = { verify: checkAnswer, next: passNext };

return (
  <>
    <div className="container">
      <div class="row">
        <div class="col-6">Darija: {wordEvaluating.darija}</div>
        <div class="col-6">Score: {score}</div>
      </div>

      <div class="row">
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
