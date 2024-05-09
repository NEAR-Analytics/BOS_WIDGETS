const { accountId } = context;
const rpcServer = "https://1rpc.io/near";
const contract = "v2.ref-finance.near";
const mft_balance = Near.view(contract, "mft_balance_of", {
  account_id: accountId,
  token_id: ":4514",
});

// Use and manipulate state
State.init({ receiverId });

const onInputChange = ({ target }) => {
  State.update({ receiverId: target.value });
};

const onRegBtnClick = () => {
  Near.call([
    {
      contractName: contract,
      methodName: "mft_register",
      args: {
        account_id: state.receiverId,
        token_id: ":4514",
      },
      deposit: 30000000000000000000000,
    },
  ]);
};

const onSendBtnClick = () => {
  Near.call([
    {
      contractName: contract,
      methodName: "mft_transfer",
      args: {
        amount: mft_balance,
        receiver_id: state.receiverId,
        token_id: ":4514",
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

const notLoggedInWarning = <p class="text-center py-2"> Please login </p>;

// Render
return (
  <>
    {
      <div class="container py-5">
        <h1 class="text-center mb-4">Welcome, {accountId}!</h1>
        <div class="card shadow">
          <div class="card-body">
            <p class="card-text">
              Here you can check your Frax-USDC LP balance and send tokens to
              other accounts.
            </p>
            <div class="d-flex align-items-center mb-3 balance-info">
              <i class="fas fa-wallet fa-2x mr-3"></i>
              <div>
                <h2 class="h5 mb-0">Frax-USDC LP Balance:</h2>
                <span
                  class="text-muted"
                  data-toggle="tooltip"
                  title="This is the amount of Frax-USDC LP tokens you currently hold."
                >
                  {mft_balance}
                </span>
              </div>
            </div>
            {context.accountId ? (
              <div class="border border-secondary rounded p-3">
                <div class="form-group">
                  <label for="receiverId">Receiver ID</label>
                  <div class="input-group">
                    <input
                      id="receiverId"
                      class="form-control"
                      placeholder="Enter the account ID of the recipient"
                      onChange={onInputChange}
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        onClick={onRegBtnClick}
                      >
                        <i class="fas fa-user-plus"></i> Register
                      </button>
                    </div>
                  </div>
                  <small class="form-text text-muted">
                    If the recipient hasn't registered for Frax-USDC LP tokens,
                    they need to do so before you can send tokens to them.
                  </small>
                </div>
                <button
                  class="btn btn-primary btn-block mt-3"
                  onClick={onSendBtnClick}
                >
                  <i class="fas fa-paper-plane"></i> Send Tokens
                </button>
              </div>
            ) : (
              <div class="alert alert-warning text-center mb-0" role="alert">
                Please log in to view your balance and send tokens.
              </div>
            )}
          </div>
        </div>
      </div>
    }
  </>
);
