State.init({
  clientId: props.clientId ? props.clientId : null,
  clientName: props.clientName ? props.clientName : "",
  quizName: props.name ? props.name : "",
  coursework: props.coursework ? props.coursework : [],
  blueprint: props.blueprint ? props.blueprint : [],
  cMethod: props.abi ? props.abi : [],
  rpcUrl: "https://rpc.near.org/",
  archivalRpc: "https://archival-rpc.mainnet.near.org",
  nearBlockRpc: "https://api.nearblocks.io/",
  fName,
  fAction: "view",
  fLabel,
  cMerr,
  res,
  cAerr,
  messProccses: "",
  totalProcess: 0,
  endprocess: 1,
});

const header = {
  "Content-Type": "application/json",
};
const saveClientConfig = {
  clientId: state.clientId,
  clientName: state.clientName,
  clientContract: state.quizName,
  abi: state.cMethod,
};
const opGet = {
  headers: header,
  method: "GET",
};
const asyncIntervals = [];

const runAsyncInterval = (cb, interval, intervalIndex) => {
  cb();
  if (asyncIntervals[intervalIndex].run) {
    asyncIntervals[intervalIndex].id = setTimeout(
      () => runAsyncInterval(cb, interval, intervalIndex),
      interval
    );
  }
};
const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === "function") {
    const intervalIndex = asyncIntervals.length;
    asyncIntervals.push({ run: true, id: id });
    runAsyncInterval(cb, interval, intervalIndex);
    return intervalIndex;
  } else {
    throw new Error("Callback must be a function");
  }
};
const clearAsyncInterval = (intervalIndex) => {
  if (asyncIntervals[intervalIndex].run) {
    clearTimeout(asyncIntervals[intervalIndex].id);
    asyncIntervals[intervalIndex].run = false;
    State.update({
      endprocess: state.endprocess++,
    });
  }
};
const updatequizName = (e) => {
  State.update({ quizName: data.toLowerCase() });
};

const updateCoursework = (e) => {
  State.update({ coursework: data });
};

const updateBlueprint = (e) => {
  State.update({ blueprint: data });
};

const cFunc = (e, type) => {
  const data = e.target.value;
  if (type == "name") State.update({ fName: data });
  if (type == "label") State.update({ fLabel: data });
  if (type == "action") State.update({ fAction: data });
  if (type == "quiz") State.update({ quizName: data.toLowerCase() });
  if (type == "coursework") State.update({ coursework: data });
  if (type == "blueprint") State.update({ blueprint: data });
};
const cep = "magicbuild.near";
const onCreateArgs = (fName, fIndex) => {
  State.update({ cAerr: { [fName]: null } });
  const arg = {
    name: "",
    label: "",
    button: "",
    className: "",
    classButton: "",
    type_schema: {
      type: "string",
    },
    value: "",
  };
  const abiMethod = state.cMethod;
  abiMethod[fIndex].params.args.push(arg);
  State.update({ cMethod: abiMethod });
};
const cMLabel = (e, fIdx, type) => {
  const value = e.target.value;
  const a = state.cMethod;
  if (type == "method") a[fIdx].label = value;
  if (type == "className") a[fIdx].className = value;
  if (type == "classButton") a[fIdx].classButton = value;
  if (type == "button") a[fIdx].button = value;
  if (type == "gas") a[fIdx].gas = parseInt(value) || 0;
  if (type == "deposit") a[fIdx].deposit = parseInt(value) || 0;
  if (type == "remove") a.splice(fIdx, 1);
  console.log("a", a);
  State.update({ cMethod: a });
};
const cAD = (e, fIdx, aIdx, type) => {
  const value = e.target.value;
  const a = state.cMethod;
  if (type == "name") a[fIdx].params.args[aIdx].name = value;
  if (type == "label") a[fIdx].params.args[aIdx].label = value;
  if (type == "className") a[fIdx].params.args[aIdx].className = value;
  if (type == "type") a[fIdx].params.args[aIdx].type_schema.type = value;
  if (type == "value") {
    if (a[fIdx].params.args[aIdx].type_schema.type == "integer") {
      a[fIdx].params.args[aIdx].value = parseInt(value);
    }
    if (a[fIdx].params.args[aIdx].type_schema.type == "array") {
      a[fIdx].params.args[aIdx].value = value.split("|"); //check valid
    }
    if (a[fIdx].params.args[aIdx].type_schema.type == "boolean") {
      a[fIdx].params.args[aIdx].value = Boolean(value);
    }
    if (a[fIdx].params.args[aIdx].type_schema.type == "json") {
      a[fIdx].params.args[aIdx].value = JSON.parse(value); //check valid
    }
    if (a[fIdx].params.args[aIdx].type_schema.type == "string") {
      a[fIdx].params.args[aIdx].value = value; //check valid
    }
    if (a[fIdx].params.args[aIdx].type_schema.type == "enum") {
      a[fIdx].params.args[aIdx].value = value; //check valid
    }
    if (a[fIdx].params.args[aIdx].type_schema.type == "$ref") {
      a[fIdx].params.args[aIdx].value = value; //check account valid
    }
  }
  if (type == "remove") a[fIdx].params.args.splice(aIdx, 1);
  State.update({ cMethod: a });
};
const onCreateMethod = () => {
  if (state.fName.length > 0) {
    State.update({ cMerr: null });
    const method = {
      name: state.fName,
      kind: state.fAction,
      label: state.fLabel,
      button: "",
      className: "",
      classButton: "",
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
      State.update({ cMerr: "Method Exist!" });
    }
  } else {
    State.update({ cMerr: "Please Input Method Name!" });
  }
};
const getMethodFromSource = () => {
  const res = fetch(state.rpcUrl, {
    body: JSON.stringify({
      method: "POST",
      params: {
        request_type: "view_code",
        account_id: state.quizName,
        finality: "final",
      },
      id: 154,
      jsonrpc: "2.0",
    }),
    headers: header,
    method: "POST",
  });
  State.update({ cMerr: null });
  State.update({ totalProcess: 0 });
  State.update({ endprocess: 1 });
  let abiMethod = [];
  State.update({ cMethod: [] });
  const resb = res.body;
  if (resb.result.code_base64) {
    const data = Buffer(resb.result.code_base64, "base64").toString("ascii");
    const fist = data.indexOf("memory");
    let second =
      data.indexOf("__data_end") !== -1
        ? data.indexOf("__data_end")
        : data.indexOf("P]");
    if (fist !== -1 && second !== -1) {
      const functionsData = data
        .substring(fist, second)
        .replace(/[^\w ]/g, " ")
        .split(" ");
      const filterFunction = [];
      functionsData.forEach((item, index) => {
        if (index > 0 && item.length > 1) {
          if (!/^[A-Z]+(?:_[A-Z]+)*$/m.test(item) && !/^[0-9]*$/.test(string)) {
            filterFunction.push(item);
          }
        }
      });

      filterFunction.forEach((item) => {
        const res = fetch(
          `${state.nearBlockRpc}v1/account/${state.quizName}/txns?method=${item}&order=desc&page=1&per_page=25`,
          opGet
        );
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
          const isScs = false;
          res.body.txns.forEach((item) => {
            if (item.outcomes.status) {
              isScs = true;
            }
          });
          if (isScs) {
            method.kind = "call";
          }
        }
        abiMethod.push(method);
      });
      State.update({ cMethod: abiMethod });
      abiMethod.forEach((item, index) => {
        getArgsFromMethod(item.name, index);
      });

      State.update({ totalProcess: filterFunction.length });
    } else {
      State.update({ cMerr: "Unable to detect Method!" });
    }
  }
};
const getArgsFromMethod = (fName, fIndex) => {
  asyncFetch(
    `${state.nearBlockRpc}v1/account/${state.quizName}/txns?method=${fName}&order=desc&page=1&per_page=1`,
    opGet
  )
    .then((res) => {
      const restxns = res.body.txns[0];
      if (restxns.outcomes.status && restxns.logs.length > 0) {
        const argsData = JSON.parse(
          restxns.logs[0].replace("EVENT_JSON:", "").replaceAll("\\", "")
        );

        const args = argsData.data[0] || argsData;
        const abiMethod = state.cMethod;

        abiMethod[fIndex].params.args = [];
        if (Object.keys(args).length > 0) {
          Object.keys(args).forEach((item) => {
            const arg = {
              name: item,
              type_schema: {
                type:
                  typeof args[item] == "number"
                    ? "integer"
                    : typeof args[item] == "object"
                    ? "json"
                    : typeof args[item],
              },
              value: "",
            };
            abiMethod[fIndex].kind = "call";
            abiMethod[fIndex].params.args.push(arg);
            State.update({ cMethod: abiMethod });
          });
        }
        State.update({
          endprocess: state.endprocess++,
        });
      } else {
        let countLoop = 0;
        const getArg = setAsyncInterval(() => {
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
                account_id: state.quizName,
                method_name: fName,
                args_base64: new Buffer.from(JSON.stringify(args)).toString(
                  "base64"
                ),
                finality: "final",
              },
              id: 154,
              jsonrpc: "2.0",
            }),
            headers: header,
            method: "POST",
          }).then((res) => {
            const strErr = res.body.result.error;
            if (strErr && strErr.includes("missing field")) {
              const argName = strErr.substring(
                strErr.indexOf("`") + 1,
                strErr.lastIndexOf("`")
              );
              const checkType = [
                { value: "", type: "string" },
                { value: 0, type: "integer" },
                { value: [], type: "array" },
                { value: true, type: "boolean" },
                { value: {}, type: "json" },
                { value: state.quizName, type: "$ref" },
              ];
              const isCheck = false;
              checkType.forEach((typeItem) => {
                if (isCheck == false) {
                  asyncFetch(state.rpcUrl, {
                    body: JSON.stringify({
                      method: "query",
                      params: {
                        request_type: "call_function",
                        account_id: state.quizName,
                        method_name: fName,
                        args_base64: new Buffer.from(
                          JSON.stringify({
                            [argName]: typeItem.value,
                          })
                        ).toString("base64"),
                        finality: "final",
                      },
                      id: 154,
                      jsonrpc: "2.0",
                    }),
                    headers: header,
                    method: "POST",
                  }).then((res) => {
                    const isExist = false;
                    const uS = (argName, type, value) => {
                      const arg = {
                        name: argName,
                        type_schema: {
                          type: type,
                        },
                        value: type == "enum" ? value[0] : value,
                      };
                      if (type == "enum") {
                        arg.enum = value;
                      }
                      abiMethod[fIndex].params.args.forEach((item) => {
                        if (item.name == argName) {
                          isExist = true;
                        }
                      });
                      if (isExist == false) {
                        abiMethod[fIndex].params.args.push(arg);
                        State.update({ cMethod: abiMethod });
                      }
                      if (isCheck && isExist) {
                        //  clearInterval(getArg);
                      }
                      isCheck = true;
                    };
                    if (res.body.result.result) {
                      clearAsyncInterval(getArg);
                    }
                    const ftch = res.body.result.error;

                    if (ftch) {
                      if (ftch.includes("Option::unwrap()`")) {
                        uS(argName, typeItem.type, typeItem.value);
                        abiMethod[fIndex].kind = "call";
                        State.update({ cMethod: abiMethod });
                        clearAsyncInterval(getArg);
                      }
                      if (ftch.includes("the account ID")) {
                        uS(argName, "$ref", state.quizName);
                      }
                      if (
                        ftch.includes("invalid type: sequence, expected u64")
                      ) {
                        uS(argName, "number", 300);
                      }
                      if (ftch.includes("invalid digit found")) {
                        uS(argName, "string", "300");
                      }
                      if (
                        ftch.includes(
                          "invalid type: sequence, expected a string"
                        )
                      ) {
                        if (isExist) {
                          uS(argName, "string", "wrap.near");
                        } else {
                          uS(argName, "string", "30");
                        }
                        // clearInterval(getArg);
                      }
                      if (
                        ftch.includes(
                          "data did not match any variant of untagged enum"
                        )
                      ) {
                        uS(argName, typeItem.type, ["300", "300"]);
                        clearAsyncInterval(getArg);
                      }

                      if (ftch.includes("not implemented")) {
                        uS(argName, typeItem.type, ["300", "300"]);
                        // clearInterval(getArg);
                      }
                      if (ftch.includes("invalid token id")) {
                        uS(argName, "$ref", "wrap.near");
                      }
                      if (ftch.includes("integer from empty string")) {
                        uS(argName, typeItem.type, "300");
                      }
                      if (ftch.includes("unknown variant")) {
                        isCheck = true;
                        const getEnum = ftch.match(/\`(.*?)\`/g);

                        const enumList = [];
                        getEnum.forEach((item, index) => {
                          if (index !== 0) {
                            enumList.push(item.replaceAll("`", ""));
                          }
                        });
                        uS(argName, "enum", enumList);
                      }
                      if (ftch.includes("missing field")) {
                        uS(argName, typeItem.type, typeItem.value);
                      }

                      if (ftch.includes("attached deposit")) {
                        uS(argName, typeItem.type, typeItem.value);
                        abiMethod[fIndex].kind = "call";
                        abiMethod[fIndex].deposit = parseInt(
                          strErr.match(/\d+/)[0]
                        );
                        State.update({ cMethod: abiMethod });
                        clearAsyncInterval(getArg);
                      }
                    } else {
                      uS(argName, typeItem.type, typeItem.value);
                      clearAsyncInterval(getArg);
                    }
                  });
                }
              });
            }
            if (res.body.result.result) {
              clearAsyncInterval(getArg);
            }
            if (strErr) {
              if (strErr.includes("Invalid register")) {
                abiMethod[fIndex].kind = "call";
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }
              if (strErr.includes("not implemented")) {
                clearAsyncInterval(getArg);
              }
              if (strErr.includes("Option::unwrap()`")) {
                abiMethod[fIndex].kind = "call";
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }
              if (strErr.includes("been initialized")) {
                abiMethod[fIndex].kind = "call";
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }
              if (strErr.includes("No token")) {
                abiMethod[fIndex].kind = "call";
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }
              if (strErr.includes("MethodNotFound")) {
                clearAsyncInterval(getArg);
              }
              if (
                strErr.includes("storage_write") ||
                strErr.includes("predecessor_account_id")
              ) {
                abiMethod[fIndex].kind = "call";
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }
              if (strErr.includes("attached deposit")) {
                abiMethod[fIndex].kind = "call";
                abiMethod[fIndex].deposit = parseInt(strErr.match(/\d+/)[0]);
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }

              if (strErr.includes("assertion failed: `(left == right)")) {
                abiMethod[fIndex].kind = "call";
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }
              if (strErr.includes("valid type: sequence, expected u64")) {
                abiMethod[fIndex].params.arg = 0;
                State.update({ cMethod: abiMethod });
                clearAsyncInterval(getArg);
              }
            }
          });
          countLoop++;
          if (countLoop == 20) {
            clearAsyncInterval(getArg);
          }
          State.update({
            messProccses: `Scanning Method : "${fName}"`,
          });
        }, 1000);
      }
    })
    .catch((err) => {
      if (err) {
        State.update({
          endprocess: state.endprocess++,
        });
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
          account_id: state.quizName,
          method_name: abiMethod[fIndex].name,
          args_base64: new Buffer.from(JSON.stringify(args)).toString("base64"),
          finality: "final",
        },
        id: 154,
        jsonrpc: "2.0",
      }),
      headers: header,
      method: "POST",
    }).then((res) => {
      const resb = res.body.result;
      if (resb.result) {
        const result = new Buffer.from(resb.result).toString();
        State.update({
          res: {
            [fName]: { value: result, error: false },
          },
        });
      }
      if (resb.error) {
        const error = resb.error;
        State.update({
          res: {
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
      Near.call(state.quizName, abiMethod[fIndex].name, args);
    }
    if (
      abiMethod[fIndex].deposit > 0 ||
      abiMethod[fIndex].gas > 30000000000000
    ) {
      Near.call(
        state.quizName,
        abiMethod[fIndex].name,
        args,
        abiMethod[fIndex].gas,
        abiMethod[fIndex].deposit
      );
    }
  }
};

const QuizContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

return (
  <>
    <div class="container border rounded p-5 border border-dark">
      <h3 class="text-center mb-3">Welcome to Probchain Quiz</h3>
      <h5 class="mb-4">Quiz Details</h5>
      <div class="mb-3">
        <div class="form-group mt-3">
          <h6 class="mb-2">Name</h6>
          <input
            class="form-control"
            value={state.quizName}
            placeholder="Quiz Names"
            onChange={(e) => cFunc(e, "name")}
          />
          <br />
          <h6 class="mb-2">Coursework:</h6>
          <input
            type="file"
            class="form-control"
            value={state.coursework}
            placeholder="Upload Coursework"
            onChange={(e) => cFunc(e, "coursework")}
          />
          <br />
          <h6 class="mb-2">Blueprint:</h6>
          <input
            type="file"
            class="form-control"
            value={state.blueprint}
            placeholder="Upload Blueprint"
            onChange={(e) => cFunc(e, "blueprint")}
          />
          <br />
          <label for="difficulty">Difficulty:</label>
          <select id="difficulty" class="form-control" name="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br />
          <label for="trueFalse">Number of True/False Questions:</label>
          <input
            type="number"
            class="form-control"
            id="trueFalse"
            name="trueFalse"
            min="0"
          />
          <br />
          <label for="mcqSingleSelect">
            Number of MCQ (Single Select) Questions:
          </label>
          <input
            type="number"
            class="form-control"
            id="mcqSingleSelect"
            name="mcqSingleSelect"
            min="0"
          />
          <br />
          <label for="mcqMultiSelect">
            Number of MCQ (Multi Select) Questions:
          </label>
          <input
            type="number"
            class="form-control"
            id="mcqMultiSelect"
            name="mcqMultiSelect"
            min="0"
          />
          <br />
          <button type="submit">Start Quiz</button>
        </div>
      </div>
    </div>
  </>
);
