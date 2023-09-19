const themeColor = props.themeColor;

const Chart = styled.div`
  min-width: 150px;
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  place-content: center;
  margin: 5px;
  font-size: 10px;
  font-weight: bold;

  &:before {
    content: "";
    position: absolute;
    border-radius: ${props.percent}%;
    inset: 0;
    background: ${(props) =>
      `conic-gradient(${
        themeColor.piePercentage?.filled || `rgb(75, 166, 238)`
      }, calc(${props.voted}*1%), ${
        themeColor.piePercentage?.empty || "rgb(212, 229, 244)"
      } 0)`};
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 15px),
      #000 calc(100% - 15px)
    );
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 15px),
      #000 calc(100% - 15px)
    );
  }

  span {
    font-weight: 800;
    font-size: 32px;
    line-height: 120%;
    color: ${themeColor.piePercentage?.filled || `rgb(75, 166, 238)`};
  }
`;
const chart1 = styled.div`
  display: inline-grid;
  place-content: center;
  font-size: 10px;

`;

const percent = (props.voted / props.total) * 100;

return (
  <div>
    <Chart voted={percent}>
      <span>{percent.toFixed(1)}%</span>
      <chart1>
        <b style={{ color: themeColor.piePercentage?.text }}>
          {props.voted}/{props.total}
        </b>
        <div style={{ color: themeColor.piePercentage?.text }}>
          {props.description}
        </div>
      </chart1>
    </Chart>
  </div>
);

// const props = {
//   voted: "2580",
//   total: "21543",
//   description: "no",
//   percent: 10,
//   themeColor: {
//     piePercentage: {
//       text: "red",
//       filled: "green",
//       empty: "red",
//     },
//   },
// };
