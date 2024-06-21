const ACCOUNT_ID = "dev.near";
const API_URL = "https://hub.nearspace.info/api";
const SIGNATURE_RECIPIENT = "ai.near";
const STORAGE_KEY = `session_storage`;

const referer = fetch(`https://annotation.nearspace.info/api/get_referer/`, {
  method: "POST",
}).body;
if (!referer) return "";

const CALLBACK_URL = `${referer}${ACCOUNT_ID}/widget/Hub`;

const CSS_URL =
  "https://gist.githubusercontent.com/zavodil/10ed1d07c893e04571332f1cb2408226/raw/d65b8f258eb23217c5f58d05248fdb8aab4c5768/add.style.css";

const css = fetch(CSS_URL).body;
if (!css) return "";

if (state === undefined) {
  State.init({
    resetSession: false,
    pendingAuth: false,
    pendingRequest: false,
    nonce: 0,
    updateDockerStatus: true,
    theme: styled.div`${css}
    
    body{
  background-color: rgb(0, 0, 0);
}

.Cur_Input_Line{
    position: relative;
    width: 100%;
    height: 10%;
    /* border: 1px solid white; */
    font-size: 20px;
}
span{
    font-family: monospace;
    font-weight: 700;
}
.Ter_Green{
    color:chartreuse
}
.Ter_Blue{
    color:cyan
}
.Ter_Gray{
    color: rgb(167, 166, 166);
}

.commandLog {
  display: inline-flex;
        color: #fff;
    font-size: 20px;
    font-weight: 700;
    font-family: monospace;

    border: none;
    border-color: transparent;
    background-color: rgb(0, 0, 0);
    width: 100%;
}


input{
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    font-family: monospace;

    border: none;
    border-color: transparent;
    background-color: rgb(0, 0, 0);
    width: 75%;
}
input:focus{
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    font-family: monospace;

    border: none;
    border-color: transparent;
    outline: none;
    background-color:rgb(0, 0, 0);

    width: 75%;
    // caret-color: #000;
}

.Ter_Input{
    width: 75%;

}

@keyframes Blink_Ani {
    from{ background-color: #000;}
    to{ background-color: #fff;}
}
.Blink{
    position:absolute;
    left:310px;
    top: 3px;
    height: 20px;
    width: 12px;
    background-color: #fff;
    opacity: 1;
    z-index: 5;

}`,
  });

  // Auto refresh docker status
  setInterval(() => {
    State.update((state) => ({
      ...state,
      nonce:
        !!state.sessionId && !!state.updateDockerStatus
          ? state.nonce + 1
          : state.nonce,
    }));
  }, 3000);
}

const loadDockerStatus = () => {
  if (state.sessionId) {
    asyncFetch(`${API_URL}/is_running`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: state.sessionId,
        account_id: context.accountId,
      }),
    }).then((res) => {
      console.log("is_running res", res);
      if (res.ok) {
        if (res.body.is_session_valid) {
          State.update({ isRunning: res.body.is_running ?? false });
        } else {
          console.log("is_session_valid FALSE. state", state);

          State.update({
            //resetSession: true,
            resetSession: !state.resetSession,
            sessionId: null,
            isSessionValid: false,
            pendingRequest: false,
          });
        }
      } else {
        State.update({ updateDockerStatus: false });
      }
    });
  }
};

useEffect(() => {
  loadDockerStatus();
}, [state.nonce]);

const Theme = state.theme;

const onAuth = (data) => {
  const isSessionValid = !!data.is_signature_valid && !!data.session_id;
  console.log("onAuth Index", data, isSessionValid);
  State.update({
    sessionId: data.session_id,
    isSessionValid,
    resetSession: false,
    pendingAuth: false,
  });
  Storage.privateSet(STORAGE_KEY, data.session_id);
};

const hashParams = (window?.location?.hash ?? "")
  .split("&")
  .reduce((acc, param) => {
    const [key, value] = param.split("=");
    if (key) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return acc;
  }, {});

const onLogout = () => {
  console.log("onLogout");
  Storage.privateSet(STORAGE_KEY, null);
  State.update({
    isSessionValid: false,
    sessionId: null,
    resetSession: true,
    pendingRequest: false,
    pendingAuth: false,
  });
};

const sessionContainer = (
  <>
    <Widget
      src={`${ACCOUNT_ID}/widget/op-session`}
      props={{
        storageKey: STORAGE_KEY,
        message: "Welcome to NEAR.AI",
        recipient: SIGNATURE_RECIPIENT,
        callbackUrl: CALLBACK_URL,
        apiUrl: API_URL,
        signature: hashParams?.signature,
        publicKey: hashParams?.publicKey,
        onAuth,
        onLogout,
        className: "btn btn-primary p-2",
        resetSession: state.resetSession,
        setResetSession: (resetSession) => {
          console.log("setResetSession", resetSession);
          State.update({ resetSession });
        },
        pendingAuth: state.pendingAuth,
        setPendingAuth: (pendingAuth) => {
          State.update({ pendingAuth });
        },
      }}
    />
  </>
);

const showSessionContainer =
  state.resetSession || (!state.pendingRequest && !state.isSessionValid);

let isGetTask = false;

console.log(
  "Index: ",
  state.pendingRequest,
  state.isSessionValid,
  "showSessionContainer",
  showSessionContainer
);

const setDataUrlFromBlob = (file) => {
  if (!file?.dataUrl) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!file?.dataUrl) {
        console.log("reader.result", reader.result);
        let files = state.files ?? [];
        files.push({ file, dataUrl: reader.result });

        console.log("files", files);

        State.update({ files });
      }
    };
    reader.readAsDataURL(file);
  }
};

const filesOnChange = (file) => {
  console.log("filesOnChange 0", file);
  if (file?.length > 0) {
    const body = file[0];
    console.log("filesOnChange", file, file[0]);

    setDataUrlFromBlob(body);
  } else {
    State.update({
      files: [],
    });
  }
};

const filesUpload = () => {
  console.log("filesUpload");
  if ((state.files ?? []).length > 0) {
    const boundary =
      "----WebKitFormBoundary" + Math.random().toString(36).substr(2);
    const body = [];

    body.push("--" + boundary);
    body.push('Content-Disposition: form-data; name="account_id"');
    body.push("");
    body.push(context.accountId);

    body.push("--" + boundary);
    body.push('Content-Disposition: form-data; name="session_id"');
    body.push("");
    body.push(state.sessionId);

    for (let i = 0; i < state.files.length; i++) {
      const file_item = state.files[i];
      body.push("--" + boundary);
      body.push(
        'Content-Disposition: form-data; name="file"; filename="' +
          file_item.file.name +
          '"'
      );
      body.push("Content-Type: " + file_item.file.type);
      body.push("");
      body.push(file_item.dataUrl);
    }
    body.push("--" + boundary + "--");

    const requestBody = body.join("\r\n");

    console.log("body", body);

    asyncFetch(`${API_URL}/file_upload`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=" + boundary,
      },
      body: requestBody,
    }).then((res) => {
      console.log("res filesUpload", res);
      State.update({ files: [] });
    });
  }
};

const submitUserCommand = () => {
  if (state.userCommand && !state.userCommandPending) {
    State.update({ userCommandPending: true });
    let commandsLog = state.commandsLog ?? [];
    commandsLog.push(state.userCommand);
    asyncFetch(`${API_URL}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: state.userCommand,
        session_id: state.sessionId,
        account_id: context.accountId,
      }),
    }).then((res) => {
      console.log("res", res);
      console.log("res2", res.body.body.split("\r\n"));
      if (res.ok && res.body.exit_code == 0) {
        res.body.body.split("\r\n").map((item) => {
          let itemCleaned = removeAnsiCodes(item);
          if (!itemCleaned) itemCleaned = "Done";
          commandsLog.push(itemCleaned);
        });
      } else {
        commandsLog.push(`Error ${res.body.exit_code}`);
      }

      console.log("commandsLog", commandsLog);
      State.update({ commandsLog, userCommand: "", userCommandPending: false });
    });
  }
};

const commandLogPrefix = (
  <>
    <span class="Ter_Green">user</span>
    <span class="Ter_Gray">@near-ai</span>
    <span class="Ter_Green">~</span>
    <span class="Ter_Gray">&gt;</span>
  </>
);

const removeAnsiCodes = (str) => {
  const ansiRegex = /\x1B\[[0-9;]*[a-zA-Z]/g;
  return str.replace(ansiRegex, "");
};

return (
  <Theme class="w-100" style={{ overflowY: "scroll" }}>
    {state.pendingRequest && <Widget src={`${ACCOUNT_ID}/widget/op-loading`} />}

    {(!showSessionContainer || state.sessionId) && (
      <div class="container">
        <div class="row">
          <div class="col" style={{ backgroundColor: "black" }}>
            {(state.commandsLog ?? []).map((item) => (
              <div class="commandLog">
                {commandLogPrefix}
                <input class="Ter_Input" readonly value={item} />
              </div>
            ))}
            <div class="commandLog">
              {commandLogPrefix}
              <input
                style={{ caretColor: "white" }}
                type="text"
                class="Ter_Input"
                value={state.userCommandPending ? "" : state.userCommand ?? ""}
                onChange={(e) => {
                  State.update({ userCommand: e.target.value });
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    submitUserCommand();
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-2">
            <h4>Docker</h4>
            <Files
              multiple={false}
              minFileSize={1}
              clickable
              className="btn btn-outline-primary"
              onChange={filesOnChange}
            >
              Add file
            </Files>

            {(state.files ?? []).map((file_item) => (
              <li>{file_item.file.name}</li>
            ))}
            {
              /*state.isRunning &&*/ (state.files ?? []).length > 0 && (
                <button onClick={() => filesUpload()}>Upload</button>
              )
            }
            {/*
          </div>
          <div class="col-2">
           
            {<button
              onClick={() => {
                asyncFetch(`${API_URL}/start_docker`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    session_id: state.sessionId,
                    account_id: context.accountId,
                  }),
                }).then((res) => {
                  console.log("start_docker", res);
                  State.update({ updateDockerStatus: true });
                });
              }}
            >
              start_docker
            </button>*/}
            {state.isRunning && <div>Docker is active</div>}
          </div>
          <div class="col-6 hidden">
            <h4>Run Command</h4>
            <div>
              <textarea
                value={state.command1}
                onChange={(e) => State.update({ command1: e.target.value })}
              />
            </div>
            <button
              onClick={() => {
                asyncFetch(`${API_URL}/run`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    command: state.command1,
                    session_id: state.sessionId,
                    account_id: context.accountId,
                  }),
                }).then((res) => {
                  console.log("res", res);
                  State.update({ value1: res.ok ? res.body : "Error" });
                });
              }}
            >
              Run
            </button>
            <pre>{JSON.stringify(state.value1)}</pre>
          </div>
          <div class="col-4">
            <h4>Run Server</h4>
            <button
              onClick={() => {
                asyncFetch(`${API_URL}/start_server`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    session_id: state.sessionId,
                    account_id: context.accountId,
                  }),
                }).then((res) => {
                  State.update({ value2: res.ok ? res.body : "Error" });
                  console.log(res);
                });
              }}
            >
              start_server
            </button>
            <pre>{JSON.stringify(state.value2)}</pre>
          </div>
        </div>
      </div>
    )}

    {showSessionContainer && sessionContainer}
  </Theme>
);
