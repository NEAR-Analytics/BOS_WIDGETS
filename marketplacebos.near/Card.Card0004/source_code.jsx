const CardMain = styled.div`
  width: 220px;
  height: 270px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;

  &:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }
`;

const CardDetails = styled.div`
  color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;
`;

const TextTitle = styled.p`
  font-size: 1.5em;
  font-weight: bold;
`;

const TextBody = styled.p`
  color: rgb(134, 134, 134);
`;

const CardButton = styled.button`
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;

  ${Card}:hover & {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
`;

const props = {
  copyBtn:
    "const CardMain = styled.div`\n" +
    `        width: 220px;
  height: 270px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;

  &:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }
` +
    "\n`;" +
    "\nconst CardDetails = styled.div`\n" +
    `      color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;
` +
    "\n`;" +
    "\nconst TextTitle = styled.p`\n" +
    `        font-size: 1.5em;
  font-weight: bold;
` +
    "\n`;" +
    "\nconst TextBody = styled.p`\n" +
    `        color: rgb(134, 134, 134);
` +
    "\n`;" +
    "\nconst CardButton = styled.button`\n" +
    `          transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;` +
    "${CardMain}" +
    `:hover & {
    transform: translate(-50%, 50%);
    opacity: 1;
  }` +
    "\n`;" +
    `\n return(
          <CardMain>
            <CardDetails>
            <TextTitle>Card title</TextTitle>
            <TextBody>Here</TextBody>
            </CardDetails>
            <CardButton>More info</CardButton>
        </CardMain>
  )`,
  component: (
    <CardMain>
      <CardDetails>
        <TextTitle>Card title</TextTitle>
        <TextBody>Here</TextBody>
      </CardDetails>
      <CardButton>More info</CardButton>
    </CardMain>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.C0004",
};
return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardLarge" props={props} />
  </>
);
