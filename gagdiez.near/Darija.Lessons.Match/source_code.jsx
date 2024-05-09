const { shuffle, SelectionStyle: Selection } = VM.require('gagdiez.near/widget/Darija.Lessons.Utils');

if (context.loading) return <div>Loading...</div>;

const max_lives = 4;
const learn_lang = "darija";
const native_lang = "spanish";
const knowledge = props.knowledge;

if (knowledge.length < 4) return "Add more than 4 options";

const noneSelected = { left: null, right: null };

const firstOptions = {
  left: knowledge.slice(0, 4),
  right: knowledge.slice(2, 4).concat(knowledge.slice(0, 2))
};

const [idx, setIdx] = useState(0);
const [lives, setLives] = useState(max_lives);
const [options, setOptions] = useState(firstOptions);
const [selected, setSelected] = useState(noneSelected);
const [colStatus, setStatus] = useState({ left: ['', '', '', ''], right: ['', '', '', ''] });
const [step, setStep] = useState("verify");
const [nextDisabled, setNextDisabled] = useState(true);

const createOptions = (idx) => {
  // take 4 elements from idx (wrapping if necessary)
  const options = knowledge.slice(idx, idx + 4);
  if (options.length < 4) {
    options.push(...knowledge.slice(0, 4 - options.length));
  }

  setOptions({ left: shuffle(options), right: shuffle(options) });
};

const restart = () => {
  setIdx(0);
  setLives(max_lives);
  setOptions(firstOptions);
  setSelected(noneSelected);
  setStatus({ left: ['', '', '', ''], right: ['', '', '', ''] });
  setNextDisabled(true);
}

// lost all lives
if (lives === 0) {
  return (
    <div className="container text-center">
      <h3>Game Over</h3>
      <button className="btn btn-primary" onClick={restart}>
        Restart
      </button>
    </div>
  );
}

// won
if (idx >= knowledge.length) {
  return (
    <div className="container text-center">
      <h3>¡Ganaste!</h3>
      <button className="btn btn-primary" onClick={restart}>
        Restart
      </button>
    </div>
  );
}

const select = (side, idx) => {
  selected[side] = idx;

  if (selected.left !== null && selected.right !== null) {
    // check if they are the same
    const result = options.left[selected.left][learn_lang] === options.right[selected.right][learn_lang] ? 'success' : 'danger';

    // set status
    colStatus.left[selected.left] = result;
    colStatus.right[selected.right] = result;
    selected = noneSelected;

    // remove lives if necessary
    result === 'danger' && setLives(lives - 1);
  } else {
    if (colStatus[side][idx]) {
      // deselect
      colStatus[side][idx] = '';
      selected[side] = null;
    } else {
      // deselect all other options
      colStatus[side] = colStatus[side].map(e => e === 'success' ? 'success' : '');

      // deselect or select
      colStatus[side][idx] = currentState ? '' : 'selected';

      //remove dangers from other side
      const otherSide = side === 'left' ? 'right' : 'left';
      colStatus[otherSide] = colStatus[otherSide].map(e => e === 'danger' ? '' : e);
    }
  }

  // check if all are success
  const next = colStatus.left.every(e => e === 'success')

  setStatus(colStatus);
  setSelected(selected);
  setNextDisabled(!next);
}

const SelectButton = (side, idx) => {
  let onClick = () => {
    (colStatus[side][idx] !== "success") && select(side, idx)
  }

  const lang = side === 'left' ? learn_lang : native_lang;

  return <>
    <Selection
      className={`my-1 card text-center ${colStatus[side][idx]}`}
      onClick={onClick}
    >
      <h6 className="card-title pt-2 px-2">
        {side === 'left' && options[side][idx].emoji}
        {options[side][idx][lang]}
      </h6>
    </Selection>
  </>
}

const nextStep = () => {
  idx += 4;

  createOptions(idx);
  setIdx(idx);

  //reset status
  setStatus({ left: ['', '', '', ''], right: ['', '', '', ''] });
  setNextDisabled(true);
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

      <h5 className="text-center pt-3"> Seleccione los pares correctos </h5>
      <div class="row pt-1">
        {['left', 'right'].map(side =>
          <div class="col-6">
            {[0, 1, 2, 3].map(idx => SelectButton(side, idx))}
          </div>
        )}
      </div>

      <button class="mt-2 btn btn-secondary" onClick={nextStep} disabled={nextDisabled}> Next </button>
    </div>
  </>
);