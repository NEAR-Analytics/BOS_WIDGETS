const [count, setCount] = useState(0);
const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

return (
  <div>
    <p>Count: {count}</p>

    <button type="button" onClick={() => setCount(count + 1)}>
      +
    </button>

    <hr />

    {items.map((item) => (
      <Widget
        src="calebjacob.near/widget/Simple"
        key={item.id}
        props={{ item }}
      />
    ))}
  </div>
);
