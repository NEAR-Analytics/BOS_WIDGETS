const ACCOUNT_ID = "dev.near";
const API_URL = "https://annotation.nearspace.info/api";
const PROBLEM_ID = 1;
const STATUS_ANNOTATION_PENDING = 0;
const SIGNATURE_RECIPIENT = "ai.near";
const STORAGE_KEY = `session_storage`;
//const CALLBACK_URL = `https://dev.near.social/${ACCOUNT_ID}/widget/Index`;

const CSS_URL =
  "https://gist.githubusercontent.com/zavodil/10ed1d07c893e04571332f1cb2408226/raw/d65b8f258eb23217c5f58d05248fdb8aab4c5768/add.style.css";

const css = fetch(CSS_URL).body;
if (!css) return "";

// TODO - replace `referer` with window.location
const referer = fetch(`${API_URL}/get_referer/`, { method: "POST" }).body;
if (!referer) return "";
const CALLBACK_URL = `${referer}${ACCOUNT_ID}/widget/Index`;

State.init({
  resetSession: false,
  pendingAuth: false,
  pendingRequest: false,

  theme: styled.div`${css}`,
});

const Theme = state.theme;

if (!context.accountId) {
  return (
    <Theme>
      <div class="row h-100 text-center">
        <div class="col-sm-12 my-auto">
          <h2>AI developer (preview)</h2>
          <h4>Specification iteration</h4>
          <div class="pt-3">Sign in to Continue</div>
        </div>
      </div>
    </Theme>
  );
}

const getTask = () => {
  console.log("index get Task", state.sessionId);
  State.update({ pendingRequest: true });
  asyncFetch(`${API_URL}/get_annotation_ids/`, {
    method: "POST",
    body: JSON.stringify({
      session_id: state.sessionId,
      account_id: context.accountId,
      problem_id: PROBLEM_ID,
      status: STATUS_ANNOTATION_PENDING,
    }),
  }).then((res) => {
    if (res.ok) {
      if (res.body.is_session_valid) {
        console.log("Index session valid");
        State.update({
          annotations: res.body.annotations ?? [],
          annotationId:
            state.annotationId ?? (res.body.annotations ?? [])?.[0]?.id ?? 0,
          requestTask: (res.body.annotations ?? []).length == 0,
          isSessionValid: res.body.is_session_valid,
          pendingRequest: false,
          refreshUserAnnotations: false,
        });
      } else {
        console.log("Session NOT valid", state);

        State.update({
          resetSession: !state.resetSession,
          sessionId: null,
          isSessionValid: false,
          pendingRequest: false,
        });
      }
    }
    console.log("get_annotation_ids resp", res.ok, res.body);
  });
};

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
        apiUrl: `${API_URL}/auth/`,
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

const onRequestTask = (data) => {
  console.log("Index onRequestTask", data);
  if (data.is_session_valid) {
    let annotations = state.annotations;
    console.log("annotations", annotations);
    annotations.push({ id: data.annotation_id });
    State.update({
      isSessionValid: data.is_session_valid,
      annotationId: data.annotation_id,
      annotations,
      requestTask: false,
    });
  } else {
    State.update({
      resetSession: true,
      isSessionValid: false,
      pendingRequest: false,
    });
  }
};

const onTask = (data) => {
  console.log("Index onTask", data);
  if (!data.is_session_valid) {
    State.update({
      resetSession: true,
      isSessionValid: false,
      pendingRequest: false,
    });
  } else {
    if (data.refreshUserAnnotations) {
      State.update({ refreshUserAnnotations: true });
    }
  }
};

const requestTaskContainer = (
  <Widget
    src={`${ACCOUNT_ID}/widget/op-request-task`}
    props={{
      apiUrl: API_URL,
      sessionId: state.sessionId,
      annotations: state.annotations,
      problemId: PROBLEM_ID,
      onRequest: onRequestTask,
      className: "btn btn-primary p-2",
      pendingRequest: state.pendingRequest,
      setPendingRequest: (pendingRequest) => {
        State.update({ pendingRequest });
      },
    }}
  />
);

let isGetTask = false;

if (!state.pendingRequest && !state.pendingAuth && !state.requestTask) {
  if (state.sessionId && (!state.annotations || state.refreshUserAnnotations)) {
    isGetTask = true;
  }
}

if (isGetTask) {
  getTask();
}

const showSessionContainer =
  state.resetSession || (!state.pendingRequest && !state.isSessionValid);

const showRequestTaskContainer =
  !showSessionContainer && state.isSessionValid && state.requestTask;
const showTaskContainer =
  !showRequestTaskContainer &&
  !showSessionContainer &&
  state.isSessionValid &&
  (state.annotations ?? []).length > 0;

const taskContainer = (
  <Widget
    src={`${ACCOUNT_ID}/widget/op-task`}
    props={{
      sessionId: state.sessionId,
      apiUrl: API_URL,
      storageKey: STORAGE_KEY,
      annotationId: state.annotationId ?? (state.annotations ?? [])?.[0]?.id,
      problemId: PROBLEM_ID,
      onRequest: onTask,
      pendingRequest: state.pendingRequest,
      setPendingRequest: (pendingRequest) => {
        State.update({ pendingRequest });
      },
    }}
  />
);

return (
  <Theme style={{ padding: "0 20px" }}>
    {state.pendingRequest && <Widget src={`${ACCOUNT_ID}/widget/op-loading`} />}

    {showSessionContainer && sessionContainer}

    {!showSessionContainer && (
      <div class="d-flex flex-row">
        <div class="pe-2" style={{ width: "150px" }}>
          {!state.requestTask && <h4 style={{ height: "38px" }}>Projects</h4>}
          <ul class="list-group">
            {(state.annotations ?? []).map((annotation) => {
              return (
                annotation.id && (
                  <li
                    title={`id: ${annotation.id}`}
                    role="button"
                    class={`list-group-item ${
                      !state.requestTask && state.annotationId == annotation.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      State.update({
                        annotationId: annotation.id,
                        requestTask: false,
                      });
                    }}
                  >
                    {annotation.title ?? "[Untitled]"}
                  </li>
                )
              );
            })}
            {!state.requestTask && (
              <li
                class={`list-group-item ${state.requestTask ? "active" : ""}`}
                role="button"
                onClick={() => {
                  State.update({ requestTask: true });
                }}
              >
                Create New
              </li>
            )}
          </ul>
        </div>
        <div class="flex-grow-1">
          {showRequestTaskContainer && requestTaskContainer}
          {showTaskContainer && taskContainer}
        </div>
      </div>
    )}

    <div class="mt-5 hidden">
      {!showSessionContainer && (
        <div class="d-block">
          <button disabled={pendingRequest} onClick={() => onLogout()}>
            {state.isSessionValid
              ? "Logout"
              : state.pendingAuth
              ? "Restart Login"
              : "LogIn"}
          </button>
        </div>
      )}
    </div>
  </Theme>
);
