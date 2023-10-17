const [count, setCount] = useState(0);

return (
  <div>
    <p>Count: {count}</p>

    <button type="button" onClick={() => setCount(count + 1)}>
      +
    </button>

    <hr />

    <Widget src="calebjacob.near/widget/Simple" />
  </div>
);
