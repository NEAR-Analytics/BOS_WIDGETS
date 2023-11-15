State.init({ boton: props.input });
return (
  <div>
    <div class="d-flex flex-column gap-2">
      <div class="d-flex gap-2">
        <p class="my-auto">{props.label}</p>
        <input
          value={state.boton}
          onChange={(e) => State.update({ boton: e.target.value })}
        />
      </div>
      <button onClick={()=>props.sendMessage(boton)}>
        Enviar informacion al padre
      </button>
    </div>
  </div>
);
