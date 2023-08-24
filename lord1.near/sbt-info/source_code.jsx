const generaltheme = {
  height: "110px",
  align: "center",
  description: "Let's look at SBT holders status and minting process.",
  brand: "Im Human Info 👋",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const nominatetheme = {
  height: "110px",
  align: "center",
  description: "Let's discover NDC 👇",
  brand: "NDC Info (coming soon...)",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: "#000",
  color2brand: "#806ce1",
  colordescription: "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const queryHashes = [
  { id: 1, hash: "fb4895fb-0ef6-4d6a-82ae-f14d97f38340" },
  { id: 2, hash: "b252603a-720f-4da0-86d3-92a3eebe1846" },
  { id: 3, hash: "acf4e2bc-28f8-40ef-abba-277bb3f6a7ce" },
  { id: 4, hash: "9b6f654b-0180-40f2-9b06-43e9ad34bb67" },
  { id: 5, hash: "d76d9e4e-57f8-4edf-a055-4ec903c28ec7" },
];

State.init({
  data: [],
  isLoading: true,
  error: [],
});

const getMixProps = (data, dateKey, colors, chartOption) => {
  data = data ? data.sort((a, b) => a[dateKey] - b[dateKey]) : [];
  colors = colors || [];
  chartOption = chartOption || {};

  const seriesesKey = Object.keys(data[0]).slice(1);

  const dataFormat = seriesesKey.map((series) => {
    const dataFormated = [];
    for (let d of data) {
      if (d[series]) dataFormated.push([d[dateKey] * 1000, d[series]]);
    }
    return {
      data: dataFormated,
      name: series,
      type: "areaspline",
      axisId: 1,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "chart subtitle",
      legend: true,
      stacking: "false",
      ...chartOption,
    },

    overrideOptions: {
      chart: {
        backgroundColor: "transparent",
        zooming: {
          mouseWheel: false,
        },
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: { month: { main: "%b %Y" } },
      },
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    spinnerColors: ["#6F61C0", "#241468"],
  };

  return props;
};

const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = data.map((s) => [s[key], s[value]]);
  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      type: "pie",
      legend: false,
      connector: false,
      ...chartOption,
    },
    spinnerColors: ["#6F61C0", "#241468"],
  };
  return props;
};

const formatNumber = (num) => {
  if ((num ?? NaN) === NaN) return "-";
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + "k";
  }
  return num.toFixed(4);
};
const handleData = () => {
  const data = {};
  const errors = [];
  queryHashes.forEach(({ hash, id }) => {
    const result = fetchData(hash);
    if (result.error) errors.push(`hash${id} : ${result.error}`);
    data[`hash${id}`] = {
      ...result,
      id,
    };
  });

  if (Object.values(data).every((d) => !d.isLoading)) {
    State.update({
      data: data,
      error: [...state.error, ...errors],
      isLoading: false,
    });
  }
};

const fetchData = (hash) => {
  const data = fetch(
    `https://api.flipsidecrypto.com/api/v2/queries/${hash}/data/latest`,
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );

  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};

if (state.isLoading) {
  handleData();
}

if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

const Card = styled.div`
// height: 50%;
display:flex;
justify-content: center ;
align-items: center;
font-weight: bold;
font-size : 2rem;
`;
return (
  <div
    style={{ backgroundColor: themeColors.page_bg }}
    className="container-fluid py-2"
  >
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
            className="toast show align-items-center text-bg-danger border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{er}</div>
            </div>
          </div>
        ))}
    </div>
    <div className="shadow-sm  rounded-4" style={{ background: "#ebe7fd" }}>
      <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />
      <div className="row justify-content-around py-2 g-2">
        <div className="col-4 row row-cols-2 minh-100 gy-2  mt-0">
          <div className="col-12 shadow-sm rounded-4 bg-light  mt-0">
            <h5 className="p-4 pt-2" style={{ color: "#806ce1" }}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 31 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.625 14.7083L15.5 18.5833L28.4167 5.66667M20.6667 4.375H10.075C7.9048 4.375 6.81969 4.375 5.99079 4.79735C5.26166 5.16886 4.66886 5.76166 4.29735 6.49079C3.875 7.31969 3.875 8.4048 3.875 10.575V21.425C3.875 23.5952 3.875 24.6803 4.29735 25.5092C4.66886 26.2383 5.26166 26.8311 5.99079 27.2026C6.81969 27.625 7.9048 27.625 10.075 27.625H20.925C23.0952 27.625 24.1803 27.625 25.0092 27.2026C25.7383 26.8311 26.3311 26.2383 26.7026 25.5092C27.125 24.6803 27.125 23.5952 27.125 21.425V16"
                  stroke="#806ce1"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Total SBT minted
            </h5>
            <Card className="">
              {formatNumber(state.data?.hash1?.data[0].sbt_minted)}
            </Card>
          </div>
          <div className="col-12 shadow-sm rounded-4 bg-light">
            <h5 className="p-4 pt-2" style={{ color: "#806ce1" }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4167 17.125V15.5417C17.4167 14.0661 16.4075 12.8263 15.0417 12.4748M12.2708 3.10518C13.4313 3.57495 14.25 4.7127 14.25 6.04167C14.25 7.37063 13.4313 8.50838 12.2708 8.97815M13.4583 17.125C13.4583 15.6495 13.4583 14.9118 13.2173 14.3298C12.8959 13.5539 12.2794 12.9374 11.5035 12.616C10.9216 12.375 10.1838 12.375 8.70833 12.375H6.33333C4.85785 12.375 4.12011 12.375 3.53816 12.616C2.76224 12.9374 2.14577 13.5539 1.82438 14.3298C1.58333 14.9118 1.58333 15.6495 1.58333 17.125M10.6875 6.04167C10.6875 7.79057 9.26973 9.20833 7.52083 9.20833C5.77193 9.20833 4.35416 7.79057 4.35416 6.04167C4.35416 4.29276 5.77193 2.875 7.52083 2.875C9.26973 2.875 10.6875 4.29276 10.6875 6.04167Z"
                  stroke="#806ce1"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Total SBT minters
            </h5>
            <Card>{formatNumber(state.data?.hash1?.data[0].signer)}</Card>
          </div>
          <div className="col-12 shadow-sm rounded-4 bg-light">
            <h5 className="p-4 pt-2" style={{ color: "#806ce1" }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4167 17.125V15.5417C17.4167 14.0661 16.4075 12.8263 15.0417 12.4748M12.2708 3.10518C13.4313 3.57495 14.25 4.7127 14.25 6.04167C14.25 7.37063 13.4313 8.50838 12.2708 8.97815M13.4583 17.125C13.4583 15.6495 13.4583 14.9118 13.2173 14.3298C12.8959 13.5539 12.2794 12.9374 11.5035 12.616C10.9216 12.375 10.1838 12.375 8.70833 12.375H6.33333C4.85785 12.375 4.12011 12.375 3.53816 12.616C2.76224 12.9374 2.14577 13.5539 1.82438 14.3298C1.58333 14.9118 1.58333 15.6495 1.58333 17.125M10.6875 6.04167C10.6875 7.79057 9.26973 9.20833 7.52083 9.20833C5.77193 9.20833 4.35416 7.79057 4.35416 6.04167C4.35416 4.29276 5.77193 2.875 7.52083 2.875C9.26973 2.875 10.6875 4.29276 10.6875 6.04167Z"
                  stroke="#806ce1"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Total SBT removed
            </h5>
            <Card>{state.data?.hash5?.data[0].deleted}</Card>
          </div>
        </div>

        <div className="col-8 row">
          <div className="shadow-sm rounded-4 bg-light">
            <Widget
              src="lord1.near/widget/Pie-chart"
              props={getPieProps(
                state.data?.hash2?.data,
                ["class", "singer"],
                [
                  "#6F61C0",
                  "#241468",
                  "#9F0D7F",
                  "#EA1179",
                  "#F79BD3",
                  "#A084E8",
                ],
                {
                  title: "STB Distribution",
                  type: "donut",
                  connector: true,
                  legend: true,
                }
              )}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="row py-2 g-2">
      <div className="col-6">
        <div className="shadow-sm rounded-4 bg-light">
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.data?.hash3?.data,
              "issued_at",
              [
                "#A084E8",
                "#6F61C0",
                "#241468",
                "#9F0D7F",
                "#EA1179",
                "#F79BD3",
              ],
              {
                title: "Issued Date",
                subtitle: "Daily Trend of SBT based on Issued Date",
              }
            )}
          />
        </div>
      </div>
      <div className="col-6">
        <div className="shadow-sm rounded-4 bg-light">
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.data?.hash4?.data,
              "expires_at",
              [
                "#A084E8",
                "#6F61C0",
                "#241468",
                "#9F0D7F",
                "#EA1179",
                "#F79BD3",
              ],
              {
                title: "Expired Date",
                subtitle: "Daily Trend of SBT based on Expired Date",
              }
            )}
          />
        </div>
      </div>
    </div>
    <div className="shadow-sm  rounded-4" style={{ background: "#ebe7fd" }}>
      <Widget src="lord1.near/widget/header-dynamic" props={nominatetheme} />
    </div>
  </div>
);
