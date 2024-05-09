// Define the NEAR account ID
const accountId = context.accountId;

// Set default values for token and receiver
let token =
  props.token || "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near";
let receiver = props.receiver || "chloe.near";

// Initialize balance to 1 and decimals to 0
let balance = 1;
let decimals = 0;

// Initialize state with default values
initState({ amount: 1, token, receiver, balance, decimals });

// Function to get the balance of the token and its decimals
const getTokenInfo = () => {
  const metadata = Near.view(state.token, "ft_metadata", {});
  decimals = metadata.decimals;
  State.update({
    decimals,
  });
};

// Function to get the balance of the token
const getBalance = () => {
  balance = Near.view(state.token, "ft_balance_of", {
    account_id: accountId,
  });
  // Update state with the balance
  State.update({
    balance,
  });
};

// Get the initial balance and token info
getBalance();
getTokenInfo();

// Function to send tokens
const send = () => {
  Near.call(
    state.token,
    "ft_transfer",
    {
      receiver_id: state.receiver,
      amount: state.amount.toString(), // Convert amount to string
    },
    undefined,
    "1"
  );
};

// Function to handle amount change
const onChangeAmount = (amount) => {
  // Update state with the new amount
  State.update({
    amount: amount,
  });
};

// Function to handle receiver change
const onChangeReceiver = (receiver) => {
  // Update state with the new receiver
  State.update({
    receiver,
  });
};

// Function to handle token change
const onChangeToken = (token) => {
  // Update state with the new token
  State.update({
    token,
  });
  // Refresh balance and token info when token changes
  getBalance();
  getTokenInfo();
};

// Function to format balance
const formatBalance = (balance, decimals) => {
  const formattedBalance = (balance / Math.pow(10, decimals)).toFixed(decimals);
  return formattedBalance;
};

// JSX for the component
return (
  <div>
    <h2>Sender</h2>
    <ul>
      <li>Address: {accountId}</li>
      <li>
        Balance of {state.token}: {formatBalance(state.balance, state.decimals)}
      </li>
      <li>Decimals: {state.decimals}</li>
    </ul>

    <h2>Token Address</h2>
    <p>
      <input
        placeholder={state.token}
        onChange={(e) => onChangeToken(e.target.value)}
      />
    </p>

    <h2>Receiver Address</h2>
    <p>
      <input
        placeholder={state.receiver}
        onChange={(e) => onChangeReceiver(e.target.value)}
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
        Send {state.amount} {state.token} to {state.receiver}
      </button>
    </p>
  </div>
);
