const setAddRecord = props.setAddRecord;
const sheetIdx = props.sheetIdx;

const ppdContract = props.ppdContract;
const ppdAbi = props.ppdAbi;

const [sheetName, setSheetName] = useState("");
const [phraseNumber, setPhraseNumber] = useState(0);
const [subPhraseNumber, setSubPhraseNumber] = useState(0);
const [minutes, setMinutes] = useState(0);
const [studyType, setStudyType] = useState(0);
const [focusType, setFocusType] = useState(0);

State.init({
  studyType: ["Fingers", "Rhythm", "Memorization", "Dynamics"],
  focusType: ["Study", "Practice"],
});

const settingStudyType = (value) => {
  const sType = state.studyType.find((st, i) => {
    if (st === value[0]) return i;
  });

  console.log(sType);

  setStudyType(sType);
};

const addRecord = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd
      .addRecord(
        parseInt(userIdx.toString()),
        sheetIdx,
        phraseNumber,
        subPhraseNumber,
        minutes,
        studyType,
        focusType,
        false
      )
      .then(() => {
        setAddRecord(false);
      });
  });
};

return (
  <>
    <div>
      <div>ShhetIdx: --{sheetIdx}--</div>
      <input
        className="form-control m-2 p-2"
        type="number"
        id="phraseNumber"
        name="phraseNumber"
        required
        placeholder="Number of Phrase"
        onChange={(event) => {
          setPhraseNumber(event.target.value);
        }}
      />
      <input
        className="form-control m-2 p-2"
        type="number"
        id="subPhraseNumber"
        name="subPhraseNumber"
        required
        placeholder="Number of Sub-Phrase"
        onChange={(event) => {
          setSubPhraseNumber(event.target.value);
        }}
      />
      <Typeahead
        className="p-2"
        options={state.studyType}
        // multiple
        onChange={(value) => {
          setStudyType(0);
        }}
        placeholder="Select Type of Study"
      />
      <Typeahead
        className="p-2"
        options={state.focusType}
        // multiple
        onChange={(value) => {
          setFocusType(0);
        }}
        placeholder="Select Type of Focus"
      />

      <input
        className="form-control m-2 p-2"
        type="number"
        id="minutes"
        name="minutes"
        required
        placeholder="How many minutes do you study?"
        onChange={(event) => {
          setMinutes(event.target.value);
        }}
      />
      <button onClick={addRecord}>Add Record</button>
      <button onClick={() => setAddRecord(false)}>Close</button>
    </div>
  </>
);
