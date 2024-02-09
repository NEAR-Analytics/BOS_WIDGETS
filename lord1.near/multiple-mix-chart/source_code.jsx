const themeColor = props.themeColor;
const theme = themeColor?.chart
  ? {
      title: {
        style: {
          color: themeColor.chart?.title,
        },
      },
      subtitle: {
        style: {
          color: themeColor.chart?.subtitle,
        },
      },
      xAxis: { labels: { style: { color: themeColor.chart?.xAxis } } },
      yAxis: { labels: { style: { color: themeColor.chart?.yAxis } } },

      legend: {
        itemStyle: {
          color: themeColor.chart?.legend,
        },
        itemHoverStyle: {
          color: themeColor.chart?.legendHover,
        },
      },
      rangeSelector: {
        buttonTheme: {
          fill: themeColor?.chart?.rangeSelector?.btn_bg,

          style: {
            color: themeColor?.chart?.rangeSelector?.btn_color,
          },
          states: {
            hover: {
              fill: themeColor?.chart?.rangeSelector?.btn_hover_bg,
              style: {
                color: themeColor?.chart?.rangeSelector?.btn_hover_color,
              },
            },
            select: {
              fill: themeColor?.chart?.rangeSelector?.btn_active_bg,
              style: {
                color: themeColor?.chart?.rangeSelector?.btn_active_color,
              },
            },
          },
        },

        inputStyle: {
          color: themeColor?.chart?.rangeSelector?.inputColor,
        },
        labelStyle: {
          color: themeColor?.chart?.rangeSelector?.labels,
        },
      },
    }
  : {};

if (!props.data && !props.charts) return "charts and data props are required.";
const data = props.data ?? [];
const charts = props.charts ?? [];
let colors = props.colors ?? [
  "#A084E8",
  "#6F61C0",
  "#241468",
  "#9F0D7F",
  "#EA1179",
  "#F79BD3",
];
const overrideOptions = props.overrideOptions || {};
const extraButtons = props.extraButtons || {};
let spinnerColors = props?.spinnerColors.length >= 0 && {
  color1: props?.spinnerColors[0],
  color2: props?.spinnerColors[1],
};
const other_colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
if (series.length > colors.length) {
  for (let i = colors.length; i < series.length; i++) {
    colors.push(other_colors[i % other_colors.length]);
  }
}
const Container = styled.div`
  && {
    text-align: left;
  }
  .tabContent {
    display: inline-flex;
    align-items: left;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 3px 4px;
    list-style-type: none;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tab-item .active {
    background: #304352;
  }
  .tab-item button {
    background-color: transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    height: 30px;
    padding: 0 22px;
    border: none;
  }
`;
const chartOption = () => {
  const chart = charts[state.selectedChart - 1];
  const seriesData = data.reduce(
    (t, row) => {
      t[0].data.push([row[chart.dateKey] * 1000, row[chart.oppKey]]);
      t[1].data.push([row[chart.dateKey] * 1000, row[chart.negKey]]);
      return t;
    },
    [{ data: [] }, { data: [] }]
  );

  seriesData[0].name = chart.oppTitle;
  seriesData[1].name = chart.negTitle;
  seriesData[0].type = chart.type;
  seriesData[1].type = chart.type;
  const type = chart.type;
  const title = chart.title;
  const subtitle = chart.subtitle;
  return { seriesData, title, subtitle, yAxis: 1, type };
};
5;
State.init({
  tab: charts?.[0].title,
  isLoading: true,
  selectedChart: "1",
});

const code = `
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"
    ></script>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/modules/no-data-to-display.js"></script>
  </head>
  <body>
    <div id="container"></div>
  </body> 
  <script>
  
window.addEventListener("message", function (event) {}, false);

const handleMessage = (message) => {
  const { colors, chartOption, overrideOptions, theme } = message;
    Highcharts.setOptions(theme);
  const chart = Highcharts.stockChart("container", {
    chart: {
      backgroundColor:"rgb(0,0,0,0)",
      zooming: {
          mouseWheel: false,
        },
    },
    colors: colors,
    navigator: {
      enabled: false,
    },
    title: {
      text: chartOption.title,
      align: "left",
    },
    subtitle: {
      text: chartOption.subtitle,
      align: "left",
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    yAxis: chartOption.yAxis,
    xAxis: {
      type: "datetime",
    },
    rangeSelector: {

      buttons: [
        {
          type: "day",
          count: 2,
          text: "1d",
        },
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "all",
          count: 1,
          text: "All",
        },
      ],
      selected: 3,
      inputEnabled: true,
    },
    lang: {
      noData: "no data to display",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
    series: chartOption.seriesData,
    ...overrideOptions
  });

  window.iFrameResizer.onMessage = () => {};
};

window.iFrameResizer = {
  onMessage: handleMessage,
};
  </script>
</html>
`;
return (
  <div
    className="w-100"
    style={{
      minHeight: "300px",
      minWidth: "300px",
    }}
  >
    <div className="d-flex justify-content-center align-items-center">
      <div className={`w-100 ${state.isLoading ? "d-block" : "d-none"}`}>
        <Widget
          src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
          props={{ ...spinnerColors }}
        />
      </div>
      <iframe
        iframeResizer
        className={`w-100 ${state.isLoading ? "d-none" : "d-block"}`}
        srcDoc={code}
        message={{
          colors,
          chartOption: chartOption(),
          overrideOptions,
          theme,
        }}
        onLoad={() => {
          State.update({
            isLoading: false,
          });
        }}
      />
    </div>
    <div
      className={`w-100 justify-content-center ${
        state.isLoading ? "d-none" : "d-flex"
      }`}
    >
      <Container>
        <ul className="tabContent">
          {charts.map((op, i) => (
            <li key={i} className="tab-item">
              <button
                className={`${state.tab === op.title ? "active" : ""}`}
                aria-current="page"
                onClick={() =>
                  State.update({ tab: op.title, selectedChart: i + 1 })
                }
              >
                {op.title}
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  </div>
);
// const props = {
//   data: [
//     {
//       week: 1604188800,
//       opposite1: 2,
//       opposite2: 8,
//       negative1: -6,
//       negative2: -2,
//       .
//       .
//     },
//   ],
//   charts: [
//     {
//       title: "title",
//       subtitle: "sub",
//       dateKey: "week", // the key of date in data obj
//       oppKey: "opposite1", // opposite key
//       negKey: "negative1", //negative key
//       oppTitle: "opposite",
//       negTitle: "negative",
//       type: "area", // chart type
//     },
//   ],

//   colors: ["yellow", "brown"], // optional
//   spinnerColors: ["yellow", "brown"], // optional , two colors
//   overrideOptions: {}, //opt to over ride chart options
//   themeColor: {
//     chart: {
//       title: "red",
//       subtitle: "blue",
//       xAxis: "red",
//       yAxis: "blue",
//       legend: "green",
//       legendHover: "blue",
//       rangeSelector: {
//         labels: "red",
//         inputColor: "blue",
//         btn_bg: "red",
//         btn_color: "blue",
//         btn_hover_bg: "red",
//         btn_hover_color: "blue",
//         btn_active_bg: "red",
//         btn_active_color: "blue",
//       },
//     },
//   },
// };
