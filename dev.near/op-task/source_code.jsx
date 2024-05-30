const USER = "user";
const AI = "ai";
const CHAT_DIRECT = "direct";
const CHAT_REVERSED = "reversed";
const ACCOUNT_ID = "fakeaccount.testnet";
const API_URL = "https://annotation.nearspace.info/api";
const PROBLEM_ID = 1;
const STATUS_ANNOTATION_PENDING = 0;
const STORAGE_KEY = `task_storage`;

const editEverythingMode = true;

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="svg-icon"
    width="20px"
    height="20px"
    verticalAlign="middle"
    fill="darkgrey"
    viewBox="0 0 1024 1024"
    version="1.1"
  >
    <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
    <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
  </svg>
);

/* duplicated css for debug. Loads in parent too */
/*const CSS_URL =
  "https://gist.githubusercontent.com/zavodil/10ed1d07c893e04571332f1cb2408226/raw/8bad3b0836bec04845cdbaa78bbad771a48a23f7/add.style.css";
const css = fetch(CSS_URL).body;
if (!css) return "";*/

State.init({
  attachConversation: true,
  // theme: styled.div`${css}`,
});

const {
  apiUrl,
  sessionId,
  annotationId,
  problemId,
  pendingRequest,
  setPendingRequest,
  onRequest,
} = props;
const storageKey = props.storageKey ?? STORAGE_KEY;

if (typeof setPendingRequest !== "function") {
  setPendingRequest = (data) => console.log("setPendingRequest", data);
}

if (typeof onRequest !== "function") {
  onRequest = (data) => console.log("onRequest", data);
}

if (!annotationId) {
  return "No data";
}

if (state.currentAnnotationId && state.currentAnnotationId != annotationId) {
  State.update({
    currentAnnotationId: null,
    taskLoaded: false,
    taskLoading: false,
  });
}

const getCurrentState = () => {
  return {
    user_message: state.userMessage,
    spec: state.spec,
  };
};

const saveChat = (isNewMessage, onSaveChat) => {
  setPendingRequest(true);
  asyncFetch(`${apiUrl}/submit_annotation/`, {
    method: "POST",
    body: JSON.stringify({
      id: annotationId,
      content: JSON.stringify(state.chat),
      current_state: JSON.stringify(getCurrentState()),
      account_id: context.accountId,
      session_id: sessionId,
      problem_id: problemId,
      prompts: getArray(state.userPrompts),
      attach_conversation: state?.attach_conversation ?? true,
      is_new_message: isNewMessage,
    }),
  }).then((res) => {
    if (res.ok) {
      // returns {is_session_valid, annotation_id?}
      onRequest(res.body);
    }

    if (typeof onSaveChat == "function") {
      onSaveChat(res);
    }

    console.log("request_annotation resp", res.ok, res.body);
    setPendingRequest(false);
  });
};

const getArray = (items) => (Array.isArray(items) ? items : []);

let getTaskData = () => {
  setPendingRequest(true);
  asyncFetch(`${apiUrl}/get_annotation_by_id/`, {
    method: "POST",

    body: JSON.stringify({
      annotation_id: annotationId,
      account_id: context.accountId,
      session_id: sessionId,
      problem_id: problemId,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log("request_annotation_by_id", sessionId, res);
      if (res.body.is_session_valid) {
        let task = res.body.task;
        let currentState = JSON.parse(task.current_state);
        let chat = JSON.parse(task.content);
        const lastAIReply = getLastReplyFromAI(chat.length + 1, chat);
        State.update({
          currentAnnotationId: annotationId,
          taskLoading: false,
          taskLoaded: true,
          chat: getArray(chat),
          spec: lastAIReply?.spec ?? "",
          editSpecIndex: lastAIReply?.index ?? 0,
          userMessage: currentState.user_message,
        });
      }
      // returns {is_session_valid, task}
      onRequest(res.body);
    }
    console.log("request_annotation_by_id resp", res.ok, res.body);
    setPendingRequest(false);
  });
};

if (!state.taskLoaded && !state.taskLoading && !pendingRequest) {
  State.update({ taskLoading: true });
  console.log("getTaskData", state);
  getTaskData();
}

const user_pics = {
  [USER]:
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp",
  [AI]: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp",
};
const LOCAL_BACKUP_KEY = "backup";

const spec = `I'm a spec

I'm using [markdown](https://www.markdownguide.org/basic-syntax/), and have some ***nice stuff*** here, like:

- lists
- with multiple items

Or maybe even images ![image](https://near.org/_next/static/media/near-logo.1416a213.svg "title")`;

const chat = [
  {
    person: USER,
    message: "How to make an AMM?",
  },
  {
    person: AI,
    message: "",
    spec: spec,
  },
  {
    person: USER,
    message: "Format the header",
  },
  {
    person: AI,
    message: "Format complete",
    spec: `## ${spec}`,
  },
];

//const Theme = state.theme;

const getPreviousSpecFromAI = (index, chat) => {
  return getLastReplyFromAI(index, chat)?.spec ?? "";
};

const getLastReplyFromAI = (index, chat) => {
  let item = null;
  for (let i = index - 1; i > 0; i--) {
    if (chat[i].person == AI) {
      item = chat[i];
      item.index = i;
      break;
    }
  }

  return item;
};

const AddUserMessage = () => {
  if (state.userMessage) {
    if (state.userMessage == "/clear") {
      resetBackup();
    } else {
      let chat = getArray(state.chat);
      chat.push({
        person: USER,
        spec: state.spec,
        message: state.userMessage,
      });
      let newState = { chat, userMessage: "" };

      State.update(newState);
      saveChat(true, (res) => {
        console.log("onSaveChat", res);
        if (res.ok && res.body.is_session_valid) {
          let ai_response = res.body.ai_response;
          if (ai_response?.person == AI) {
            console.log("ai_response", ai_response, state);
            const chat = getArray(state.chat);
            chat.push(ai_response);
            State.update({
              chat,
              spec: ai_response.spec,
              editSpecIndex: chat.length,
            });
            console.log("ai_response state", state);
          }
        }
      });
    }
  }
};

const getMessage = (item, index) => {
  if (state.editMessageIndex === index) {
    return (
      <div class="text-end">
        <div>
          <textarea
            class="form-control mb-1"
            style={{ minWidth: "400px" }}
            value={state.editMessageText}
            onChange={(e) => State.update({ editMessageText: e.target.value })}
          />
        </div>
        <div>
          <button
            class="small ms-2 badge bg-secondary p-2"
            onClick={() => {
              let chat = state.chat;
              let item = state.chat[index];
              item.spec = state.spec;
              item.message = state.editMessageText;
              chat[index] = item;
              State.update({
                chat,
                editMessageIndex: null,
                editMessageText: null,
              });
              saveChat(false, () => {
                console.log("Message updated");
              });
            }}
          >
            {item.person == USER ? "Update" : "Update spec + text"}
          </button>
        </div>
      </div>
    );
  } else {
    return <div style={{ whiteSpace: "pre-wrap" }}>{getMessageText(item)}</div>;
  }
};

const getMessageText = (item) => {
  if (!item.message && item.person == AI) {
    const isInitialMessage = !getPreviousSpecFromAI(index, state.chat);
    if (isInitialMessage) {
      return getInitialSpecMessage();
    }
  }
  return item.message;
};

const getNextMessageFromAI = (index) => {
  let nextSpecMessage = "";
  for (let i = index + 1; i <= state.chat.length; i++) {
    if (state.chat[i].person == AI) {
      nextSpecMessage = state.chat[i].message;
      break;
    }
  }

  return nextSpecMessage;
};

const isSpecExists = (spec) => spec != "" && spec != "N/A";

const getMessageDiff = (item, index) => {
  if (item.person == AI) {
    let prevSpec = getPreviousSpecFromAI(index, state.chat);

    if (isSpecExists(prevSpec)) {
      let diffs = codeDiff(prevSpec, item.spec);
      console.log("diffs", diffs);
      let diffContents = (diffs ?? [])
        .filter((line) => line != "\n")
        .map((line) => {
          if (Array.isArray(line)) {
            return (
              <div class="p-1" style={{ backgroundColor: line[1] }}>
                {line[0]}
              </div>
            );
          } else {
            return <div class="p-0">{line}</div>;
          }
        });

      return (
        <div
          class={`mt-1 small code-diff rounded-3 ${getMessageDiffClass(item)}`}
        >
          {diffContents}
        </div>
      );
    }
  }

  return <></>;
};

const onSpecClick = (index) => {
  let newState = { spec: state.chat[index].spec };

  newState.editSpecIndex = index;

  State.update(newState);
};

const setShowSpecEditor = (isShow) => {
  State.update({
    showSpecEditor: isShow,
  });
};

const getInitialSpecMessage = () => {
  return "Initial spec";
};

const getMessageDiffClass = (item) => {
  return item.person != USER ? "code-diff-start" : "pt-1 code-diff-end";
};

const getMessageClass = (item) => {
  return item.person != USER ? "pt-2 me-1" : "pt-2 ms-1";
};

const isExitEditMode = (index) => state.editMessageIndex === index;

const isEditableMessage = (item) => editEverythingMode || item.person == USER;

const styleMessage = (item, index) => {
  const rowClass = item.person == USER ? "flex-row-reverse" : "";
  let textContainerClass = item.person != USER ? "ms-3" : "me-3";
  let textClass =
    item.person != USER ? "dialog-system-message" : "dialog-user-message";

  return (
    <div class={`d-flex flex-row ${getMessageClass(item)} ${rowClass}`}>
      <img src={user_pics[item.person]} width="45" class="h-100" />
      <div class={`d-flex flex-row ${textContainerClass}`}>
        <div
          class={`small my-auto p-2 rounded-3 ${textClass}`}
          role={item.person == AI ? "button" : ""}
          onClick={() => {
            if (item.person == AI) {
              onSpecClick(index);
            }
          }}
        >
          {getMessage(item, index)}
        </div>
        {isEditableMessage(item) && (
          <div
            class="my-auto ps-1"
            role="button"
            onClick={() => {
              State.update({
                editMessageText: isExitEditMode(index)
                  ? null
                  : getMessageText(item),
                editMessageIndex: isExitEditMode(index) ? null : index,
                editSpecIndex: index,
                showSpecEditor: !isExitEditMode(index),
              });
            }}
          >
            {editIcon}
          </div>
        )}
      </div>
    </div>
  );
};

const codeDiff = (old_code, new_code) => {
  let newVal;
  let result = [];
  let codes = [old_code, new_code];
  let allLiness = [[], []];
  let liness = [[], []];
  let h = [[], []];
  for (let i = 0; i < 2; ++i) {
    allLiness[i] = codes[i].split("\n");
  }

  let left = 0;
  let right = 0;
  let l1 = allLiness[0].length;
  let l2 = allLiness[1].length;
  while (
    left < l1 &&
    left < l2 &&
    allLiness[0][left].trim() == allLiness[1][left].trim()
  ) {
    ++left;
  }
  while (
    left + right < l1 &&
    left + right < l2 &&
    allLiness[0][l1 - right - 1].trim() == allLiness[1][l2 - right - 1].trim()
  ) {
    ++right;
  }
  if (left == Math.min(l1, l2)) {
    result.push("/* no code changes */");
    return result;
  }
  for (let i = left; i < l1 - right; ++i) {
    liness[0].push(allLiness[0][i]);
  }
  for (let i = left; i < l2 - right; ++i) {
    liness[1].push(allLiness[1][i]);
  }

  let dp = [];
  for (let j = 0; j < liness[1].length; ++j) {
    h[1].push(1);
  }

  for (let i = 0; i < liness[0].length; ++i) {
    h[0].push(1);
    dp.push([]);
    for (let j = 0; j < liness[1].length; ++j) {
      let val = 0;
      if (i && dp[i - 1][j] > val) {
        val = dp[i - 1][j];
      }
      if (j && dp[i][j - 1] > val) {
        val = dp[i][j - 1];
      }
      if (liness[0][i].trim() == liness[1][j].trim()) {
        if (i && j) newVal = dp[i - 1][j - 1] + 1;
        else newVal = 1;
        if (newVal > val) val = newVal;
      }
      dp[i].push(val);
    }
  }

  let i = liness[0].length - 1;
  let j = liness[1].length - 1;
  while (i >= 0 && j >= 0) {
    if (
      liness[0][i].trim() == liness[1][j].trim() &&
      ((i && j && dp[i][j] == dp[i - 1][j - 1] + 1) ||
        ((!i || !j) && dp[i][j] == 1))
    ) {
      h[0][i] = 0;
      h[1][j] = 0;
      --i;
      --j;
    } else if (i && dp[i][j] == dp[i - 1][j]) --i;
    else --j;
  }

  if (left > 3) {
    result.push("...\n");
  }

  for (let i = Math.max(0, left - 3); i < left; ++i) {
    result.push(allLiness[0][i] + "\n");
  }

  let bgColors = ["#FFD0D0", "#D0FFD0"];
  let ord1 = 0;
  let ord2 = 0;
  while (ord1 < liness[0].length || ord2 < liness[1].length) {
    if (ord1 < liness[0].length && h[0][ord1]) {
      result.push([liness[0][ord1] + "\n", bgColors[0]]);
      ++ord1;
    } else if (ord2 < liness[1].length && h[1][ord2]) {
      result.push([liness[1][ord2] + "\n", bgColors[1]]);
      ++ord2;
    } else {
      result.push(liness[1][ord2] + "\n");
      ++ord1;
      ++ord2;
    }
  }

  for (let i = right - 1; i >= Math.max(right - 3, 0); --i) {
    result.push(allLiness[0][l1 - i - 1] + "\n");
  }

  if (right > 3) {
    result.push("...\n");
  }

  return result;
};

const isShowSpecEditor = () => {
  return editEverythingMode && state.showSpecEditor;
};

const onAuth = (data) => {
  console.log("onAuth", data);
  Storage.privateSet(SESSION_KEY, data.session_id);
  State.update({
    sessionId: data.session_id,
    isSessionValid: data.is_session_valid,
    resetSession: false,
    pendingAuth: false,
  });
};

const loadDefaultPrompts = () => {
  if (state?.promptsUnlocked && !getArray(state.defaultPrompts).length) {
    setPendingRequest(true);
    asyncFetch(`${apiUrl}/admin/get_prompts/`, {
      method: "POST",
      body: JSON.stringify({
        account_id: context.accountId,
        session_id: sessionId,
      }),
    }).then((res) => {
      if (res.ok) {
        // returns {is_session_valid, prompts?}
        onRequest(res.body);

        const defaultPrompts = getArray(res.body.prompts);
        if (defaultPrompts.length) {
          const newState = state;
          newState.promptTabIndex = state.promptTabIndex ?? 0;
          newState.defaultPrompts = defaultPrompts;
          if (!getArray(state.userPrompts).length) {
            newState.userPrompts = defaultPrompts;
          }
          State.update(newState);
          updateUserPromptsInLocalStorage();
        }
      }

      console.log("get_prompts resp", res.ok, res.body);
      setPendingRequest(false);
    });
  }
};

let storage = Storage.privateGet(storageKey) ?? {};

console.log("storage", storage);

if (
  storage?.promptsUnlocked &&
  state?.promptsUnlocked != storage?.promptsUnlocked
) {
  State.update({
    promptsUnlocked: storage.promptsUnlocked,
    userPrompts: storage.userPrompts,
  });
  loadDefaultPrompts();
}

const updateUserPromptsInLocalStorage = () => {
  storage.userPrompts = state.userPrompts;
  storage.promptsUnlocked = state.promptsUnlocked;
  console.log("storage update", storage);
  Storage.privateSet(storageKey, storage);
};

const avatarOnClick = () => {
  if (!state?.promptsUnlocked) {
    let promptsUnlocked = false;
    let showPromptsEditor = state.showPromptsEditor;
    let clickTimes = state?.clickTimes ?? [];
    const currentTime = Date.now();
    clickTimes.push(currentTime);

    while (clickTimes.length && currentTime - clickTimes[0] > 1000) {
      clickTimes.shift();
    }

    if (clickTimes.length >= 3) {
      promptsUnlocked = true;
      showPromptsEditor = true;
    }

    console.log("clickTimes", clickTimes);

    State.update({
      promptsUnlocked,
      showPromptsEditor,
      clickTimes,
    });

    loadDefaultPrompts();
  }
};

const ATTACH_CONVERSATION_TAB_INDEX = 5;

const getPromptsContainer = () => {
  if (state.promptsUnlocked && getArray(state.defaultPrompts).length) {
    const promptHeaders = [
      "Message Before Specs",
      "Specs Before Specs",
      "Message After Specs",
      "Specs After Specs",
    ];
    return (
      <div>
        <div class="card-header justify-content-between align-items-left pb-0">
          <h4 class="mb-2">
            Prompts editor{" "}
            <button
              class="small badge bg-secondary p-2"
              onClick={() => {
                State.update({
                  showPromptsEditor: false,
                });
              }}
            >
              Hide
            </button>
          </h4>
          <ul class="nav nav-tabs">
            {promptHeaders.map((header, index) => {
              return (
                <li class="nav-item">
                  <a
                    class={`nav-link ${
                      state.promptTabIndex == index ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => {
                      State.update({ promptTabIndex: index });
                    }}
                  >
                    {header}
                  </a>
                </li>
              );
            })}

            <li class="nav-item">
              <a
                class={`nav-link ${
                  state.promptTabIndex == ATTACH_CONVERSATION_TAB_INDEX
                    ? "active"
                    : ""
                }`}
                href="#"
                onClick={() => {
                  State.update({
                    promptTabIndex: ATTACH_CONVERSATION_TAB_INDEX,
                  });
                }}
              >
                Attach conversation
              </a>
            </li>
          </ul>
        </div>
        <div class="card-body main-container w-100 h-100 ps-2 mb-4 pt-2 flex-row align-text-top">
          {state.promptTabIndex === ATTACH_CONVERSATION_TAB_INDEX && (
            <div style={{ height: "250px" }} class="mt-2">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="mySwitch"
                  name="darkmode"
                  value="yes"
                  onChange={(e) =>
                    State.update({ attachConversation: e.target.checked })
                  }
                  checked={state.attachConversation}
                />
                <label class="form-check-label" for="mySwitch">
                  {" "}
                  Attach conversation using API
                </label>
              </div>

              {!state.attachConversation && (
                <Markdown text="Do not attach conversation, use {{ history }} instead" />
              )}
            </div>
          )}
          {state.promptTabIndex !== ATTACH_CONVERSATION_TAB_INDEX && (
            <>
              <h5 class="mt-2 mb-2">System prompt:</h5>
              <textarea
                style={{ height: "250px" }}
                class="form-control mb-2 flex-grow-1"
                onChange={(e) => {
                  let userPrompts = getArray(state.userPrompts);
                  userPrompts[state.promptTabIndex] = e.target.value;
                  State.update({
                    userPrompts,
                  });
                }}
                value={state.userPrompts[state.promptTabIndex]}
              />

              {state.defaultPrompts[state.promptTabIndex].trim() !=
                state.userPrompts[state.promptTabIndex].trim() && (
                <div>
                  <h5 class="mt-2 mb-2">Default prompt:</h5>
                  <textarea
                    style={{ height: "250px" }}
                    disabled
                    class="form-control mb-2 flex-grow-1"
                    value={state.defaultPrompts[state.promptTabIndex]}
                  />
                </div>
              )}

              <div>
                <button
                  class="btn btn-success mb-2"
                  onClick={() => updateUserPromptsInLocalStorage()}
                >
                  Update prompts
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
};

return (
  <div class="d-block main-container h-100">
    {state.promptsUnlocked && state.showPromptsEditor && getPromptsContainer()}
    <div class="row" style={{ height: "38px" }}>
      <div class="col">
        <h4>Task Spec {isShowSpecEditor() ? "Editor" : ""}</h4>
      </div>
      {state.promptsUnlocked && (
        <div class="col w-100 text-end">
          <button
            class="small badge bg-secondary p-2"
            onClick={() => {
              State.update({
                showPromptsEditor: true,
              });
            }}
          >
            Prompts Editor
          </button>
        </div>
      )}
    </div>
    <div class="extension-container h-100 d-flex gap-1">
      <div
        class="container markdown-container col-md-6 h-10 position-relative"
        id="container-markdown"
      >
        {editEverythingMode && (
          <div class="position-absolute top-0 end-0 mt-3 me-3">
            <button
              class="small badge bg-secondary p-2"
              onClick={() => {
                State.update({
                  showSpecEditor: !state.showSpecEditor,
                  editMessageIndex: state.editSpecIndex,
                  editMessageText: state.chat[state.editSpecIndex].message,
                });
              }}
            >
              {state.showSpecEditor ? "Render" : "Edit"} spec
            </button>
          </div>
        )}

        {!isShowSpecEditor() && (
          <div class=" markdown-render">
            <Markdown class="card h-100" text={state.spec} />
          </div>
        )}
        {isShowSpecEditor() && (
          <textarea
            class="markdown-textarea h-100 w-100"
            onChange={(e) => {
              State.update({ spec: e.target.value });
            }}
            value={state.spec}
          />
        )}
      </div>
      <div class="container chat-container col-md-6 h-100" id="container-main">
        <div class="row d-flex justify-content-center h-100">
          <div class="h-100">
            <div class="card h-100" id="chat">
              <div
                class="card-header d-flex justify-content-between align-items-center pb-0"
                id="chat-header"
              >
                <ul class="nav nav-tabs top-nav-item">
                  <li class="nav-item top-nav-item" id="top-nav-dialog">
                    <a
                      class="nav-link link-underline-opacity-25 active"
                      role="button"
                      id="nav-dialog"
                      aria-current="page"
                    >
                      <h5 class="mb-0">Chat</h5>
                    </a>
                  </li>
                  <li class="nav-item top-nav-item hidden" id="top-nav-run">
                    <a class="nav-link" id="nav-run">
                      <h5 class="mb-0">▶️ Run</h5>
                    </a>
                  </li>
                  <li class="nav-item top-nav-item hidden" id="top-nav-account">
                    <a class="nav-link" id="nav-account">
                      <h5 class="mb-0">Account</h5>
                    </a>
                  </li>
                  <li class="nav-item top-nav-item hidden" id="top-nav-login">
                    <a class="nav-link" id="nav-login">
                      <h5 class="mb-0">Login</h5>
                    </a>
                  </li>
                </ul>
                <div id="account-details" class="hidden">
                  <div class="d-inline-block align-top">
                    <div class="navbar navbar-light navbar-menu btn-group dropstart">
                      <div class="dropdown" id="menu-dropdown">
                        <span
                          class="navbar-toggler-icon"
                          role="button"
                          id="dropdown-menu-link"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></span>

                        <ul
                          class="dropdown-menu"
                          id="menu-dropdown-list"
                          aria-labelledby="dropdown-menu-link"
                        >
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              id="refresh-button"
                            >
                              Refresh
                            </a>
                          </li>
                          <li id="menu-load-examples">
                            <a
                              class="dropdown-item"
                              href="#"
                              onClick="return loadExamples()"
                            >
                              Load Examples
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              id="sign-out-button"
                            >
                              Sign Out
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="card-body main-container main-container-review hidden"
                id="container-account"
                data-mdb-perfect-scrollbar="true"
              >
                <div class="alert alert-warning" role="alert">
                  Account not found. Enter your invite code to proceed.
                </div>
                <div class="mb-3">
                  <label for="user-invite" class="form-label">
                    Invite code
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="user-invite"
                    value=""
                    placeholder="InviteCode"
                  />
                </div>
                <div
                  class="alert alert-danger"
                  role="alert"
                  id="user-invite-error"
                ></div>
                <div>
                  <a
                    class="btn btn-primary mb-3"
                    onClick="return submitInviteCode();"
                  >
                    Submit
                  </a>
                </div>
              </div>
              <div
                class="card-body main-container main-container-review hidden"
                id="container-login"
                data-mdb-perfect-scrollbar="true"
              >
                <div class="alert alert-warning" role="alert">
                  Login with NEAR Account please
                </div>
                <div id="login" class="hidden">
                  <input
                    type="button"
                    class="btn btn-primary btn"
                    data-mdb-ripple-color="dark"
                    value="Login"
                    id="login-button"
                  />
                  <input
                    type="button"
                    class="btn btn-primary btn hidden"
                    data-mdb-ripple-color="dark"
                    value="Confirm Login"
                    id="confirm-login-button"
                  />
                </div>

                <hr />
                <div>Don't have an account yet?</div>
                <div>
                  <a
                    class="btn btn-primary btn-sm mb-3"
                    href="https://wallet.near.org/create"
                  >
                    Create
                  </a>
                </div>
              </div>
              <div
                id="container-run"
                class="card-body main-container main-container-review hidden"
                data-mdb-perfect-scrollbar="true"
              >
                <div class="container">
                  <div class="row align-items-start h-100">
                    <div class="col h-100 run-column ps-0 pe-1">
                      <div class="form-floating h-100">
                        <textarea
                          class="form-control tests-textarea"
                          id="tests-inputs"
                        ></textarea>
                        <label for="tests-inputs">Input values</label>
                      </div>
                    </div>
                    <div class="col hidden h-100">
                      <div class="form-floating h-100">
                        <textarea
                          class="form-control tests-textarea"
                          id="tests-outputs"
                        ></textarea>
                        <label for="tests-outputs">
                          Expected output values
                        </label>
                      </div>
                    </div>
                    <div class="col h-100 run-column pe-0 ps-1">
                      <div
                        class="form-floating h-100"
                        id="real-output-container"
                      >
                        <div
                          class="form-control tests-textarea real-output"
                          readonly
                          id="real-output"
                        ></div>
                        <div
                          class="output-popup-button quote disabled"
                          id="button-quote-selected-output"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Quote text from the output screen and include it in your next reply in the dialog"
                          oncontextmenu="return false;"
                        >
                          <div>”</div>
                        </div>
                        <div
                          class="output-popup-button clear disabled"
                          id="button-clear-output-qoutes"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Clear quotes"
                          oncontextmenu="return false;"
                        >
                          <div>x</div>
                        </div>
                        <label for="real-output">Output</label>
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-start mt-2">
                    <div class="col">
                      <div class="row align-items-start h-100">
                        <div class="col h-100 run-column ps-0 pe-1">
                          <div class="btn-group">
                            <button
                              type="button"
                              class="btn btn-success long-text-button"
                              id="button-run"
                            >
                              Run
                            </button>
                            <button
                              type="button"
                              class="btn btn-success dropdown-toggle dropdown-toggle-split"
                              data-bs-toggle="dropdown"
                              id="button-run-dropdown-toggle"
                            >
                              <span class="visually-hidden">
                                Toggle Dropdown
                              </span>
                            </button>

                            <div
                              class="dropdown-menu"
                              id="button-run-dropdown-menu"
                            >
                              <a
                                href="#"
                                class="dropdown-item"
                                id="run-editor-code"
                              >
                                Run code from the editor
                              </a>
                              <a
                                href="#"
                                class="dropdown-item"
                                id="run-last-message-code"
                              >
                                Run code from the last message
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col h-100 run-column pe-0 ps-1">
                          <button
                            type="button"
                            class="btn btn-info disabled"
                            id="button-save-output"
                            title="Save the output to dialog to assist reviewers"
                          >
                            Save output
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="card-body main-container main-container-review"
                id="container-dialog"
                data-mdb-perfect-scrollbar="true"
              >
                <div
                  class="task-header-container hidden"
                  id="current-task-header-container"
                >
                  <div class="task-header" id="current-task-header"></div>
                  <div
                    class="task-header-content"
                    id="current-task-header-content"
                  ></div>
                  <div
                    class="review-reclaim-interval"
                    id="review-reclaim-interval"
                  ></div>
                </div>
                <div id="user-chat">
                  {getArray(state.chat).map((item, index) => (
                    <div class="mb-3">
                      {styleMessage(item, index)}
                      {getMessageDiff(item, index)}
                    </div>
                  ))}
                  <a name="chat-end"></a>
                </div>
              </div>
              <div class="gutter gutter-vertical" id="gutter-vertical"></div>
              <div
                class="card-footer text-muted d-flex justify-content-start align-items-start p-2"
                id="container-footer"
              >
                <div class="align-top" onClick={() => avatarOnClick()}>
                  <img
                    src={user_pics[USER]}
                    width="40"
                    height="40"
                    class="mr-2"
                  />
                </div>

                <div class="task-reply-options align-items-center h-100 hidden">
                  <textarea
                    class="form-control form-control-lg h-100"
                    id="task-user-input-textbox"
                    rows="1"
                  ></textarea>

                  <div class="dropdown ms-2" id="main-types-dropdown-menu">
                    <button
                      id="message-type-dropdown"
                      class="btn btn-sm btn-secondary dropdown-toggle p2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Type
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          Answer
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Thoughts
                        </a>
                      </li>
                    </ul>
                  </div>

                  <a class="ms-2" href="#">
                    <input
                      type="button"
                      value="Send"
                      id="send-button"
                      class="btn btn-primary btn-sm p-2"
                      data-mdb-ripple-color="dark"
                    />
                  </a>
                </div>

                <div class="review-reply-options align-items-center h-100 hidden">
                  <textarea
                    class="form-control form-control-lg h-100"
                    id="review-user-input-textarea"
                    rows="1"
                  ></textarea>

                  <a class="ms-2" href="">
                    <input
                      type="button"
                      value="Accept"
                      id="review-accept-button"
                      class="btn btn-success btn-sm footer-action-button h-100"
                      data-mdb-ripple-color="dark"
                    />
                  </a>

                  <a class="ms-2" href="">
                    <input
                      type="button"
                      value="Reject"
                      id="review-reject-button"
                      class="btn btn-danger btn-sm footer-action-button h-100"
                      data-mdb-ripple-color="dark"
                    />
                  </a>
                </div>

                {/* chat send */}
                <div class="example-reply-options h-100 ps-2 d-flex flex-row  align-text-top">
                  <textarea
                    class="form-control h-100 flex-grow-1"
                    id="example-user-input-textarea"
                    onChange={(e) => {
                      State.update({ userMessage: e.target.value });
                    }}
                    onKeyPress={(e) => {
                      if (e.ctrlKey && e.key === "Enter") {
                        AddUserMessage();
                      }
                    }}
                    value={state.userMessage}
                    rows="1"
                  ></textarea>

                  <div class="ms-2">
                    <a
                      type="button"
                      value=""
                      id="example-send-button"
                      onClick={(e) => AddUserMessage()}
                      class="btn btn-success btn-sm footer-action-button h-100 text-white"
                      data-mdb-ripple-color="dark"
                      href="#chat-end"
                    >
                      Send
                    </a>
                  </div>
                </div>

                <div class="resubmit-rejected-options h-100 w-100 justify-content-center hidden">
                  <a class="ms-2" href="#">
                    <input
                      type="button"
                      value="Continue working"
                      id="restart-rejected-task-button"
                      class="btn btn-success btn-sm footer-action-button h-100"
                      data-mdb-ripple-color="dark"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="You will restart this task to update/remove existing messages and fix review issues"
                    />
                  </a>

                  <a class="ms-2" href="#">
                    <input
                      type="button"
                      value="Abandon and request new task"
                      id="abandon-rejected-task-button"
                      class="btn btn-danger btn-sm footer-action-button h-100"
                      data-mdb-ripple-color="dark"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Forget this task"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div
              class="text-center hidden bottom-controls"
              id="bottom-controls"
            >
              <div class="d-flex justify-content-center pt-1">
                <div id="code-filename" class="code-filename"></div>
                <select
                  id="select-code-filename"
                  class="select-code-filename hidden"
                ></select>
                <button
                  class="small ms-2 badge bg-secondary hidden"
                  id="confirm-update-current-filename"
                >
                  Confirm
                </button>
                <button
                  class="small ms-2 badge bg-secondary hidden"
                  id="cancel-update-current-filename"
                >
                  Cancel
                </button>
                <button
                  class="small ms-2 badge bg-secondary"
                  id="update-current-filename"
                >
                  Update file
                </button>
                <button
                  class="small ms-2 badge bg-success hidden"
                  id="submit-button"
                  data-mdb-ripple-color="dark"
                >
                  Submit
                </button>
                <button
                  class="small ms-2 badge bg-success hidden"
                  id="skip-task-button"
                  data-mdb-ripple-color="dark"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
