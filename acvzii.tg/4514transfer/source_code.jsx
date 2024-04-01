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
      <div class="p-3">
        <h3>Hi, {accountId}</h3>
        <h5>Frax-USDC LP balance: {mft_balance}</h5>
        {context.accountId ? sendingForm : notLoggedInWarning}
      </div>
    }
  </>
);
