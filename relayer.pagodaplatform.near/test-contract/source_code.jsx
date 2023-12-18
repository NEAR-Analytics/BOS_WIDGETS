if (state.sender == undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        // save sender address to the state
        State.update({ sender: accounts[0] });
      }
    });
}

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/jimmy-ez/0344bb9cce14ced6c6e7f89d7d1654ce/raw/e7dd9962a90819f71de155b1f68f276eed07790a/BillBOSCoreABIV3.json"
);
if (!BillBOSCoreABI.ok) {
  return "Loading";
}

const erc20abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20abi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(erc20abi.body);

const getTokenBalance = () => {
  const encodedData = iface.encodeFunctionData("balanceOf", [state.sender]);
  return Ethers.provider()
    .call({
      to: "0x9A0d1aEBFfd101c236faA674b3c581dfE4418f9b",
      data: encodedData,
    })
    .then((rawBalance) => {
      // decode response
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      //   return Big(receiverBalanceHex).toFixed(0);
      console.log("receiverBalanceHex", receiverBalanceHex);
    });
};

const IBillBOSCore = new ethers.utils.Interface(BillBOSCoreABI.body);

const getAds = () => {
  const encodedData = IBillBOSCore.encodeFunctionData("getAds");
  return Ethers.provider()
    .call({
      to: "0x138b32685a9EEf7c14c1587eE441F28Dd5dE2A68",
      data: encodedData,
    })
    .then((rawBalance) => {
      // decode response
      const receiverBalanceHex = IBillBOSCore.decodeFunctionResult(
        "getAds",
        rawBalance
      );

      //   return Big(receiverBalanceHex).toFixed(0);
      console.log("receiverBalanceHex", receiverBalanceHex);
    });
};

return (
  <div>
    <Web3Connect />;<p>{state.sender}</p>
    <button onClick={() => getTokenBalance()}>GET</button>
    <button onClick={() => getAds()}>GET ADs</button>
  </div>
);
