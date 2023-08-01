State.init({
  mpEthPriceIntervalStarted: false,
});

const stakingData = props.stakingData || undefined;
const stakedBalance = props.stakedBalance || undefined;
const ethUsdPrice = props.ethUsdPrice || undefined;
const tokenDecimals = props.tokenDecimals || undefined;

const getMpETHPrice = () => {
  if (
    !stakingData ||
    Big(stakingData.totalSupply).eq(0) ||
    Big(stakingData.totalUnderlying).eq(0)
  ) {
    return Big("1000000000000000000").toString();
  }

  const rewardsSinceUpdate = Big(stakingData.estimatedRewardsPerSecond)
    .mul(
      Math.floor(Date.now()) -
        (Big(stakingData.submitReportUnlockTime).toNumber() -
          Big(stakingData.submitReportTimelock).toNumber()) *
          1000
    )
    .div(1000);

  const assets = Big(stakingData.totalUnderlying).add(rewardsSinceUpdate);

  return assets
    .mul(Big("1000000000000000000"))
    .div(Big(stakingData.totalSupply))
    .toString()
    .split(".")[0];
};

if (!state.mpEthPriceIntervalStarted && stakedBalance && ethUsdPrice) {
  State.update({ mpEthPriceIntervalStarted: true });

  setInterval(() => {
    const bigMpEthPrice = Big(getMpETHPrice());

    const mpEthPrice = bigMpEthPrice
      .div(Big(10).pow(tokenDecimals))
      .toFixed(11)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    const userMpEthInEth = bigMpEthPrice
      .mul(parseFloat(stakedBalance))
      .div(Big(10).pow(tokenDecimals))
      .toFixed(11)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    const userMpEthUsd = bigMpEthPrice
      .mul(ethUsdPrice)
      .div(Big(10).pow(tokenDecimals))
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    State.update({ mpEthPrice, userMpEthInEth, userMpEthUsd });
  }, 500);
}

return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "0 16px",
      width: "100%",
      border: "#D7E0E4 1px solid",
      borderRadius: "16px",
    }}
  >
    <div
      style={{
        minWidth: "300px",
        width: "100%",
        fontVariantNumeric: "tabular-nums",
        fontWeight: 600,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div>mpETH/ETH Price:</div>
        <div>{state.mpEthPrice}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div>Your mpETH/ETH:</div>
        <div>{state.userMpEthInEth}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div>Your mpETH/USD:</div>
        <div>{`${state.userMpEthUsd} $`}</div>
      </div>
    </div>
  </div>
);
