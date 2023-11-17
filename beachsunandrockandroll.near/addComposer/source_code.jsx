const setAddComposer = props.setAddComposer;

const ppdContract = props.ppdContract;
const ppdAbi = props.ppdAbi;

console.log("en addComposer");
console.log("ppdContract", ppdContract);

const [composerName, setComposerName] = useState("");
const [birthdate, setBirthDate] = useState("");

const addComposer = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.addComposer(composerName, birthdate);
  setAddComposer(false);
};

return (
  <>
    <div>
      <input
        className="form-control m-2 p-2"
        type="text"
        id="composerName"
        name="composerName"
        required
        placeholder="Composer's Name"
        onChange={(event) => {
          setComposerName(event.target.value);
        }}
      />
      <input
        className="form-control m-2 p-2"
        type="text"
        id="birthDate"
        name="composerName"
        required
        placeholder="Composer's Birthdate"
        onChange={(event) => {
          setBirthDate(event.target.value);
        }}
      />
      <button onClick={addComposer}>Add Composer</button>
    </div>
  </>
);
