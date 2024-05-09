const backgroundImage =
  "https://res.cloudinary.com/zbsoft/image/upload/v1700160172/raffle/background.png";

const Container = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    padding-bottom: 8px;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-position: center;
`;

const Header = styled.div`
    margin: 0 auto;
    padding: 1rem 0.5rem; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: 200px;
    text-align: center;
    box-shadow: 0 4px 4px 0 #003C8C inset, 0 4px 4px 0 #003C8C;
    border-radius: 0.5rem;
    border-width: 2px;
`;

const HeaderTitle = styled.h1`
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.75rem;
    text-align: center;
    color: #003C8C;
    text-align: center;
    margin: 0.5rem 0;
`;

const HeaderText = styled.p`
    margin: 0;
    text-align: center;
`;

const Title = styled.div`
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.75rem;
    text-align: center;
    margin: 2.5rem 0;
`;

const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: auto;
`;
const RaffleButton = styled.button`
    box-shadow: 0 4px 4px 0 #003C8C inset, 0 4px 4px 0 #003C8C;
    padding: 1rem 5rem;
    background-color: white;
    border: 1px solid #003C8C;
    border-radius: 30px;
    cursor: pointer;
    
`;

return (
  <Wrapper>
    <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Header>
        <HeaderTitle> It is more fun, when it is onchain</HeaderTitle>
        <HeaderText>
          weekly prize for those who interact onchain. Check-in everyday to see
          what we are giving away
        </HeaderText>
      </Header>
      <Title>Every week we pick onchain activities worth celebrating</Title>
      <RaffleButton> This week hot raffles </RaffleButton>
    </Container>
  </Wrapper>
);
