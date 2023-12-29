const [result, setResult] = useState(null);
const handleClick = () => {
  const transactionResult = Near.call("psalomo.near", "test");
  console.log(transactionResult);
  setResult(transactionResult);
};

return (
  <>
    <button onClick={handleClick}>Call contract</button>
    <div>Hello World {JSON.stringify(result)}</div>
  </>
);
