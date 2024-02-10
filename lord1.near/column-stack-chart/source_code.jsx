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
const data = props.data ?? { categories: [], series: [] };
let colors = props.colors ?? [
  "#A084E8",
  "#6F61C0",
  "#241468",
  "#9F0D7F",
  "#EA1179",
  "#F79BD3",
];
const chartOption = {
  yAxisTitle: "y axis title",
  tooltipShare: true,
  stacking: "normal",
  dataLabels: false,
  title: {
    text: "title text",
  },
  subtitle: {
    text: "subtitle text",
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

      const {
        categories,
        series
      } = data
      const titleChart = chartOption ?.title ?.text || ''
      const subtitleChart = chartOption ?.subtitle ?.text || ''
      const yAxisTitle = chartOption ?.yAxisTitle || ''
      const tooltipShare = chartOption ?.tooltipShare
      const stacking = chartOption ?.stacking || 'normal'
      const dataLabels = chartOption.dataLabels ?? true 



      Highcharts.theme = theme;
      Highcharts.setOptions(Highcharts.theme);
     
      const chart = Highcharts.chart('container', {
        colors:colors,
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        title: {
          text: titleChart,
          align: 'left'
        },
        subtitle: {
          text: subtitleChart,
          align: 'left'
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          min: 0,
          title: {
            text: yAxisTitle
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: tooltipShare
        },
        plotOptions: {
          column: {
            stacking: stacking,
            dataLabels: {
              enabled: dataLabels,
              format: '{point.percentage:.0f}%'
            }
          }
        },
        series: series,
        noData: {
          style: {
            fontWeight: "bold",
            fontSize: "15px",
          },
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

//  props = {
//   data: {
//   categories : ['cat1','cat2'],
//   series : [
//     {
//       name : 'series 1',
//       data : [5 , 6]
//     },
//     {
//       name : 'series 2',
//       data : [55 , 16]
//     }
//   ]
// }
//
//   colors: ["blue", "red"], //optional : tow colors
// chartOption: {
//     yAxisTitle: 'y axis title',
//     tooltipShare: true,
//     stacking: 'normal',
//     dataLabels : false,
//     title: {
//       text: 'title'
//     },
//     subtitle: {
//      text: 'subtitle'
//     }
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
