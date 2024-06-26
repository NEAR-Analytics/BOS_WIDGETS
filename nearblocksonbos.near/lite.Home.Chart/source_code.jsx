let HomeChartSkeleton = window?.HomeChartSkeleton || (() => <></>);
const Chart = () => {
  let { apiFetch } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.fetcher`
  );
  let { formatNumber } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.formatter`
  );
  if (!apiFetch || !formatNumber) return <HomeChartSkeleton />;
  const [charts, setCharts] = useState(null);
  useEffect(() => {
    if (apiFetch) {
      apiFetch(`https://api.nearblocks.io/v1/charts/latest`)
        .then((response) => setCharts(response?.charts))
        .catch(console.log);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const srcDoc = useMemo(() => {
    let series = [];
    let categories = [];
    if (charts?.length) {
      series = charts?.map((chart) => ({
        date: new Date(chart.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          weekday: "long",
          year: "numeric",
        }),
        price: `$${formatNumber(chart.near_price ?? "0", 2)}`,
        txns: formatNumber(chart.txns, 0),
        y: Number(chart.txns),
      }));
      series.reverse();
      categories = series.map((stat) => stat.date);
    }
    return `
      <html>
        <head>
          <title>Highcharts Line Chart</title>
          <script src="https://cdn.jsdelivr.net/npm/highcharts@11.4.3/highcharts.min.js"></script>
        </head>
        <body style="margin: 0">
          <div id="container" style="width: 100%; height: 280px"></div>
          <script>
            document.addEventListener("DOMContentLoaded", function () {
              Highcharts.chart("container", {
                chart: {
                  spacingTop: 0,
                  spacingBottom: 0,
                  spacingLeft: 0,
                  spacingRight: 0,
                  backgroundColor: "transparent"
                },
                title: {
                  text: undefined,
                },
                xAxis: {
                  visible: false,
                  categories: ${JSON.stringify(categories)},
                },
                yAxis: {
                  visible: false,
                },
                series: [
                  {
                    name: "Transactions",
                    type: "spline",
                    data: ${JSON.stringify(series)},
                    lineWidth: 3
                  },
                ],
                tooltip: {
                  formatter: function () {
                    return '<span style="font-size:10px">' + this.point.date + '</span><br/>${
                      context.networkId === "testnet"
                        ? ""
                        : "Price: <b>' + this.point.price + '</b><br/>"
                    }Transactions: <b>' + this.point.txns + '</b>'
                  }
                },
                legend: {
                  enabled: false,
                },
                plotOptions: {
                  spline: {
                    marker: {
                      radius: 0,
                      states: {
                        hover: {
                          radius: 4
                        }
                      }
                    },
                  },
                },
                exporting: {
                  enabled: false,
                },
                credits: {
                  enabled: false,
                },
              });
            });
          </script>
        </body>
      </html>
    `;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charts]);
  return (
    <div className="flex flex-col pt-4 pb-6">
      <iframe
        className="w-full overflow-hidden border-none"
        srcDoc={srcDoc}
        style={{ height: 280 }}
      />
    </div>
  );
};
return Chart(props);
