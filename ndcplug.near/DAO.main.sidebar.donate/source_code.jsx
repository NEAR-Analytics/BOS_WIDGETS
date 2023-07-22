// let amount;
// amount = props.amount;
// let yoctoConvert = amount / 1e24;
let hardcode = 420000000000000000000000; // .6
// let yoctoConvert = props.amount * 1e24;
// let yoctoConvert = hardcode / 1e24;
let yoctoConvert = hardcode * 10;
let reciever = props.reciever ?? "refi.sputnik-dao.near";
let amount = props.amount ?? 1; // start with 1 NEAR

initState({ amount, reciever });

// yoctoConvert = state.amount;

const donate = () => {
  let yoctoConvert1 = state.amount * 1e24;
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

return (
  <div className="row">
    <input type="number" onChange={(e) => onChangeAmount(e.target.value)} />
    <button
      disabled={context.loading}
      onClick={donate}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
    >
      Donate {state.amount}
    </button>
  </div>
);
