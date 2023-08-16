const Container = styled.div`
  .tokenIcon {
    width: 26px;
    height: 26px;
    border-radius: 100px;
    margin-right: 4px;
  }
  .rewardIcon {
    width: 16px;
    height: 16px;
    border-radius: 100px;
  }
  .assets_table {
    width: 100%;
    tr {
      color: #7c7f96;
      border: none;
      height: 50px;
    }
    th,
    td {
      border: none;
    }
    td {
      color: #fff;
      font-size: 14px;
    }
    th:first-child,
    td:first-child {
      padding-left: 20px;
      min-width: 160px;
    }
    th:nth-child(2) {
      min-width: 120px;
    }
    th:nth-child(5) {
      min-width: 120px;
    }
    th:nth-child(6) {
      min-width: 140px;
    }
    tbody {
      tr {
        line-height: 40px;
      }
      .adjust_btn {
        margin-right: 4px;
      }
      .withdraw_btn {
        flex-shrink: 0;
      }
      .table_handlers .adjust_btn div {
        background-color: rgba(0, 255, 163, 0.6);
        transition: 0.5s;
      }
      .table_handlers .withdraw_btn div {
        border-color: rgba(0, 255, 163, 0.6);
        color: rgba(0, 255, 163, 0.6);
        transition: 0.5s;
      }
      tr:hover {
        background-color: #373a53;
        border-radius: 12px;
        .table_handlers .adjust_btn div {
          background-color: #00ffa3;
        }
        .table_handlers .withdraw_btn div {
          border-color: #00ffa3;
          color: #00ffa3;
        }
      }
    }
    .table_handlers {
      display: flex;
      justify-content: end;
      margin-top: 12px;
      padding-right: 10px;
    }
  }
  .supply_title {
    font-size: 18px;
    color: #fff;
    padding-left: 20px;
  }
  .double_lines {
    line-height: 16px;
    margin-top: 4px;
  }
`;
/** base tool start  */
let accountId = context.accountId;
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const toAPY = (v) => Math.round(v * 100) / 100;
const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals || 0)).toFixed(fixed);
};
State.init({ tableData: [] });
let total_supplied_usd = Big(0);
const {
  assets,
  rewards,
  account,
  balances,
  showModalName,
  selectedTokenId,
  selectedTokenMeta,
  wnearbase64,
  closeButtonBase64,
} = state;
const { onLoadState } = props;
function changeSelectedToken(asset, type) {
  const { token_id, metadata } = asset;
  State.update({
    selectedTokenId: token_id,
    selectedTokenMeta: metadata,
    showModalName: type,
  });
}
function closeModal() {
  State.update({
    showModalName: "",
  });
}
const formatAssets = (data) => {
  const { account, rewards, assets } = data;
  const { supplied, collateral } = account;
  if (!supplied?.length && !collateral?.length) return [];
  const tokens = new Set([
    ...supplied.map((a) => a.token_id),
    ...collateral.map((a) => a.token_id),
  ]);
  return [...tokens].map((depositedTokenId) => {
    const asset = assets.find((a) => a.token_id === depositedTokenId);
    const netTvlMultiplier = asset.config.net_tvl_multiplier / 10000;
    const r = rewards.find((a) => a.token_id === asset.token_id);
    const totalApy =
      r.apyBase + r.apyRewardTvl * netTvlMultiplier + r.apyReward;

    const decimals = asset.metadata.decimals + asset.config.extra_decimals;
    const { can_use_as_collateral } = asset.config;

    const suppliedRecord = supplied.find(
      (s) => s.token_id === depositedTokenId
    );

    const depositedBalance = suppliedRecord
      ? Number(shrinkToken(suppliedRecord.balance, decimals))
      : 0;

    const collateralRecord = collateral.find(
      (c) => c.token_id === depositedTokenId
    );

    const collateralBalance = collateralRecord
      ? Number(shrinkToken(collateralRecord.balance, decimals))
      : 0;

    const totalBalance = depositedBalance + collateralBalance;
    const usd = totalBalance * asset.price.usd;
    const collateralUsd = collateralBalance * asset.price.usd;
    total_supplied_usd = total_supplied_usd.plus(usd);
    const rewardsList =
      getPortfolioRewards("Supplied", depositedTokenId, data) || [];
    return {
      icon: asset.metadata.icon,
      symbol: asset.metadata.symbol,
      totalApy,
      rewardsList,
      collateralBalance,
      collateralUsd,
      totalBalance,
      usd,
      can_use_as_collateral,
      token_id: depositedTokenId,
      asset,
    };
  });
};
const onLoad = (data) => {
  State.update(data);
  if (data.assets?.length && data.rewards?.length && data.account) {
    State.update({ tableData: formatAssets(data) });

    onLoadState &&
      onLoadState({
        total_supplied_usd: total_supplied_usd.toFixed(),
      });
  }
};

const hasData = assets.length > 0 && rewards.length > 0 && account;
function getPortfolioRewards(type, token_id, data) {
  const { account, assets } = data;
  const targetFarm = account.farms.find((farm) => {
    return farm["farm_id"][type] == token_id;
  });
  if (targetFarm) {
    const asset = assets.find((a) => a.token_id == token_id);
    const rewards = targetFarm["rewards"] || [];
    const totalRewards =
      type == "Supplied" ? asset.farms[0].rewards : asset.farms[1].rewards;
    const result = rewards.map((reward) => {
      const { reward_token_id } = reward;
      const assetDecimals =
        asset.metadata.decimals + asset.config.extra_decimals;
      const rewardAsset = assets.find((a) => a.token_id == reward_token_id);
      const rewardTokenDecimals =
        rewardAsset.metadata.decimals + rewardAsset.config.extra_decimals;

      const boostedShares = Number(
        shrinkToken(reward.boosted_shares || 0, assetDecimals)
      );
      const totalBoostedShares = Number(
        shrinkToken(
          totalRewards[reward_token_id].boosted_shares || 0,
          assetDecimals
        )
      );
      const totalRewardsPerDay = Number(
        shrinkToken(
          totalRewards[reward_token_id].reward_per_day || 0,
          rewardTokenDecimals
        )
      );
      const rewardPerDay =
        (boostedShares / totalBoostedShares) * totalRewardsPerDay || 0;
      return { rewardPerDay, metadata: asset.metadata };
    });
    return result;
  }
  return [];
}
// get portfolio deposited assets
const renderAssets = (data) =>
  data.map((item) => {
    const {
      icon,
      symbol,
      totalApy,
      rewardsList,
      collateralBalance,
      collateralUsd,
      totalBalance,
      usd,
      can_use_as_collateral,
      token_id,
      asset,
    } = item;
    return (
      <tr key={token_id}>
        <td>
          <img src={icon || wnearbase64} class="tokenIcon"></img>
          {symbol}
        </td>
        <td>{toAPY(totalApy)}%</td>
        <td>
          {rewardsList.length == 0
            ? "-"
            : rewardsList.map((reward) => {
                const { rewardPerDay, metadata } = reward;
                return (
                  <div class="flex_center">
                    {Big(rewardPerDay).toFixed(4)}
                    <img
                      class="rewardIcon ml_5"
                      src={metadata.icon || wnearbase64}
                    />
                  </div>
                );
              })}
        </td>
        <td>
          <div className="double_lines">
            <div>{collateralBalance.toFixed(4)}</div>
            <div class="text_grey_color">(${collateralUsd.toFixed(2)})</div>
          </div>
        </td>
        <td>
          <div className="double_lines">
            <div>{totalBalance.toFixed(4)}</div>
            <div class="text_grey_color">(${usd.toFixed(2)})</div>
          </div>
        </td>
        <td class="table_handlers">
          {!can_use_as_collateral ? null : (
            <div class="adjust_btn">
              <Widget
                src="juaner.near/widget/ref-operation-button"
                props={{
                  clickEvent: () => {
                    changeSelectedToken(asset, "adjust");
                  },
                  buttonType: "solid",
                  actionName: "Adjust",
                  hoverOn: true,
                }}
              />
            </div>
          )}
          <div class="withdraw_btn">
            <Widget
              src="juaner.near/widget/ref-operation-button"
              props={{
                clickEvent: () => {
                  changeSelectedToken(asset, "withdraw");
                },
                buttonType: "line",
                actionName: "Withdraw",
                hoverOn: true,
              }}
            />
          </div>
        </td>
      </tr>
    );
  });

function getWnearIcon(icon) {
  State.update({
    wnearbase64: icon,
  });
}
function getCloseButtonIcon(icon) {
  State.update({
    closeButtonBase64: icon,
  });
}
return (
  <Container className="pt-3">
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* load icons */}
    <Widget
      src="juaner.near/widget/ref-icons"
      props={{ getWnearIcon, getCloseButtonIcon }}
    />
    <div class="supply_title">You Supplied</div>
    <table class="assets_table click">
      <thead>
        <tr>
          <th scope="col" width="20%">
            Assets
          </th>
          <th scope="col" width="15%">
            Supply APY
          </th>
          <th scope="col" width="15%">
            Rewards
          </th>
          <th scope="col" width="15%">
            Collateral
          </th>
          <th scope="col" width="15%">
            You Supplied
          </th>
          <th scope="col" width="20%"></th>
        </tr>
      </thead>
      <tbody>{renderAssets(state.tableData)}</tbody>
    </table>
    {/** modal */}
    <Widget
      src="juaner.near/widget/ref-market-supply-adjust"
      props={{
        showModal: showModalName == "adjust",
        closeModal,
        selectedTokenId,
        selectedTokenMeta,
      }}
    />
    <Widget
      src="juaner.near/widget/ref-market-supply-withdraw"
      props={{
        showModal: showModalName == "withdraw",
        closeModal,
        selectedTokenId,
        selectedTokenMeta,
      }}
    />
  </Container>
);
