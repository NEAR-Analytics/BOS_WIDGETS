State.init({
  chainId: 0,
  price: 0,
});

/**
 * Ethereum Contract
 */

const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";

const priceFeedABI = [
  {
    inputs: [],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

if (Ethers.provider()) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });

  if (state.chainId === 11155111) {
    if (state.price === 0) {
      const priceFeedContract = new ethers.Contract(
        priceFeedAddress,
        priceFeedABI,
        Ethers.provider().getSigner()
      );

      priceFeedContract.getPrice().then((priceRes) => {
        State.update({ price: ethers.utils.formatEther(priceRes) });
      });
    }
  }
}

return (
  <div>
    <Web3Connect />
    <hr />
    {Ethers.provider() && state.chainId !== 11155111 ? (
      "Change network to Sepolia."
    ) : (
      <>
        <h1>You called priceFeedContract</h1>
        <p>Contract Address: {priceFeedAddress}</p>
        <p>Contract ABI: {JSON.stringify(priceFeedABI)}</p>
        <p>Current SepoliaETH price: {state.price} USD </p>
      </>
    )}
  </div>
);
