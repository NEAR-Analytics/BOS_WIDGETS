// const [value, setValue] = useState(0);
const [value, setValue] = [4, console.log];

return (
  <>
    <span>{value}</span>
    <button className="btn" onClick={() => setValue(value + 1)}>
      Increment Value
    </button>
  </>
);
