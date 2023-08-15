// This is a demo component to transfer NEAR tokens using BOS component with a helper `transfer-near.near` contract as native transfers are not supported on BOS yet: https://t.me/neardev/29391
// Here is the contract itself: https://github.com/frol/transfer-near-contract; it is implemented with nesdie, so it only requires only 1 TGas attached to the function call.

const transferNEAR = () => {
  const oneTeraGas = 1000000000000;
  const oneNEARInYoctoNEAR = 1000000000000000000000000;
  // Let's transfer 0.5 NEAR to frol.near
  Near.call(
    "transfer-near.near",
    "transfer_near",
    "frol.near",
    oneTeraGas,
    0.5 * oneNEARInYoctoNEAR
  );
};

return <button onClick={transferNEAR}>Transfer 0.5 NEAR to frol.near</button>;
