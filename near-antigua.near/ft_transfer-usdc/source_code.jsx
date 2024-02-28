const accountId = context.accountId;
let token =
  props.token || "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near";
let reciever = props.reciever || "chloe.near";
let balance = 0;

initState({ amount: 1, token, reciever, balance });

const getBalance = () => {
  balance = Near.view(state.token, "ft_balance_of", {
    account_id: accountId,
  });
  State.update({
    balance,
  });
};
getBalance();

const send = () => {
  Near.call(
    state.token,
    "ft_transfer",
    {
      receiver_id: state.reciever,
      amount: String(state.amount),
    },
    {
      deposit: 1,
    }
  );
};

const onChangeAmount = (amount) => {
  State.update({
    amount: amount,
  });
};

const onChangeReciever = (reciever) => {
  State.update({
    reciever,
  });
};

const onChangeToken = (token) => {
  State.update({
    token,
  });
  getBalance();
};

return (
  <div>
    <h2>Sender</h2>
    <ul>
      <li>Address: {accountId}</li>
      <li>
        Balance of {state.token}: {state.balance}
      </li>
    </ul>

    <h2>Token Address</h2>
    <p>
      <input
        placeholder={state.token}
        onChange={(e) => onChangeToken(e.target.value)}
      />
    </p>

    <h2>Reciever Address</h2>
    <p>
      <input
        placeholder={state.reciever}
        onChange={(e) => onChangeReciever(e.target.value)}
      />
    </p>

    <h2>Token Amount</h2>
    <p>
      <input
        type="number"
        placeholder={state.amount}
        onChange={(e) => onChangeAmount(e.target.value)}
      />
    </p>

    <p>
      <button
        disabled={context.loading}
        onClick={send}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
      >
        Send {state.amount} {state.token} to {state.reciever}
      </button>
    </p>
  </div>
);
