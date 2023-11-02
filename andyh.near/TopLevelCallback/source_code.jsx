const [val, setVal] = useState(0);

return (
  <>
    <h2>{val}</h2>
    <button className="btn btn-danger" onClick={() => setVal(val + 1)}>
      button
    </button>
  </>
);
