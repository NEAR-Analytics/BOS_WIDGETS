State.init({ accountId: props.accountId });

const data = fetch(
  "https://raw.githubusercontent.com/zavodil/near-nft-owners-list/main/output_election_votes.txt"
);

const [voters, setVoters] = useState(null);

useEffect(() => {
  if (!data.ok) {
    return;
  }
  const voters = {};
  Object.values(
    data.body
      .split("\n")
      .map((line) => line.split("|"))
      .filter((data) => data.length === 5)
  ).forEach((item) => {
    const account_id = item[0];
    if (voters[account_id] == undefined) {
      voters[account_id] = {};
    }
    voters[account_id][item[3]] = item[4].toLowerCase();
  });
  setVoters(voters);
}, [data]);

if (!voters) {
  return "Loading";
}

const [message, setMessage] = useState({
  nodes: [
    {
      id: "A",
      group: 1,
    },
    {
      id: "B",
      group: 1,
    },
    {
      id: "C",
      group: 1,
    },
  ],
  links: [
    {
      source: "A",
      target: "B",
      value: 1,
    },
    {
      source: "B",
      target: "C",
      value: 1,
    },
    {
      source: "C",
      target: "A",
      value: 1,
    },
  ],
});

useEffect(() => {
  if (!voters) {
    return;
  }
  const nodes = {};
  const links = [];
  Object.entries(voters).forEach(([accountId, votes]) => {
    if (!(accountId in nodes)) {
      nodes[accountId] = {
        id: accountId,
        group: 4,
      };
    }
    Object.entries(votes).forEach(([house, votes]) => {
      house = parseInt(house);
      JSON.parse(votes).forEach((candidateId) => {
        nodes[candidateId] = {
          id: candidateId,
          group: house,
        };
        links.push({
          source: accountId,
          target: candidateId,
          value: 1,
        });
      });
    });
  });
  setMessage({
    nodes: Object.values(nodes),
    links,
  });
}, [voters]);

const code = `
<!DOCTYPE html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v6.js"></script>

<svg id="graph"></svg>

<script>

const run = (data) => {
  const width = 1080;
  const height = 768;

  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = data.links.map(d => ({...d}));
  const nodes = data.nodes.map(d => ({...d}));

  // Create a simulation with several forces.
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

  // Create the SVG container.
  const svg = d3.select("#graph")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a line for each link, and a circle for each node.
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(links)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll()
    .data(nodes)
    .join("circle")
      .attr("r", 5)
      .attr("fill", d => color(d.group));

  node.append("title")
      .text(d => d.id);

  // Add a drag behavior.
  node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

  // Set the position attributes of links and nodes each time the simulation ticks.
  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  }

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  // When this cell is re-run, stop the previous simulation. (This doesn’t
  // really matter since the target alpha is zero and the simulation will
  // stop naturally, but it’s a good practice.)
  // invalidation.then(() => simulation.stop());

  return simulation;
};

let simulation = null;

window.addEventListener("message", (event) => {
  simulation && simulation.stop();
  simulation = run(event.data);
});

</script>
`;

const [onMessage] = useState(() => {
  return (data) => {
    console.log(data);
  };
});

return (
  <iframe
    className="w-100 h-100"
    style={{ minHeight: "600px" }}
    srcDoc={code}
    message={message}
    onMessage={onMessage}
  />
);
