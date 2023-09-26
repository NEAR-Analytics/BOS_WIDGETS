const [value, setValue] = useState(0);

return (
  <>
    <span>{value}</span>
    <button className="btn" onClick={() => setValue(value + 1)}>
      Increment Value
    </button>
  </>
);
