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
const chartOption = props?.chartOption || {
  subBarChart: "sub bar text",
  title: {
    text: "title chart",
  },
};

// const chartOption= {
// btn-bg: 'red',
// stepTime: 500, //ms
// barInChart: 3,
// subBarChart: 'sub bar text',
// title: {
//   text: 'title chart',
// },
// subtitle: {
//   upSize: 20,
//   downSize: 15,
//   positionX: 0,
//   positionY: 0
// }
//       },
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
  <style>
    #play-controls{
      display : flex;
      gap : 1rem;
    }
    #play-pause-button{
      border-radius : 1rem;
      width : 3rem;
      height: 2.5rem;
      border : none;
      display : flex;
      align-items : center;
      justify-content : center;
    }
    #play-pause-button svg{
      display : none
    }
    .btn-play #play{
      display : inline-block
    }
    .btn-pause #pause{
      display : inline-block
    }
  </style>
</head>

<body>
  <div id="parent-container">
    <div id="play-controls">
      <button id="play-pause-button" class="btn-play" title="play">
<svg id="play" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 10.9648 22.4695 9.92953 21.4086 9.35258L8.59661 2.38548C6.53435 1.26402 4 2.72368 4 5.0329L4 12H23Z" fill="#1C274C"/>
<path opacity="0.5" d="M8.59662 21.6145L21.4086 14.6474C22.4695 14.0705 23 13.0352 23 12H4L4 18.9671C4 21.2763 6.53435 22.736 8.59662 21.6145Z" fill="#1C274C"/>
</svg>
<svg id="pause" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" fill="#1C274C"/>
<path opacity="0.5" d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" fill="#1C274C"/>
</svg>
      </button>
      <input id="play-range" type="range" step="1" value="0" min="0" max="0" />
    </div>
    <div id="container"></div>
    <p id="sub-bar"></p>
  </div>
  <script>
    window.addEventListener("message", function(event) {}, false);

    const formatNumber = (num) => {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + " b";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + " m";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + " k";
      }
      return num;
    };

    const handleMessage = (message) => {
      const {
        data,
        colors,
        theme,
        chartOption,
        overrideOptions
      } = message;

      const titleChart = chartOption ?.title ?.text || ''
      const subTitleUpSize = chartOption ?.subtitle ?.upSize || 50
      const subTitleDownSize = chartOption ?.subtitle ?.downSize || 20
      const subTitleXPos = chartOption ?.subtitle ?.positionX || 0
      const subTitleYPos = chartOption ?.subtitle ?.positionY || 0

      const subBarChart = chartOption ?.subBarChart || ''
      const stepTime = chartOption.stepTime || 500
      const barInChart = chartOption.barInChart || 5

      const totalDateObj = Object.values(data)[0]
      const totalDateArr = Object.keys(totalDateObj || {})


      const btn = document.getElementById('play-pause-button')
      const btn_bg = chartOption ?.btn_bg 
       btn_bg ? btn.style.backgroundColor = btn_bg : null
      const input = document.getElementById('play-range')
      const subBar = document.getElementById('sub-bar')
      input.value = 1;
      input.min = 1;
      input.max = totalDateArr.length
      subBar.textContent = subBarChart

      const startTime = totalDateArr[0]
      const endTime = totalDateArr.at(-1)
      let dataset, chart;
      /*
       * Animate dataLabels functionality
       */
      (function(H) {
        const FLOAT = /^-?\d+\.?\d*$/;

        // Add animated textSetter, just like fill/strokeSetters
        H.Fx.prototype.textSetter = function() {
          let startValue = this.start.replace(/ /g, ''),
            endValue = this.end.replace(/ /g, ''),
            currentValue = this.end.replace(/ /g, '');
          if ((startValue || '').match(FLOAT)) {
            startValue = parseInt(startValue, 10);
            endValue = parseInt(endValue, 10);

            // No support for float
            currentValue = Highcharts.numberFormat(
              Math.round(startValue + (endValue - startValue) * this.pos),
              0
            );
          }

          this.elem.endText = this.end;

          this.elem.attr(this.prop, currentValue, null, true);
        };

        // Add textGetter, not supported at all at this moment:
        H.SVGElement.prototype.textGetter = function() {
          const ct = this.text.element.textContent || '';
          return this.endText ? this.endText : ct.substring(0, ct.length / 2);
        };

        // Temporary change label.attr() with label.animate():
        // In core it's simple change attr(...) => animate(...) for text prop
        H.wrap(H.Series.prototype, 'drawDataLabels', function(proceed) {
          const attr = H.SVGElement.prototype.attr,
            chart = this.chart;

          if (chart.sequenceTimer) {
            this.points.forEach(point =>
              (point.dataLabels || []).forEach(
                label =>
                (label.attr = function(hash) {
                  if (
                    hash &&
                    hash.text !== undefined &&
                    chart.isResizing === 0
                  ) {
                    const text = hash.text;

                    delete hash.text;

                    return this
                      .attr(hash)
                      .animate({
                        text
                      });
                  }
                  return attr.apply(this, arguments);

                })
              )
            );
          }

          const ret = proceed.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
          );

          this.points.forEach(p =>
            (p.dataLabels || []).forEach(d => (d.attr = attr))
          );

          return ret;
        });
      }(Highcharts));

      function getData(time) {
        const output = Object.entries(dataset)
          .map(country => {
            const [countryName, countryData] = country;
            return [countryName, Number(countryData[time])];
          })
          .sort((a, b) => b[1] - a[1]);
        const total = output.reduce((t, i) => t + (i[1]||0), 0)
        return [total, output.slice(0, barInChart)];
      }

      function getSubtitle() {
        const total = formatNumber(getData(totalDateArr[input.value - 1])[0])
        return '<span style="font-size: ' + subTitleUpSize + 'px">' + totalDateArr[input.value - 1] + '</span><br><span style="font-size: ' + subTitleDownSize + 'px">Total: <b> ' + total + '</b></span>';
      }

      (async () => {
        Highcharts.theme = theme;
        Highcharts.setOptions(Highcharts.theme);
        dataset = data

        chart = Highcharts.chart('container', {
          chart: {
            animation: {
              duration: 500
            },
            marginRight: 50
          },
          colors: colors,
          title: {
            text: titleChart,
            align: 'left'
          },
          subtitle: {
            useHTML: true,
            text: getSubtitle(),
            floating: true,
            align: 'right',
            verticalAlign: 'middle',
            y: subTitleYPos,
            x: subTitleXPos
          },

          legend: {
            enabled: false
          },
          xAxis: {
              labels: {
                style:{
                    fontSize : '1em'
                }
            },
            type: 'category'
          },
          yAxis: {
            opposite: true,
            tickPixelInterval: 150,
            
            title: {
              text: null
            }
          },
          plotOptions: {
            series: {
              animation: false,
              groupPadding: 0,
              pointPadding: 0.1,
              borderWidth: 0,
              colorByPoint: true,
              dataSorting: {
                enabled: true,
                matchByName: true
              },
              type: 'bar',
              dataLabels: {
                enabled: true
              }
            }
          },
          series: [{
            type: 'bar',
            name: startTime,
            data: getData(startTime)[1]
          }],
          responsive: {
            rules: [{
              condition: {
                maxWidth: 550
              },
              chartOptions: {
                xAxis: {
                  visible: false
                },
                subtitle: {
                  x: 0
                },
                plotOptions: {
                  series: {
                    dataLabels: [{
                      enabled: true,
                      y: 8
                    }, {
                      enabled: true,
                      format: '{point.name}',
                      y: -8,
                      style: {
                        fontWeight: 'normal',
                        opacity: 0.7
                      }
                    }]
                  }
                }
              }
            }]
          },
        });
      })();
      /*
       * Pause the timeline, either when the range is ended, or when clicking the pause button.
       * Pausing stops the timer and resets the button to play mode.
       */
      function pause(button) {
        button.title = 'play';
        button.className = 'btn-play';
        clearTimeout(chart.sequenceTimer);
        chart.sequenceTimer = undefined;
      }

      /*
       * Update the chart. This happens either on updating (moving) the range input,
       * or from a timer when the timeline is playing.
       */
      function updateChart(increment) {
        const whitchIndex = totalDateArr.findIndex((t) => totalDateArr[input.value - 1] === t)
        let nextStep = false

        if (increment) {
          nextStep = whitchIndex + increment + 1
        }
        if (whitchIndex >= totalDateArr.length -1 ) {
          // Auto-pause
          pause(btn);          
        }

        chart.update({
            subtitle: {
              text: getSubtitle()
            }
          },
          false,
          false,
          false
        );
        chart.series[0].update({
            name: totalDateArr[input.value - 1],
            data: getData(totalDateArr[input.value - 1])[1]
          });
        nextStep ? input.value = nextStep : null
      }

      /*
       * Play the timeline.
       */
      function play(button) {

        button.title = 'pause';
        button.className = 'btn-pause';
        if(input.value >= totalDateArr.length -1){
          input.value = 1
        }
        chart.sequenceTimer = setInterval(function() {
          updateChart(1);
        }, stepTime);
      }

      btn.addEventListener('click', function() {
        if (chart.sequenceTimer) {
          pause(this);
        } else {
          play(this);
        }
      });
      /*
       * Trigger the update on the range bar click.
       */
      input.addEventListener('click', function() {
        updateChart();
      });



       window.iFrameResizer.onMessage = () => {};
    };

    window.iFrameResizer = {
      onMessage: handleMessage,
    };

  </script>
</body>

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
//   "title one":{
//     "date1": 15,
//     "date": 25,
//   },
//   "title tow":{
//     "date1": 65,
//     "date": 29,
//   },
// },
//   colors: ["blue", "red"], //optional : tow colors
// chartOption: {
//         stepTime: 500,
//         barInChart: 3,
//         subBarChart: 'm',
//         title: {
//           text: 'title chart',
//         },
//         subtitle: {
//           upSize: 20,
//           downSize: 15,
//           positionX: 0,
//           positionY: 0
//         }
//       },
//   spinnerColors: [], //optional : tow colors
//   overrideOptions:{} // opt
// themeColor: {
//   chart: { //optional
//     title: "red",
//     subtitle: "blue",
//     xAxis: "red",
//     yAxis: "blue",
//   },
// },
// };
