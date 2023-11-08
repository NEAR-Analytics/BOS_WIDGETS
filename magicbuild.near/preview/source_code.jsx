State.init({
  contractAddress: props.contractAddress,
  contractAbi: props,
  contractError,
  contractAbiCall,
  contractAbiView,
  response,
  cMethod: props.cMethod,
  cssStyle: props.cssStyle,
});

const cArg = (e, functions, aIdx) => {
  const abiMethod = state.cMethod;
  const fIndex = 0;
  abiMethod.forEach((item, fIndex) => {
    if (item.name == functions.name) {
      fIndex = fIndex;
    }
  });
  console.log(abiMethod[fIndex]);
  abiMethod[fIndex].params.args[aIdx].value = e.target.value;
  State.update({ cMethod: abiMethod });
};
const onInputChangeContractArg = (obj) => {
  const data = state.cMethod;
  const isExist = false;
  const indexData = null;

  data.forEach((item, index) => {
    if (item.functions == obj.functions && item.name == obj.name) {
      isExist = true;
      indexData = index;
    }
  });

  if (isExist) {
    data[indexData].value = obj.value;
  } else {
    data.push(obj);
  }

  State.update({ cMethod: data });
};
const cDeposit = (functions, e) => {
  const data = state.contractAbiCall;
  data.forEach((item, fIndex) => {
    if (item.name == functions.name) {
      data[fIndex].deposit = e.target.value;
      State.update({ cMethod: data });
    }
  });
};
const onBtnClickCall = (functions, action) => {
  const argsArr = [];
  const data = state.cMethod;
  data.forEach((item) => {
    if (item.name == functions.name) {
      if (item.type == "number" || item.type == "integer") {
        item.value = parseInt(item.value);
      }
      if (item.type == "array") {
        item.value = item.value.split("|");
      }
      if (item.type == "json") {
        item.value = JSON.parse(item.value);
      }
      if (item.type == "boolean") {
        item.value = Boolean(item.value);
      }
      argsArr.push(item);
    }
  });

  const argMap = argsArr.map(({ name, value }) => ({ [name]: value }));
  const args = {};
  argMap.forEach((item) => {
    Object.assign(args, item);
  });
  if (action == "view") {
    asyncFetch("https://rpc.near.org/", {
      body: JSON.stringify({
        method: "query",
        params: {
          request_type: "call_function",
          account_id: state.contractAddress,
          method_name: functions.name,
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
            [functions.name]: { value: result, error: false },
          },
        });
      }
      if (res.body.result.error) {
        const error = res.body.result.error;
        State.update({
          response: {
            [functions.name]: { value: error, error: true },
          },
        });
      }
    });
  }
  if (action == "call") {
    Near.call(state.contractAddress, functions.name, args);
    if (functions.deposit == 0 && functions.gas == 30000000000000) {
      Near.call(state.contractAddress, functions.name, args);
    }
    if (functions.deposit > 0 || functions.gas > 30000000000000) {
      Near.call(
        state.contractAddress,
        functions.name,
        args,
        functions.gasUnit == "near"
          ? functions.gas * Math.pow(10, 24)
          : functions.gas,
        functions.depositUnit == "near"
          ? functions.deposit * Math.pow(10, 24)
          : functions.deposit
      );
    }
  }
};

const loadData = () => {
  const abi = {
    schema_version: "0.3.0",
    address: props.contractAddress,
    metadata: {
      name: "",
      version: "0.1.0",
      authors: [""],
    },
    body: {
      functions: [],
    },
  };

  if (state.cMethod) {
    const abiMethod = state.cMethod;
    abiMethod.forEach((item) => {
      abi.body.functions.push(item);
    });
    if (abi.body.functions) {
      const contractCall = [];
      const contractView = [];
      abi.body.functions.forEach((item) => {
        if (item.kind == "call") {
          contractCall.push(item);
        }
        if (item.kind == "view") {
          contractView.push(item);
        }
        State.update({ contractAbiCall: contractCall });
        State.update({ contractAbiView: contractView });
      });
      State.update({ contractError: null });
    } else {
      State.update({ contractError: "Can not parse ABI" });
    }
  }
};
loadData();

const notLoggedInWarning = <p class="text-center py-2"> Login to Use BOS </p>;

const Wrapper = styled.div`
 ${state.cssStyle}
`;

return (
  <>
    <Wrapper class="container">
      {context.accountId ? contractForm : notLoggedInWarning}
      <h3 class="text-center">{state.contractAddress}</h3>
      {state.contractError}
      {state.contractAbiView &&
        state.contractAbiView
          .filter((functions) => functions.export == true)
          .map((functions) => (
            <div className={`card mb-2 ${functions.className}`}>
              <div class="card-header">
                {functions.label.length > 0 ? functions.label : functions.name}
              </div>
              <div class="card-body">
                {functions.params.args &&
                  functions.params.args.map((args, argIndex) => {
                    return (
                      <div className={`form-group pb-2 ${args.className}`}>
                        <label>
                          {args.label.length > 0 ? args.label : args.name}
                        </label>
                        <input
                          class="form-control"
                          value={args.value || ""}
                          onChange={(e) => cArg(e, functions, argIndex, args)}
                        />
                        {args.type_schema.type == "string" ||
                        args.type_schema.type == "$ref" ||
                        args.type_schema.type == "integer" ||
                        args.type_schema.type == "json" ||
                        args.type_schema.type == "array" ? (
                          <input
                            class="form-control"
                            placeholder={
                              args.type_schema.type == "string" ||
                              args.type_schema.type[0] == "string"
                                ? "string"
                                : args.type_schema.type == "integer" ||
                                  args.type_schema.type[0] == "integer"
                                ? "number"
                                : args.type_schema.type == "array"
                                ? "array : a|b"
                                : args.type_schema.type == "json"
                                ? "json : { }"
                                : args.type_schema.$ref
                                ? "Account Address"
                                : "text"
                            }
                            defaultValue={args.value}
                            onChange={(e) => cArg(e, functions, argIndex, args)}
                          />
                        ) : (
                          ""
                        )}
                        {args.type_schema.type == "boolean" ? (
                          <select
                            defaultValue={args.type_schema.type}
                            class="form-control"
                            onChange={(e) =>
                              onInputChangeContractArg({
                                functions: functions.name,
                                name: args.name,
                                type: "boolean",
                                value: e.target.value,
                              })
                            }
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        ) : (
                          ""
                        )}
                        {args.type_schema.type == "enum" ? (
                          <select
                            defaultValue={args.type_schema.type}
                            class="form-control"
                            onChange={(e) =>
                              onInputChangeContractArg({
                                functions: functions.name,
                                name: args.name,
                                type: "string",
                                value: e.target.value,
                              })
                            }
                          >
                            {args.enum &&
                              args.enum.map((item, i) => (
                                <option value={item}>{item}</option>
                              ))}
                          </select>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                {state.response[functions.name] ? (
                  <>
                    <div
                      className={
                        state.response[functions.name].error
                          ? "alert  alert-danger"
                          : "alert  alert-primary"
                      }
                      role="alert"
                    >
                      <pre>
                        {JSON.stringify(
                          JSON.parse(state.response[functions.name].value),
                          null,
                          2
                        )}
                      </pre>
                      <button
                        class="btn btn-dark btn-sm mt-2"
                        onClick={() => {
                          clipboard.writeText(
                            state.response[functions.name].value
                          );
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <button
                  className={`btn  btn-primary ${functions.classButton}`}
                  data-action="view"
                  onClick={(e) => onBtnClickCall(functions, functions.kind)}
                >
                  {functions.button.length > 0 ? functions.button : "View"}
                </button>
              </div>
            </div>
          ))}

      {state.contractAbiCall &&
        state.contractAbiCall
          .filter((functions) => functions.export == true)
          .map((functions, fIndex) => (
            <div class={`card mb-2 ${functions.className}`}>
              <div class="card-header">
                {functions.label.length > 0 ? functions.label : functions.name}
              </div>
              <div class="card-body">
                {functions.params.args &&
                  functions.params.args.map((args) => {
                    return (
                      <div className={`form-group pb-2 ${args.className}`}>
                        <label>
                          {args.label.length > 0 ? args.label : args.name}
                        </label>
                        {args.type_schema.type == "string" ||
                        args.type_schema.type == "$ref" ||
                        args.type_schema.type == "integer" ||
                        args.type_schema.type == "json" ||
                        args.type_schema.type == "array" ? (
                          <input
                            class="form-control"
                            type={"string"}
                            placeholder={
                              args.type_schema.type == "string" ||
                              args.type_schema.type[0] == "string"
                                ? "string"
                                : args.type_schema.type == "integer" ||
                                  args.type_schema.type[0] == "integer"
                                ? "number"
                                : args.type_schema.type == "array"
                                ? "array : a|b"
                                : args.type_schema.type == "json"
                                ? "json : {}"
                                : args.type_schema.$ref
                                ? "Account Address"
                                : "text"
                            }
                            onChange={(e) =>
                              onInputChangeContractArg({
                                functions: functions.name,
                                name: args.name,
                                type:
                                  args.type_schema.type == "string" ||
                                  args.type_schema.type[0] == "string"
                                    ? "text"
                                    : args.type_schema.type == "integer" ||
                                      args.type_schema.type[0] == "integer"
                                    ? "number"
                                    : args.type_schema.type == "array"
                                    ? "array"
                                    : args.type_schema.type == "json"
                                    ? "json"
                                    : args.type_schema.$ref
                                    ? "text"
                                    : "text",
                                value: e.target.value,
                              })
                            }
                          />
                        ) : (
                          ""
                        )}
                        {args.type_schema.type == "boolean" ? (
                          <select
                            defaultValue={args.type_schema.type}
                            class="form-control"
                            onChange={(e) =>
                              onInputChangeContractArg({
                                functions: functions.name,
                                name: args.name,
                                type: "boolean",
                                value: e.target.value,
                              })
                            }
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        ) : (
                          ""
                        )}
                        {args.type_schema.type == "enum" ? (
                          <select
                            defaultValue={args.type_schema.type}
                            class="form-control"
                            onChange={(e) =>
                              onInputChangeContractArg({
                                functions: functions.name,
                                name: args.name,
                                type: "string",
                                value: e.target.value,
                              })
                            }
                          >
                            {args.enum &&
                              args.enum.map((item, i) => (
                                <option value={item}>{item}</option>
                              ))}
                          </select>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                {functions.selfInputDeposit && (
                  <div className={`form-group pb-2`}>
                    <label>
                      {functions.labelDeposit.length > 0
                        ? functions.labelDeposit
                        : "Deposit"}
                    </label>
                    <input
                      type="text"
                      value={functions.deposit}
                      defaultValue={functions.deposit}
                      onChange={(e) => cDeposit(functions, e)}
                      class="form-control "
                    />
                  </div>
                )}

                {state.response[functions.name] ? (
                  <p class="card-text">{state.response[functions.name]}</p>
                ) : (
                  ""
                )}
                <button
                  className={`btn btn-primary ${functions.classButton}`}
                  data-action="call"
                  onClick={(e) => onBtnClickCall(functions, functions.kind)}
                >
                  {functions.button.length > 0 ? functions.button : "Call"}
                </button>
              </div>
            </div>
          ))}
    </Wrapper>
  </>
);
