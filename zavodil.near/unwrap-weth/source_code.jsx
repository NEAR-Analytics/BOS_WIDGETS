const receiver = Ethers.send("eth_requestAccounts", [])[0];

if (!receiver) {
  return <Web3Connect />;
}

Ethers.provider()
  .getNetwork()
  .then((chainIdData) => {
    if (chainIdData.chainId === 1) {
      State.update({ tokenId: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" });
    } else if (chainIdData.chainId === 1101) {
      State.update({ tokenId: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9" });
    }
  });

if (!state.tokenId) {
  return "Unknown WETH contract for a selected network";
}

const abiUrl =
  "https://eth.blockscout.com/api?module=contract&action=getabi&address=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

const abi = fetch(abiUrl);

if (!abi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(abi.body.result);

const encodedBalanceData = iface.encodeFunctionData("balanceOf", [receiver]);

Ethers.provider()
  .call({
    to: state.tokenId,
    data: encodedBalanceData,
  })
  .then((rawBalance) => {
    const receiverBalanceHex = iface.decodeFunctionResult(
      "balanceOf",
      rawBalance
    );

    State.update({
      balance: Big(receiverBalanceHex).toFixed(),
    });
  });

const unwrap = (balance) => {
  const wEthContract = new ethers.Contract(
    state.tokenId,
    abi.body.result,
    Ethers.provider().getSigner()
  );

  wEthContract.withdraw(balance, {}).then((transactionHash) => {
    onComplete(transactionHash);
  });
};

if (!state.balance) {
  return "loading";
}

return (
  <div>
    Your balance is {new Big(state.balance).div(Big(10).pow(18)).toFixed()} WETH
    <hr />
    {state.balance > 0 && (
      <button onClick={() => unwrap(state.balance)}>UNWRAP</button>
    )}
  </div>
);
