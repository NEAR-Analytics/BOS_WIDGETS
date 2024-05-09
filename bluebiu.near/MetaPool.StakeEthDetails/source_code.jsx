const Wrapper = styled.div`
  color: #787da1;
  font-size: 16px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 15px;
    padding: 20px 20px 0px;
  }
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const Label = styled.div``;
const Value = styled.div`
  text-align: right;
`;
const ethAccount = Ethers.send("eth_requestAccounts", [])[0];
const stakingData = props.stakingData || undefined;
const ethUsdPrice = props.ethUsdPrice || undefined;
const tokenDecimals = 18;

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
const getStakedBalance = () => {
  if (!ethAccount) return;
  const Erc20Contract = new ethers.Contract(
    props.address,
    props.abi,
    Ethers.provider().getSigner()
  );
  Erc20Contract.balanceOf(ethAccount)
    .then((_balance) => {
      const balance = ethers.utils.formatEther(_balance._hex);
      Storage.privateSet("stakeBalance", balance);
    })
    .catch((err) => {});
};
const handleDetails = () => {
  const bigMpEthPrice = Big(getMpETHPrice());

  const mpEthPrice = bigMpEthPrice
    .div(Big(10).pow(tokenDecimals))
    .toFixed(6)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const stakeBalance = Storage.privateGet("stakeBalance");
  if (!stakeBalance) {
    State.update({ mpEthPrice });
  } else {
    const userMpEthInEth = bigMpEthPrice
      .mul(parseFloat(stakeBalance))
      .div(Big(10).pow(tokenDecimals))
      .toFixed(6)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    const userMpEthUsd = Big(mpEthPrice)
      .mul(stakeBalance)
      .mul(ethUsdPrice)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    State.update({ mpEthPrice, userMpEthInEth, userMpEthUsd });
  }
};
if (ethUsdPrice && stakingData) {
  handleDetails();
  getStakedBalance();
}

return (
  <Wrapper>
    <Item>
      <Label>mpETH/ETH Price:</Label>
      <Value>{state.mpEthPrice || Number(0).toFixed(6)}</Value>
    </Item>
    <Item>
      <Label>Your mpETH/ETH:</Label>
      <Value>{state.userMpEthInEth || "0.000000"}</Value>
    </Item>
    <Item>
      <Label>Your mpETH/USD:</Label>
      <Value>{state.userMpEthUsd ? `$${state.userMpEthUsd}` : "$0.00"}</Value>
    </Item>
  </Wrapper>
);
