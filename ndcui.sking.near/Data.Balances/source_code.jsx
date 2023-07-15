const NDCUI_ACCOUNT = props.NDCUI_ACCOUNT ?? "ndcui.sking.near";

const balances = props.balances; // expected to be in Pikespeak.ai balances API format
const showTable = props.showTable ?? true;

if (!balances) {
  const baseApi = "https://api.pikespeak.ai";
  const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
  const fetchApiConfig = {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  };
  const res = fetch(
    `${baseApi}/account/balances?accounts=${[
      props.accountId ?? context.accountId ?? "bobo.near",
    ]}`,
    fetchApiConfig
  );
  if (!res.body) {
    return "Loading...";
  }
  balances = res.body;
}

const colors = props.colors ?? [
  "#4498E0",
  "#FFD50D",
  "#F29BC0",
  "#82E299",
  "#F19D38",
];

// Parsing the data to the format expected by the chart
const balanceData = balances.balancesTotal.map((balance) => balance.usdPrice);
const balanceLabels = balances.balancesTotal.map((balance) => balance.contract);

// fill the rest of colors if balanceData.length > colors.length
if (balanceData.length > colors.length) {
  for (let i = colors.length; i < balanceData.length; i++) {
    colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
}

// format to small characters like 200k, 200m, 200b...
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};

const totalUsd = formatNumber(balances.totalUsd);

const chartData = {
  labels: balanceLabels,
  datasets: [
    {
      data: balanceData,
      label: "Balance in USD",
      backgroundColor: colors,
      hoverOffset: 4,
    },
  ],
};

const chartOptions = {
  type: "doughnut",
  options: {
    cutout: "66%",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

const Doughnut = styled.div`
  width: 300px;
  height: 300px;
  position: relative;

  .middle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .big {
      font-size: 30px;
      font-weight: bold;
      display: block;
    }

    .small {
      font-size: 15px;
      color: #999;
    }
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;

  .item {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #999;
    display: grid;
    grid-template-columns: 20px 1fr 1fr 1fr;
    align-items: center;
    gap: 10px;
  }

  .item > span:nth-child(2) {
    text-transform: lowercase;
    color: #000;
    // ellipsis
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item > span:nth-child(3) {
    text-align: center;
  }

  .item > span:nth-child(4) {
    text-align: end;
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;

return (
  <div className="d-flex flex-wrap gap-3 justify-content-center align-content-center">
    <Doughnut>
      <Widget
        src={`${NDCUI_ACCOUNT}/widget/Data.ChartJs`}
        props={{ chartData, chartOptions }}
      />
      <div className="middle" title={`Total Balance: $${totalUsd}`}>
        <span className="big">${totalUsd}</span>
        <span className="small">Balance in USD</span>
      </div>
    </Doughnut>
    <Table>
      {balances.balancesTotal.map((balance, i) => {
        return (
          <div className="item">
            <span
              className="ball"
              style={{
                background: colors[i],
              }}
            ></span>
            <span title={balance.contract}>{balance.contract}</span>
            <span title={`$${Number(balance.usdPrice).toFixed(2)}`}>
              ${formatNumber(Number(balance.usdPrice).toFixed(2))}
            </span>
            <span title={`${Number(balance.amount)}`}>
              {Number(balance.amount).toFixed(2)}
              {balance.symbol}
            </span>
          </div>
        );
      })}
    </Table>
  </div>
);
