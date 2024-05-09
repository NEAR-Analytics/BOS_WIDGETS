const { dateColumn, dataColumn, data, legendMax, legendMin, label, title, id } =
  props;
const code = `
<style>
  figure {
    margin: 0;
  }
</style>
<!-- observerable plot -->
<div id="myplot" style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">

    </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" integrity="sha512-M7nHCiNUOwFt6Us3r8alutZLm9qMt4s9951uo8jqO4UwJ1hziseL6O3ndFyigx6+LREfZqnhHxYjKRJ8ZQ69DQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="module">

import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

function calendar({
  date = Plot.identity,
  inset = 1,
  ...options
} = {}) {
  let D;
  return {
    fy: {transform: (data) => (D = Plot.valueof(data, date, Array)).map((d) => d.getUTCFullYear())},
    x: {transform: () => D.map((d) => d3.utcWeek.count(d3.utcYear(d), d))},
    y: {transform: () => D.map((d) => d.getUTCDay())},
    inset,
    ...options
  };
}
const shouldRotate = window.innerWidth <= 450;

if(shouldRotate) {
  // document.querySelector('#myplot').style.transform = 'rotate(90deg)';
}

const data = ${JSON.stringify(data ?? [])};
const isMobile = window.innerWidth <= 450;

const start = d3.utcDay.offset(d3.min(data, (d) => new Date(d.${dateColumn}))); // exclusive
const end = d3.utcDay.offset(d3.max(data, (d) => new Date(d.${dateColumn}))); // exclusive

const plot = Plot.plot({
  padding: 0,
  // height: shouldRotate? 350 : undefined,
  width: 780,
  x: {axis: null},
  y: {
    tickFormat: Plot.formatWeekday("en"), 
    tickSize: 0, 
    ticks: [0,1,2,3,4,5,6], // dont draw -1
  },
  fy: {tickFormat: "", reverse: true},
  color: {
      scheme: "greens",
      domain: [${legendMin}, ${legendMax}],
      legend: true,
      percent: false,
      ticks: 6,
      ticks: 4,
      label: "${label}"
  },
  style: {
    fontSize: isMobile? undefined : 15,
    maxWidth: isMobile? 'unset' : undefined,
    paddingLeft: isMobile? 550 : undefined,
    overflow: 'visible',
  },
  marks: [

      // Draw year labels, rounding down to draw a year even if the data doesn’t
      // start on January 1. Use y = -1 (i.e., above Sunday) to align the year
      // labels vertically with the month labels, and shift them left to align
      // them horizontally with the weekday labels.
      //Plot.text(
      //  d3.utcYears(d3.utcYear(start), end),
      //  calendar({text: d3.utcFormat("%Y"), frameAnchor: "right", x: 0, y: -1, dx: -20})
      //),
      
    Plot.cell(data, {
      x: (d) => d3.utcWeek.count(d3.utcYear(new Date(d.${dateColumn})), new Date(d.${dateColumn})),
      y: (d) => new Date(d.${dateColumn}).getUTCDay(),
      fy: (d) => new Date(d.${dateColumn}).getUTCFullYear(),
      fill: (d, i) => d.${dataColumn},
      title: (d, i) => d.${dataColumn},
      inset: 1
    }),

    // Draw month labels at the start of each month, rounding down to draw a
      // month even if the data doesn’t start on the first of the month. As
      // above, use y = -1 to place the month labels above the cells. (If you
      // want to show weekends, round up to Sunday instead of Monday.)
      Plot.text(
        d3.utcMonths(d3.utcMonth(start), end).map(d3.utcMonday.ceil),
        calendar({text: d3.utcFormat("%b"), frameAnchor: "left", y: -1})
      ),
      
      // Lastly, draw the date for all days spanning the dataset, including
      // days for which there is no data.
      Plot.text(
        d3.utcDays(start, end),
        calendar({text: d3.utcFormat("%-d")})
      )
  ]
});
const div = document.querySelector("#myplot");
div.append(plot);

</script>

`;

return (
  <div className="w-100 d-flex flex-column align-items-center">
    {props.title && <strong>${props.title}</strong>}
    <iframe
      id={props.id ?? "calendar-chart"}
      className="w-100"
      style={{ height: 350 + 250 * (props.heightMultiplier - 1) }}
      srcDoc={code}
    />
  </div>
);
