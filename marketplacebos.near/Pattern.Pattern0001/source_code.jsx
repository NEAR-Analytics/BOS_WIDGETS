const Container = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 96%;
  background-image: linear-gradient(#ffffff 1.1rem, #ccc 1.2rem);
  background-size: 100% 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color:black;
`;
const props = {
  copyBtn:
    "const Container = styled.div`\n" +
    `  border-radius: 20px;
  width: 100%;
  height: 96%;
  background-image: linear-gradient(#ffffff 1.1rem, #ccc 1.2rem);
  background-size: 100% 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
` +
    "\n`;" +
    "const Text = styled.p`\n" +
    `  color: black;
` +
    "\n`;" +
    `\n return(
         <Container>
      {" "}
      <Text>Add some text or content here to test!</Text>
    </Container>  )`,
  component: <Container> </Container>,
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.P0001",
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardPattern"
      props={props}
    />
  </>
);
