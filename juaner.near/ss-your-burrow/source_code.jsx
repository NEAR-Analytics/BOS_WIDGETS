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
  .flex-end {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 50px;
  }
  .assets_table {
    display: block;
    width: 100%;
    tr {
      color: #7c7f96;
      border: none;
      height: 50px;
    }
    th,
    td {
      border: none;
      font-size: 14px;
    }
    td {
      color: #fff;
    }
    th:first-child,
    td:first-child {
      padding-left: 20px;
      min-width: 160px;
    }
    th:nth-child(2) {
      padding-right: 10px;
      min-width: 120px;
    }
    tbody {
      tr {
        line-height: 40px;
      }
      .table_handlers div {
        background-color: rgba(0, 255, 163, 0.6);
        transition: 0.5s;
      }
      tr:hover {
        background-color: #373a53;
        border-radius: 12px;
        .table_handlers div {
          background-color: #00ffa3;
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
  .burrow_title {
    font-size: 18px;
    color: #fff;
    padding-left: 20px;
  }
  .double_lines {
    line-height: 16px;
    margin-top: 4px;
  }
  @media (max-width: 900px) {
    .assets_table {
      display: none;
    }
  }
`;
/** base tool start  */
let accountId = context.accountId;

let B = Big();
B.DP = 60; // set precision to 60 decimals
State.init({ tableData: [] });
const toAPY = (v) => Math.round(v * 100) / 100;
const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals || 0)).toFixed(fixed);
};
let total_burrowed_usd = Big(0);
function getExtraApy(asset, account, assets) {
  const asset_token_id = asset.token_id;
  const borrowFarm = asset.farms.find(
    (farm) =>
      farm["farm_id"]["Borrowed"] && Object.keys(farm.rewards || {}).length
  );
  if (!borrowFarm) return 0;
  const assetDecimals = asset.metadata.decimals + asset.config.extra_decimals;
  const totalBorrowUSD = toUsd(asset.borrowed.balance, asset);
  const rewards = borrowFarm.rewards;
  let userFarm;
  if (account) {
    userFarm = account.farms.find((farm) => {
      return (
        farm["farm_id"]["Borrowed"] == asset.token_id && farm.rewards.length
      );
    });
  }
  if (!userFarm) {
    return Object.keys(rewards)
      .map((reward_token_id) => {
        const farmData = rewards[reward_token_id];
        const { reward_per_day, boosted_shares } = farmData;
        const assetReward = assets.find(
          (asset) => asset.token_id == reward_token_id
        );
        const totalRewardsUsd = toUsd(
          B(reward_per_day).mul(365).toFixed(),
          assetReward
        );
        if (B(totalBorrowUSD).eq(0)) return 0;
        const apy = B(totalRewardsUsd).div(totalBorrowUSD).mul(100).toFixed();
        return apy;
      })
      .reduce((acc, cur) => acc + Number(cur), 0);
  } else {
    return userFarm.rewards
      .map((farmData) => {
        const { reward_token_id, boosted_shares, asset_farm_reward } = farmData;
        const assetReward = assets.find(
          (asset) => asset.token_id == reward_token_id
        );
        const borrowedShares = Number(
          shrinkToken(boosted_shares || 0, assetDecimals)
        );
        const totalBoostedShares = Number(
          shrinkToken(asset_farm_reward.boosted_shares, assetDecimals)
        );
        const boosterLogBase = Number(
          shrinkToken(
            asset_farm_reward.booster_log_base,
            config.booster_decimals
          )
        );
        const xBRRRAmount = Number(
          shrinkToken(
            account.booster_staking["x_booster_amount"] || 0,
            config.booster_decimals
          )
        );
        const log = Math.log(xBRRRAmount) / Math.log(boosterLogBase);
        const multiplier = log >= 0 ? 1 + log : 1;
        const userBorrowedBalance =
          account.borrowed.find((asset) => asset.token_id == asset_token_id)
            .balance || 0;
        const totalUserAssetUSD = toUsd(userBorrowedBalance, asset);
        const totalRewardsUsd = toUsd(
          B(asset_farm_reward.reward_per_day).mul(365).toFixed(),
          assetReward
        );
        return B(totalRewardsUsd)
          .mul(borrowedShares / totalBoostedShares)
          .mul(multiplier)
          .div(totalUserAssetUSD)
          .mul(100)
          .toFixed();
      })
      .reduce((acc, cur) => acc + Number(cur), 0);
  }
}
const toUsd = (balance, asset) =>
  asset.price?.usd
    ? Number(
        shrinkToken(
          balance,
          asset.metadata.decimals + asset.config.extra_decimals
        )
      ) * asset.price.usd
    : 0;
const {
  assets,
  rewards,
  account,
  balances,
  showModal,
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
    type,
    showModal: true,
  });
}
function closeModal() {
  State.update({
    showModal: false,
  });
}
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
        shrinkToken(reward.boosted_shares, assetDecimals)
      );
      const totalBoostedShares = Number(
        shrinkToken(totalRewards[reward_token_id].boosted_shares, assetDecimals)
      );
      const totalRewardsPerDay = Number(
        shrinkToken(
          totalRewards[reward_token_id].reward_per_day,
          rewardTokenDecimals
        )
      );
      const rewardPerDay =
        (boostedShares / totalBoostedShares) * totalRewardsPerDay || 0;
      return { rewardPerDay, metadata: rewardAsset.metadata, rewardAsset };
    });
    return result;
  }
  return [];
}
const formatAssets = (data) => {
  const { account, rewards, assets } = data;
  return account?.borrowed.map((borrowedAsset) => {
    const asset = assets.find((a) => a.token_id === borrowedAsset.token_id);
    const r = rewards.find((a) => a.token_id === asset.token_id);
    const totalApy = r.apyBaseBorrow;
    const extraApy = getExtraApy(asset, account, assets);
    const apy = totalApy - extraApy;
    const decimals = asset.metadata.decimals + asset.config.extra_decimals;
    const borrowed = Number(shrinkToken(borrowedAsset.balance, decimals));
    const usd = borrowed * asset.price.usd;
    total_burrowed_usd = total_burrowed_usd.plus(usd);
    const rewardsList =
      getPortfolioRewards("Borrowed", borrowedAsset.token_id, data) || [];
    return {
      icon: asset.metadata.icon,
      symbol: asset.metadata.symbol,
      apy,
      rewardsList,
      borrowed,
      usd,
      token_id: asset.token_id,
      asset,
    };
  });
};
const onLoad = (data) => {
  State.update(data);
  // get market can deposit assets
  if (data.assets?.length && data.rewards?.length && data.account) {
    State.update({ tableData: formatAssets(data) });
    onLoadState &&
      onLoadState({
        total_burrowed_usd: total_burrowed_usd.toFixed(),
      });
  }
};

const hasData = assets.length > 0 && rewards.length > 0 && account;
const formatValue = (v) => {
  if (Big(v).eq(0)) return "0";
  if (Big(v).lt(0.01)) return hasDollar ? "<$0.01" : "<0.01";
  return Big(v).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const renderAssets = (assets) =>
  assets.map((item) => {
    const { token_id, icon, symbol, apy, rewardsList, borrowed, usd, asset } =
      item;
    return (
      <tr key={token_id}>
        <td>
          <img src={icon || wnearbase64} class="tokenIcon"></img>
          {symbol !== "wNEAR" ? symbol : "NEAR"}
        </td>
        <td>{toAPY(apy)}%</td>
        <td>
          {rewardsList.length == 0
            ? "-"
            : rewardsList.map((reward) => {
                const { rewardPerDay, metadata, rewardAsset } = reward;
                return (
                  <div class="flex_center">
                    $
                    {formatValue(
                      Big(rewardPerDay || 0)
                        .mul(rewardAsset?.price?.usd || 0)
                        .toString(),
                      true
                    )}
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
            <div>{formatValue(borrowed)}</div>
            <div class="text_grey_color">(${formatValue(usd, true)})</div>
          </div>
        </td>
        <td class="table_handlers">
          <Widget
            src="juaner.near/widget/ref-operation-button"
            props={{
              clickEvent: () => {
                changeSelectedToken(asset, "burrow");
              },
              buttonType: "solid",
              actionName: "Repay",
              hoverOn: true,
            }}
          />
        </td>
      </tr>
    );
  });
const renderMbAssets = (data, hasDollar) =>
  data.map((item) => {
    const { token_id, icon, symbol, apy, rewardsList, borrowed, usd, asset } =
      item;
    return (
      <div className="mb_row" key={token_id}>
        <div className="mb_row_header">
          <div className="mb_row_token">
            <img src={icon || wnearbase64} class="tokenIcon"></img>
            {symbol !== "wNEAR" ? symbol : "NEAR"}
          </div>
          <div className="double_lines">
            <div>{formatValue(borrowed)}</div>
            <div class="text_grey_color">(${formatValue(usd, true)})</div>
          </div>
        </div>
        <div className="mb_row_item">
          <div className="mb_row_label">Borrow Apy</div>
          <div className="mb_row_value">{toAPY(apy)}%</div>
        </div>
        <div className="mb_row_item">
          <div className="mb_row_label">Rewards</div>
          <div className="mb_row_value">
            {rewardsList.length == 0
              ? "-"
              : rewardsList.map((reward) => {
                  const { rewardPerDay, metadata, rewardAsset } = reward;
                  return (
                    <div class="flex_center">
                      $
                      {formatValue(
                        Big(rewardPerDay || 0)
                          .mul(rewardAsset?.price?.usd || 0)
                          .toString(),
                        true
                      )}
                      <img
                        class="rewardIcon ml_5"
                        src={metadata.icon || wnearbase64}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="mb_row_actions">
          <div className="action_btn">
            <Widget
              src="juaner.near/widget/ref-operation-button"
              props={{
                clickEvent: () => {
                  changeSelectedToken(asset, "burrow");
                },
                buttonType: "solid",
                actionName: "Repay",
                hoverOn: true,
              }}
            />
          </div>
        </div>
      </div>
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
    <Widget src="juaner.near/widget/ref-icons" props={{ getWnearIcon }} />
    <div class="burrow_title">You Borrowed</div>
    <table class="assets_table click">
      <thead>
        <tr>
          <th scope="col" width="20%">
            Assets
          </th>
          <th scope="col" class="text-start" width="20%">
            Borrow APY
          </th>
          <th scope="col" class="text-start" width="20%">
            Rewards
          </th>
          <th scope="col" class="text-start" width="15%">
            Borrowed
          </th>
          <th scope="col"></th>
        </tr>
      </thead>

      {accountId && <tbody>{renderAssets(state.tableData)}</tbody>}
    </table>
    <div className="mb_table">{renderMbAssets(state.tableData)}</div>
    {/** modal */}
    <Widget
      src="juaner.near/widget/ref-market-burrow-repay"
      props={{ selectedTokenId, selectedTokenMeta, showModal, closeModal }}
    />
  </Container>
);
