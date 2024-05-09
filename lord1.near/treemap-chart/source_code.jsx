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
    }
  : {};
const data = props.data ?? {};
let colors = props.colors ?? [
  "#A084E8",
  "#6F61C0",
  "#241468",
  "#9F0D7F",
  "#EA1179",
  "#F79BD3",
];
const chartOption = {
  chartName: "chart name",
  title: {
    text: "title",
  },
  subtitle: {
    text: "subtitle",
  },
  ...props.chartOption,
};
const overrideOptions = props.overrideOptions || {};
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
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/heatmap.js"></script>
<script src="https://code.highcharts.com/modules/treemap.js"></script>

  <script src="https://code.highcharts.com/modules/no-data-to-display.js"></script>
</head>

<body>
  <div id="container">
  </div>
  <script>
    window.addEventListener("message", function(event) {}, false);

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
      const {
        data,
        colors,
        chartOption,
        overrideOptions,
        theme
      } = message;

      const titleChart = chartOption ?.title ?.text || ''
      const subtitleChart = chartOption ?.subtitle ?.text || ''
      
      const chartName = chartOption ?.chartName || ''



      Highcharts.theme = {...theme,colors};
      Highcharts.setOptions(Highcharts.theme);

    let firstLevel,
        firstVal,
        firstI = 0,
        lastLevel,
        lastI,
        valueLevel,
        valueI,
        first,
        last,
        value;

    const points = []
     for (first in data) {
        if (Object.hasOwnProperty.call(data, first)) {
          firstVal = 0;
          firstLevel = {
            id: 'id_' + firstI,
            name: first,
            color: Highcharts.getOptions().colors[firstI]
          };
          lastI = 0;
          for (last in data[first]) {
            if (Object.hasOwnProperty.call(data[first], last)) {
              lastLevel = {
                id: firstLevel.id + '_' + lastI,
                name: last,
                parent: firstLevel.id,
              };
              points.push(lastLevel);
              valueI = 0;
              if (typeof data[first][last] === 'object') {
                for (value in data[first][last]) {
                  if (Object.hasOwnProperty.call(
                      data[first][last], value
                    )) {
                    valueLevel = {
                      id: lastLevel.id + '_' + valueI,
                      name: value,
                      parent: lastLevel.id,
                      value: Math.round(+data[first][last][value])
                    };
                    firstVal += valueLevel.value;
                    points.push(valueLevel);
                    valueI = valueI + 1;
                  }
                }
              } else {
                lastLevel.value = Math.round(+data[first][last])
                firstVal += lastLevel.value;
                valueI = valueI + 1;
              }

              lastI = lastI + 1;
            }
          }
          firstLevel.value = firstVal;
          points.push(firstLevel);
          firstI = firstI + 1;
        }
      }
    
    Highcharts.chart('container', {
      	colors:colors,
        chart : {
            backgroundColor: "transparent",
        },
        series: [{
            name: chartName,
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
                enabled: false
            },
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 2,
                levelIsConstant: false
            }, {
                level: 1,
                dataLabels: {
                    style: {
                        fontSize: '14px'
                    }
                }
            }],
            accessibility: {
                exposeAsGroupOnly: true
            },
            data: points
        }],
        subtitle: {
            text: subtitleChart,
            align: 'left'
        },
        title: {
            text: titleChart,
            align: 'left'
        },
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
    className="w-100 d-flex justify-content-center align-items-center "
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
          overrideOptions,
          theme,
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

// example-data-1 = {
//     "Dapp": {
//         "Kaikai": {
//             "volume1": 2,
//             "volume2": 3
//         }
//     },
//     "Games": {
//         "Sweat": {
//             "volume1": 4,
//         }
//     }
// }
// example-data-2 = {
//         "Kaikai": {
//             "volume1": 2
//         },
//         "Sweat": {
//             "volume1": 4,
//             "volume2": 14,
//         }
// }
//  props = {
//   data: data,
//   colors: ["blue", "red"], //optional : tow colors
// chartOption: {
//    chartName : 'chart name',
//     	title:{
//       	text : 'title'
//       },
//       subtitle:{
//       text : 'subtitle'
//       }
// },
//   spinnerColors: [], //optional : tow colors
//   overrideOptions:{} // opt
//   themeColor: {
//     chart: { //optional
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
