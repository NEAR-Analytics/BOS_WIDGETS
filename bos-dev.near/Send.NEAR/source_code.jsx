// This is a demo component to transfer NEAR tokens using BOS component with a helper `transfer-near.near` contract as native transfers are not supported on BOS yet: https://t.me/neardev/29391
// Here is the contract itself: https://github.com/frol/transfer-near-contract; it is implemented with nesdie, so it only requires only 1 TGas attached to the function call.
const contract = "transfer-near.near";
const method = "transfer_near";
const oneTeraGas = 1000000000000;
const oneNEARInYoctoNEAR = 1000000000000000000000000;
State.init({ accountId: "frol.near", amount: 0.5 });

const onClick = () => {
  Near.call(
    contract,
    method,
    state.accountId,
    oneTeraGas,
    state.amount * oneNEARInYoctoNEAR
  );
};

// Define components
const form = (
  <>
    <div class="border border-black p-3">
      Account Id:
      <input
        placeholder={state.accountId}
        onChange={(e) => State.update({ accountId: e.target.value })}
      />
      Amount:
      <input
        placeholder={state.amount}
        onChange={(e) => State.update({ amount: e.target.value })}
      />
      <button class="btn btn-primary mt-2" onClick={onClick}>
        SEND!
      </button>
    </div>
  </>
);

const notLoggedInWarning = <p class="text-center py-2"> Login to send $NEAR</p>;

// Render
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">SEND $NEAR</h3>
      <p class="text-center py-2">Enter account and amount of $NEAR to send!</p>
      {context.accountId ? form : notLoggedInWarning}
    </div>
  </>
);
