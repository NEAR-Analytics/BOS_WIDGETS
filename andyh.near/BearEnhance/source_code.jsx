const [step, setStep] = useState(0);
const [height, setHeight] = useState(100);
const [width, setWidth] = useState(100);
const [bearFact, setBearFact] = useState("");

const DIMENSIONAL_INCREMENT = 25;

useEffect(() => {
  (async () => {
    const res = await fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
      headers: {
        "X-Api-Key": "WjEkKnB/Up2bSf9gQ7Rb/w==5NeZT3zzgVKShfic",
      },
    });
    setWidth(width + DIMENSIONAL_INCREMENT);
    setHeight(height + DIMENSIONAL_INCREMENT);
    setBearFact((await res.json())[0].fact);
  })();
}, [step]);

return (
  <>
    <h3>Bear Facts</h3>

    <div className="mb-3">
      <img src={`https://placebear.com/${width}/${height}`} />
      <span
        style={{
          textAlign: "center",
          margin: "24px",
          fontSize: "1.2em",
          fontStyle: "italic",
        }}
      >
        {bearFact}
      </span>
    </div>
    <div className="d-grid gap-2">
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setStep(step + 1);
        }}
      >
        MORE FACTS
      </button>
    </div>
  </>
);
