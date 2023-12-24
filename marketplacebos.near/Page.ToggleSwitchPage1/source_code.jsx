const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
  white-space: nowrap;
    padding:10px;

`;

const widgetList = [];

for (let i = 1; i <= 3; i++) {
  const paddedNumber = i.toString().padStart(4, "0");
  const widgetSrc = `marketplacebos.near/widget/TS.ToggleSwitch${paddedNumber}`;
  widgetList.push(<Widget key={i} src={widgetSrc} />);
}

return <CardGrid>{widgetList}</CardGrid>;
