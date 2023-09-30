State.init({
  contractAddress: "trustcore.near",
  rpcUrl: "https://rpc.near.org/", //https://rpc.testnet.near.org
  archivalRpc: "https://archival-rpc.mainnet.near.org", //https://archival-rpc.testnet.near.org
  nearBlockRpc: "https://api.nearblocks.io/", // https://api-testnet.nearblocks.io
  contractAbi: {
    schema_version: "0.3.0",
    metadata: {
      name: "",
      version: "1.0.0",
      authors: [],
      build: {
        compiler: "",
        builder: "",
      },
    },
    body: {
      functions: [],
    },
  },
  functionsName,
  functionsAction: "view",
  contractAbiMethod: [],
  contractAbiArg,
  createMethodError,
  response,
  createArgError,
  checkMethodExport: [],
  commitLoading: false,
});

const onInputChangeFunctionsName = ({ target }) => {
  State.update({ functionsName: target.value });
};
const onInputChangeFunctionsAction = ({ target }) => {
  State.update({ functionsAction: target.value });
};
const onInputChangeContractAddress = ({ target }) => {
  State.update({ contractAddress: target.value });
};
const onCreateArgs = (functionsName, functionsIndex) => {
  State.update({ createArgError: { [functionsName]: null } });
  const arg = {
    name: "",
    type_schema: {
      type: "string",
    },
    value: "",
  };

  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].params.args.push(arg);
  State.update({ contractAbiMethod: abiMethod });
};
const onInputChangeArgName = (e, functionsIndex, argsIndex) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].params.args[argsIndex].name = e.target.value;
  State.update({ contractAbiMethod: abiMethod });
};
const onRemoveArg = (functionsIndex, argsIndex) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].params.args.splice(argsIndex, 1);
  State.update({ contractAbiMethod: abiMethod });
};

const onInputChangeArgType = (e, functionsIndex, argsIndex) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].params.args[argsIndex].type_schema.type =
    e.target.value;
  State.update({ contractAbiMethod: abiMethod });
};
const onInputChangeArgValue = (e, functionsIndex, argsIndex) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].params.args[argsIndex].value = e.target.value;
  State.update({ contractAbiMethod: abiMethod });
};
const onCreateMethod = (e) => {
  State.update({ createMethodError: null });
  const method = {
    name: state.functionsName,
    kind: state.functionsAction,
    export: true,
    params: {
      serialization_type: "json",
      args: [],
    },
    deposit: 0,
    gas: 30000000000000,
  };
  const abiMethod = state.contractAbiMethod;
  const isExistFunction = false;
  abiMethod.forEach((item) => {
    if (item.name == state.functionsName) {
      isExistFunction = true;
    }
  });
  if (!isExistFunction) {
    abiMethod.push(method);
    State.update({ contractAbiMethod: abiMethod });
  } else {
    State.update({ createMethodError: "Function Exist" });
  }
};
const onInputChangeDeposit = (functionsIndex, e) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].deposit = parseInt(e.target.value);
  State.update({ contractAbiMethod: abiMethod });
};
const onInputChangeGas = (functionsIndex, e) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].gas = e.target.value;
  State.update({ contractAbiMethod: abiMethod });
};
const getMethodFromSource = () => {
  asyncFetch(state.rpcUrl, {
    body: JSON.stringify({
      method: "query",
      params: {
        request_type: "view_code",
        account_id: state.contractAddress,
        finality: "final",
      },
      id: 154,
      jsonrpc: "2.0",
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => {
    if (res.body.result) {
      const data = Buffer(res.body.result.code_base64, "base64").toString(
        "ascii"
      );
      const fist = data.indexOf("memory");
      let second = data.indexOf("__data_end");
      if (second == -1) {
        second = data.indexOf("P]");
      }
      if (fist !== -1 && second !== -1) {
        const functionsData = data
          .substring(fist, second)
          .replace(/[^\w ]/g, " ")
          .split(" ");
        const filterFunction = [];
        functionsData.forEach((item, index) => {
          if (index > 0) {
            if (item.length > 0) {
              if (!/^[A-Z]+(?:_[A-Z]+)*$/m.test(item)) {
                filterFunction.push(item);
              }
            }
          }
        });
        const abiMethod = [];
        State.update({ contractAbiMethod: [] });
        filterFunction.forEach((item) => {
          asyncFetch(state.rpcUrl, {
            body: JSON.stringify({
              method: "query",
              params: {
                request_type: "call_function",
                account_id: state.contractAddress,
                method_name: item,
                args_base64: "eyIiOiIifQ==",
                finality: "optimistic",
              },
              id: 128,
              jsonrpc: "2.0",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }).then((res) => {
            const method = {
              name: item,
              kind: "view",
              export: true,
              params: {
                serialization_type: "json",
                args: [],
              },
              deposit: 0,
              gas: 30000000000000,
            };
            if (res.body.result.error) {
              const isCallFunction =
                res.body.result.error.search("storage_write");
              if (isCallFunction !== -1) {
                method.kind = "call";
              }
            }
            abiMethod.push(method);
            State.update({ contractAbiMethod: abiMethod });
          });
        });
      }
    }
  });
};
const getArgsFromMethod = (functionsName, action, functionsIndex) => {
  asyncFetch(
    `${state.nearBlockRpc}v1/account/${state.contractAddress}/txns?method=${functionsName}&order=desc&page=1&per_page=1`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  ).then((res) => {
    if (res.body.txns.length > 0) {
      if (res.body.txns[0].transaction_hash) {
        asyncFetch(state.archivalRpc, {
          body: JSON.stringify({
            method: "EXPERIMENTAL_tx_status",
            params: [res.body.txns[0].transaction_hash, state.contractAddress],
            id: 128,
            jsonrpc: "2.0",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }).then((res) => {
          if (res.body.result.transaction.actions[0].FunctionCall.args) {
            const args = Buffer(
              res.body.result.transaction.actions[0].FunctionCall.args,
              "base64"
            ).toString("ascii");
            if (Object.keys(JSON.parse(args)).length > 0) {
              Object.keys(JSON.parse(args)).forEach((item) => {
                const arg = {
                  name: item,
                  type_schema: {
                    type: typeof JSON.parse(args)[item],
                  },
                  value: "",
                };
                const abiMethod = state.contractAbiMethod;
                abiMethod[functionsIndex].params.args = [];
                abiMethod[functionsIndex].params.args.push(arg);
                State.update({ contractAbiMethod: abiMethod });
              });
            }
          }
        });
      }
    }
  });
};
const onBtnClickCall = (functionsName, action, functionsIndex) => {
  const abiMethod = state.contractAbiMethod;
  const argMap = abiMethod[functionsIndex].params.args.map(
    ({ name, value }) => ({
      [name]: value,
    })
  );
  const args = {};
  argMap.forEach((item) => {
    Object.assign(args, item);
  });
  if (action === "view") {
    asyncFetch(state.rpcUrl, {
      body: JSON.stringify({
        method: "query",
        params: {
          request_type: "call_function",
          account_id: state.contractAddress,
          method_name: abiMethod[functionsIndex].name,
          args_base64: new Buffer.from(JSON.stringify(args)).toString("base64"),
          finality: "final",
        },
        id: 154,
        jsonrpc: "2.0",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((res) => {
      if (res.body.result.result) {
        const result = new Buffer.from(res.body.result.result).toString();
        State.update({
          response: {
            [functionsName]: { value: result, error: false },
          },
        });
      }
      if (res.body.result.error) {
        const error = res.body.result.error;
        State.update({
          response: {
            [functionsName]: { value: error, error: true },
          },
        });
      }
    });
  }
  if (action === "call") {
    Near.call(
      state.contractAddress,
      abiMethod[functionsIndex].name,
      args,
      abiMethod[functionsIndex].deposit,
      abiMethod[functionsIndex].gas
    );
  }
};

const onSwitchChangeArgExport = (action, functionsIndex) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod[functionsIndex].export = !abiMethod[functionsIndex].export;
  State.update({ contractAbiMethod: abiMethod });
};

const onRemoveMethod = (action, functionsIndex) => {
  const abiMethod = state.contractAbiMethod;
  abiMethod.splice(functionsIndex, 1);
  State.update({ contractAbiMethod: abiMethod });
};
const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
const exportForm = () => {
  const abi = {
    schema_version: "0.3.0",
    add: state.contractAddress,
    metadata: {
      name: state.contractAddress,
      version: "0.1.0",
      authors: [""],
    },
    body: {
      functions: [],
    },
  };
  const abiMethod = state.contractAbiMethod;
  abiMethod.forEach((item) => {
    abi.body.functions.push(item);
  });

  const data = {
    widget: {
      "abi2form-widget": {
        "":
          "const user = context.accountId;\r\nconst props = " +
          JSON.stringify(abi).replaceAll("\\", "") +
          " \r\n\r\nreturn (\r\n  <>\r\n    <Widget src={`${user}/widget/abi2form-widget`} props={props} />\r\n  </>\r\n);\r\n",
      },
    },
  };
  State.update({ commitLoading: true });
  Social.set(data, {
    force: true,
    onCommit: () => {
      State.update({ commitLoading: false });
    },
    onCancel: () => {
      State.update({ commitLoading: false });
    },
  });
};
const contractForm = (
  <>
    <div class="card mb-2">
      <div class="card-header">Build ABI</div>
      <div class="card-body">
        <div class="form-group">
          <label class="mb-2">Contract Address</label>
          <input
            class="form-control"
            value={state.contractAddress}
            placeholder="Contract Address"
            onChange={onInputChangeContractAddress}
          />
        </div>
      </div>
    </div>
  </>
);
return (
  <>
    <div class="container border border-info p-3">
      {context.accountId ? contractForm : notLoggedInWarning}
      <h3 class="text-center">Create Method</h3>
      <div class="container">
        <div class="row">
          <div class="form-group col-md-4">
            <label>Function Name</label>
            <input
              type="text"
              onChange={onInputChangeFunctionsName}
              class="form-control"
            />
          </div>
          <div class="form-group col-md-2">
            <label>Action</label>
            <select
              class="form-control"
              onChange={onInputChangeFunctionsAction}
            >
              <option value="view" selected>
                View
              </option>
              <option value="call">Call</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label></label>
            <button
              onClick={onCreateMethod}
              class="btn btn-success form-control "
            >
              Create
            </button>
          </div>
          <div class="form-group col-md-2">
            <label></label>
            <button
              onClick={getMethodFromSource}
              class="btn btn-success form-control "
            >
              Detect
            </button>
          </div>
          <div class="form-group col-md-2">
            <label></label>
            <button
              data-bs-toggle="modal"
              data-bs-target="#export"
              class="btn btn-success form-control "
            >
              Export
            </button>
            <div
              class="modal fade"
              id="export"
              tabindex="-1"
              aria-labelledby="exportLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exportLabel">
                      Choose Method to Export
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    {state.contractAbiMethod &&
                      state.contractAbiMethod.map(
                        (functions, functionsIndex) => (
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={functions.export}
                              onChange={() =>
                                onSwitchChangeArgExport(
                                  functions.kind,
                                  functionsIndex
                                )
                              }
                              id={`flexSwitchCheckDefaultView${functionsIndex}`}
                            />
                            <label
                              class="form-check-label"
                              for={`flexSwitchCheckDefault${functionsIndex}`}
                            >
                              {functions.name}
                            </label>
                          </div>
                        )
                      )}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={exportForm}
                      class="btn btn-primary"
                    >
                      {state.commitLoading && Loading} Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.createMethodError && state.createMethodError}
    </div>
    <br />
    {state.contractAbiMethod &&
      state.contractAbiMethod.map((functions, functionsIndex) => (
        <div class="card mb-2">
          <div class="card-header">
            <div class="container">
              <div class="row">
                <div class="col pt-2">
                  <h5>{functions.name}</h5>
                </div>
                <div class="col text-end pt-2">
                  {" "}
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveMethod(functions.kind, functionsIndex)
                    }
                    class="btn-close"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="form-group col-md-4">
                  <h5>Arguments</h5>
                </div>
                <div class="form-group col-md-4">
                  <button
                    class="btn btn-primary"
                    onClick={(e) =>
                      onCreateArgs(functions.name, functionsIndex)
                    }
                  >
                    Add
                  </button>
                </div>
                <div class="form-group col-md-4">
                  <button
                    class="btn btn-secondary"
                    onClick={(e) =>
                      getArgsFromMethod(
                        functions.name,
                        functions.kind,
                        functionsIndex
                      )
                    }
                  >
                    Auto detect
                  </button>
                </div>
              </div>
            </div>
            <br />
            {functions.params.args &&
              functions.params.args.map((args, argIndex) => {
                return (
                  <div class="container pb-2">
                    <div class="row">
                      <div class="form-group col-md-4">
                        <input
                          placeholder="Argument name"
                          class="form-control"
                          onChange={(e) =>
                            onInputChangeArgName(e, functionsIndex, argIndex)
                          }
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <select
                          class="form-control"
                          onChange={(e) =>
                            onInputChangeArgType(e, functionsIndex, argIndex)
                          }
                        >
                          <option selected disabled>
                            Type
                          </option>
                          <option value="string">String</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="json">Json</option>
                          <option value="array">Array</option>
                        </select>
                      </div>
                      <div class="form-group col-md-4">
                        <input
                          onChange={(e) =>
                            onInputChangeArgValue(e, functionsIndex, argIndex)
                          }
                          class="form-control"
                          type="string"
                          placeholder="Argument value"
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <button
                          type="button"
                          onClick={() => onRemoveArg(functionsIndex, argIndex)}
                          class="btn btn-danger "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            {functions.kind == "call" ? (
              <>
                <div class="container pb-1 pt-3">
                  <div class="row">
                    <div class="form-group col-md-12">
                      <h5>Options</h5>
                    </div>
                  </div>
                </div>

         
          
