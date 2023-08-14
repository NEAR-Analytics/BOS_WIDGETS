const data = fetch(
  "https://api.dune.com/api/v1/query/2785733/results?api_key=lu4oef7rzoaUwWuC8aqtFnDKjKbRvLSW"
);

if (!data) {
  return <p>Loading...</p>;
}

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ChartSVG = styled.svg`
  width: 100%;
  height: auto;
`;

const rows = data.body.result.rows.reverse();

const mintedPoints = rows.map((row) => ({
  x: new Date(row.period).getTime(),
  y: row.minted,
}));

const totalMintedPoints = rows.map((row) => ({
  x: new Date(row.period).getTime(),
  y: row.total_minted,
}));

const minX = mintedPoints[0].x;
const maxX = mintedPoints[mintedPoints.length - 1].x;

const scaleY = (y) =>
  100 -
  (y / Math.max(...rows.map((row) => Math.max(row.minted, row.total_minted)))) *
    100;

const mintedPath = mintedPoints
  .map(
    (point) => `${((point.x - minX) / (maxX - minX)) * 100},${scaleY(point.y)}`
  )
  .join(" ");
const totalMintedPath = totalMintedPoints
  .map(
    (point) => `${((point.x - minX) / (maxX - minX)) * 100},${scaleY(point.y)}`
  )
  .join(" ");

return (
  <>
    <ChartContainer>
      <h3>v2 - Total TalentLayer Mints</h3>
      <br />
      <div className="p-5">
        <ChartSVG viewBox="0 0 100 100">
          <polyline
            points={mintedPath}
            fill="none"
            stroke="blue"
            strokeWidth="0.5"
          />
          <polyline
            points={totalMintedPath}
            fill="none"
            stroke="red"
            strokeWidth="0.5"
          />
        </ChartSVG>
      </div>
    </ChartContainer>
  </>
);
