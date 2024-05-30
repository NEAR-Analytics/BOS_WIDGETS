// Widget stores session_id and if it doesn't exists, then it requests account signature and tries to create a session

//const message = props.message ?? "Hello";
//const recipient = props.recipient ?? "test.near";
//const callbackUrl = props.callbackUrl ?? "http://near.org";
//const authUrl = props.authUrl ?? "http://your-server.org";
//const className = props.className;
const {
  apiUrl,
  message,
  recipient,
  callbackUrl,
  className,
  storageKey,
  onAuth,
  onLogout,
  resetSession,
  setResetSession,
  pendingAuth,
  setPendingAuth,
  signature,
  publicKey,
} = props;

let { session_id, is_signature_valid } = Storage.privateGet(storageKey);

const signatureProvidedAfterRedirect = !!signature && !!publicKey;

if (signatureProvidedAfterRedirect && !state.pendingVerifySignature) {
  window.location.hash = "";
  State.init({
    signature,
    publicKey,
  });
  console.log("signature & publicKey provided in props ", state);
  // ignore stored session_id if new signature was provided for verification
  session_id = null;
  Storage.privateSet(storageKey, null);
  setPendingAuth(true);
}

const nonce = Buffer.alloc(32, "1", "utf8");

if (typeof onAuth !== "function") {
  // console.log("Provide onAuth function");
  onAuth = (data) => console.log("onAuth", data);
}

if (typeof setResetSession !== "function") {
  // console.log("Provide setResetSession function");
  setResetSession = (data) => console.log("setResetSession", data);
}

if (typeof setPendingAuth !== "function") {
  //console.log("Provide setPendingAuth function");
  setPendingAuth = (data) => console.log("setPendingAuth", data);
}

const logout = () => {
  Storage.privateSet(storageKey, null);
  State.update({
    signature: undefined,
    publicKey: undefined,
    authAttempts: 0,
  });
  onLogout();
};

const verifySignature = () => {
  State.update({ pendingVerifySignature: true });
  asyncFetch(`${apiUrl}/auth/`, {
    method: "POST",
    body: JSON.stringify({
      account_id: context.accountId,
      public_key: state.publicKey,
      signature: state.signature,
      callback_url: callbackUrl,
    }),
  }).then((res) => {
    console.log("verifySignature res", res);
    if (res.ok) {
      if (res.body.is_signature_valid) {
        Storage.privateSet(storageKey, {
          session_id: res.body.session_id,
          is_signature_valid: true,
          timestamp: Date.now(),
        });
      } else {
        logout();
      }
      onAuth(res.body);
    } else {
      setPendingAuth(false);
    }
    State.update({ pendingVerifySignature: false });
  });
};

const requestSignature = () => {
  setPendingAuth(true);

  State.update({ authAttempts: state.authAttempts ?? 0 + 1 });

  Near.signMessage(message, recipient, nonce, callbackUrl).then((e) => {
    console.log("signMessage", e);

    State.update({
      signature: e.signature,
      publicKey: e.publicKey,
    });

    if (resetSession) {
      setResetSession(false);
    }
  });
};

const debug = (str) => {
  console.log(str);
};

let isRequestSignature = false;

if (state.authAttempts > 1) {
  console.log("Auth failed");
  return "Auth failed";
}

if (!pendingAuth) {
  if (resetSession) {
    if (!signatureProvidedAfterRedirect) {
      isRequestSignature = true;
    }
  } else {
    if (!session_id) {
      if (!state.pendingVerifySignature) {
        if (state.signature && state.publicKey) {
          verifySignature();
        }
      } else {
        if (!signatureProvidedAfterRedirect) {
          isRequestSignature = true;
        }
      }
    } else {
      onAuth({ session_id });
    }
  }
} else {
  if (resetSession) {
    if (state.signature && state.publicKey) {
      verifySignature();
    }
  }
}

if (isRequestSignature) {
  requestSignature();
}

if (pendingAuth || resetSession) {
  console.log("Loading....");
  return <div>Loading...</div>;
}

return (
  <div class="w-100">
    <div class="text-center pt-5">
      <button class={className} onClick={() => logout()}>
        {session_id ? "Logout" : "Start new working session"}
      </button>
    </div>
  </div>
);
