const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
  white-space: nowrap;
`;

const widgetList = [];

for (let i = 1; i <= 4; i++) {
  const paddedNumber = i.toString().padStart(4, "0");
  const widgetSrc = `marketplacebos.near/widget/Chart.Chart${paddedNumber}`;
  widgetList.push(<Widget key={i} src={widgetSrc} />);
}

return <CardGrid>{widgetList}</CardGrid>;
