const todolistContract = "0x5fA5241aa08edc190Cf049F3F746D9D2a2B8F3D9";

const todolistAbi = fetch(
  "https://gist.githubusercontent.com/fchambi/bf964ee8fe8b4fa8cca495a2df9f9b5b/raw/e5f998945121c227c91fe3109f74d166aa0cc364/.txt"
);
const tokenDecimals = 18;

if (!todolistAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(todolistAbi.body);

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

State.init({
  user_tasks: [],
});
const submitTask = () => {
  if (state.strTask === "" || state.comprobante === "") {
    return console.log(
      "El nombre de la tarea y la cantidad no deben estar vacíos"
    );
  }

  try {
    const contract = new ethers.Contract(
      todolistContract,
      todolistAbi.body,
      Ethers.provider().getSigner()
    );

    contract
      .setOrderSeller(state.strTask, state.comprobante)
      .then((transactionHash) => {
        console.log("Transaction submitted. Hash:", transactionHash);
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
      });
  } catch (parseError) {
    console.error("Error parsing amount:", parseError);
  }
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/Qmdpe64Mm46fvWNVaCroSGa2JKgauUUUE5251Cx9nTKNrs"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Aceptar Orden de Compra </div>

      {state.sender ? (
        <>
          <div class="SubHeader">Parte del Vendedor </div>
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan2">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strTask}
                onChange={(e) => State.update({ strTask: e.target.value })}
                placeholder="Id Orden"
              />
            </span>
            <span class="LidoStakeFormInputContainerSpan2">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.comprobante}
                onChange={(e) => State.update({ comprobante: e.target.value })}
                placeholder="url comprobante"
              />
            </span>
          </div>
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitTask()}
          >
            <span>Comprar</span>
          </button>
        </>
      ) : (
        <Web3Connect
          className="LidoStakeFormSubmitContainer"
          connectLabel="Connect with Web3"
        />
      )}
    </div>
  </Theme>
);
