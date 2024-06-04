const API_URL = "https://annotation.nearspace.info/api";
const PROBLEM_ID = 1;
const STATUS_ANNOTATION_PENDING = 0;
const STORAGE_KEY = `session_storage`;
const ACCOUNT_ID = "dev.near";
const SIGNATURE_RECIPIENT = "ai.near";

const { annotationId } = props;
if (!annotationId) {
  return "Provide annotation ids";
}

const referer = fetch(`${API_URL}/get_referer/`, { method: "POST" }).body;
if (!referer) return "";
const CALLBACK_URL = `${referer}${ACCOUNT_ID}/widget/Index`;

State.init({
  resetSession: false,
  pendingAuth: false,
  pendingRequest: false,

  theme: styled.div`${css}`,
});

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

const showSessionContainer =
  state.resetSession || (!state.pendingRequest && !state.isSessionValid);

const Theme = state.theme;

console.log(
  "Index: ",
  state.resetSession,
  state.pendingRequest,
  state.isSessionValid,
  "showSessionContainer",
  showSessionContainer,
  state.sessionId
);

return (
  <Theme style={{ padding: "0 20px" }}>
    {state.pendingRequest && <Widget src={`${ACCOUNT_ID}/widget/op-loading`} />}
    {!showSessionContainer && (
      <>
        Annotation: {annotationId}
        <Widget
          src={`${ACCOUNT_ID}/widget/op-task`}
          props={{
            apiUrl: API_URL,
            sessionId: state.sessionId,
            storageKey: STORAGE_KEY,
            annotationId,
            problemId: PROBLEM_ID,
            adminMode: true,
            onRequest: onTask,
            pendingRequest: state.pendingRequest,
            setPendingRequest: (pendingRequest) => {
              State.update({ pendingRequest });
            },
          }}
        />
      </>
    )}
    {showSessionContainer && sessionContainer}
  </Theme>
);
