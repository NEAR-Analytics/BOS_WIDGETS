const accountId = props.accountId || context.accountId;
const ftContract = "token.v2.ref-finance.near";

State.init({
  showRegistrationData: false,
});

if (!(state.accountId && state.ftContract)) {
  State.update({
    accountId,
    ftContract,
  });
}

const updateStorageBalance = () => {
  const accountStorageBalance = Near.view(
    state.ftContract,
    "storage_balance_of",
    {
      account_id: state.accountId,
    }
  );
  console.log("accountStorageBalance: ", accountStorageBalance);
  if (accountStorageBalance) {
    State.update({
      accountStorageBalance,
    });
  } else {
    State.update({
      accountStorageBalance: {
        total: "0",
        available: "0",
      },
    });
  }
};

if (!state.showRegistrationData) {
  updateStorageBalance();
}

const onChangeAccount = (updatedAccountId) => {
  State.update({
    accountId: updatedAccountId,
  });
};

const onChangeFTContract = (ftContract) => {
  State.update({
    ftContract,
  });
};

const handleCheck = () => {
  console.log("accountId: ", state.accountId);
  console.log("ftContract: ", state.ftContract);

  updateStorageBalance();

  State.update({ showRegistrationData: true });
};

const handleRegister = () => {
  if (!(state.accountId && state.ftContract)) {
    return;
  }

  Near.call({
    contractName: state.ftContract,
    methodName: "storage_deposit",
    args: {
      account_id: state.accountId,
    },
    deposit: 1250000000000000000000,
  });
};

return (
  <div>
    <div>Check user registration in FT contract</div>
    <div>
      Account:
      <input
        type="text"
        value={state.accountId}
        onChange={(e) => onChangeAccount(e.target.value)}
      />
    </div>
    <div>
      FT contract:
      <input
        type="text"
        value={state.ftContract}
        onChange={(e) => onChangeFTContract(e.target.value)}
      />
    </div>
    <div>
      <button onClick={handleCheck}>Check</button>
    </div>
    {state.showRegistrationData && (
      <div>
        <div>
          <h5>Registration data (Storage balance)</h5>
        </div>
        {(Number(state.accountStorageBalance.total) > 0 && (
          <div>User is registered</div>
        )) || (
          <div>
            <div>User is not registered</div>
            <div>
              <button onClick={handleRegister}>Register</button>
            </div>
          </div>
        )}
        <div>
          <h6>Storage balance</h6>
        </div>
        <div>{"Total: " + state.accountStorageBalance.total}</div>
        <div>{"Available: " + state.accountStorageBalance.available}</div>
      </div>
    )}
  </div>
);
