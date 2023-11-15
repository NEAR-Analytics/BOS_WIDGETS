State.init({ input: "valor del componente hijo", label: "Etiqueta:", message: "Componente padre" });
const sendMessage = (data) => {
  console.log(data);
  State.update({ message: data });
};
return (
  <div>
    <div class="px-4 py-4 d-flex flex-column">
      <h1 class="mx-auto">{state.message}</h1>
      <p class="mx-auto fw-semibold">Aqui inicia componente hijo</p>
      <Widget
        src={`syi216.near/widget/MultiplesWidgets.Hijo`}
        props={{
          input: state.input,
          label: state.label,
          sendMessage: (data) => sendMessage(data),
        }}
      />
    </div>
  </div>
);
