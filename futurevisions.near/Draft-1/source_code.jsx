// quickchart-js https://github.com/typpo/quickchart-js

const QuickChart = require("quickchart-js");

const chart = new QuickChart();

chart.setWidth(500);
chart.setHeight(300);
chart.setVersion("2");

chart.setConfig({
  type: "polarArea",
  data: {
    datasets: [
      {
        ourdata: [40, 76, 61, 78, 83],
        popx: [100],
        newdata: ["popx-x for x in ourdata"],
        data: [40, 76, 61, 78, 83],
        ourFillColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
        backgroundColor: [
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.9)",
        ],
        label: "My dataset",
      },
    ],
    labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
  },
  options: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Polar Area Chart",
    },
  },
});

// Print the chart URL
console.log(chart.getUrl());

// Get the image...
// const image = await chart.toBinary();
return "https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27polarArea%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20ourdata%3A%20%5B40%2C%2076%2C%2061%2C%2078%2C%2083%5D%2C%0A%20%20%20%20%20%20%20%20popx%3A%20%5B100%5D%2C%20%0A%20%20%20%20%20%20%20%20newdata%3A%20%5B%27popx-x%20for%20x%20in%20ourdata%27%5D%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B40%2C%2076%2C%2061%2C%2078%2C%2083%5D%2C%0A%20%20%20%20%20%20%20%20ourFillColor%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%2099%2C%20132%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20159%2C%2064%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20205%2C%2086%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(75%2C%20192%2C%20192%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(54%2C%20162%2C%20235%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20255%2C%20255%2C%200.9)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20255%2C%20255%2C%200.9)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20255%2C%20255%2C%200.9)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20255%2C%20255%2C%200.9)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20255%2C%20255%2C%200.9)%27%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20label%3A%20%27My%20dataset%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20labels%3A%20%5B%27Red%27%2C%20%27Orange%27%2C%20%27Yellow%27%2C%20%27Green%27%2C%20%27Blue%27%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20legend%3A%20%7B%0A%20%20%20%20%20%20position%3A%20%27right%27%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20title%3A%20%7B%0A%20%20%20%20%20%20display%3A%20true%2C%0A%20%20%20%20%20%20text%3A%20%27Chart.js%20Polar%20Area%20Chart%27%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A";

// Or write it to a file
chart.toFile("chart.png");
