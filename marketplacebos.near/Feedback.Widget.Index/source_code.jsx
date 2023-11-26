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
    grid-template-columns: repeat(2, 1fr); /* Change to 2 columns on smaller screens */
  }
      @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Change to 2 columns on smaller screens */
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr; /* Change to 1 column on even smaller screens */
  }
    @media screen and (max-width: 580px) {
    grid-template-columns: 1fr; /* Change to 1 column on even smaller screens */
  }
`;

const FeedbackWidgetList = [
  "Magicbuild",
  "Fastui",
  "Potlock",
  "NearHorizon",
  "Devhub",
  "Metapool",
];
const widgetList = [];

for (let i = 0; i < FeedbackWidgetList.length; i++) {
  const paddedNumber = (i + 1).toString().padStart(4, "0");
  const widgetSrc = `marketplacebos.near/widget/Feedback.CardWidget.${FeedbackWidgetList[i]}`;
  widgetList.push(<Widget key={i} src={widgetSrc} />);
}

return <CardGrid>{widgetList}</CardGrid>;
