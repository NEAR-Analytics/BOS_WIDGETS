State.init({
  contractAddress: "trustcore.near",
  contractAbi: {
    schema_version: "0.3.0",
    metadata: {
      name: "hello_near",
      version: "1.0.0",
      authors: [],
      build: {
        compiler: "tsc 4.7.4",
        builder: "near-sdk-js 1.0.0",
      },
    },
    body: {
      functions: [
        {
          name: "getUrl",
          kind: "view",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "name",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
          result: {
            serialization_type: "json",
            type_schema: {
              type: "string",
            },
          },
        },
        {
          name: "didParticipate",
          kind: "view",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "user",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
          result: {
            serialization_type: "json",
            type_schema: {
              type: "boolean",
            },
          },
        },
        {
          name: "participateArray",
          kind: "view",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
          result: {
            serialization_type: "json",
            type_schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        {
          name: "getAllPrompts",
          kind: "view",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [],
          },
          result: {
            serialization_type: "json",
            type_schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        {
          name: "getVotes",
          kind: "view",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
          result: {
            serialization_type: "json",
            type_schema: {
              type: "array",
              items: {
                type: "number",
              },
            },
          },
        },
        {
          name: "getCandidatePair",
          kind: "view",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
          result: {
            serialization_type: "json",
            type_schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        {
          name: "addCandidatePair",
          kind: "call",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "name1",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "name2",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "url1",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "url2",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
        },
        {
          name: "initializeVotes",
          kind: "call",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
        },
        {
          name: "addToPromptArray",
          kind: "call",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
        },
        {
          name: "clearPromptArray",
          kind: "call",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [],
          },
        },
        {
          name: "addVote",
          kind: "call",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "index",
                type_schema: {
                  type: "number",
                },
              },
            ],
          },
        },
        {
          name: "recordUser",
          kind: "call",
          modifiers: [],
          params: {
            serialization_type: "json",
            args: [
              {
                name: "prompt",
                type_schema: {
                  type: "string",
                },
              },
              {
                name: "user",
                type_schema: {
                  type: "string",
                },
              },
            ],
          },
        },
      ],
      root_schema: {
        type: "object",
        additionalProperties: false,
        patternProperties: {
          "^[0-9]+$": {
            type: "string",
          },
        },
        $schema: "http://json-schema.org/draft-07/schema#",
      },
    },
  },
  contractError,
  contractAbiCall,
  contractAbiView,
  response,
  contractAbiArg: [],
});

const onInputChangeContractAddress = ({ target }) => {
  State.update({ contractAddress: target.value });
};
const onInputChangeContractAbi = ({ target }) => {
  State.update({ contractAbi: target.value });
};

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
    asyncFetch("https://rpc.testnet.near.org/", {
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
const loadAbi = () => {
  //   const res = fetch(
  //     "https://raw.githubusercontent.com/kurodenjiro/verify-contract-near/main/abi.json"
  //   ).body;
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
loadAbi();
const onBtnClick = () => {
  const abi = JSON.parse(state.contractAbi);
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

// Define components
const contractForm = (
  <>
    <div class="border border-black p-3">
      <input
        class="form-control mb-3"
        value={state.contractAddress}
        placeholder="Contract Address"
        onChange={onInputChangeContractAddress}
      />
      <textarea
        class="form-control"
        placeholder="Contract ABI"
        value={state.contractAbi}
        onChange={onInputChangeContractAbi}
      ></textarea>
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Build Form
      </button>
    </div>
  </>
);

const notLoggedInWarning = (
  <p class="text-center py-2"> Login to Usint this Tool </p>
);

// Render
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
