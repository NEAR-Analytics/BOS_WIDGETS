State.init({
  contractId: "",
  methodName: "",
  args: "{}",
  deposit: "",
  gas: "",
  output: "",
  error: "",
  message: "",
});

const TGas = Big(10).pow(12);
const ONE_NEAR = Big(10).pow(24);

function callFunction() {
  State.update({
    message: "Calling...",
    output: "",
    error: "",
  });
  const { contractId, methodName, args, gas, deposit } = state;
  if (contractId && methodName) {
    console.log("call function", contractId, methodName, args, gas, deposit);
    Near.call(
      contractId,
      methodName,
      JSON.parse(args),
      TGas.mul(gas).toString(),
      ONE_NEAR.mul(deposit).toString()
    );
  }
}

const FUNCTION_CALL_CACHE = "function_call_cache";

function saveFunctionCallCache() {
  const { contractId, methodName, args, deposit, gas } = state;
  Storage.privateSet(FUNCTION_CALL_CACHE, {
    contractId,
    methodName,
    args,
    deposit,
    gas,
  });
}

function handleContractId(event) {
  const contractId = event.target.value;
  State.update({ contractId });
  saveFunctionCallCache();
}

function handleMethod(event) {
  const methodName = event.target.value;
  State.update({ methodName });
  saveFunctionCallCache();
}

function handleArgs(event) {
  const args = event.target.value;
  State.update({ args });
  saveFunctionCallCache();
}

function handleDeposit(event) {
  const deposit = event.target.value;
  State.update({ deposit });
  saveFunctionCallCache();
}

function handleGas(event) {
  const gas = event.target.value;
  State.update({ gas });
  saveFunctionCallCache();
}

function init() {
  if (!state.contractId) {
    const cache = Storage.privateGet(FUNCTION_CALL_CACHE);
    if (cache && cache.contractId) {
      const { contractId, methodName, args, deposit, gas } = cache;
      State.update({ contractId, methodName, args, deposit, gas });
    }
  }
}

init();

const { contractId, methodName, args, deposit, gas, output, message, error } =
  state;

return (
  <div class="container">
    <h1>Call Function</h1>
    <div class="container" style={{ width: "100%" }}>
      <input
        type="text"
        placeholder="Contract ID"
        onChange={handleContractId}
        value={contractId}
      />
      <input
        type="text"
        placeholder="Method"
        onChange={handleMethod}
        value={methodName}
      />
      <textarea
        class="form-control"
        rows="8"
        placeholder="Arguments in JSON Format"
        onChange={handleArgs}
        value={args}
      />
      <input
        type="text"
        placeholder="Deposit (Unit: NEAR)"
        onChange={handleDeposit}
        value={deposit}
      />
      <input
        type="text"
        placeholder="Gas (Unit: Tgas)"
        onChange={handleGas}
        value={gas}
      />
      <button
        type="button"
        class="btn btn-primary mt-2"
        onClick={callFunction}
        disabled={!contractId || !methodName}
      >
        Call
      </button>
    </div>
    <div class="container">
      {output && (
        <div class="mt-3">
          <p>Result:</p>
          {JSON.stringify(output, null, 2)}
        </div>
      )}
      {error && <p class="text-danger">Error: {error}</p>}
      {message && <p class="text-success">{message}</p>}
    </div>
  </div>
);
