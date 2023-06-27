let reciever = props.reciever || "eamondang.near";

initState({ amount: 1, reciever });

const donate = () => {
  Near.call(
    props.reciever,
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
  <div className="text-center">
    <h2 className="mt-4">💸 Address to {reciever} 🙏</h2>
    <h2 className="mt-4">💸 Donation Amount 🙏</h2>
    <input
      type="number"
      placeholder={state.amount}
      onChange={(e) => onChangeAmount(e.target.value)}
    />
    <button
      disabled={context.loading}
      onClick={donate}
      className={`mt-4 btn ${
        context.loading ? "btn-outline-dark" : "btn-primary"
      }`}
    >
      Donate {state.amount} NEAR to {props.reciever}
    </button>
  </div>
);
