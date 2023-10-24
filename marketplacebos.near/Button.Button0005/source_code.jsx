const Button0005 = styled.button`
  font-family: monospace;
  font-size: 1em;
  color: #FAFAFA;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 10px;
  border: 4px solid #FAFAFA;
  background: #252525;
  box-shadow: 6px 6px #fafafa;
  cursor: pointer;
  margin: 35px 0;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:active {
    box-shadow: none;
    transform: translate(5px, 5px);
  }
`;

const props = {
  copyBtn:
    "const Button0005 = styled.button`\n" +
    `font-family: monospace;
  font-size: 1em;
  color: #FAFAFA;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 10px;
  border: 4px solid #FAFAFA;
  background: #252525;
  box-shadow: 6px 6px #fafafa;
  cursor: pointer;
  margin: 35px 0;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:active {
    box-shadow: none;
    transform: translate(5px, 5px);
  }` +
    "`;" +
    `\n return(
      <Button0005>Button 0005</Button0005>
      )
`,
  component: <Button0005>Button0005</Button0005>,
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Button0005",
};
return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
