State.init({
  contractAddress: props.address,
  contractAbi: props,
  contractError,
  contractAbiCall,
  contractAbiView,
  response,
  contractAbiArg: [],
});

const onInputChangeContractArg = (obj) => {
  const data = state.contractAbiArg;
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

  State.update({ contractAbiArg: data });
};

const onBtnClickCall = (e) => {
  const argsArr = [];
  const data = state.contractAbiArg;
  data.forEach((item) => {
    if (item.functions == e.target.dataset.name) {
      if (item.type == "number") {
        item.value = parseInt(item.value);
      }
      if (item.type == "array") {
        item.value = item.value.split("|");
      }
      argsArr.push(item);
    }
  });

  const argMap = argsArr.map(({ name, value }) => ({ [name]: value }));
  const args = {};
  argMap.forEach((item) => {
    Object.assign(args, item);
  });
  if (e.target.dataset.action == "view") {
    asyncFetch("https://rpc.near.org/", {
      body: JSON.stringify({
        method: "query",
        params: {
          request_type: "call_function",
          account_id: state.contractAddress,
          method_name: e.target.dataset.name,
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
            [e.target.dataset.name]: { value: result, error: false },
          },
        });
      }
      if (res.body.result.error) {
        const error = res.body.result.error;
        State.update({
          response: {
            [e.target.dataset.name]: { value: error, error: true },
          },
        });
      }
    });
  }
  if (e.target.dataset.action == "call") {
    const data = Near.call(state.contractAddress, e.target.dataset.name, args);
  }
};

const loadData = () => {
  const abi = state.contractAbi;
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
};
loadData();

const notLoggedInWarning = <p class="text-center py-2"> Login to Use BOS </p>;

return (
  <>
    <div class="container border border-info p-3">
      {context.accountId ? contractForm : notLoggedInWarning}
      <h3 class="text-center">
        Address:
        <span class="text-decoration-underline"> {state.contractAddress} </span>
      </h3>
      {state.contractError}
      {state.contractAbiView &&
        state.contractAbiView.map((functions) => (
          <div class="card mb-2">
            <div class="card-header">{functions.name}</div>
            <div class="card-body">
              {functions.params.args &&
                functions.params.args.map((args) => {
                  return (
                    <div class="form-group pb-2">
                      <label>{args.name}</label>
                      <input
                        class="form-control"
                        data-name={args.name}
                        data-type={
                          args.type_schema.type == "string" ||
                          args.type_schema.type[0] == "string"
                            ? "text"
                            : args.type_schema.type == "integer" ||
                              args.type_schema.type[0] == "integer"
                            ? "number"
                            : args.type_schema.type == "array"
                            ? "array"
                            : args.type_schema.$ref
                            ? "text"
                            : "text"
                        }
                        type={
                          args.type_schema.type == "string" ||
                          args.type_schema.type[0] == "string"
                            ? "text"
                            : args.type_schema.type == "integer" ||
                              args.type_schema.type[0] == "integer"
                            ? "number"
                            : args.type_schema.type == "array"
                            ? "array"
                            : args.type_schema.$ref
                            ? "text"
                            : "text"
                        }
                        placeholder={
                          args.type_schema.type == "string" ||
                          args.type_schema.type[0] == "string"
                            ? "string"
                            : args.type_schema.type == "integer" ||
                              args.type_schema.type[0] == "integer"
                            ? "number"
                            : args.type_schema.type == "array"
                            ? "array : a|b"
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
                                : args.type_schema.$ref
                                ? "text"
                                : "text",
                            value: e.target.value,
                          })
                        }
                      />
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
                    {state.response[functions.name].value}
                  </div>
                </>
              ) : (
                ""
              )}
              <button
                class="btn btn-primary"
                data-action="view"
                data-name={functions.name}
                onClick={onBtnClickCall}
              >
                View
              </button>
            </div>
          </div>
        ))}

      {state.contractAbiCall &&
        state.contractAbiCall.map((functions) => (
          <div class="card mb-2">
            <div class="card-header">{functions.name}</div>
            <div class="card-body">
              {functions.params.args &&
                functions.params.args.map((args) => {
                  return (
                    <div class="form-group pb-2">
                      <label>{args.name}</label>
                      <input
                        class="form-control"
                        data-name={args.name}
                        data-type={
                          args.type_schema.type == "string" ||
                          args.type_schema.type[0] == "string"
                            ? "text"
                            : args.type_schema.type == "integer" ||
                              args.type_schema.type[0] == "integer"
                            ? "number"
                            : args.type_schema.type == "array"
                            ? "array"
                            : args.type_schema.$ref
                            ? "text"
                            : "text"
                        }
                        type={
                          args.type_schema.type == "string" ||
                          args.type_schema.type[0] == "string"
                            ? "text"
                            : args.type_schema.type == "integer" ||
                              args.type_schema.type[0] == "integer"
                            ? "number"
                            : args.type_schema.type == "array"
                            ? "array"
                            : args.type_schema.$ref
                            ? "text"
                            : "text"
                        }
                        placeholder={
                          args.type_schema.type == "string" ||
                          args.type_schema.type[0] == "string"
                            ? "string"
                            : args.type_schema.type == "integer" ||
                              args.type_schema.type[0] == "integer"
                            ? "number"
                            : args.type_schema.type == "array"
                            ? "array : a|b"
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
                                : args.type_schema.$ref
                                ? "text"
                                : "text",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  );
                })}
              {state.response[functions.name] ? (
                <p class="card-text">{state.response[functions.name]}</p>
              ) : (
                ""
              )}
              <button
                class="btn btn-primary"
                data-action="call"
                data-name={functions.name}
                onClick={onBtnClickCall}
              >
                Call
              </button>
            </div>
          </div>
        ))}
    </div>
  </>
);
