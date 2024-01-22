const contract_id = props.contract_id;
const receiver_id = props.receiver_id ?? "";
const token_id = props.token_id ?? "";
const amount = props.amount ?? "";

const metadata =
  token_id != null ? Near.view(token_id, "ft_metadata") : { decimals: 24 };

if (metadata == null) return;

function onTransfer() {
  console.log(1, state);
  const defaultGas = (300 * 1000000000000).toString();
  const functionCallGas = (200 * 1000000000000).toString();

  if (state.token_id === "near") {
    const amount = new Big(state.amount).mul(new Big(10).pow(24)).toFixed();
    Near.call(
      contract_id,
      "add_request_and_confirm",
      {
        request: {
          receiver_id: state.token_id,
          actions: [
            {
              type: "Transfer",
              amount,
            },
          ],
        },
      },
      defaultGas,
      0
    );
    return;
  }
  const amount = new Big(state.amount)
    .mul(new Big(10).pow(state.metadata.decimals))
    .toFixed();
  console.log({
    decimals,
    receiver_id: state.receiver_id,
    token_id: state.token_id,
    amount,
  });
  const args = { amount, receiver_id: state.receiver_id };
  Near.call(
    contract_id,
    "add_request_and_confirm",
    {
      request: {
        receiver_id: state.token_id,
        actions: [
          {
            type: "FunctionCall",
            method_name: "ft_transfer",
            args: btoa(JSON.stringify(args)),
            deposit: "1",
            gas: functionCallGas,
          },
        ],
      },
    },
    defaultGas,
    0
  );
}

State.init({
  receiver_id,
  token_id,
  amount,
  metadata,
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

const onReceiverChange = debounce((e) => {
  State.update({
    receiver_id: e.target.value,
  });
});

const onTokenChange = debounce((e) => {
  State.update({
    token_id: e.target.value,
  });
});

const onAmountChange = debounce((e) => {
  State.update({
    amount: e.target.value,
  });
});

useEffect(() => {
  const metadata = Near.view(state.token_id, "ft_metadata", {});
  State.update({ metadata });
});

return (
  <div>
    <div class="row mb-4">
      <div class="col d-flex w-100">
        <div class="form-outline mb-4 w-100">
          <input
            class="form-control"
            type="text"
            id="transfer-receiver"
            placeholder="Receiver"
            onChange={onReceiverChange}
            defaultValue={state.receiver_id}
          />
          <label class="form-label" for="transfer-receiver">
            Enter receiver
          </label>
        </div>
      </div>
      <div class="col d-flex w-100">
        <div class="form-outline mb-4 w-100">
          <input
            class="form-control"
            type="text"
            id="transfer-token"
            placeholder="Token"
            onChange={onTokenChange}
            defaultValue={state.token_id}
          />
          <label class="form-label" for="transfer-token">
            Enter token
          </label>
        </div>
      </div>
      <div class="col d-flex w-100">
        <div class="form-outline mb-4 w-100">
          <input
            class="form-control"
            type="text"
            id="transfer-amount"
            placeholder="Amount"
            onChange={onAmountChange}
            defaultValue={state.amount}
          />
          <label class="form-label" for="transfer-amount">
            Amount (decimals: {state.metadata.decimals})
          </label>
        </div>
      </div>
      <div class="col-12 col-lg-6 text-left justify-content-left">
        <button type="button" onClick={onTransfer}>
          Transfer
        </button>
      </div>
    </div>
  </div>
);
