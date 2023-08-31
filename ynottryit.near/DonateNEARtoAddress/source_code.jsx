let reciever = props.reciever || "near.social";

initState({ amount: 1, reciever });

const donate = () => {
  Near.call(
    state.reciever,
    "donate",
    {},
    "30000000000000",
    state.amount * 1e24
  );
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};
const onChangeReciever = (reciever) => {
  State.update({
    reciever,
  });
};

return (
  <div>
    <h4> Donors Address</h4>
    <input
      placeholder={state.reciever}
      onChange={(e) => onChangeReciever(e.target.value)}
    />
    <h4> Amount in NEAR </h4>
    <input
      type="number"
      placeholder={state.amount}
      onChange={(e) => onChangeAmount(e.target.value)}
    />
    <button
      disabled={context.loading}
      onClick={donate}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
    >
      Donate {state.amount} NEAR to {state.reciever}
    </button>
  </div>
);
