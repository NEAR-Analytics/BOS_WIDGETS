State.init({ input: "Hola", message: "Este es el mensaje inicial" });

const handleButton = () => {
  State.update({message: state.input})
};

return (
  <div>
    <div class="px-4 py-4 gap-4 d-flex flex-column">
      <h1 class="mx-auto">{state.message}</h1>
      <input
        type="text"
        value={state.input}
        onChange={(e)=>State.update({input: e.target.value})}
      ></input>
      <button onClick={handleButton}>Guardar mensaje</button>
    </div>
  </div>
);
