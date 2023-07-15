const greetings = ["Hey", "Namaste", "Halo"];
const onChange = ({ target }) => {
  State.update({ name: target.value });
};
State.init({ name: "Anukul" });
return (
  <div>
    Hello {state.name}
    <input onChange={onChange} />
  </div>
);
