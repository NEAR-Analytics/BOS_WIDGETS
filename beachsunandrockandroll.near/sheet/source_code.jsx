const sheetIdx = props.sheetIdx || 0;
const back = props.back;

const { getNormalDate, ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);
const [addRecord, setAddRecord] = useState(false);

State.init({
  userSheets: [],
});

const getUserSheets = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd.getUserSheets(parseInt(userIdx.toString())).then((userSheets) => {
      userSheets.map((userSheet, i) => {
        if (i === sheetIdx) {
          const sheet = {
            name: userSheet[0],
            createdAt: getNormalDate(userSheet[1]),
            difficulty: userSheet[2],
            dataUri: userSheet[3],
          };
          State.update({ sheet });
        }
      });
    });
  });
};

const getRecordsBySheet = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd.getRecordsBySheet(Big(userIdx).toFixed(), sheetIdx).then((res) => {
      const records = res.map((r) => ({
        phraseNum: Big(r[0]).toFixed(),
        subPhraseNum: Big(r[1]).toFixed(),
        qtyMinutes: r[2],
        studyType: r[3],
        focusType: r[4],
        isAllSheet: r[5],
        createdAt: r[6],
      }));

      State.update({ records });
    });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getUserSheets();
    getRecordsBySheet();
  }
}

return (
  <>
    <h2>{state.sheet.name}</h2>
    <button onClick={back}>Back</button>
    <button
      onClick={() => {
        setAddRecord(true);
        setSheetIdx(i);
      }}
    >
      New Record
    </button>

    {addRecord ? (
      <>
        <Widget
          src={`beachsunandrockandroll.near/widget/addRecord`}
          props={{
            setAddRecord,
            sheetIdx,
          }}
        />
      </>
    ) : (
      state.records &&
      state.records.map((record) => {
        return (
          <>
            <div>Phrase Number: {record.phraseNum}</div>
            <div>SubPhrase Number: {record.subPhraseNum}</div>
            <div>Qty Minutes: {record.qtyMinutes}</div>
            <div>Study Type: {record.studyType}</div>
            <div>Focus Type: {record.focusType}</div>
            <div>is all sheet?: {record.isAllSheet ? "yes" : "no"}</div>

            <div>Created at: {getNormalDate(record.createdAt)}</div>
          </>
        );
      })
    )}
  </>
);
