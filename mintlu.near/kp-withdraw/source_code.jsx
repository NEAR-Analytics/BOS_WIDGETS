const withdraw = () => {
  Near.call([
    {
      contractName: "v2.keypom.near",
      methodName: "withdraw_from_balance",
      gas: "100000000000000",
    },
  ]);
};

const Yocto2Near = (amount) =>
  new Big(amount).div(new Big(10).pow(24)).toString();

if (context.accountId) {
  let current_balance = Near.view("v2.keypom.near", "get_user_balance", {
    account_id: context.accountId,
  });

  let current_balance_near = Yocto2Near(current_balance);

  return (
    <div>
      Current User Balance is: {current_balance_near} NEAR
      <button
        className="btn btn-lg btn-primary mt-3"
        onClick={(e) => withdraw()}
      >
        Withdraw Keypom Balance
      </button>
    </div>
  );
} else {
  return <div>Please Sign In to Withdraw Balance.</div>;
}
