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
  .text_green_color {
    color: #78ff9e;
  }
  .ml_4_ne {
    margin-left: -4px;
  }
  .mt_25 {
    margin-top: 25px;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .font-18 {
    font-size: 18px;
  }
  .title {
    padding-left: 20px;
  }
  @media (max-width: 900px) {
    background-color: transparent;
    .assets_table {
      display: none;
    }
    .text_green_color {
      color: #fff;
    }
  }
`;

/** base tool start  */
const wnearbase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADvElEQVRYhbWYTUtjVxjH/9fRaFBaK3Q0ahCE3HTR0kWLL0g72nEh6NaAL+BivkIXHUpblWr9Ai78CIKgQqC1xYJNVnWwdiFCF9OS4CRRM2o7TRyw+XWRJk2uebuJ/uFC7jnP89xfzrnPOee5hmwIqJc0LOmxpA8keSW1SnpD0p+SLiT9JumZpF1Je4Zh3Nh5RiUQHcAKEMWeov/5td8FRBPwFZCwCWFVAvgCaKwWxAsc1ghh1RHwrl2QR8DlHYNk9BcwWinIMJC8J5CMEsDH5UDeAa7uGSSjC8DMfb6RA9Ik6WdJ79ma09r0q6R+wzBeS1JdTsdnhUACgYA8Ho8cDofGx8d1fn5u62mrq6tyuVwyTVPBYNDa/b6kT/NaSK8jBdPX4/EgKXsNDQ1xfX1d0Tz4/f48X9M0C5n9DTzMhVkpFjA3WOaam5srCxKPx+ns7LzlW0TLGZB6IGIHRhIrK0X5AZiZmSnoV0RRoF7AaKmguYFmZ2ezv+vq6tja2iros7m5iSSamppYWlqqBAZgRMA3lcJEo1Gmpqay9y0tLRwe5i/SZ2dntLe309bWxt7eHuFwuFKYrwX8UClMLBYjkUjQ19eXbevp6SEa/X//9Pl89Pb2cnx8DGAH5jsBf9iBATg5OaGrqyvbPjg4SDKZJBQKMTo6yunpadbfBsxzkd4rbMEAHBwc0NzcnO3z+XykUqlb/jZgrgTcVAMDsLGxgWEY2f7l5eVaYG6qHpmM5ufns/2GYbC+vl4tzJWA32uBSaVSTE9PZ22cTif7+/vVwDwX8H01MJFIhJGRESKRyK0Mc7vdRCIRuzDf1il9eLalo6MjDQwMqLu7Wx0dHXI6ndre3pbb7ZYkhcNhTUxMKJFI2An7TMBjOyOzu7tLa2srLpeLeDyeZ2vNsMnJSUKhUKUjM2xrb1pYWMDhcCAJv99f0N6aYdY9qoheAA8k2d+1nzx5Uuofsri4WHSDLaKl7GQB7RQ5z1iDud1uLi9Ln9WtGVYG5hXwdt7bA3xZyNI0zbx1ZGdnpyRIRslkkv7+/jwQr9dbyPTprVcZaKRAnRQIBDBNE5fLxdraWkUgGcViMcbGxmhoaMDr9RIMBq0mB4CjYG6RLtzuq16y6iXgKZnspAu4WsvZckoAH5UEyQEaAM7vCeSCcgVcASAT+OWOQQ4oNzUlgBqBz0mXE7XoFfCUYi+rTaiHwDLpldKOXgBLWNeRIjLKm+RBPZD0SNInkj5U+svVW5LelHQl6aXSX672Jf0o6SfDMP6pNP6/QZPF1Du0/sIAAAAASUVORK5CYII=";
const closeButtonBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAERSURBVHgBtdjLDYMwEEXRUSqhY+gg0xElUAIlvOAAwkEEPJ93JVaM47OJsCyyBaBbnhFrvZAreyzPvDxT2fv8stte1L2FVPnt014H6g+GhrrA/KJuMOmoG8zeWIZmPBdGNWC+lcEBbblRrZhi2Rdo4wIzyoDR88J0lBvDQIUxmag0TAYqHRNB0TAeFNgYB4qPSUapZBZEqTByolSYGVEqxl5iD6RZe2j/a9dxTp5ODAcVxOSikjA5KANGQTzkmTHVGg4KgQ9lOgoJX+00FBKPEGEUCOcZNwrEw5UZhfUWgoJxoHppHFQJ1oiay+DIxhhQ09N1jEpyN6gJD3dEKqQuUAemGtpR5XpmEHI4bl3GGvMBHUHk6KgoFgEAAAAASUVORK5CYII=";
let MAX_RATIO = 10_000;
let BURROW_CONTRACT = "contract.main.burrow.near";
let accountId = context.accountId;
let B = Big();
B.DP = 60; // set precision to 60 decimals

State.init({ tableData: [] });

const toAPY = (v) => (v ? (Math.round(v * 100) / 100).toFixed(2) : 0);
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return B(value).div(B(10).pow(decimals || 0));
};

const expandToken = (value, decimals) => {
  return B(value || 0).mul(B(10).pow(decimals || 0));
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
} = state;
const hasData = assets.length > 0 && rewards.length > 0 && account;
/** base tool end */
// if (!accountId) {
//   return <Widget src="juaner.near/widget/ref_account-signin" />;
// }

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

  const _assets = data.assets
    .filter(
      (a) => a.config.can_deposit && !["meta-token.near"].includes(a.token_id)
    )
    .map((asset) => {
      const { token_id, metadata, price, config } = asset;
      const r = data.rewards.find((a) => a.token_id === asset.token_id);
      const netTvlMultiplier = config.net_tvl_multiplier / 10000;
      const depositApy =
        r.apyBase + r.apyRewardTvl * netTvlMultiplier + r.apyReward;
      const hasRewards = rewardsMap[token_id] && assetsMap[token_id];
      const rewardMap = hasRewards && rewardsMap[token_id];
      const rewardTokens = rewardMap && rewardMap.rewardTokens;
      const token_usd_price = price && price.usd;
      const { volatility_ratio, extra_decimals } = config;
      const totalLiquidity = B(asset.supplied.balance || 0)
        .plus(asset.reserved)
        .toFixed();
      const decimals = metadata.decimals + extra_decimals;
      const totalLiquidity_shrink = shrinkToken(totalLiquidity, decimals);

      const totalLiquidity_usd = B(totalLiquidity_shrink || 0)
        .mul(token_usd_price || 0)
        .toNumber();
      return {
        icon: metadata.icon,
        symbol: metadata.symbol,
        depositApy,
        rewardTokens,
        volatility_ratio,
        totalLiquidity_usd,
        token_id,
      };
    });
  if (!state.activeArrow) {
    State.update({
      activeArrow: "up-totalLiquidity_usd",
    });
    return _assets.sort((a, b) => b.totalLiquidity_usd - a.totalLiquidity_usd);
  } else {
    const [type, key] = state.activeArrow.split("-");
    return _assets.sort((a, b) =>
      type === "down" ? a[key] - b[key] : b[key] - a[key]
    );
  }
};

const onLoad = (data) => {
  State.update(data);
  // get market can deposit assets
  if (data.assets?.length) State.update({ tableData: formatAssets(data) });
};

const assetsMap = assets
  ? assets.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.token_id]: cur,
      };
    }, {})
  : {};

const renderAssets = (data) =>
  data.map((record) => {
    const {
      icon,
      symbol,
      depositApy,
      rewardTokens,
      volatility_ratio,
      token_id,
      totalLiquidity_usd,
    } = record;

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
    const totalLiquidity_usd_display = nFormat(totalLiquidity_usd, 2);
    return (
      <tr key={token_id}>
        <td>
          <img src={icon || wnearbase64} class="tokenIcon"></img>
          {symbol !== "wNEAR" ? symbol : "NEAR"}
        </td>
        <td>{toAPY(depositApy)}%</td>
        <td>{rewardTokensImg}</td>
        <td>{cf}%</td>
        <td>${totalLiquidity_usd_display}</td>
        <td>
          <div class="table_handlers">
            <Widget
              src="juaner.near/widget/ref-operation-button"
              props={{
                clickEvent: () => {
                  handleSelect(token_id);
                },
                buttonType: "solid",
                actionName: "Supply",
                hoverOn: true,
              }}
            />
          </div>
        </td>
      </tr>
    );
  });

const renderMbAssets = (data, hasDollar) =>
  data.map((item) => {
    const {
      icon,
      symbol,
      depositApy,
      rewardTokens,
      volatility_ratio,
      token_id,
      totalLiquidity_usd,
    } = item;
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
    const totalLiquidity_usd_display = nFormat(totalLiquidity_usd, 2);
    return (
      <div className="mb_row" key={token_id}>
        <div className="mb_row_header">
          <div className="mb_row_token">
            <img src={icon || wnearbase64} class="tokenIcon"></img>
            {symbol !== "wNEAR" ? symbol : "NEAR"}
          </div>
          <div className="double_lines">${totalLiquidity_usd_display}</div>
        </div>
        <div className="mb_row_item">
          <div className="mb_row_label">Supply Apy</div>
          <div className="mb_row_value">{toAPY(depositApy)}%</div>
        </div>
        <div className="mb_row_item">
          <div className="mb_row_label">Rewards</div>
          <div className="mb_row_value">{rewardTokensImg}</div>
        </div>
        <div className="mb_row_item">
          <div className="mb_row_label">C.F.</div>
          <div className="mb_row_value">{cf}%</div>
        </div>
        <div className="mb_row_actions">
          <div className="action_btn">
            <Widget
              src="juaner.near/widget/ref-operation-button"
              props={{
                clickEvent: () => {
                  handleSelect(token_id);
                },
                buttonType: "solid",
                actionName: "Supply",
                hoverOn: true,
              }}
            />
          </div>
        </div>
      </div>
    );
  });

const handleSelect = (token_id) => {
  State.update({
    selectedTokenId: token_id,
    amount: "",
    hasError: false,
    showModal: true,
  });
};
function closeModal() {
  State.update({
    showModal: false,
  });
}
const selectedToken = (selectedTokenId && assetsMap[selectedTokenId]) || {};
const selectedTokenMeta = selectedToken.metadata || {};

const handleSort = (type, key) => {
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

    {/* markets */}
    <div class="fw-bold text-white pt-3 font-18 title">
      <span class="text_green_color">Supply</span> Market
    </div>
    <table class="assets_table click" border="0">
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
                      state.activeArrow === "up-depositApy" && "active"
                    }`}
                    onClick={() => {
                      handleSort("up", "depositApy");
                    }}
                  />
                </div>
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-down ${
                      state.activeArrow === "down-depositApy" && "active"
                    }`}
                    onClick={() => {
                      handleSort("down", "depositApy");
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
            <div className="table_sorter">
              <span> C.F.</span>
              <div className="arrows">
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-up ${
                      state.activeArrow === "up-volatility_ratio" && "active"
                    }`}
                    onClick={() => {
                      handleSort("up", "volatility_ratio");
                    }}
                  />
                </div>
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-down ${
                      state.activeArrow === "down-volatility_ratio" && "active"
                    }`}
                    onClick={() => {
                      handleSort("down", "volatility_ratio");
                    }}
                  />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" width="20%">
            <div className="table_sorter">
              <span>Total Supply</span>
              <div className="arrows">
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-up ${
                      state.activeArrow === "up-totalLiquidity_usd" && "active"
                    }`}
                    onClick={() => {
                      handleSort("up", "totalLiquidity_usd");
                    }}
                  />
                </div>
                <div className="arrow-wrap">
                  <div
                    className={`arrow arrow-down ${
                      state.activeArrow === "down-totalLiquidity_usd" &&
                      "active"
                    }`}
                    onClick={() => {
                      handleSort("down", "totalLiquidity_usd");
                    }}
                  />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" width="15%"></th>
        </tr>
      </thead>
      <tbody>{renderAssets(state.tableData) || ""}</tbody>
    </table>
    <div className="mb_table">{renderMbAssets(state.tableData)}</div>
    <Widget
      src="juaner.near/widget/ref-market-supply-supply"
      props={{ selectedTokenId, showModal, closeModal, selectedTokenMeta }}
    />
  </Container>
);
