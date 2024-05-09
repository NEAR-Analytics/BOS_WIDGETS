const accountId = context.accountId;

State.init({
  type: accountId ? "yours" : "market",
});

const toAPY = (v) => Math.round(v * 100) / 100;
const shrinkToken = (value, decimals, fixed) => {
  return new Big(value || 0).div(new Big(10).pow(decimals || 0)).toFixed(fixed);
};
// get all assets data from burrow contracts

const {
  assets,
  rewards,
  account,
  balances,
  selectedTokenId,
  selectedTokenMeta,
  type,
  showModal,
} = state;

const hasData = assets.length > 0 && rewards.length > 0 && account;
const rewardsMap = rewards
  ? rewards.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
const assetsMap = assets
  ? assets.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};
const onLoad = (data) => {
  State.update(data);
};
// get unclaimed rewards
const unclaimedRewardsMap = account
  ? account.farms?.reduce((prev, curr) => {
      for (const reward of curr.rewards) {
        const t = prev[reward.reward_token_id];
        if (t) {
          prev[reward.reward_token_id] = Big(t)
            .plus(Big(reward.unclaimed_amount))
            .toFixed();
        } else {
          prev[reward.reward_token_id] = Big(reward.unclaimed_amount).toFixed();
        }
      }
      return prev;
    }, {})
  : {};
let unclaimedRewards$ = Big(0);
const unclaimedRewardsIcons = Object.keys(unclaimedRewardsMap).map((id) => {
  const asset = assets.find((a) => a.token_id === id);
  const decimals = asset.metadata.decimals + asset.config.extra_decimals;
  const unclaimed = shrinkToken(unclaimedRewardsMap[id], decimals);
  unclaimedRewards$ = unclaimedRewards$.plus(
    Big(unclaimed).mul(asset.price.usd || 0)
  );
  return {
    id,
    icon: asset.metadata.icon,
  };
});
// get net apy
const getNetAPY = (assets, account) => {
  const extraDaily = getExtraDaily(assets, account);
  const [gainCollateral, totalCollateral] = getGains(
    account,
    assets,
    "collateral"
  );
  const [gainSupplied, totalSupplied] = getGains(account, assets, "supplied");
  const [gainBorrowed] = getGains(account, assets, "borrowed");

  const gainExtra = extraDaily * 365;

  const netGains = gainCollateral + gainSupplied + gainExtra - gainBorrowed;
  const netTotals = totalCollateral + totalSupplied;
  const netAPY = (netGains / netTotals) * 100;

  return netAPY || 0;
};
function getExtraDaily(assets, account) {
  const farms = account.farms.filter(
    (farm) => !!(farm.farm_id["Supplied"] || farm.farm_id["Borrowed"])
  );
  const farmsRewards = farms
    .map((farm) => {
      const token_id = farm.farm_id.Borrowed || farm.farm_id.Supplied;
      const asset = assets.find((asset) => asset.token_id == token_id);
      const assetDecimals =
        asset.metadata.decimals + asset.config.extra_decimals;
      const rewards = farm.rewards.map((reward) => {
        const { reward_token_id, boosted_shares, asset_farm_reward } = reward;
        const assetReward = assets.find(
          (asset) => asset.token_id == reward_token_id
        );
        const rewardAssetDecimals =
          assetReward.metadata.decimals + assetReward.config.extra_decimals;
        const boostedShares = Number(
          shrinkToken(boosted_shares, assetDecimals)
        );
        const totalBoostedShares = Number(
          shrinkToken(asset_farm_reward.boosted_shares, assetDecimals)
        );
        const totalRewardsPerDay = Number(
          shrinkToken(asset_farm_reward.reward_per_day, rewardAssetDecimals)
        );
        const dailyAmount =
          (boostedShares / totalBoostedShares) * totalRewardsPerDay;
        return { dailyAmount, reward_token_id, token_id };
      });
      return rewards;
    })
    .flat();
  const extraDaily$ = farmsRewards.reduce((acc, cur) => {
    const { dailyAmount, reward_token_id } = cur;
    const assetReward = assets.find(
      (asset) => asset.token_id == reward_token_id
    );
    const price = assetReward.price.usd || 0;
    return acc + dailyAmount * price;
  }, 0);
  return extraDaily$ || 0;
}
function getGains(account, assets, source) {
  return account[source]
    .map((accountAsset) => {
      const { token_id, balance, apr } = accountAsset;
      const asset = assets.find((asset) => asset.token_id == token_id);
      const netTvlMultiplier = asset.config.net_tvl_multiplier / 10000;
      const balanceUSD = toUsd(balance, asset);
      return [balanceUSD * (withNetTvlMultiplier ? netTvlMultiplier : 1), apr];
    })
    .reduce(
      ([gain, sum], [balance, apr]) => [gain + balance * apr, sum + balance],
      [0, 0]
    );
}
const toUsd = (balance, asset) =>
  asset?.price?.usd
    ? Number(
        shrinkToken(
          balance,
          asset.metadata.decimals + asset.config.extra_decimals
        )
      ) * asset.price.usd
    : 0;
let apyNetValue;
if (assets && account && rewards) {
  const netAPY = getNetAPY(assets, account);
  const r = rewards[0].apyRewardTvl || 0;
  apyNetValue = Big(netAPY || 0)
    .plus(r)
    .toFixed(2);
}

const handleClaimAll = () => {
  Near.call({
    contractName: "contract.main.burrow.near",
    methodName: "account_farm_claim_all",
  });
};
// get portfolio borrowed assets
function getSuppliedUSD(totalSuppliedUSD) {
  let yourSuppliedUSD;
  const big_total_supplied_usd = Big(totalSuppliedUSD || 0);
  if (big_total_supplied_usd.gt(0)) {
    yourSuppliedUSD = big_total_supplied_usd.lt(0.01)
      ? "<$0.01"
      : "$" + big_total_supplied_usd.toFixed(2);
  }
  return yourSuppliedUSD;
}

function getBurrowedUSD(totalBurrowedUSD) {
  let yourBurrowedUSD;

  const big_total_burrowed_usd = Big(totalBurrowedUSD || 0);
  if (big_total_burrowed_usd.gt(0)) {
    yourBurrowedUSD = big_total_burrowed_usd.lt(0.01)
      ? "<$0.01"
      : "$" + big_total_burrowed_usd.toFixed(2);
  }
  return yourBurrowedUSD;
}

function closeModal() {
  State.update({
    showModal: false,
  });
}

function toggleType(type) {
  State.update({
    type,
  });
}

return (
  <div className="dash_panel">
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* Header */}
    <div class="header pb-2">
      <div class="title">Lending</div>
      <div class="switch">
        <div
          class={`switch_item ${type === "yours" ? "active" : ""}`}
          onClick={() => toggleType("yours")}
        >
          Yours
        </div>
        <div
          class={`switch_item ${type === "market" ? "active" : ""}`}
          onClick={() => toggleType("market")}
        >
          Market
        </div>
      </div>
    </div>

    {/* Yours */}
    {state.type === "yours" && (
      <div class="flex dash_panel_content">
        <div className="dash_panel_data">
          {!accountId ? null : (
            <div class="block">
              <label class="t">Net APY</label>
              <span class="v">{apyNetValue || "0"}%</span>
            </div>
          )}
          <div class="block">
            <label class="t">Supplied</label>
            <span class="v">
              {getSuppliedUSD(props.total_supplied_usd) || "$0"}
            </span>
          </div>
          <div class="block">
            <label class="t">Borrowed</label>
            <span class="v">
              {getBurrowedUSD(props.total_burrowed_usd) || "$0"}
            </span>
          </div>
          <div class="block">
            <label class="t">Health Factor</label>
            <span class="v" style={{ color: "#00FFA3" }}>
              <Widget src="juaner.near/widget/ref-burrow-healthFactor"></Widget>
            </span>
          </div>
        </div>
        <div class="block noBorder dash_panel_pc_action">
          <label class="t">Unclaimed Rewards</label>
          <div class="flex_center">
            {unclaimedRewardsIcons.length ? (
              <>
                <div class="flex_center">
                  <span class="v mr_10">${unclaimedRewards$.toFixed(2)}</span>
                  {unclaimedRewardsIcons.map((reward) => (
                    <img src={reward.icon} class="rewardIcon"></img>
                  ))}
                </div>
                <div class="claim_button" onClick={handleClaimAll}>
                  Claim
                </div>
              </>
            ) : (
              <span class="v mr_10">$0</span>
            )}
          </div>
        </div>
        <div class="block dash_panel_mb_action">
          <div className="unclaimed_rewards">
            <label class="t">Unclaimed Rewards</label>
            <div>
              <span class="v mr_10">${unclaimedRewards$.toFixed(2)}</span>
              {unclaimedRewardsIcons.map((reward) => (
                <img src={reward.icon} class="rewardIcon"></img>
              ))}
            </div>
          </div>
          <div class="claim_button_wrapper">
            <div class="claim_button" onClick={handleClaimAll}>
              Claim
            </div>
          </div>
        </div>
      </div>
    )}
    {/* Market */}
    {state.type === "market" && (
      <div class="flex dash_panel_content">
        <div className="dash_panel_data dash_panel_market_data">
          <div class="block">
            <label class="t">Total Supplied</label>
            <span class="v">
              $
              {state.supplied ? parseInt(state.supplied).toLocaleString() : "0"}
            </span>
          </div>
          <div class="block">
            <label class="t">Total Borrowed</label>
            <span class="v">
              $
              {state.borrowed ? parseInt(state.borrowed).toLocaleString() : "0"}
            </span>
          </div>
          <div class="block">
            <label class="t">Available Liquidity</label>
            <span class="v">
              $
              {parseInt(
                Big(state.supplied || 0)
                  .minus(state.borrowed || 0)
                  .toNumber()
              ).toLocaleString() || "0"}
            </span>
          </div>
          <div class="block noBorder">
            <label class="t">Daily Rewards</label>
            <span class="v">${state.dailyRewards || "0"}</span>
          </div>
        </div>
      </div>
    )}
  </div>
);
