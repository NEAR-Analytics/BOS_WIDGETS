const Chart = styled.div`
  width: 150px;
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
      `conic-gradient(#4ba6ee, calc(${props.voted}*1%), #d4e5f4 0)`};
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
    color: #4ba6ee;
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
        <b>
          {props.voted}/{props.total}
        </b>
        <div>{props.description}</div>
      </chart1>
    </Chart>
  </div>
);
// voted
// total
// description
