const definition = props.definition;
const height = props.height || "500px";
const width = props.width || "700px";

return (
  <iframe
    iframeResizer
    style={{ height: height, width: width }}
    srcDoc={`
<div id="main" style="height: ${height}; width: ${width}"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js"></script>
<script>
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);

myChart.setOption(${JSON.stringify(definition)});
</script>`}
  />
);
