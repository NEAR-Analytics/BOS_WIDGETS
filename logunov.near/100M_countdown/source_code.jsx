const Container = styled.div`
    height: 90vh;
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
`;

const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    font-family: Inter;
`;

const UserAmount = styled.div`
    font-size: 10vw;
    font-weight: 500;
`;

const TextTop = styled.div`
    font-size: 1.5vw;
    font-weight: 300;
    text-align: right;
`;

const TextBottom = styled.div`
    font-size: 3vw;
    font-weight: 400;
`;

const TextBottomest = styled.div`
    font-size: 2vw;
    font-weight: 400;
`;

const height = parseInt(Near.block("final").header.height);
const diff = Math.max(100_000_000 - height, 0);
const output = Date();
console.log(output);

return (
  <Container>
    {
      <TextBlock>
        <UserAmount>
          {diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </UserAmount>
        <TextBottom>blocks till 100M with 100% protocol uptime 🎉</TextBottom>
        <br />
        <br />
        <TextBottomest>Remaining time: {output}</TextBottomest>
        <TextBottomest>Current block: {height}</TextBottomest>
      </TextBlock>
    }
  </Container>
);
