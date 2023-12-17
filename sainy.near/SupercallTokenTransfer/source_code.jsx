const ERC20_ABI_URL =
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json";
const ERC20_ABI = fetch(ERC20_ABI_URL).body;

function handleChange(key, value) {
  State.update({ [key]: value });
}

function buildCall() {
  try {
    const iface = new ethers.utils.Interface(ERC20_ABI);
    const calldata = iface.encodeFunctionData("transfer", [
      state.to,
      ethers.utils.parseEther(state.amount),
    ]);
    const callPayload = {
      chain: "",
      target: state.to,
      calldata: calldata,
    };
    Storage.set("callPayload", callPayload);

    State.update({
      isOk: true,
    });
  } catch (e) {
    console.error(e);
    State.update({
      isOk: false,
    });
  }
}

State.init({
  tokenAddress: "",
  to: "",
  amount: "0",
  isOk: false,
});

buildCall();

return (
  <div className="border border-1 rounded rounded-md p-2">
    <h2>Token Transfer</h2>
    <div>
      <p>Token</p>
      <input onChange={(e) => handleChange("tokenAddress", e.target.value)} />
    </div>
    <div>
      <p>To</p>
      <input onChange={(e) => handleChange("to", e.target.value)} />
    </div>
    <div>
      <p>Amount</p>
      <input onChange={(e) => handleChange("amount", e.target.value)} />
    </div>
    <div>
      {state.isOk ? (
        <span className="text-green-400">Ready</span>
      ) : (
        <span className="text-red-400">Not ready</span>
      )}
    </div>
  </div>
);
