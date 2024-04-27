const Yours = styled.div`
  display: flex;
  gap: 20px;
`;
const YoursTableWrapper = styled.div`
  background-color: rgba(53, 55, 73, 0.2);
  border-radius: 6px;
  width: 50%;
`;
const Title = styled.div`
  padding: 20px;
  border-bottom: 1px solid #292c42;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #7c7f96;
  &.yours-table-title {
    color: var(--yours-table-title);
  }
`;
const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 4px;
  color: #fff;
  &.supply-color {
    color: var(--supply-color);
  }
  &.borrow-color {
    color: var(--borrow-color);
  }
`;
const Right = styled.div`
  text-align: right;
`;

const { markets, dapps, toast, currentDapp, borrowLimit } = props;

const { userTotalSupplyUsd, userTotalBorrowUsd, totalCollateralUsd } =
  dapps[currentDapp];
const formatData = () => {
  const marketsToList = Object.values(markets);
  const supplies = [];
  const borrows = [];
  let rewards = [];
  let change = Big(0);
  marketsToList.forEach((market) => {
    const dapp = dapps[market.dapp];
    let rewardSupplyApy = 0;
    let rewardBorrowApy = 0;
    // if (market.distributionApy) {
    //   market.distributionApy.forEach((reward) => {
    //     const supplyApy = reward.apyAccountSupply || reward.supply;
    //     const borrowApy = reward.apyAccountBorrow || reward.borrow;
    //     rewardSupplyApy += Number(supplyApy.slice(0, -1));
    //     rewardBorrowApy += Number(borrowApy.slice(0, -1));
    //   });
    // }

    if (Big(market.userSupply || 0).gt(0)) {
      supplies.push({
        icon: market.underlyingToken.icon,
        symbol: market.underlyingToken.symbol,
        dappIcon: dapp.dappIcon,
        dappName: dapp.dappName,
        apy: market.supplyApy,
        isCollateral: market.isCollateral,
        balance: market.userSupply,
        balance_value: Big(market.userSupply || 0)
          .mul(prices[market.symbol] || 1)
          .toString(),
        address: market.address,
        // distributionApy: market.distributionApy,
      });
      // change = change.add(
      //   Big(
      //     (Number(market.supplyApy.slice(0, -1)) + rewardSupplyApy) / 100 || 0
      //   )
      //     .mul(market.userSupply || 0)
      //     .mul(prices[market.symbol]||1)
      // );
    }
    if (Big(market.userBorrow || 0).gt(0)) {
      borrows.push({
        icon: market.underlyingToken.icon,
        symbol: market.underlyingToken.symbol,
        dappIcon: dapp.dappIcon,
        dappName: dapp.dappName,
        apy: market.borrowApy,
        borrowed: market.userBorrow,
        borrowed_value: Big(market.userBorrow || 0)
          .mul(prices[market.symbol] || 1)
          .toString(),
        address: market.address,
        // distributionApy: market.distributionApy,
      });
      // change = change.minus(
      //   Big(
      //     (Number(market.borrowApy.slice(0, -1)) - rewardBorrowApy) / 100 || 0
      //   )
      //     .mul(market.userBorrow || 0)
      //     .mul(prices[market.symbol]||1)
      // );
    }
  });
  // Object.values(dapps).forEach((dapp) => {
  //   if (
  //     dapp.rewards &&
  //     dapp.rewards.length &&
  //     (currentDapp === "All" || currentDapp === dapp.dappName)
  //   ) {
  //     dapp.rewards.forEach((reward) => {
  //       rewards.push({
  //         icon: reward.icon,
  //         symbol: reward.symbol,
  //         dappIcon: dapp.dappIcon,
  //         dappName: dapp.dappName,
  //         dailyReward: reward.dailyRewards,
  //         dailyReward_value: Big(reward.dailyRewards || 0)
  //           .mul(reward.price || 0)
  //           .toString(),
  //         unclaimed: reward.unclaimed,
  //         unclaimed_value: Big(reward.unclaimed || 0)
  //           .mul(reward.price || 0)
  //           .toString(),
  //         ...reward,
  //       });
  //     });
  //   }
  // });
  State.update({
    // userTotalBorrowUsd: userTotalBorrowUsd.toString(),
    supplies,
    borrows,
    // rewards,
    // netApy: change
    //   .div(userTotalSupplyUsd.eq(0) ? 1 : userTotalSupplyUsd)
    //   .mul(100)
    //   .toFixed(2),
  });
};

useEffect(() => {
  if (markets) {
    formatData();
  }
}, [markets, currentDapp]);

console.log("YOURS--", state);
return (
  <>
    <Yours>
      <YoursTableWrapper>
        <Title>
          <div>
            <Label className="yours-table-title">You Deposit</Label>
            <Value className="supply-color">
              <Widget
                src="bluebiu.near/widget/Avalanche.Lending.Total"
                props={{
                  total: userTotalSupplyUsd,
                  digit: 2,
                  unit: "$",
                }}
              />
            </Value>
          </div>
          <Right>
            <Label>LTV</Label>
            <Value className="supply-color">
              {userTotalBorrowUsd && userTotalSupplyUsd
                ? Big(userTotalBorrowUsd || 1)
                    .div(Big(userTotalSupplyUsd || 0))
                    .times(100)
                    .toFixed(2)
                : "-"}
              %
            </Value>
          </Right>
        </Title>
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.DepositTable"
          props={{
            data: state.supplies || [],
            onButtonClick: props.onButtonClick,
          }}
        />
      </YoursTableWrapper>
      <YoursTableWrapper>
        <Title>
          <div>
            <Label className="yours-table-title">Borrow</Label>
            <Value className="borrow-color">
              <Widget
                src="bluebiu.near/widget/Avalanche.Lending.Total"
                props={{
                  total: userTotalBorrowUsd,
                  digit: 2,
                  unit: "$",
                }}
              />
            </Value>
          </div>
          <Right>
            <Label>Your Borrow Limit</Label>
            <Value className="supply-color">
              ${Number(borrowLimit).toFixed(2)}
            </Value>
          </Right>
        </Title>
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.BorrowTable"
          props={{
            data: state.borrows || [],
            onButtonClick: props.onButtonClick,
          }}
        />
      </YoursTableWrapper>
    </Yours>
    {/* <Widget
      src="bluebiu.near/widget/Avalanche.Lending.RewardsTable"
      props={{
        data: state.rewards || [],
        dapps: props.dappsConfig,
        onSuccess: props.onSuccess,
        supplies: state.supplies,
        toast,
      }}
    /> */}
  </>
);
