const todolistContract = "0x5fA5241aa08edc190Cf049F3F746D9D2a2B8F3D9";

const todolistAbi = fetch(
  "https://gist.githubusercontent.com/fchambi/bf964ee8fe8b4fa8cca495a2df9f9b5b/raw/e5f998945121c227c91fe3109f74d166aa0cc364/.txt"
);

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
  getTasks: true,
  user_tasks: [],
});

const submitTask = () => {
  if (state.walletAddress === "" || state.amountToSend === "") {
    return console.log("Por favor, complete ambos campos");
  }

  const contract = new ethers.Contract(
    todolistContract,
    todolistAbi.body,
    Ethers.provider().getSigner()
  );

  contract
    .creategreenBoxNativeCoin(state.walletAddress, state.amountToSend)
    .then((transactionHash) => {
      setTimeout(() => {
        getTasks();
      }, 5000);
    });
};

const finishTask = (task) => {
  const contract = new ethers.Contract(
    todolistContract,
    todolistAbi.body,
    Ethers.provider().getSigner()
  );

  contract.updateStatus(task.id, true).then((transactionHash) => {
    setTimeout(() => {
      getTasks();
    }, 5000);
  });
};

const getGreenBoxes = () => {
  const contract = new ethers.Contract(
    greenBoxContractAddress,
    greenBoxContractAbi.body,
    Ethers.provider().getSigner()
  );

  contract.getGreenBoxCount().then((res) => {
    const countGreenBoxes = res.toNumber();
    let greenBoxes = [];
    for (let i = 0; i < countGreenBoxes; i++) {
      const greenBoxNumber = i;
      contract.getGreenBox(i).then((res) => {
        const newGreenBox = {
          id: greenBoxNumber,
          buyer: res.buyer,
          seller: res.seller,
          value: res.value,
          status: res.status,
          idImage: res.idImage,
        };
        greenBoxes.push(newGreenBox);
      });
    }
    setTimeout(() => {
      State.update({ user_greenBoxes: greenBoxes, getGreenBoxes: false }); // Renamed from user_tasks to user_greenBoxes
    }, 10000);
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (state.user_tasks.length == 0 && state.sender) {
  getTasks();
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
      <div class="Header">Comprar GreenBox</div>

      {state.sender ? (
        <>
          <div class="SubHeader">Crear nueva tarea </div>
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan2">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.walletAddress}
                onChange={(e) =>
                  State.update({ walletAddress: e.target.value })
                }
                placeholder="Dirección de wallet"
              />
            </span>
          </div>
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan2">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.amountToSend}
                onChange={(e) => State.update({ amountToSend: e.target.value })}
                placeholder="Cantidad a enviar"
              />
            </span>
          </div>
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitTask()}
          >
            <span>Comprar</span>
          </button>{" "}
          <div>
            <div class="SubHeader">Tareas creadas: </div>
            {state.getTasks ? (
              <span>Consultando tareas...</span>
            ) : state.user_tasks.length > 0 ? (
              <table className="table table-hover table-sm">
                <thead>
                  <tr class="p-3 mb-2 bg-primary bg-gradient text-white rounded-5 text-center">
                    <th>Nombre</th>
                    <th>Terminada</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {state.user_tasks.map((data, key) => {
                    return (
                      <tr class="text-center">
                        <td>{data.name}</td>
                        <td>{data.status ? "Si" : "No"}</td>
                        <td>
                          {!data.status && (
                            <button
                              class="btn btn-primary"
                              onClick={async () => {
                                finishTask(data);
                              }}
                            >
                              Finalizar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <span>No hay tareas guardadas</span>
            )}
          </div>{" "}
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
