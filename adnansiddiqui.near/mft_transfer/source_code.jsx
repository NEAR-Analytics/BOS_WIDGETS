const accountId = context.accountId; //account ID from a context object
const contract = "v2.ref-finance.near"; // name of a smart contract

// Initianlizing State
State.init({
  receiverId: "",
  amount: "",
  tokenId: "",
  mft_balance: "",
});

// This is triggered when the user changes the `tokenId` field
const onTokenIdChange = ({ target: { value } }) => {
  State.update({ tokenId: value });

  if (value) {
    Near.asyncView(
      contract,
      "mft_balance_of",
      { account_id: accountId, token_id: `:${value}` },
      "final",
      false
    ).then((balance) => State.update({ mft_balance: balance }));
  } else {
    State.update({ mft_balance: "" });
  }
};

// This is triggered when the `amount` field is edited by the user
const onAmountChange = ({ target: { value } }) => {
  State.update({ amount: value === "0" ? state.mft_balance : value });
};

//  This is triggered when the `receiverId` field is edited
const onInputChange = ({ target: { value } }) => {
  State.update({ receiverId: value });
};

// This is invoked when the `Register` button is clicked.
const onRegBtnClick = () => {
  if (state.tokenId) {
    Near.call([
      {
        contractName: contract,
        methodName: "mft_register",
        args: {
          account_id: state.receiverId,
          token_id: `:${state.tokenId}`,
        },
        deposit: 30000000000000000000000,
      },
    ]);
  } else {
    alert("Please enter a token ID.");
  }
};

  // This action happens when the `Send Tokens` button is clicked
const onSendBtnClick = () => {
  const amount = state.amount || state.mft_balance;

  Near.call([
    {
      contractName: contract,
      methodName: "mft_transfer",
      args: {
        amount: amount,
        receiver_id: state.receiverId,
        token_id: `:${state.tokenId}`,
      },
      deposit: 1,
    },
  ]);
};

const sendingForm = (
  <>
    <div class="border border-black p-3">
      <label>receiver_id</label>
      <input placeholder="acvzii.tg" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onRegBtnClick}>
        Register
      </button>
      <button class="btn btn-primary mt-2" onClick={onSendBtnClick}>
        Send
      </button>
    </div>
  </>
);

// If user is not logged in
const notLoggedInWarning = <p class="text-center py-2"> Please login </p>;

// Render
return (
  <>
    {
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h1 class="text-center mb-4">Welcome, {accountId}!</h1>
            <div class="card shadow">
              <div class="card-body">
                <p class="card-text">
                  Here you can check your LP balance and send tokens to other
                  accounts.
                </p>
                <div class="d-flex align-items-center mb-3 balance-info">
                  <i class="fas fa-wallet fa-2x mr-3"></i>
                  <div>
                    <h2 class="h5 mb-0">LP Balance:</h2>
                    <span
                      class="text-muted"
                      data-toggle="tooltip"
                      title="This is the amount of Frax-USDC LP tokens you currently hold."
                    >
                      {state.mft_balance || "0"}
                    </span>
                  </div>
                </div>
                {context.accountId ? (
                  <div class="border border-secondary rounded p-3">
                    <div class="form-group">
                      <label for="tokenId">Token ID</label>
                      <input
                        id="tokenId"
                        class="form-control form-control-lg"
                        placeholder="Enter the token ID"
                        onChange={onTokenIdChange}
                      />
                    </div>
                    <div class="form-group">
                      <label for="amount">Amount</label>
                      <input
                        id="amount"
                        class="form-control form-control-lg"
                        placeholder="Enter the amount of tokens to send (0 for max)"
                        onChange={onAmountChange}
                      />
                    </div>
                    <div class="form-group mb-4">
                      <label for="receiverId">Receiver ID</label>
                      <div class="input-group">
                        <input
                          id="receiverId"
                          class="form-control form-control-lg"
                          placeholder="Enter the account ID of the recipient"
                          onChange={onInputChange}
                        />
                        <div class="input-group-append">
                          {state.tokenId && (
                            <button
                              class="btn btn-outline-secondary btn-lg"
                              onClick={onRegBtnClick}
                            >
                              <i class="fas fa-user-plus"></i> Register
                            </button>
                          )}
                        </div>
                      </div>
                      <small class="form-text text-muted">
                        If the recipient hasn't registered for the LP token,
                        they need to do so before you can send tokens to them.
                      </small>
                    </div>
                    <button
                      class="btn btn-primary btn-lg btn-block"
                      onClick={onSendBtnClick}
                    >
                      <i class="fas fa-paper-plane"></i> Send Tokens
                    </button>
                  </div>
                ) : (
                  <div
                    class="alert alert-warning text-center mb-0"
                    role="alert"
                  >
                    Please log in to view your balance and send tokens.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </>
);
