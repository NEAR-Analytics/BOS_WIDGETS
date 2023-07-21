const receiver = Ethers.send("eth_requestAccounts", [])[0];

if (!receiver) {
  // Web3 login button
  return <Web3Connect />;
}

Ethers.provider()
  .getNetwork()
  .then((chainIdData) => {
    const chainId = chainIdData.chainId;
    // load chain data for a current Chain Id from the Social DB (data storage on NEAR)
    // all chainlist data: https://near.social/#/zavodil.near/widget/Explorer?path=zavodil.near/chainlist/**
    const chainlistData = Social.get(
      `zavodil.near/chainlist/*/${chainId}/**`,
      "final"
    );

    State.update({
      wethTokenId: chainlistData.contracts[chainId].weth,
      network: chainlistData.chains[chainId].name,
    });
  });

if (!state.wethTokenId) {
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
    to: state.wethTokenId,
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
    state.wethTokenId,
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
    {state.network && <p>Current network is {state.network}.</p>}
    <p>
      Your balance is {Big(state.balance).div(Big(10).pow(18)).toFixed()} WETH.
    </p>

    {state.balance > 0 && (
      <>
        <hr />
        <button onClick={() => unwrap(state.balance)}>UNWRAP</button>
      </>
    )}
  </div>
);
