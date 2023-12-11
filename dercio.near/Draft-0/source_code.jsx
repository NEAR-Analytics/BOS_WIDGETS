const data = {
  name: "root",
  children: [
    {
      name: "group1",
      children: [
        {
          name: "item1",
          value: 120,
          image:
            "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near",
        },
        {
          name: "item2",
          value: 20,
          image:
            "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near",
        },
        {
          name: "item3",
          value: 40,
          image:
            "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near",
        },
      ],
    },
    {
      name: "group2",
      children: [
        {
          name: "item4",
          value: 40,
          image:
            "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near",
        },
        {
          name: "item5",
          value: 50,
          image:
            "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near",
        },
        {
          name: "item6",
          value: 60,
          image:
            "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near",
        },
      ],
    },
  ],
};

const code = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Treemap with Images</title>
  <style>
    .node {
      position: absolute;
      overflow: hidden;
      border: 1px solid #000;
      background-color: #fff;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      font-size: 12px;
      font-family: Arial, sans-serif;
      text-align: center;
      cursor: pointer;
    }
    .name {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
    }
    .value {
      font-size: 10px;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div id="treemap"></div>
  <script src="https://d3js.org/d3.v5.min.js"></script>
  <script>
    var data = {
      "name": "root",
      "children": [
        {
          "name": "group1",
          "children": [
            {"name": "item1", "value": 120, "image": "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near"},
            {"name": "item2", "value": 20, "image": "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near"},
            {"name": "item3", "value": 40, "image": "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near"}
          ]
        },
        {
          "name": "group2",
          "children": [
            {"name": "item4", "value": 40, "image": "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near"},
            {"name": "item5", "value": 50, "image": "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near"},
            {"name": "item6", "value": 60, "image": "https://i.near.social/magic/large/https://near.social/magic/img/account/dercio.near"}
          ]
        }
      ]
    };

    var treemapLayout = d3.treemap()
      .size([500, 300])
      .padding(1)
      .round(true);

    var rootNode = d3.hierarchy(data);
    rootNode.sum(function(d) { return d.value; });

    treemapLayout(rootNode);

    var nodes = d3.select("#treemap")
      .selectAll(".node")
      .data(rootNode.descendants())
      .enter()
      .append("div")
      .attr("class", "node")
      .style("left", function(d) { return d.x0 + "px"; })
      .style("top", function(d) { return d.y0 + "px"; })
      .style("width", function(d) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 + "px"; })
      .style("background-image", function(d) { return "url('" + d.data.image + "')"; })
      .style("background-size", "cover")
      .style("background-repeat", "no-repeat")
      .style("background-position", "center")
      .style("font-size", "12px")
      .style("font-family", "Arial, sans-serif")
      .style("text-align", "center")
      .style("cursor", "pointer")
      .append("div")
      .attr("class", "name")
      .append("span")
      .text(function(d) { return d.data.name; })
      .append("div")
      .attr("class", "value")
      .text(function(d) { return "Value: " + d.data.value; })
      .style("display", "none");

    nodes.on("mouseover", function(d) {
      d3.select(this).select(".value").style("display", "block");
    });

    nodes.on("mouseout", function(d) {
      d3.select(this).select(".value").style("display", "none");
    });
  </script>
</body>
</html>
`;
return (
  <div>
    <div>
      <iframe
        className="w-100 h-100"
        style={{ minHeight: "800px" }}
        srcDoc={code}
      />
    </div>
  </div>
);
