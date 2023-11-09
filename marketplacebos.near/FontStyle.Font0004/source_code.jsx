const MonospaceP = styled.p`
  font-family: Monospace
`;
const MonospaceH1 = styled.h1`
  font-family:  Monospace
`;

const props = {
  copyBtn:
    "const MonospaceP = styled.p`\n" +
    `  font-family:  Century Gothic, CenturyGothic, AppleGothic, sans-serif.` +
    "`;" +
    "\nconst MonospaceH1 = styled.h1`\n" +
    `  font-family:  Century Gothic, CenturyGothic, AppleGothic, sans-serif.` +
    "`;" +
    `\n return(
        <>
    <MonospaceH1>This is MonospaceH1</MonospaceH1>
  <MonospaceP>Century p 123</MonospaceP>
  </>
)`,
  component: (
    <>
      {" "}
      <MonospaceH1>This is MonospaceH1</MonospaceH1>
      <MonospaceP>MonospaceP p 123</MonospaceP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0004",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
