const OptimaP = styled.p`
  font-family: Optima
`;
const OptimaH1 = styled.h1`
  font-family: Optima
`;

const props = {
  copyBtn:
    "const OptimaP = styled.p`\n" +
    `  font-family: Optima` +
    "`;" +
    "\nconst OptimaH1 = styled.h1`\n" +
    `  font-family: Optima` +
    "`;" +
    `\n return(
        <>
    <OptimaH1>This is OptimaH1</OptimaH1>
  <OptimaP>OptimaP p 123</OptimaP>
  </>
)`,
  component: (
    <>
      {" "}
      <OptimaH1>This is OptimaH1</OptimaH1>
      <OptimaP>OptimaP p 123</OptimaP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0006",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
