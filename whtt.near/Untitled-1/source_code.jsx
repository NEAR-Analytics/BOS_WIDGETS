const iface = new ethers.utils.Interface([
  "function approve(address,uint256) returns (bool)",
]);

const userAddress = Ethers.send("eth_requestAccounts", [])[0];

const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";

function generateApproveCalldata(spender, amount) {
  return iface.encodeFunctionData("approve", [spender, amount]);
}

function executeApprove(tokenAddress, spender, amount) {
  const tx = {
    to: tokenAddress,
    nonce: 30,
    value: 0,
    gasPrice: 1,
    gasLimit: 150000,
    chainId: 1,
    data: generateApproveCalldata(spender, amount),
  };

  return tx;
}

console.log(ethers.utils);

const getMessage = (transaction) => {
  return ethers.utils.keccak256(
    ethers.utils.arrayify(ethers.utils.serializeTransaction(transaction))
  );
};

const tx = executeApprove(lidoContract, lidoContract, 1);

const txPayloadToSign = ethers.utils.arrayify(getMessage(tx));

Near.call(
  "multichain0.testnet",
  "sign",
  {
    payload: txPayloadToSign,
  },
  gas,
  deposit
);

return <div></div>;
