const uniswapV2RouterContract = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const usdcContract = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const ethContract = "0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec";
const uniswapABI = fetch(
  "https://unpkg.com/@uniswap/v2-periphery@1.1.0-beta.0/build/IUniswapV2Router02.json"
);

const sender = "0x0b95Eaf38E00ab26cB4bA6284726888CF2e5a0e1";
const tokenDecimals = 18;

const options = [
  { name: "ETH", price: 5, amount: 0.001, min: 0.001 },
  { name: "USDC", price: 0, amount: 0.001, min: 0.001 },
];

State.init({
  options: options,
  coinA: options[0],
  coinB: options[1],
  feeTier: 0.05,
  showButtons: false,
  priceMinA: 0,
  priceMinB: 0,
  web3connectLabel: "Connect Wallet",
  liquidityResult: null,
  liquidityError: null,
});

const iface = new ethers.utils.Interface(uniswapABI.body.abi);

const addLiquidityUni = () => {
  State.update({liquidityResult: sender})
  
  const router = new ethers.Contract(
    uniswapV2RouterContract,
    uniswapABI.body.abi,
    sender
  );

    



  const amountADesired = ethers.utils.parseUnits(state.coinA.amount, tokenDecimals);
  const amountBDesired = ethers.utils.parseUnits(state.coinB.amount, tokenDecimals);
  const amountAMin = ethers.utils.parseUnits(state.coinA.min, tokenDecimals);
  const amountBMin = ethers.utils.parseUnits(state.coinB.min, tokenDecimals);
  const deadline = Math.floor(Date.now() / 1000) + 3600;

  router.addLiquidity(
      ethContract,
      usdcContract,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline
    )
    .then((transaction) => {
      // Here, the transaction is the pending transaction, not the receipt.
      console.log("Transaction hash is:", transaction.hash);

      // You can decide if you want to wait for the receipt or not.
      // To get the receipt, you can return transaction.wait();
      return transaction.hash;
    })
    .then((transactionHash) => {
      State.update({
        liquidityResult: `Transaction hash: ${transactionHash}`,
        liquidityError: null,
      });
    })
    .catch((error) => {
      State.update({ liquidityError: error.message, liquidityResult: null });
    });
};

return (
  <div>
    <button onClick={addLiquidityUni}>Add Liquidity</button>

    {state.liquidityResult && <div>{state.liquidityResult}</div>}
    {state.liquidityError && (
      <div style={{ color: "red" }}>{state.liquidityError}</div>
    )}
  </div>
);
