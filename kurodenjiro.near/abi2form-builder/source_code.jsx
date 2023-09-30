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
  contractAbiCall: [],
  contractAbiView: [],
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
const onCreateArgs = (functionsName, functionsAction, functionsIndex) => {
  State.update({ createArgError: { [functionsName]: null } });
  const arg = {
    name: "",
    type_schema: {
      type: "string",
    },
    value: "",
  };

  if (functionsAction == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].params.args.push(arg);
    State.update({ contractAbiView: abiView });
  }

  if (functionsAction == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].params.args.push(arg);
    State.update({ contractAbiCall: abiCall });
  }
};
const onInputChangeArgName = (
  functionsAction,
  e,
  functionsIndex,
  argsIndex
) => {
  if (functionsAction == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].params.args[argsIndex].name = e.target.value;
    State.update({ contractAbiView: abiView });
    console.log(abiView);
  }
  if (functionsAction == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].params.args[argsIndex].name = e.target.value;
    State.update({ contractAbiCall: abiCall });
    console.log(abiCall);
  }
};
const onRemoveArg = (action, functionsIndex, argsIndex) => {
  if (action == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].params.args.splice(argsIndex, 1);
    State.update({ contractAbiView: abiView });
  }
  if (action == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].params.args.splice(argsIndex, 1);
    State.update({ contractAbiCall: abiCall });
  }
};

const onInputChangeArgType = (
  functionsAction,
  e,
  functionsIndex,
  argsIndex
) => {
  if (functionsAction == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].params.args[argsIndex].type_schema.type =
      e.target.value;
    State.update({ contractAbiView: abiView });
    console.log(abiView);
  }
  if (functionsAction == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].params.args[argsIndex].type_schema.type =
      e.target.value;
    State.update({ contractAbiCall: abiCall });
    console.log(abiCall);
  }
};
const onInputChangeArgValue = (
  functionsAction,
  e,
  functionsIndex,
  argsIndex
) => {
  if (functionsAction == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].params.args[argsIndex].value = e.target.value;
    State.update({ contractAbiView: abiView });
    console.log(abiView);
  }
  if (functionsAction == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].params.args[argsIndex].value = e.target.value;
    State.update({ contractAbiCall: abiCall });
    console.log(abiCall);
  }
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
  if (state.functionsAction == "view") {
    const abiView = state.contractAbiView;
    const isExistFunction = false;
    abiView.forEach((item) => {
      if (item.name == state.functionsName) {
        isExistFunction = true;
      }
    });
    if (!isExistFunction) {
      abiView.push(method);
      State.update({ contractAbiView: abiView });
    } else {
      State.update({ createMethodError: "Function Exist" });
    }
  }
  if (state.functionsAction == "call") {
    const abiCall = state.contractAbiCall;
    const isExistFunction = false;
    abiCall.forEach((item) => {
      if (item.name == state.functionsName) {
        isExistFunction = true;
      }
    });
    if (!isExistFunction) {
      abiCall.push(method);
      console.log(abiCall);
      State.update({ contractAbiCall: abiCall });
    } else {
      State.update({ createMethodError: "Function Exist" });
    }
  }
};

const onInputChangeDeposit = (action, functionsIndex, e) => {
  if (action == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].deposit = parseInt(e.target.value);
    State.update({ contractAbiView: abiView });
  }
  if (action == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].deposit = parseInt(e.target.value);
    State.update({ contractAbiCall: abiCall });
  }
};
const onInputChangeGas = (action, functionsIndex, e) => {
  if (action == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].gas = e.target.value;
    State.update({ contractAbiView: abiView });
    console.log(abiView);
  }
  if (action == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].gas = parseInt(e.target.value);
    State.update({ contractAbiCall: abiCall });
  }
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
        const abiCall = [];
        const abiView = [];
        State.update({ contractAbiView: [] });
        State.update({ contractAbiCall: [] });
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
            if (res.body.result.error) {
              const isCallFunction =
                res.body.result.error.search("storage_write");
              if (isCallFunction !== -1) {
                const method = {
                  name: item,
                  kind: "call",
                  export: true,
                  params: {
                    serialization_type: "json",
                    args: [],
                  },
                  deposit: 0,
                  gas: 30000000000000,
                };
                abiCall.push(method);
                State.update({ contractAbiCall: abiCall });
              } else {
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
                abiView.push(method);
                State.update({ contractAbiView: abiView });
              }
            } else {
              const method = {
                name: item,
                kind: "view",
                export: true,
                params: {
                  serialization_type: "json",
                  args: [],
                },
              };
              abiView.push(method);
              State.update({ contractAbiView: abiView });
            }
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
                if (action == "call") {
                  const arg = {
                    name: item,
                    type_schema: {
                      type: typeof JSON.parse(args)[item],
                    },
                    value: "",
                  };
                  const abiCall = state.contractAbiCall;
                  abiCall[functionsIndex].params.args = [];
                  abiCall[functionsIndex].params.args.push(arg);
                  State.update({ contractAbiCall: abiCall });
                }
              });
            }
          }
        });
      }
    }
  });
};
const onBtnClickCall = (functionsName, action, functionsIndex) => {
  if (action === "view") {
    const abiView = state.contractAbiView;
    const argMap = abiView[functionsIndex].params.args.map(
      ({ name, value }) => ({
        [name]: value,
      })
    );
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
          method_name: abiView[functionsIndex].name,
          args_base64: new Buffer.from(JSON.stringify(args)).toString("base64"), //fix here
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
    const abiCall = state.contractAbiCall;
    const argMap = abiCall[functionsIndex].params.args.map(
      ({ name, value }) => ({
        [name]: value,
      })
    );
    const args = {};
    argMap.forEach((item) => {
      Object.assign(args, item);
    });
    Near.call(
      state.contractAddress,
      abiCall[functionsIndex].name,
      args,
      abiCall[functionsIndex].deposit,
      abiCall[functionsIndex].gas
    );
  }
};

const onSwitchChangeArgExport = (action, functionsIndex) => {
  if (action == "view") {
    const abiView = state.contractAbiView;
    abiView[functionsIndex].export = !abiView[functionsIndex].export;
    State.update({ contractAbiView: abiView });
  }
  if (action == "call") {
    const abiCall = state.contractAbiCall;
    abiCall[functionsIndex].export = !abiCall[functionsIndex].export;
    console.log(abiCall);
    State.update({ contractAbiCall: abiCall });
  }
};

const onRemoveMethod = (action, functionsIndex) => {
  if (action == "view") {
    const abiView = state.contractAbiView;
    abiView.splice(functionsIndex, 1);
    State.update({ contractAbiView: abiView });
  }
  if (action == "call") {
    const abiCall = state.contractAbiCall;
    abiCall.splice(functionsIndex, 1);
    State.update({ contractAbiCall: abiCall });
  }
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
  const abiView = state.contractAbiView;
  abiView.forEach((item) => {
    abi.body.functions.push(item);
  });
  const abiCall = state.contractAbiCall;
  abiCall.forEach((item) => {
    if (item.export) {
      abi.body.functions.push(item);
    }
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
  console.log(JSON.stringify(abi));
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
  