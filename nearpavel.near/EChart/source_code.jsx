// This is a simple example of how to embed charting library into BOS using iframe.
// Play with more EChart examples here: https://echarts.apache.org/examples/en/index.html
// Just update the `option` value to see it live on BOS.
const option = props.option;
const height = props.height || "500px";
const width = props.width || "700px";
if (!option) {
  return (
    <div>
      <strong>Props not defined</strong>
      <span>
        Please provide 'option' prop following echarts format, e.g.
        <a href="https://echarts.apache.org/examples/en/editor.html?c=line-stack">
          https://echarts.apache.org/examples/en/editor.html?c=line-stack
        </a>
      </span>
    </div>
  );
}
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
var option = ${JSON.stringify(option)};

myChart.setOption(option);
</script>`}
  />
);
