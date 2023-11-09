const CaveatP = styled.p`
font-family: "Caveat", cursive;
`;
const CaveatH1 = styled.h1`
font-family: "Caveat", cursive;
`;

const props = {
  copyBtn:
    "const CaveatP = styled.p`\n" +
    `  font-family: "Caveat", cursive;
` +
    "`;" +
    "\nconst CaveatH1 = styled.h1`\n" +
    `  font-family: "Caveat", cursive;
` +
    "`;" +
    `\n return(
        <>
    <CaveatH1>This is CaveatH1</CaveatH1>
  <CaveatP>Caveat p 123</CaveatP>
  </>
)`,
  component: (
    <>
      {" "}
      <CaveatH1>This is CaveatH1</CaveatH1>
      <CaveatP>Caveat p 123</CaveatP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0008",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
