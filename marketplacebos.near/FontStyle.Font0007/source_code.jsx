const CourierP = styled.p`
  font-family: 'Courier New'
`;
const CourierH1 = styled.h1`
  font-family: 'Courier New'
`;

const props = {
  copyBtn:
    "const CourierP = styled.p`\n" +
    `  font-family: 'Courier New'
` +
    "`;" +
    "\nconst CourierH1 = styled.h1`\n" +
    `  font-family: 'Courier New'
` +
    "`;" +
    `\n return(
        <>
    <CourierH1>This is CourierH1</CourierH1>
  <CourierP>Courier p 123</CourierP>
  </>
)`,
  component: (
    <>
      {" "}
      <CourierH1>This is CourierH1</CourierH1>
      <CourierP>Courier p 123</CourierP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0007",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
