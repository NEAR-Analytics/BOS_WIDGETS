const CalistoMTP = styled.p`
  font-family: Calisto MT, Bookman Old Style, Bookman, Goudy Old Style, Garamond, Hoefler Text, Bitstream Charter, Georgia, serif
`;
const CalistoMTH1 = styled.h1`
  font-family: Calisto MT, Bookman Old Style, Bookman, Goudy Old Style, Garamond, Hoefler Text, Bitstream Charter, Georgia, serif
`;

const props = {
  copyBtn:
    "const Calisto MTP = styled.p`\n" +
    `  font-family: Calisto MT, Bookman Old Style, Bookman, Goudy Old Style, Garamond, Hoefler Text, Bitstream Charter, Georgia, serif` +
    "`;" +
    "\nconst Calisto MTH1 = styled.h1`\n" +
    `  font-family: Calisto MT, Bookman Old Style, Bookman, Goudy Old Style, Garamond, Hoefler Text, Bitstream Charter, Georgia, serif` +
    "`;" +
    `\n return(
        <>
    <CalistoMTH1>This is CalistoMTH1</CalistoMTH1>
  <CalistoMTP>CalistoMT p 123</CalistoMTP>
  </>
)`,
  component: (
    <>
      {" "}
      <CalistoMTH1>This is CalistoMTH1</CalistoMTH1>
      <CalistoMTP>CalistoMT p 123</CalistoMTP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0002",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
