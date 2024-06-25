const ACCOUNT_ID = "dev.near";
const API_URL = "https://annotation.nearspace.info/api";
const PROBLEM_ID = 1;
const STATUS_ANNOTATION_PENDING = 0;
const SIGNATURE_RECIPIENT = "ai.near";
const STORAGE_KEY = `session_storage`;
// const CALLBACK_URL = `https://viewer-six.vercel.app/${ACCOUNT_ID}/widget/op-index`;

const CSS_URL =
  "https://gist.githubusercontent.com/zavodil/10ed1d07c893e04571332f1cb2408226/raw/d65b8f258eb23217c5f58d05248fdb8aab4c5768/add.style.css";

const css = fetch(CSS_URL).body;
if (!css) return "";

// TODO - replace `referer` with window.location
const referer = fetch(`${API_URL}/get_referer/`, { method: "POST" }).body;
if (!referer) return "";
const CALLBACK_URL = `${referer}${ACCOUNT_ID}/widget/Index`;

State.init({
  showMessage: true,
  showSpec: true,
  showDiff: true,
  showPrompt: true,
  resetSession: false,
  pendingAuth: false,
  pendingRequest: false,
  //sessionId: localSessionId,

  theme: styled.div`${css}`,
});

const Theme = state.theme;

if (!context.accountId) {
  return (
    <Theme>
      <div class="row h-100 text-center">
        <div class="col-sm-12 my-auto">
          <h2>Annotation platforn</h2>

          <div class="pt-3" role="button">
            Sign in to Continue
          </div>
        </div>
      </div>
    </Theme>
  );
}

const getTask = () => {
  console.log("index get Task", state.sessionId);
  State.update({ pendingRequest: true });
  asyncFetch(`${API_URL}/admin/get_all_annotation_headers/`, {
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
        let annotationId = (res.body.annotations ?? [])?.[0]?.id ?? 0;
        State.update({
          annotations: res.body.annotations ?? [],
          annotationId,
          selectedAnnotationIds: [annotationId],
          requestTask: (res.body.annotations ?? []).length == 0,
          isSessionValid: res.body.is_session_valid,
          pendingRequest: false,
        });
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
    }
    console.log("get_all_annotation_headers resp", res.ok, res.body);
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

console.log("hash,", hashParams);

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

const onTask = (data) => {
  console.log("Index onTask", data);
  if (!data.is_session_valid) {
    State.update({
      resetSession: true,
      isSessionValid: false,
      pendingRequest: false,
    });
  }
};

let isGetTask = false;

if (!state.pendingRequest && !state.pendingAuth && !state.requestTask) {
  if (state.sessionId && !state.annotations) {
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

const taskContainer = (annotationId) => (
  <Widget
    src={`${ACCOUNT_ID}/widget/op-admin-task`}
    props={{
      sessionId: state.sessionId,
      apiUrl: API_URL,
      annotationId: annotationId ?? (state.annotations ?? [])?.[0]?.id,
      problemId: PROBLEM_ID,
      onRequest: onTask,
      pendingRequest: state.pendingRequest,
      showPrompt: state.showPrompt,
      showDiff: state.showDiff,
      showMessage: state.showMessage,
      showSpec: state.showSpec,
      setPendingRequest: (pendingRequest) => {
        State.update({ pendingRequest });
      },
    }}
  />
);

console.log(
  "Index: ",
  state.pendingRequest,
  state.isSessionValid,
  "showSessionContainer",
  showSessionContainer
);

return (
  <Theme class="w-100" style={{ overflowY: "scroll" }}>
    {state.pendingRequest && <Widget src={`${ACCOUNT_ID}/widget/op-loading`} />}

    {showSessionContainer && sessionContainer}

    {!showSessionContainer && (
      <div class="container">
        <div class="row align-items-start alert alert-light" role="alert">
          <div class="col">
            <strong>Settings:</strong>
          </div>
          <div class="col">
            <label class="list-group-item">
              <input
                class="form-check-input me-1"
                type="checkbox"
                checked={!!state.showMessage}
                onChange={(e) =>
                  State.update({ showMessage: e.target.checked })
                }
              />
              Show messages
            </label>
          </div>{" "}
          <div class="col">
            <label class="list-group-item">
              <input
                class="form-check-input me-1"
                type="checkbox"
                checked={!!state.showSpec}
                onChange={(e) => State.update({ showSpec: e.target.checked })}
              />
              Show specs
            </label>
          </div>{" "}
          <div class="col">
            <label class="list-group-item">
              <input
                class="form-check-input me-1"
                type="checkbox"
                checked={!!state.showDiff}
                onChange={(e) => State.update({ showDiff: e.target.checked })}
              />
              Show specs diffs
            </label>
          </div>{" "}
          <div class="col">
            <label class="list-group-item">
              <input
                class="form-check-input me-1"
                type="checkbox"
                checked={!!state.showPrompt}
                onChange={(e) => State.update({ showPrompt: e.target.checked })}
              />
              Show prompts
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-sm pe-2" style={{ maxWidth: "25%" }}>
            <h6>User tasks:</h6>
            <ul class="list-group">
              {(state.annotations ?? []).map((annotation) => (
                <div
                  role="button"
                  class={`list-group-item ${
                    !state.requestTask &&
                    (state.selectedAnnotationIds ?? []).includes(annotation.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    let selectedAnnotationIds = state.selectedAnnotationIds;
                    const index = state.selectedAnnotationIds.indexOf(
                      annotation.id
                    );
                    if (index > -1) {
                      selectedAnnotationIds.splice(index, 1);
                    } else {
                      selectedAnnotationIds.push(annotation.id);
                    }
                    State.update({
                      annotationId: annotation.id,
                      selectedAnnotationIds,
                      requestTask: false,
                    });
                  }}
                >
                  {annotation.title} / {annotation.account_id}
                </div>
              ))}
            </ul>
          </div>
          {(!showTaskContainer ||
            (state.selectedAnnotationIds ?? []).length == 0) && (
            <div
              class="col align-middle justify-content-center align-self-center text-center"
              style={{ minHeight: "200px" }}
            >
              Click on user task to view
            </div>
          )}

          {showTaskContainer &&
            (state.selectedAnnotationIds ?? []).map((annotationId) => (
              <div class="col-sm">{taskContainer(annotationId)}</div>
            ))}
        </div>
      </div>
    )}

    <div class="mt-5">
      {!showSessionContainer && (
        <div class="d-block">
          <button disabled={pendingRequest} onClick={() => onLogout()}>
            {state.isSessionValid
              ? "Logout"
              : state.pendingAuth
              ? "Restart Login"
              : "Log In"}
          </button>
        </div>
      )}
    </div>
  </Theme>
);
