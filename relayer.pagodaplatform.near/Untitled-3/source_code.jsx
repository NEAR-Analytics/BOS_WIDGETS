const {
  xColumn,
  yColumn,
  data,
  legendMax,
  legendMin,
  label,
  isXDate,
  strokeColumn,
} = props;
const code = `
<!-- observerable plot -->
<div id="myplot" style="width: 100%; display: flex; align-items: center; justify-content: center;"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" integrity="sha512-M7nHCiNUOwFt6Us3r8alutZLm9qMt4s9951uo8jqO4UwJ1hziseL6O3ndFyigx6+LREfZqnhHxYjKRJ8ZQ69DQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="module">

import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const data = ${JSON.stringify(data ?? [])};

// convert to date object
if(1 == ${isXDate ? "1" : "0"}) {
    data.forEach((x, index) => {
        data[index]['${xColumn}'] = new Date(data[index]['${xColumn}']);
    });
}

const plot = Plot.plot({
  width: 780,
  x: {type: "${isXDate ? "date" : "band"}",},
  ${isXDate ? `x: (d) => d3.utcDay(d.${xColumn}),` : ""}
  y: {grid: true, label: "${label}"},
  color: { legend: true },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(data, {x: "${xColumn}", y: "${yColumn}", stroke: "${strokeColumn}"})
  ]
})
const div = document.querySelector("#myplot");
div.append(plot);

</script>

`;

return (
  <div className="w-100">
    <iframe
      className="w-100"
      style={{ height: 500, width: 600 }}
      srcDoc={code}
    />
  </div>
);
