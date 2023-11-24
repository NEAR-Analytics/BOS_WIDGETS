const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
  padding:10px;
  overflow-x: auto;
  padding-bottom: 20px;
  white-space: nowrap;
    @media screen and (max-width: 868px) {
    grid-template-columns: repeat(2, 1fr);
  }
      @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr; 
  }
    @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const Text = styled.p`
  font-size: 10px;
`;

const widgetList = [];

for (let i = 1; i <= 2; i++) {
  const paddedNumber = i.toString().padStart(4, "0");
  const widgetSrc = `marketplacebos.near/widget/Radio.RadioButton${paddedNumber}`;
  widgetList.push(<Widget key={i} src={widgetSrc} />);
}

return <CardGrid>{widgetList}</CardGrid>;
