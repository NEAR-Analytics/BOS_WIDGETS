State.init({
  contractId: "",
  methodName: "",
  args: "{}",
  blockId: "final",
  output: "",
  error: "",
  message: "",
});

function queryViewFunction() {
  State.update({
    message: "Querying...",
    output: "",
    error: "",
  });
  const { contractId, methodName, args } = state;
  if (contractId && methodName) {
    const blockId = state.blockId || "final";
    console.log("view function", contractId, methodName, args, blockId);
    Near.asyncView(contractId, methodName, JSON.parse(args), blockId).then(
      (output) => {
        console.log("result", output);
        State.update({ output, error: "", message: "" });
      }
    );
  }
}

const FUNCTION_CALL_CACHE = "function_call_cache";

function saveFunctionCallCache() {
  const { contractId, methodName, args, blockId } = state;
  Storage.privateSet(FUNCTION_CALL_CACHE, {
    contractId,
    methodName,
    args,
    blockId,
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

function handleBlockId(event) {
  const blockId = event.target.value;
  State.update({ blockId });
  saveFunctionCallCache();
}

function init() {
  if (!state.contractId) {
    const cache = Storage.privateGet(FUNCTION_CALL_CACHE);
    if (cache && cache.contractId) {
      const { contractId, methodName, args, blockId } = cache;
      State.update({ contractId, methodName, args, blockId });
      queryViewFunction();
    }
  }
}

init();

const { contractId, methodName, args, blockId, output, message, error } = state;

return (
  <div class="container">
    <h1>View Function</h1>
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
        placeholder="Block ID"
        onChange={handleBlockId}
        value={blockId}
      />
      <button
        type="button"
        class="btn btn-primary mt-2"
        onClick={queryViewFunction}
        disabled={!contractId || !methodName}
      >
        Query
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
