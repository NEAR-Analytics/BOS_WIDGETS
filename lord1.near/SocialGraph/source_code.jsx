const accountIds = props.accountIds || ["", `${context.accountId ?? ""}`];
let spinnerColors = props?.spinnerColors.length >= 0 && {
  color1: props?.spinnerColors[0],
  color2: props?.spinnerColors[1],
};
const things =
  props.things ??
  accountIds.map((accountId) => {
    return `${accountId}/graph/${props.thingId ?? "follow"}`;
  });

const data = Social.getr(things, "final");
const [nodesState, setNodesState] = useState(null);
const [isLoading, setIsLoading] = useState(true);
// const [selectedAccountId, setSelectedAccountId] = useState(context.accountId);
const debug = false;

useEffect(() => {
  setNodesState(data);
}, [data]);

const [message, setMessage] = useState(null);

useEffect(() => {
  if (!nodesState) {
    return;
  }
  const nodes = {};
  const links = [];
  Object.entries(nodesState).forEach(([accountId, graphData]) => {
    if (!(accountId in nodes)) {
      nodes[accountId] = {
        id: accountId,
        size: 10,
      };
    }
    Object.values(graphData.graph).forEach((edges) => {
      Object.keys(edges).forEach((memberId) => {
        if (!(memberId in nodes)) {
          nodes[memberId] = {
            id: memberId,
            size: 10,
          };
        }
        links.push({
          source: accountId,
          target: memberId,
          value: 1,
        });
      });
    });
  });
  setMessage({
    nodes: Object.values(nodes),
    links,
  });
}, [nodesState]);
const code = `
  
<html>

  <head>


    <meta charset="utf-8">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
    <!-- Load d3.js -->
    <script src="https://d3js.org/d3.v6.js"></script>
  </head>

  <body>


    <svg id="graph"></svg>

    <script>
      window.addEventListener("message", function(event) {}, false);

      const handleMessage = (message) => {

        const run = (data) => {
          const width = 350;
          const height = 350;
          let dragIsOn = false;

          // The force simulation mutates links and nodes, so create a copy
          // so that re-evaluating this cell produces the same result.
          const links = data.links.map(d => ({
            ...d
          }));
          const nodes = data.nodes.map(d => ({
            ...d
          }));

          // Create a simulation with several forces.
          const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("collide", d3.forceCollide())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

          simulation.force("collide")
            .strength(.7)
            .radius(d => Math.sqrt(d.size) + 5)
            .iterations(1);

          // Create the SVG container.
          const svg = d3.select("#graph")
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

          // Add a line for each link, and a circle for each node.
          const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll()
            .data(links)
            .join("line")
            .attr("stroke-width", 1);

          const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .selectAll()
            .data(nodes)
            .join("g");

          node
            .append("image")
            .attr("xlink:href", (d) => \`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/\${d.id}\`) // Set the image URL based on your data
            .attr("x", (d) => -Math.sqrt(d.size) - 5)
            .attr("y", (d) => -Math.sqrt(d.size) - 5)
            .attr("clip-path", d => \`circle(\${Math.sqrt(d.size) + 5}px at \${Math.sqrt(d.size) + 5} \${Math.sqrt(d.size) + 5})\`) 
            .attr("width", (d) => 2 * Math.sqrt(d.size) + 10);

          node
            .append("circle")
            .attr("r", d => Math.sqrt(d.size) + 5)
            .attr("fill", "none");

          node.append("title")
            .text(d => d.id);

          // Add a drag behavior.
          node.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

          node.on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleMouseClick);

          function handleMouseClick(e) {
            const d = e.target.__data__;
            window.top.postMessage(d.id, "*");
          }

          function handleMouseOver(d) {
            d = d.target.__data__;
            // Highlight connected edges
            link.attr("stroke-opacity", e => (e.source === d || e.target === d) ? 1 : 0.1);

            // Highlight connected nodes
            node.attr("opacity", function(n) {
              return n === d || isConnected(d, n) ? 1 : 0.3;
            });
          }

          function handleMouseOut() {
            if (dragIsOn) {
              return;
            }
            // Reset edge and node styles
            link
              .attr("stroke-opacity", 0.6);
            node.attr("opacity", 1);
          }

          function isConnected(a, b) {
            // Check if two nodes are connected
            return links.some(function(link) {
              return (link.source === a && link.target === b) || (link.source === b && link.target === a);
            });
          }

          // Set the position attributes of links and nodes each time the simulation ticks.
          function ticked() {
            link
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);

             node.attr("transform", d => \`translate(\${d.x}, \${d.y})\`) 
          }

          // Reheat the simulation when drag starts, and fix the subject position.
          function dragstarted(event) {
            dragIsOn = true;
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
            dragIsOn = false;
            handleMouseOut();
          }

          // When this cell is re-run, stop the previous simulation. (This doesn’t
          // really matter since the target alpha is zero and the simulation will
          // stop naturally, but it’s a good practice.)
          // invalidation.then(() => simulation.stop());

          return simulation;
        };

        let simulation = null;

        if (simulation) {
          simulation.stop();
          d3.select("#graph").selectAll("*").remove();
        }
        if (message) {
          simulation = run(message);
        }

        window.iFrameResizer.onMessage = () => {};
      };

      window.iFrameResizer = {
        onMessage: handleMessage,
      };

    </script>
  </body>

</html>

`;

// const [onMessage] = useState(() => {
//   return (data) => {
//     if (data) {
//       setSelectedAccountId(data);
//     }
//   };
// });

return (
  <div
    className="w-100 d-flex justify-content-center align-items-center"
    style={{
      minHeight: "300px",
      minWidth: "300px",
    }}
  >
    <>
      <div
        className={`w-100 ${isLoading || !nodesState ? "d-block" : "d-none"}`}
      >
        <Widget
          src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
          props={{
            ...spinnerColors,
          }}
        />
      </div>
      <iframe
        iframeResizer
        className={`w-100 ${isLoading || !nodesState ? "d-none" : "d-block"}`}
        srcDoc={code}
        message={message}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </>
  </div>
);
