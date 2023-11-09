const FantasyP = styled.p`
  font-family: Fantasy
`;
const FantasyH1 = styled.h1`
  font-family: Fantasy
`;

const props = {
  copyBtn:
    "const FantasyP = styled.p`\n" +
    `  font-family:Fantasy` +
    "`;" +
    "\nconst FantasyH1 = styled.h1`\n" +
    `  font-family: Fantasy` +
    "`;" +
    `\n return(
        <>
    <FantasyH1>This is FantasyH1</FantasyH1>
  <FantasyP>Fantasy p 123</FantasyP>
  </>
)`,
  component: (
    <>
      {" "}
      <FantasyH1>This is FantasyH1</FantasyH1>
      <FantasyP>Fantasy p 123</FantasyP>
    </>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Font0005",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
