const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const registeredPublicKey = Social.get(
  `${accountId}/private_messages/public_key`
);

if (registeredPublicKey === null) return "Loading";

function randomKeyPairBase64() {
  const keyPair = nacl.box.keyPair();
  return {
    secretKey: Buffer.from(keyPair.secretKey).toString("base64"),
    publicKey: Buffer.from(keyPair.publicKey).toString("base64"),
  };
}

const keyPair = randomKeyPairBase64();

State.init({
  registeredPublicKey,
  secretKey: keyPair.secretKey,
  publicKey: keyPair.publicKey,
});

return (
  <div class="mb-3">
    <h1 class="mb-3 text-center">Register</h1>

    {registeredPublicKey && (
      <div class="mb-3">
        You already registered. If your key is compromised, you can re-register.
        You can read old messages using old secret key{" "}
      </div>
    )}

    <div class="mb-3">
      <label for="inputSercetKey" class="form-label">
        Secret key:
      </label>
      <div class="mb-3 input-group">
        <input
          type="text"
          value={state.secretKey}
          class="form-control"
          readonly=""
        />
        <button
          class="btn btn-outline-primary"
          onClick={() => {
            const keyPair = randomKeyPairBase64();

            //re-render
            State.update({
              secretKey: keyPair.secretKey,
              publicKey: keyPair.publicKey,
            });
          }}
        >
          Random
        </button>
      </div>
    </div>

    <div class="mb-3 form-check">
      <input
        onClick={() => {
          State.update({
            checkboxSaveSecretKey: !state.checkboxSaveSecretKey,
          });
        }}
        defaultChecked={state.checkboxSaveSecretKey}
        class="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
      />

      <label class="form-check-label" for="flexCheckDefault">
        <b>I SAVE SECRET KEY</b>
      </label>
    </div>

    <CommitButton
      disabled={!state.checkboxSaveSecretKey}
      onClick={() => {
        Storage.privateSet("secretKey", state.secretKey);
      }}
      onCommit={() => {
        window.open("/#/bozon.near/widget/PrivateMessages");
      }}
      data={{ private_messages: { public_key: state.publicKey } }}
    >
      Register
    </CommitButton>
  </div>
);
