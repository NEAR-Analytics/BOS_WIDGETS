const CursiveP = styled.p`
  font-family: Cursive
`;
const CursiveH1 = styled.h1`
  font-family: Cursive
`;

const props = {
  copyBtn:
    "const CursiveP = styled.p`\n" +
    `  font-family: Cursive` +
    "`;" +
    "\nconst CursiveH1 = styled.h1`\n" +
    `  font-family: Cursive` +
    "`;" +
    `\n return(
        <>
    <CursiveH1>This is CursiveH1</CursiveH1>
  <CursiveP>Cursive p 123</CursiveP>
  </>
)`,
  component: (
    <>
      {" "}
      <CursiveH1>This is CursiveH1</CursiveH1>
      <CursiveP>Cursive p 123</CursiveP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0003",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
