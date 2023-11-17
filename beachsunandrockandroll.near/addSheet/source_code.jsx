const setAddSheet = props.setAddSheet;
const ppdContract = props.ppdContract;
const ppdAbi = props.ppdAbi;

const [sheetName, setSheetName] = useState("");
const [composerIdx, setComposerIdx] = useState("");
const [difficulty, setDifficulty] = useState(0);

console.log(ppdContract);

State.init({
  img: null,
});

const addSheet = async () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  const userIdx = await ppd.getUserIdx();

  console.log(userIdx);
  const daraUri = state.img.cid ?? "";

  ppd
    .addSheet(sheetName, composerIdx, userIdx, difficulty, daraUri)
    .then(() => {
      setAddSheet(false);
    });
};

const getComposers = () => {
  if (!Ethers.provider()) return;

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
}, [ppdContract]);

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
      <Typeahead
        className="p-2"
        options={state.composers}
        // multiple
        onChange={(value) => {
          setComposerIdx(value);
        }}
        placeholder="Choose a tag to filter..."
      />
      <div>
        Sheet upload: <br />
        <IpfsImageUpload image={state.img} />
      </div>

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
