State.init({
  value: "value to update",
});

console.log(Near.view("nearsocialexamples.near", "get_greeting"));

const testCall = () => {
  return Near.call(
    "https://gist.githubusercontent.com/phamdat721101/f9791af2dbf16d6d6dc128a3ab5eef4a/raw/adfd06ed796ffbc55c2fd8b24b2626994b325bf7/asset_service...investment.sol",
    "getBalance",
    {
      message: "Hi Near Social",
      address: "0x8F1142BCC13b69515A0EFD56c8FF8b461202C267",
    }
  );
};

const testView = () => {
  State.update({
    value: Near.view("nearsocialexamples.near", "get_greeting"),
  });
};

return (
  <div>
    <button onClick={testCall}>test call</button>
    <button onClick={testView}>test view</button>

    <div>{state.value}</div>
  </div>
);

return (
  <>
    {/* src="near/widget/Onboarding.ComponentCard" to be pasted below */}
    <Widget />
    <br />
    {/* src="near/widget/Onboarding.ComponentCollection" to be pasted below */}
    <Widget />
  </>
);
