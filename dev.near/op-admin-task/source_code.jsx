const USER = "user";
const AI = "ai";
const ACCOUNT_ID = "dev.near";
const API_URL = "https://annotation.nearspace.info/api";
const PROBLEM_ID = 1;
const STATUS_ANNOTATION_PENDING = 0;
const STORAGE_KEY = `task_storage`;

const CSS_URL =
  "https://gist.githubusercontent.com/zavodil/10ed1d07c893e04571332f1cb2408226/raw/8bad3b0836bec04845cdbaa78bbad771a48a23f7/add.style.css";
const css = fetch(CSS_URL).body;
if (!css) return "";

State.init({
  theme: styled.div`${css}
  .styled-message ol, .styled-message ul {
      padding-left: 20px;
  }
  `,
});
const Theme = state.theme;

const {
  apiUrl,
  sessionId,
  annotationId,
  problemId,
  pendingRequest,
  setPendingRequest,
  onRequest,
  showDiff,
  showMessage,
  showPrompt,
  showSpec,
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

const getArray = (items) => (Array.isArray(items) ? items : []);

let getUserTaskData = () => {
  setPendingRequest(true);
  asyncFetch(`${apiUrl}/admin/get_user_annotation_by_id/`, {
    method: "POST",

    body: JSON.stringify({
      annotation_id: annotationId,
      account_id: context.accountId,
      session_id: sessionId,
      problem_id: problemId,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log("get_user_annotation_by_id", sessionId, res);
      if (res.body.is_session_valid) {
        let task = res.body.task;
        let chat = JSON.parse(task.content);
        State.update({
          currentAnnotationId: annotationId,
          currentAccountId: task.account_id,
          taskLoading: false,
          taskLoaded: true,
          chat: getArray(chat),
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
  console.log("getUserTaskData", state);
  getUserTaskData();
}

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

const getPreviousSpecFromAI = (index, chat) => {
  return getLastReplyFromAI(index, chat)?.spec ?? "";
};

const getMessageDiffClass = (item) => {
  return item.person != USER ? "code-diff-start" : "pt-1 code-diff-end";
};

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

const isSpecExists = (spec) => spec != "" && spec != "N/A";

const styleMessage = (item, index) => {
  return (
    <li class="styled-message">
      <strong>{item.person == USER ? state.currentAccountId : "AI"}</strong>:
      {showMessage && (
        <div
          class={`alert alert-${item.person == USER ? "success" : "primary"}`}
          role="alert"
        >
          <div style={{ whiteSpace: "pre-wrap" }}>{item.message}</div>
        </div>
      )}
      {showSpec && !!item.spec && (
        <div class="alert alert-secondary" role="alert">
          <h6>SPEC</h6>
          <Markdown class="card h-100" text={item.spec} />
        </div>
      )}
      {showPrompt && !!item.prompt_message && (
        <div class="alert alert-light" role="alert">
          <h6>PROMPT FOR MESSAGE</h6>
          <div style={{ whiteSpace: "pre-wrap" }}>{item.prompt_message}</div>
        </div>
      )}
      {showPrompt && !!item.prompt_spec && (
        <div class="alert alert-light" role="alert">
          <h6>PROMPT FOR SPEC</h6>
          <div style={{ whiteSpace: "pre-wrap" }}>{item.prompt_spec}</div>
        </div>
      )}
      {showDiff && getMessageDiff(item, index)}
    </li>
  );
};

if (!getArray(state.chat).length) {
  return "No data";
}

return (
  <Theme>
    <ul>{state.chat.map((message, index) => styleMessage(message, index))}</ul>
  </Theme>
);
