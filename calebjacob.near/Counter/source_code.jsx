// const [count, setCount] = useState(0);

State.init({
  count: 0,
});

const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

return (
  <div>
    <p>Count: {state.count}</p>

    <button
      type="button"
      onClick={() => State.update({ count: state.count + 1 })}
    >
      +
    </button>

    <hr />

    {items.map((item) => (
      <Widget src="calebjacob.near/widget/Simple" key={item.id} />
    ))}
  </div>
);
