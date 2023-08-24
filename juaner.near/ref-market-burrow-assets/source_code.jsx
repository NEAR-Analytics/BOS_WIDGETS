const Container = styled.div`
  background-color: #25283a;
  border-radius: 12px;
  .template {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 6px;
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
    th:nth-child(5) {
      min-width: 120px;
    }
    tbody {
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
      tr:last-child td:first-child {
        border-bottom-left-radius: 12px;
      }
      tr:last-child td:last-child {
        border-bottom-right-radius: 12px;
      }
    }
    .table_handlers {
      display: flex;
      justify-content: end;
      align-items: center;
      padding-right: 10px;
    }
  }

  .tokenIcon {
    width: 26px;
    height: 26px;
    border-radius: 100px;
    margin-right: 8px;
  }
  .rewardIcon {
    width: 16px;
    height: 16px;
    border-radius: 100px;
  }
  .text_red_color {
    color: #ff6ba9;
  }
  .ml_4_ne {
    margin-left: -4px;
  }
  .font-18 {
    font-size: 18px;
  }
  .title {
    padding-left: 20px;
  }
`;
/** base tool start  */
let accountId = context.accountId;
// if (!accountId) {
//   return <Widget src="juaner.near/widget/ref_account-signin" />;
// }
let MAX_RATIO = 10_000;
let BURROW_CONTRACT = "contract.main.burrow.near";
let B = Big();
B.DP = 60; // set precision to 60 decimals

State.init({ tableData: [] });

const toAPY = (v) => (v ? (Math.round(v * 100) / 100).toFixed(2) : 0);
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return B(value).div(B(10).pow(decimals || 0));
};

const expandToken = (value, decimals) => {
  return B(value).mul(B(10).pow(decimals || 0));
};

const formatToken = (v) => Math.floor(v * 10_000) / 10_000;

const power = (x, y) => {
  if (y === 0) {
    return 1;
  } else if (y % 2 === 0) {
    return power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  } else {
    return x * power(x, parseInt(y / 2)) * power(x, parseInt(y / 2));
  }
};
const nFormat = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
  ];
  var item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item ? (num / item.value).toFixed(digits) + item.symbol : "0";
};
const {
  rewards,
  account,
  balances,
  selectedTokenId,
  amount,
  hasError,
  assets,
  tabName,
  showModal,
  wnearbase64,
  closeButtonBase64,
} = state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
/** base tool end */
const config = Near.view(BURROW_CONTRACT, "get_config");
const formatAssets = (data) => {
  const rewardsMap = data.rewards
    ? data.rewards.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.token_id]: cur,
        };
      }, {})
    : {};
  const assetsMap = data.assets
    ? data.assets.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.token_id]: cur,
        };
      }, {})
    : {};
  State.update({
    activeArrow: "up-liquidity",
  });
  return data.assets
    .filter(
      (a) => a.config.can_borrow && !["meta-token.near"].includes(a.token_id)
    )
    .map((asset) => {
      const { token_id, metadata, price, config } = asset;
      const r = data.rewards.find((a) => a.token_id === asset.token_id);
      const borrowApy = r.apyBaseBorrow;
      const extraApy = getExtraApy(asset, data.account, data.assets);
      const apy = borrowApy - extraApy;
      const token_usd_price = price && price.usd;
      const liquidity = B(asset.availableLiquidity || 0)
        .mul(token_usd_price || 0)
        .toNumber();
      const { volatility_ratio } = config;

      const hasRewards = rewardsMap[token_id] && assetsMap[token_id];
      const rewardMap = hasRewards && rewardsMap[token_id];
      const rewardTokens = rewardMap && rewardMap.rewardTokensBorrow;
      return {
        icon: metadata.icon,
        symbol: metadata.symbol,
        apy,
        rewardTokens,
        volatility_ratio,
        token_id,
        liquidity,
      };
    })
    .sort((a, b) => b.liquidity - a.liquidity);
};
const onLoad = (data) => {
  State.update(data);
  // get market can deposit assets
  if (data.assets && data.assets.length) {
    State.update({ tableData: formatAssets(data) });
  }
};
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
// get market can burrow assets
const renderAssets = (data) =>
  data.map((asset) => {
    const {
      icon,
      symbol,
      apy,
      rewardTokens,
      volatility_ratio,
      token_id,
      liquidity,
    } = asset;
    const rewardTokensImg =
      rewardTokens &&
      rewardTokens.map((token_id, index) => {
        const metadata = assetsMap[token_id].metadata;
        return (
          <img
            class={`rewardIcon ${index > 0 ? "ml_4_ne" : ""}`}
            src={metadata.icon}
          ></img>
        );
      });
    const cf = volatility_ratio / 100;
    const liquidity_display = nFormat(liquidity, 2);
    return (
      <tr key={token_id}>
        <td>
          <img src={icon || wnearbase64} class="tokenIcon"></img>
          {symbol !== "wNEAR" ? symbol : "NEAR"}
        </td>
        <td>{toAPY(apy)}%</td>
        <td class="text-white">
          {rewardTokensImg.length == 0 ? "-" : rewardTokensImg}
        </td>
        <td>{cf || "-"}%</td>
        <td>${liquidity_display}</td>
        <td>
          <div class="table_handlers">
            <Widget
              src="juaner.near/widget/ref-operation-button"
              props={{
                clickEvent: () => {
                  handleSelect(token_id);
                },
                buttonType: "solid",
                actionName: "Borrow",
                hoverOn: true,
              }}
            />
          </div>
        </td>
      </tr>
    );
  });
const handleSelect = (token_id) => {
  State.update({
    selectedTokenId: token_id,
    showModal: true,
  });
};
function closeModal() {
  State.update({
    showModal: false,
  });
}
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
const selectedToken = (selectedTokenId && assetsMap[selectedTokenId]) || {};
const selectedTokenMeta = selectedToken.metadata || {};

const handleSort = (type, key) => {
  console.log(type, key, state.tableData);
  if (!state.tableData.length) return;
  State.update({
    tableData: state.tableData.sort((a, b) =>
      type === "down" ? a[key] - b[key] : b[key] - a[key]
    ),
    activeArrow: `${type}-${key}`,
  });
};
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* load icons */}
    <Widget
      src="juaner.near/widget/ref-icons"
      props={{ getWnearIcon, getCloseButtonIcon }}
    />
    {/* market */}
    <div class="fw-bold text-white pt-3 font-18 title">
      <span class="text_red_color">Borrow</span> Market
    </div>
    <table class="assets_table click">
      <thead>
        <tr>
          <th scope="col" width="20%">
            Assets
          </th>
          <th scope="col" width="15%">
            <div className="table_sorter">
              <span>APY</span>
              <div className="arrows">
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-up ${
                      state.activeArrow === "up-apy" && "active"
                    }`}
                    onClick={() => {
                      handleSort("up", "apy");
                    }}
                  />
                </div>
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-down ${
                      state.activeArrow === "down-apy" && "active"
                    }`}
                    onClick={() => {
                      handleSort("down", "apy");
                    }}
                  />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" width="15%">
            Rewards
          </th>
          <th scope="col" width="15%">
            C.F.
          </th>
          <th scope="col" width="20%">
            <div className="table_sorter">
              <span>Liquidity</span>
              <div className="arrows">
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-up ${
                      state.activeArrow === "up-liquidity" && "active"
                    }`}
                    onClick={() => {
                      handleSort("up", "liquidity");
                    }}
                  />
                </div>
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-down ${
                      state.activeArrow === "down-liquidity" && "active"
                    }`}
                    onClick={() => {
                      handleSort("down", "liquidity");
                    }}
                  />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" width="15%"></th>
        </tr>
      </thead>
      <tbody>{renderAssets(state.tableData)}</tbody>
    </table>
    {/* Modal*/}
    <Widget
      src="juaner.near/widget/ref-market-burrow-burrow"
      props={{ selectedTokenId, selectedTokenMeta, showModal, closeModal }}
    />
  </Container>
);
