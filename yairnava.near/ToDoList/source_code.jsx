const todolistContract = "0x9098DB859F8912aCb8856fa7298Cb28dD33D65ce";

const todolistAbi = fetch(
  "https://raw.githubusercontent.com/open-web-academy/Components-BOS/main/Contracts/ToDoListAbi.txt"
);

if (!todolistAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(todolistAbi.body);

const contract = new ethers.Contract(
  todolistContract,
  todolistAbi.body,
  Ethers.provider().getSigner()
);

State.init({
  getTasks: true,
  user_tasks: [],
});

const submitTask = () => {
  if (state.strTask == "") {
    return console.log("El nombre de la tarea no debe estar vacia");
  }

  contract.addTask(state.strTask).then((transactionHash) => {
    setTimeout(() => {
      getTasks();
    }, 5000);
  });
};

const finishTask = (task) => {
  console.log(task);
  contract.updateStatus(task.id, true).then((transactionHash) => {
    setTimeout(() => {
      getTasks();
    }, 5000);
  });
};

const getTasks = () => {
  contract.getTaskCount().then((res) => {
    const countTasks = res.toNumber();
    let tasks = [];
    for (let i = 0; i < countTasks; i++) {
      const taskNumber = i;
      contract.getTask(i).then((res) => {
        const newTask = { id: taskNumber, name: res[0], status: res[1] };
        tasks.push(newTask);
      });
    }
    setTimeout(() => {
      State.update({ user_tasks: tasks, getTasks: false });
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
      <div class="Header">Lista de Tareas</div>

      {!!state.sender ? (
        <>
          <div class="SubHeader">Crear nueva tarea </div>
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan2">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strTask}
                onChange={(e) => State.update({ strTask: e.target.value })}
                placeholder="Nombre nueva tarea"
              />
            </span>
          </div>
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitTask()}
          >
            <span>Guardar</span>
          </button>
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
                      <>
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
                      </>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <span>No hay tareas guardadas</span>
            )}
          </div>
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
