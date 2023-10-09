const [value, setValue] = useState(0);
const [isInit, setIsInit] = useState(false);
// const [value, setValue] = [4, console.log];

console.log({ useEffect });
useEffect(() => {
  console.log({ isInit });
  if (!isInit) {
    setTimeout(() => setValue(500), 5000);
    setIsInit(true);
  }
}, [isInit]);

return (
  <>
    <span>{isInit.toString()}</span>
    <span>{value.toString()}</span>
    <button className="btn" onClick={() => setValue(value + 1)}>
      Increment Value
    </button>
  </>
);
