const ERC20_ABI_URL =
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json";
const ERC20_ABI = fetch(ERC20_ABI_URL).body;

function handleChange(key, value) {
  State.update({ [key]: value });

  if (key === "tokenAddress") {
    try {
      const contract = new ethers.Contract(
        value,
        ERC20_ABI,
        Ethers.provider().getSigner()
      );
      contract.decimals().then((dec) => {
        State.update({ decimals: dec });
      });
    } catch (e) {}
  }
}

function buildCall() {
  try {
    const iface = new ethers.utils.Interface(ERC20_ABI);
    const callData = iface.encodeFunctionData("transfer", [
      state.to,
      ethers.utils.parseUnits(state.amount, state.decimals),
    ]);
    const callPayload = {
      target: state.tokenAddress,
      callData: callData,
    };
    Storage.set(`callPayload:${props.callId}`, callPayload);

    State.update({
      isOk: true,
    });
  } catch (e) {
    State.update({
      isOk: false,
    });
  }
}

State.init({
  tokenAddress: "",
  to: "",
  amount: "0",
  decimals: 18,
  isOk: false,
});

buildCall();

return (
  <div className="border border-1 rounded rounded-md p-2">
    <h2>Token Transfer</h2>
    <div>
      <p>Token</p>
      <Widget
        src="sainy.near/widget/SelectToken"
        props={{
          onChange: (token) => console.log(token),
        }}
      />
    </div>
    <div>
      <p>To</p>
      <input onChange={(e) => handleChange("to", e.target.value)} />
    </div>
    <div>
      <p>Amount</p>
      <input onChange={(e) => handleChange("amount", e.target.value)} />
    </div>
    <Widget src="sainy.near/widget/SupercallBase" props={props} />
  </div>
);
