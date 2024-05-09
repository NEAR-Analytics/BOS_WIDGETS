const [result, setResult] = useState(null);
const handleClick = async () => {
  try {
    const transactionResult = Near.call("psalomo.near", "nft_token", {
      token_id: "3",
    });
    console.log(transactionResult);
    setResult(JSON.stringify(transactionResult));
  } catch (e) {
    setResult(JSON.stringify(e));
  }
};

return (
  <>
    <button onClick={handleClick}>Call contract</button>
    <div>Hello World {result}</div>
  </>
);
