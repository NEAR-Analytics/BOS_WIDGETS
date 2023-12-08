const [toEvaluate, setToEvaluate] = useState("");

const evaluate = () => {
  Near.view(toEvaluate, "get_greeting", { account_id: "evaluator.testnet" })
};

return <>
  <h1> Time to evaluate </h1>

  <p> Deploy a hello near and we will evaluate it </p>

  <input type="text" onChange={(e) => setToEvaluate(e.target.value)}> </input>

  <button onClick={evaluate}> Submit </button>
</>
