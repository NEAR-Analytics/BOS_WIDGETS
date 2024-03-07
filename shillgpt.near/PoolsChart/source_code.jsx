let contractId = props.contractId ?? "v1.shillgpt.near";
let pools = props.pools ?? Near.view(contractId, "get_pools");

let pricesData =
  props.pricesData ?? fetch("https://indexer.ref.finance/list-token-price");

if (!pricesData || !pricesData.ok || !pools) {
  return "Loading";
}

let prices = JSON.parse(pricesData?.body ?? "{}");

const [message, setMessage] = useState(null);

let allTokens = props.allTokens ?? {
  "token.lonkingnearbackto2024.near": {
    name: "LONK",
    decimals: 8,
  },
  "ftv2.nekotoken.near": {
    name: "NEKO",
    decimals: 24,
  },
  "blackdragon.tkn.near": {
    name: "BLACKDRAGON",
    decimals: 24,
  },
  "token.0xshitzu.near": {
    name: "SHITZU",
    decimals: 18,
  },
};

const getFtBalance = (tokenId, balance, decimals) => {
  if (decimals == undefined) {
    decimals = 10;
  }
  if (balance === undefined || balance === null) {
    return "Undefined";
  }
  return Number(
    Big(balance).div(Big(10).pow(allTokens[tokenId].decimals)).toFixed(decimals)
  );
};

const shuffle = (array) => {
  if (!array) {
    return [];
  }
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

let poolsData = {};
shuffle(pools).map((p) => {
  let tokenBalance = getFtBalance(p[0], p[1].total_balance, 2);
  console.log(p, tokenBalance);

  let tokenValue = (
    parseFloat(prices[p[0]]?.price ?? 0) * parseFloat(tokenBalance ?? 0)
  ).toFixed(2);

  poolsData[allTokens[p[0]].name] = tokenValue;
});

console.log("poolsData", poolsData);

setMessage({
  poolsData,
});

const code = `
<!DOCTYPE html>
<meta charset="utf-8">

<script src="https://d3js.org/d3.v4.js"></script>
<div class="svg-container" style="text-align:center">
<div id="my_dataviz" key="piechart"></div>
</div>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<script>

const run = (eventData) => {    
    var width = 700
    height = 450
    margin = 40

    var radius = Math.min(width, height) / 2 - margin

    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var data = eventData.poolsData;

    var color = d3.scaleOrdinal()
    .domain(["LONK", "NEKO", "BLACKDRAGON", "SHITZU"])
    .range(d3.schemeDark2);

    var pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(function(d) {return d.value; })

    var data_ready = pie(d3.entries(data))

    var arc = d3.arc()
    .innerRadius(radius * 0.5)  
    .outerRadius(radius * 0.8)

    var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

    svg
    .selectAll('allSlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-family", "Tahoma")
    .attr("fill", "darkgrey")
    .style('font-size', '12px')
    .text("@ShillGPT");

    svg
    .selectAll('allPolylines')
    .data(data_ready)
    .enter()
    .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
    var posA = arc.centroid(d) 
    var posB = outerArc.centroid(d) 
    var posC = outerArc.centroid(d); 
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
    return [posA, posB, posC]
    })

    svg
    .selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
    .attr("font-family", "Tahoma")
    .text( function(d) { console.log(d.data.key) ; return d.data.key } )
    .attr('transform', function(d) {
    var pos = outerArc.centroid(d);
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
    return 'translate(' + pos + ')';
    })
    .style('font-size', '12px')
    .style('text-anchor', function(d) {
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    return (midangle < Math.PI ? 'start' : 'end')
    })

};


let simulation = null;

window.addEventListener("message", (event) => {
  if (simulation) {
    simulation.stop();
    d3.select("#graph").selectAll("*").remove();
  }
  if (event.data) {
    simulation = run(event.data);
  }
});


</script>
`;

const [onMessage] = useState(() => {
  return (data) => {
    if (data) {
      setSelectedAccountId(data);
    }
  };
});

return (
  <div>
    <div>
      <iframe
        className={prols.className ?? "w-100 h-100"}
        style={{ minHeight: props.minHeight ?? "500px" }}
        srcDoc={code}
        message={message}
        onMessage={onMessage}
        id="poolchart-iframe"
        key="poolchart-iframe"
      />
    </div>
  </div>
);
