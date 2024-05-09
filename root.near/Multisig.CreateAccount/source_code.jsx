const contract_id = props.contract_id;

const onCreateAccount = () => {
  console.log(1, state);
  const defaultGas = (300 * 1000000000000).toString();

  Near.call(
    contract_id,
    "add_request_and_confirm",
    {
      request: {
        receiver_id: state.new_account_id,
        actions: [
          {
            type: "CreateAccount",
          },
          {
            type: "AddKey",
            public_key: state.public_key,
          },
        ],
      },
    },
    defaultGas,
    0
  );
};

State.init({
  new_account_id: "",
  public_key: "",
});

const debounce = (func, wait) => {
  const pause = wait || 350;
  let timeout;

  return (args) => {
    const later = () => {
      clearTimeout(timeout);
      func(args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, pause);
  };
};

const onAccountIdChange = debounce((e) => {
  State.update({
    new_account_id: e.target.value,
  });
});

const onPublicKeyChange = debounce((e) => {
  State.update({
    public_key: e.target.value,
  });
});

return (
  <div>
    <div class="row mb-4">
      <div class="col d-flex w-100">
        <div class="form-outline mb-4 w-100">
          <input
            class="form-control"
            type="text"
            id="account-id"
            placeholder="New account"
            onChange={onAccountIdChange}
            defaultValue={state.new_account_id}
          />
          <label class="form-label" for="transfer-receiver">
            Enter new account name
          </label>
        </div>
      </div>
      <div class="col d-flex w-100">
        <div class="form-outline mb-4 w-100">
          <input
            class="form-control"
            type="text"
            id="public-key"
            placeholder="Public key"
            onChange={onPublicKeyChange}
            defaultValue={state.public_key}
          />
          <label class="form-label" for="transfer-receiver">
            Enter public key
          </label>
        </div>
      </div>
      <div class="col-12 col-lg-6 text-left justify-content-left">
        <button type="button" onClick={onCreateAccount}>
          Create account
        </button>
      </div>
    </div>
  </div>
);
