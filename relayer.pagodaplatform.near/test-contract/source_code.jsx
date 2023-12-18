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
  "https://gist.githubusercontent.com/jimmy-ez/f5f8dd1487cf564e561f5302efb910d8/raw/2155161dbe2e9e09b6d89890440b820dc2f335e4/BillBOSCoreABI.json"
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
  const encodedData = IBillBOSCore.encodeFunctionData("getAdsUser", [
    state.sender,
  ]);
  return Ethers.provider()
    .call({
      to: "0x945b11D39FE18459C890c0e7B95b03D27549ed17",
      data: encodedData,
    })
    .then((rawBalance) => {
      // decode response
      const receiverBalanceHex = IBillBOSCore.decodeFunctionResult(
        "getAdsUser",
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
