State.init({
  id,
  contractAddress: "",
  rpcUrl: "https://rpc.near.org/",
  archivalRpc: "https://archival-rpc.mainnet.near.org",
  nearBlockRpc: "https://api.nearblocks.io/",
  fName,
  fAction: "view",
  cMethod: [],
  createMethodError,
  response,
  createArgError,
  checkMethodExport: [],
});
if (props.abi.body.functions) {
  State.update({ cMethod: props.abi.body.functions });
}
if (props.address) {
  State.update({ contractAddress: props.address });
}
if (props.id) {
  State.update({ id: props.id });
}
const onInputChangeFunctionsName = ({ target }) => {
  State.update({ fName: target.value });
};

const onInputChangeFunctionsAction = ({ target }) => {
  State.update({ fAction: target.value });
};
const onInputChangeContractAddress = ({ target }) => {
  State.update({ contractAddress: target.value.toLowerCase() });
};
const onCreateArgs = (fName, fIndex) => {
  State.update({ createArgError: { [fName]: null } });
  const arg = {
    name: "",
    type_schema: {
      type: "string",
    },
    value: "",
  };
  const abiMethod = state.cMethod;
  abiMethod[fIndex].params.args.push(arg);
  State.update({ cMethod: abiMethod });
};
const onInputChangeArgName = (e, fIndex, aIndex) => {
  const abiMethod = state.cMethod;
  abiMethod[fIndex].params.args[aIndex].name = e.target.value;
  State.update({ cMethod: abiMethod });
};
const onRemoveArg = (fIndex, aIndex) => {
  const abiMethod = state.cMethod;
  abiMethod[fIndex].params.args.splice(aIndex, 1);
  State.update({ cMethod: abiMethod });
};

const onInputChangeArgType = (e, fIndex, aIndex) => {
  const abiMethod = state.cMethod;
  abiMethod[fIndex].params.args[aIndex].type_schema.type = e.target.value;
  State.update({ cMethod: abiMethod });
};
const onInputChangeArgValue = (e, fIndex, aIndex) => {
  const abiMethod = state.cMethod;
  abiMethod[fIndex].params.args[aIndex].value = e.target.value;
  State.update({ cMethod: abiMethod });
};
const onCreateMethod = () => {
  if (state.fName.length > 0) {
    State.update({ createMethodError: null });
    const method = {
      name: state.fName,
      kind: state.fAction,
      export: true,
      params: {
        serialization_type: "json",
        args: [],
      },
      deposit: 0,
      gas: 30000000000000,
    };
    const abiMethod = state.cMethod;
    const isExistFunction = false;
    abiMethod.forEach((item) => {
      if (item.name == state.fName) {
        isExistFunction = true;
      }
    });
    if (!isExistFunction) {
      abiMethod.push(method);
      State.update({ cMethod: abiMethod });
    } else {
      State.update({ createMethodError: "Method Exist!" });
    }
  } else {
    State.update({ createMethodError: "Please Input Method Name!" });
  }
};
const onInputChangeDeposit = (fIndex, e) => {
  const abiMethod = state.cMethod;
  abiMethod[fIndex].deposit = parseInt(e.target.value);
  State.update({ cMethod: abiMethod });
};
const onInputChangeGas = (fIndex, e) => {
  const abiMethod = state.cMethod;
  abiMethod[fIndex].gas = e.target.value;
  State.update({ cMethod: abiMethod });
};
const getMethodFromSource = () => {
  State.update({ createMethodError: null });
  const abiMethod = [];
  State.update({ cMethod: [] });
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
            if (item.length > 1) {
              if (!/^[A-Z]+(?:_[A-Z]+)*$/m.test(item)) {
                if (!/^[0-9]*$/.test(string)) {
                  filterFunction.push(item);
                }
              }
            }
          }
        });
        filterFunction.forEach((item) => {
          asyncFetch(
            `${state.nearBlockRpc}v1/account/${state.contractAddress}/txns?method=${item}&order=desc&page=1&per_page=25`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
            }
          ).then((res) => {
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
            if (res.body.txns.length > 0) {
              const isCheckSuccess = false;
              res.body.txns.forEach((item) => {
                if (item.outcomes.status) {
                  isCheckSuccess = true;
                }
              });
              if (isCheckSuccess) {
                method.kind = "call";
              }
            }
            abiMethod.push(method);
            State.update({ cMethod: abiMethod });
            abiMethod.forEach((item, index) => {
              getArgsFromMethod(item.name, index);
            });
          });
        });
      } else {
        State.update({ createMethodError: "Unable to detect Method!" });
      }
    } else {
      State.update({ createMethodError: "Unable to detect Method!" });
    }
  });
};
const getArgsFromMethod = (fName, fIndex) => {
  console.log(state.cMethod);
  asyncFetch(
    `${state.nearBlockRpc}v1/account/${state.contractAddress}/txns?method=${fName}&order=desc&page=1&per_page=1`,
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
              const abiMethod = state.cMethod;
              abiMethod[fIndex].params.args = [];
              Object.keys(JSON.parse(args)).forEach((item) => {
                const arg = {
                  name: item,
                  type_schema: {
                    type: typeof JSON.parse(args)[item],
                  },
                  value: "",
                };

                abiMethod[fIndex].params.args.push(arg);
                State.update({ cMethod: abiMethod });
              });
            }
          }
        });
      }
    } else {
      const getArg = setInterval(() => {
        const abiMethod = state.cMethod;
        const argsArr = abiMethod[fIndex].params.args;
        const argMap = argsArr.map(({ name, value }) => ({ [name]: value }));
        const args = {};
        argMap.forEach((item) => {
          Object.assign(args, item);
        });

        asyncFetch(state.rpcUrl, {
          body: JSON.stringify({
            method: "query",
            params: {
              request_type: "call_function",
              account_id: state.contractAddress,
              method_name: fName,
              args_base64: new Buffer.from(JSON.stringify(args)).toString(
                "base64"
              ),
              finality: "optimistic",
            },
            id: 154,
            jsonrpc: "2.0",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }).then((res) => {
          if (res.body.result.error) {
            if (res.body.result.error.includes("missing field")) {
              const str = res.body.result.error;
              const argName = str.substring(
                str.indexOf("`") + 1,
                str.lastIndexOf("`")
              );
              const checkType = [
                { value: "", type: "string" },
                { value: 0, type: "number" },
                { value: [], type: "array" },
                { value: true, type: "boolean" },
                { value: "", type: "enum" },
                { value: {}, type: "object" },
              ];
              const isCheck = false;
              checkType.forEach((typeItem, typeIndex) => {
                if (isCheck == false) {
                  asyncFetch(state.rpcUrl, {
                    body: JSON.stringify({
                      method: "query",
                      params: {
                        request_type: "call_function",
                        account_id: state.contractAddress,
                        method_name: fName,
                        args_base64: new Buffer.from(
                          JSON.stringify({
                            [argName]: checkType[typeIndex].value,
                          })
                        ).toString("base64"),
                        finality: "optimistic",
                      },
                      id: 154,
                      jsonrpc: "2.0",
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                  }).then((res) => {
                    const fetchData = res.body.result.error;
                    const updateState = (argName, type, value) => {
                      isCheck = true;
                      const arg = {
                        name: argName,
                        type_schema: {
                          type: type,
                        },
                        value: value,
                      };
                      const isExist = false;
                      abiMethod[fIndex].params.args.forEach((item) => {
                        if (item.name == argName) {
                          isExist = true;
                        }
                      });
                      if (isExist == false) {
                        abiMethod[fIndex].params.args.push(arg);
                        State.update({ cMethod: abiMethod });
                      }
                    };
                    if (res.body.result.result) {
                      updateState(argName, typeItem.type, typeItem.value);
                      clearInterval(getArg);
                    }
                    if (fetchData.includes("the account ID")) {
                      updateState(argName, "$ref", state.contractAddress);
                    }
                    if (fetchData.includes("unknown variant")) {
                      isCheck = true;
                      const getEnum = fetchData
                        .substring(
                          fetchData.indexOf("expected one of") + 17,
                          fetchData.lastIndexOf("\\")
                        )
                        .replaceAll("`", "")
                        .split(",");
                      updateState(argName, typeItem.type, getEnum[0]);
                    }

                    if (fetchData.includes("Option::unwrap()`")) {
                      updateState(argName, typeItem.type, typeItem.value);
                      clearInterval(getArg);
                    }
                    if (fetchDatar.includes("missing field")) {
                      updateState(argName, typeItem.type, typeItem.value);
                    }
                  });
                }
              });
            }
            if (
              fetchData.includes("Requires attached deposit") ||
              fetchData.includes("storage_write") ||
              fetchData.includes("predecessor_account_id")
            ) {
              abiMethod[fIndex].kind = "call";
              State.update({ cMethod: abiMethod });
              clearInterval(getArg);
            }
            if (
              fetchData.includes("MethodNotFound") ||
              res.body.result.result
            ) {
              clearInterval(getArg);
            }
          }
        });
        setTimeout(() => {
          clearInterval(getArg);
        }, "10000");
      }, 1000);
    }
  });
};
const onBtnClickCall = (fName, action, fIndex) => {
  const abiMethod = state.cMethod;
  const argMap = abiMethod[fIndex].params.args.map(({ name, value }) => ({
    [name]: value,
  }));
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
          method_name: abiMethod[fIndex].name,
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
            [fName]: { value: result, error: false },
          },
        });
      }
      if (res.body.result.error) {
        const error = res.body.result.error;
        State.update({
          response: {
            [fName]: { value: error, error: true },
          },
        });
      }
    });
  }
  if (action === "call") {
    if (
      abiMethod[fIndex].deposit == 0 &&
      abiMethod[fIndex].gas == 30000000000000
    ) {
      Near.call(state.contractAddress, abiMethod[fIndex].name, args);
    }
    if (
      abiMethod[fIndex].deposit > 0 ||
      abiMethod[fIndex].gas > 30000000000000
    ) {
      Near.call(
        state.contractAddress,
        abiMethod[fIndex].name,
        args,
        abiMethod[fIndex].deposit,
        abiMethod[fIndex].gas
      );
    }
  }
};

const onRemoveMethod = (fIndex) => {
  const abiMethod = state.cMethod;
  abiMethod.splice(fIndex, 1);
  State.update({ cMethod: abiMethod });
};

return (
  <>
    <div class="container border rounded p-3 border-2">
      <div class="container">
        <div class="row mb-3">
          <div class="form-group col-md-12">
            <h6 class="mb-2">Contract Address</h6>
            <input
              class="form-control"
              value={state.contractAddress}
              placeholder="Contract Address"
              onChange={onInputChangeContractAddress}
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-4">
            <h6>Method Name</h6>
            <input
              type="text"
              onChange={onInputChangeFunctionsName}
              class="form-control"
            />
          </div>
          <div class="form-group col-md-2">
            <h6>Action</h6>
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
              class="btn btn-primary form-control "
            >
              Create
            </button>
          </div>

          <div class="form-group col-md-2">
            <label></label>
            <button
              onClick={getMethodFromSource}
              class="btn btn-primary form-control "
            >
              Scan
            </button>
          </div>
          <div class="form-group col-md-2">
            {state.cMethod.length > 0 ? (
              <Widget
                src={"kurodenjiro.near/widget/abi2form-export-widget-button"}
                props={state}
              />
            ) : (
              <>
                <label></label>
                <button
                  onClick={getMethodFromSource}
                  class="btn btn-primary form-control "
                >
                  Export
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {state.createMethodError && (
        <p class="text-danger" role="alert">
          {state.createMethodError}
        </p>
      )}
    </div>
    <br />
    {state.cMethod &&
      state.cMethod.map((functions, fIndex) => (
        <div class="card mb-2">
          <div class="card-header">
            <div class="container">
              <div class="row">
                <div class="col pt-2">
                  <h6>{functions.name}</h6>
                </div>
                <div class="col text-end pt-2">
                  {" "}
                  <button
                    type="button"
                    onClick={() => onRemoveMethod(fIndex)}
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
                  <h6>Arguments</h6>
                </div>
                <div class="form-group col-md-4">
                  <button
                    class="btn btn-secondary btn-sm"
                    onClick={(e) => onCreateArgs(functions.name, fIndex)}
                  >
                    Add
                  </button>
                </div>
                <div class="form-group col-md-4">
                  <button
                    class="btn btn-secondary btn-sm"
                    onClick={(e) => getArgsFromMethod(functions.name, fIndex)}
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
                          defaultValue={args.name || ""}
                          onChange={(e) =>
                            onInputChangeArgName(e, fIndex, argIndex)
                          }
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <select
                          defaultValue={args.type_schema.type}
                          class="form-control"
                          onChange={(e) =>
                            onInputChangeArgType(e, fIndex, argIndex)
                          }
                        >
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
                            onInputChangeArgValue(e, fIndex, argIndex)
                          }
                          class="form-control"
                          type="string"
                          placeholder="Argument value"
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <button
                          type="button"
                          onClick={() => onRemoveArg(fIndex, argIndex)}
                          class="btn btn-danger btn-sm"
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
                      <h6>Options</h6>
                    </div>
                  </div>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label>Attached deposit</label>
                      <input
                        type="text"
                        defaultValue="0"
                        onChange={(e) => onInputChangeDeposit(fIndex, e)}
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label>Gas</label>
                      <input
                        type="text"
                        defaultValue="30000000000000"
                        onChange={(e) => onInputChangeGas(fIndex, e)}
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {state.response[functions.name] &&
            state.response[functions.name] ? (
              <>
                <div
                  className={
                    state.response[functions.name].error
                      ? "alert  alert-danger"
                      : "alert  alert-primary"
                  }
                  role="alert"
                >
                  {state.response[functions.name].value}
                </div>
              </>
            ) : (
              ""
            )}
            <div class="container pt-2">
              <div class="row">
                <div class="form-group col-md-2">
                  <button
                    class="btn btn-primary btn-sm"
                    onClick={(e) =>
                      onBtnClickCall(functions.name, functions.kind, fIndex)
                    }
                  >
                    {functions.kind == "view" ? "View" : "Call"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
  </>
);
