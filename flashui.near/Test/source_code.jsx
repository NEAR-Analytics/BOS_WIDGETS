const saveData = props.saveData;

State.init({ message: "" });

const handleChange = (event) => {
  State.update({ message: event.target.value });
};

const handleClick = () => {
  saveData(state.message);
};

return (
  <div>
    <input value={state.message} onChange={handleChange} />
    <button onClick={handleClick}>Click</button>
  </div>
);
