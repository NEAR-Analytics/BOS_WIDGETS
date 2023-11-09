const BaskervilleP = styled.p`
  font-family: Baskerville, Baskerville Old Face, Garamond, Times New Roman, serif.
`;
const BaskervilleH1 = styled.h1`
  font-family: Baskerville, Baskerville Old Face, Garamond, Times New Roman, serif.
`;

const props = {
  copyBtn:
    "const BaskervilleP = styled.p`\n" +
    `  font-family: Baskerville, Baskerville Old Face, Garamond, Times New Roman, serif.` +
    "`;" +
    "\nconst BaskervilleH1 = styled.h1`\n" +
    `  font-family: Baskerville, Baskerville Old Face, Garamond, Times New Roman, serif.` +
    "`;" +
    `\n return(
        <>
    <BaskervilleH1>This is BaskervilleH1</BaskervilleH1>
  <BaskervilleP>Baskerville p 123</BaskervilleP>
  </>
)`,
  component: (
    <>
      {" "}
      <BaskervilleH1>This is BaskervilleH1</BaskervilleH1>
      <BaskervilleP>Baskerville p 123</BaskervilleP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0001",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
