import { useState, useEffect } from 'react';

export default function () {


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
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "4em",
    }}
  >
    <h3>Bear Facts</h3>

    <div
      style={{
        flex: 1,
        height: "500px",
        width: "500px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={`https://placebear.com/${width}/${height}`} />
    </div>
    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
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
    <div style={{ flex: 1 }}>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => {
          setStep(step + 1);
        }}
      >
        MORE BEAR FACTS
      </button>
    </div>
  </div>
);

}