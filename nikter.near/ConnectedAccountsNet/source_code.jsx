const CONNECTED_ACCOUNTS_CONTRACT_NAME = "connected-accounts.near";

const accountId = props.accountId || context.accountId;

const accounts = Near.view(CONNECTED_ACCOUNTS_CONTRACT_NAME, "getNet", {
  accountGId: accountId + "/" + "near/mainnet",
});

return (
  <>
    {accounts?.length ? (
      <>
        <h3> Connected Accounts of {accountId} </h3>
        {accounts.map((a, i) => (
          <p>
            <span>{i + 1}.</span> {a}
          </p>
        ))}
      </>
    ) : (
      "You don't have Connected Accounts"
    )}
  </>
);
