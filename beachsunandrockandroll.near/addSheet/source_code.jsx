const setAddSheet = props.setAddSheet;
const ppdContract = props.ppdContract;
const ppdAbi = props.ppdAbi;

const [sheetName, setSheetName] = useState("");
const [composerIdx, setComposerIdx] = useState("");
const [difficulty, setDifficulty] = useState(0);

console.log(ppdContract);
console.log(props);

// State.init({
//   img: null,
// });

const addSheet = () => {
  console.log("entrando a addSheet");
  console.log("ppdContract", ppdContract);

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    console.log("userIdx", userIdx);
    console.log("composerIdx", composerIdx);
    const daraUri = "";

    ppd
      .addSheet(sheetName, composerIdx, userIdx, difficulty, daraUri)
      .then(() => {
        setAddSheet(false);
      });
  });
};

const getComposers = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getComposers().then((res) => {
    console.log(res);
    console.log("co");
    const comp = res && res.map((r) => r[0]);
    State.update({ composers: comp });
  });
};

useEffect(() => {
  getComposers();
}, []);

return (
  <>
    <div>
      <input
        className="form-control m-2 p-2"
        type="text"
        id="sheetName"
        name="sheetName"
        required
        placeholder="Name of the Sheet"
        onChange={(event) => {
          setSheetName(event.target.value);
        }}
      />

      <input
        className="form-control m-2 p-2"
        type="text"
        id="difficulty"
        name="difficulty"
        required
        placeholder="Level of Difficulty"
        onChange={(event) => {
          setDifficulty(event.target.value);
        }}
      />
      <button onClick={addSheet}>Add Sheet</button>
    </div>
  </>
);
