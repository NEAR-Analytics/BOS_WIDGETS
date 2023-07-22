const Main = styled.div`
   display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:black;
  color:white;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  text-align: center;
`;
const Header = styled.h1`
  font-size: 100px;
  font-weight: bold;
  line-height: 1;
`;
const Subtitle = styled.p`
  padding-top: 4px;
  font-size: 24px;
  font-weight: 300;
`;

const CallToAction = styled.p`
  padding-top: 4px;
  font-size: 24px;
 font-weight: bold;
`;
const ButtonContainer = styled.div`
 display: flex;
  gap: 10px;
  padding-top: 10px;
`;
const CustomButtonLeft = styled.a`
  padding: 16px;
  background-color: white;
  color: black;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    text-decoration:none;
    decoration:none;
    color:white;
  }
  cursor:pointer;
  text-decoration:none;
  decoration:none;
`;
const CustomButtonRight = styled.a`
  padding: 16px;
  border: 2px solid white;
  background-color: black;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: black;
    text-decoration:none;
    decoration:none;
  }
  cursor:pointer;
  text-decoration:none;
  decoration:none;
`;
return (
  <Main>
    <FlexContainer>
      <div>
        <Header>Alpha model on ZK.</Header>
        <Subtitle>
          Our platform is tailer-made for investors and traders, maximising DeFi
          returns.
        </Subtitle>
        <CallToAction>Unlock the potential of DeFi.</CallToAction>
      </div>
      <ButtonContainer>
        <CustomButtonLeft href="https://zk-alpha-frontend.vercel.app/strategies">
          {"I'm an investor"}
        </CustomButtonLeft>
        <CustomButtonRight href="https://zk-alpha-frontend.vercel.app/trader">
          {"I'm a trader"}
        </CustomButtonRight>
      </ButtonContainer>
    </FlexContainer>
  </Main>
);
