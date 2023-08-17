const data = props.data ?? [];
let colors = props.colors ?? [
  "#4498E0",
  "#FFD50D",
  "#F29BC0",
  "#F19D38",
  "#82E299",
];
const chartOption = {
  title: "chart title",
  background: "transparent",
  type: "pie",
  legend: false,
  connector: true,
  ...props.chartOption,
};
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
if (data.length > colors.length) {
  for (let i = colors.length; i < data.length; i++) {
    colors.push(other_colors[i % other_colors.length]);
  }
}
if (data.length > colors.length) {
  for (let i = colors.length; i < data.length; i++) {
    colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
}
State.init({
  isLoading: true,
});

const code = `
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"
    ></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
   <script src="https://code.highcharts.com/modules/no-data-to-display.js"></script>
  </head>
  <body>
  <div id="container">
  </div>
  <script>
window.addEventListener("message", function (event) {}, false);

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

const handleMessage = (message) => {
  const { data, colors, chartOption } = message;
  const total = data.reduce((t, i) => {
    return t + i[1];
  }, 0);
  const totalFormated = formatNumber(total);
  const titleText = chartOption.title;
  const chartType = chartOption.type;
  const hasConnector = chartOption.connector;
  const hasLegend = chartOption.legend;
  let subtitleText;
  if (data.length > 0) {
    subtitleText =
      chartType === "donut"
        ? "Total</br>" + totalFormated
        : "Total : " + totalFormated;
  } else {
    subtitleText = "";
  }

  const subtitleOption =
    chartType === "donut"
      ? {
          style: {
            fontSize: "1.2rem",
            padding: "15px 0",
            textAlign: "center",
            fontWeight: "bold",
          },
          y: 20,
          verticalAlign: "middle",
        }
      : {
          style: {
            fontSize: "1.2rem",
            padding: "15px 0",
          },
        };

  const chart = Highcharts.chart("container", {
    colors,
    chart: {
      type: "pie",
        backgroundColor: chartOption.background

    },

    title: {
      text: titleText,
      style: {
        fontSize: "1.5rem",
        padding: "1rem 0",
      },
    },
    subtitle: {
      text: subtitleText,
      useHTML: true,
      ...subtitleOption,
    },
    tooltip: {
      useHTML: true,
      outside: true,
      formatter: function () {
        const percent = (this.y / total) * 100;
        const formatedValue = formatNumber(this.y);
        const text =
          chartType === "donut"
            ? this.key + " <br/> " + formatedValue
            : this.key + " : " + formatedValue;
        this.series.chart.setTitle(null, { text: text });
        const tooltipText =
          '<span style="font-size:14px">' +
          this.key +
          " : " +
          formatedValue +
          '</span><br><span style="font-size: 12px">percent: <b> ' +
          percent.toFixed(2) +
          "</b> %</span>";

        return tooltipText;
      },
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
    legend: {
      float: true,
      maxHeight: 50,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          distance: hasConnector ? 20 : -30,
          connectorWidth: hasConnector ? 1 : 0,
        },
      },
      pie: {
        showInLegend: hasLegend,
        innerSize: chartType === "donut" ? "65%" : "",
        events: {
          mouseOut: function () {
            this.chart.setTitle(null, { text: subtitleText });
          },
        },
      },
    },
    series: [
      {
        data,
      },
    ],
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
    className="w-100 d-flex justify-content-center align-items-center"
    style={{
      minHeight: "300px",
      minWidth: "300px",
    }}
  >
    <>
      <div className={`w-100 ${state.isLoading ? "d-block" : "d-none"}`}>
        <Widget
          src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
          props={{
            ...spinnerColors,
          }}
        />
      </div>
      <iframe
        iframeResizer
        className={`w-100 ${state.isLoading ? "d-none" : "d-block"}`}
        srcDoc={code}
        message={{
          data,
          colors,
          chartOption,
        }}
        onLoad={() => {
          State.update({
            isLoading: false,
          });
        }}
      />
    </>
  </div>
);

//  props = {
//   data: [
//     ["value1", 1],
//     ["value2", 2],
//   ],
//   colors: ["blue", "red"], //optional : tow colors
//   chartOption: {
//     title: "chart title",
//     type: "pie or donut",
//     legend: false,
//     connector: false,
//   },
//   spinnerColors: [], //optional : tow colors
// };
