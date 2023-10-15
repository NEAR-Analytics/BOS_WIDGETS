const liquidityProps = props.liquidityProps || "NO PROPS";

const addLiquidityUni = () => {
  const tokenAcontract = new ethers.Contract(
    tokenAContractAddress,
    tokenAabi,
    provider.getSigner()
  );

  tokenAcontract
    .approve(uniswapV2RouterContract, amountADesired)
    .then((response) => {
      console.log("response token A GOOD --------", response);
    })
    .catch((error) => {
      console.log("Error A:", error);
    });

  const tokenBcontract = new ethers.Contract(
    tokenBContractAddress,
    tokenBabi,
    provider.getSigner()
  );
  tokenBcontract
    .approve(uniswapV2RouterContract, amountBDesired, gas)
    .then((response) => {
      console.log("response token B GOOD --------", response);
      uniContract
        .addLiquidity(
          tokenAContractAddress,
          tokenBContractAddress,
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          to,
          getDeadline(),
          gas
        )
        .then((response) => {
          console.log("response UNI is " + JSON.stringify(response));
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    })
    .catch((error) => {
      console.log("Error B:", error);
    });
  return;
};

return <div>{liquidityProps.tokenDecimals}</div>;

return (
  <div>
    <div>
      <button onClick={addLiquidityUni}>Add Liquidity</button>

      {state.liquidityResult && <div>{state.liquidityResult}</div>}
      {state.liquidityError && (
        <div style={{ color: "red" }}>{state.liquidityError}</div>
      )}
    </div>
  </div>
);
