const storageNecessaryKb = props.storageNecessaryKb || 100;
const contractName = "social.near";

const storageAvailableData = Near.view(contractName, "storage_balance_of", {
  account_id: context.accountId,
});

if (!storageAvailableData) {
  return <h1>Waiting...</h1>;
}

const storageAvailableInKb = storageAvailableData.available / Math.pow(10, 22);

function depositStorage() {
  const storageDepositAmount =
    (storageNecessaryKb - storageAvailableInKb) / 100;
  Near.call(
    contractName,
    "storage_deposit",
    {},
    300_000_000_000_000,
    storageDepositAmount * Math.pow(10, 24)
  );
}

if (storageAvailableInKb < storageNecessaryKb) {
  return (
    <>
      <h1>
        You have only {storageAvailableInKb}Kb of storage, but at least
        {storageNecessaryKb}Kb is needed to perform operation.
      </h1>
      <h3>
        You can add more balance by signing this transaction and adding deposit
        (1NEAR = 100Kb)
      </h3>
      <button class="btn btn-success" onClick={depositStorage}>
        Deposit storage
      </button>
    </>
  );
}

return (
  <>
    <div>You have enough storage balance!</div>
    <button
      class="btn btn-success"
      onClick={() => {
        props.callback();
      }}
    >
      Go further
    </button>
  </>
);
