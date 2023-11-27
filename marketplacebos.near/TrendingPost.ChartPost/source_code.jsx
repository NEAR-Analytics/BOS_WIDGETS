const dataP = props.dataP || [1, 2, 3, 4, 5, 5, 6, 6, 6, 6, 4, 5];
const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Trending Post on BOS NEAR",
      data: dataP,
      backgroundColor: [
        "rgba(255, 205, 86, 0.2)",
        "#00e592",
        "#00e592",

        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "#00e592",
        "#00e592",

        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
        "#00e592",
      ],
      borderWidth: 1,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const chartData = props.chartData ?? data; // Use your data or fall back to default data
const chartOptions = props.chartOptions ?? config; // Use your config or fall back to default config

const code = `
<html>
<head>
<script src="https://unpkg.com/chart.js@4.3.0/dist/chart.umd.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
</head>
<body>
<canvas id="myChart"></canvas>
</body>
<script>
    function createChart(ctx, data, options) {
        new Chart(ctx, {
            type: options.type,
            data: data,
            options: options.options
        });
    }

    window.addEventListener('message', function(event) {
    }, false);

    const handleMessage = (m) => {
        const { data, options } = m;
        const ctx = document.getElementById('myChart').getContext('2d');
        createChart(ctx, data, options);
    };

    window.iFrameResizer = {
        onMessage: handleMessage
    }
</script>
</html>

`;
return (
  <>
    <iframe
      iframeResizer
      className="w-100"
      srcDoc={code}
      message={{ data: chartData, options: chartOptions }}
    />
  </>
);
