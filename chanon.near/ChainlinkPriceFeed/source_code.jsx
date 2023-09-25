State.init({
  btc: 0.0, // USD
});

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

// Support only Sepolia Testnet
if (state.chainId !== 11155111) {
  return (
    <div>
      <h3>Wrong Network - We currently support the Sepolia testnet</h3>
    </div>
  );
}

const DataConsumerV3 = "0x4ABaD1D789AD951eCC39cCcf4606562250FE6ADd"; // ETH/USD

const dataConsumerV3Abi = fetch(
  "https://gist.githubusercontent.com/taforyou/f9b0f927810911aa57e55be807808d15/raw/fab9410d6eaac9fe084f34bd1bc0f11358163d6a/gistfile1.json"
);
if (!dataConsumerV3Abi.ok) {
  return "dataConsumerV3Abi is not ok";
}

const iface = new ethers.utils.Interface(dataConsumerV3Abi.body);

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData(
    "getChainlinkDataFeedLatestAnswer"
  );

  return Ethers.provider()
    .call({
      to: DataConsumerV3,
      data: encodedData,
    })
    .then((rawBalance) => {
      console.log("rawBalance ", parseInt(rawBalance, 16) / 100000000);
      State.update({ btc: parseInt(rawBalance, 16) / 100000000 });
    });
};

const getDataFromChainlinkSmartContract = () => {
  getStakedBalance().then((res) => {
    console.log(res.body.choices[0].message.content);
  });
};

return (
  <div>
    <label>BTC Price is {state.btc}</label>

    <button class="btn btn-success" onClick={getDataFromChainlinkSmartContract}>
      Get BTC Price
    </button>
  </div>
);
