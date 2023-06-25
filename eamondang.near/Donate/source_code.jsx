let reciever = "donate.eamondang.near";

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
  <div class="container text-center">
    <h1>🙏 Donate For Me 🙏</h1>
    <input
      placeholder={state.reciever}
      onChange={(e) => onChangeReciever(e.target.value)}
    />
    <h2 className={`mt-4`}>💸 Amount 💸</h2>
    <input
      type="number"
      placeholder={state.amount}
      onChange={(e) => onChangeAmount(e.target.value)}
    />
    <button
      disabled={context.loading}
      onClick={donate}
      className={`btn mt-4 ${
        context.loading ? "btn-outline-dark" : "btn-primary"
      }`}
    >
      Donate {state.amount} NEAR to {state.reciever}
    </button>
  </div>
);
