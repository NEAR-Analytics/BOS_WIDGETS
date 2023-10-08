const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: radial-gradient(circle farthest-side at -15% 85%, #0A0E23, #630B57, #3B0D42);
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
  margin-top: 5rem;
  color: #FFFFFF;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(200, 200, 200);
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
  height: auto;
  max-width: 48rem;
  width: 92%;
  backdrop-filter: blur(20px);
  background-color: rgba(25, 25, 30, 0.9);
  padding: 2rem;
  gap: 16px;
`;

const ButtonStyle = styled.div`
    color: #630B57;
    border: 2px solid #630B57;
    border-radius: 6px;
    padding: 7px;

    &:hover {
        color: white;
        background-color: #630B57;
        cursor: pointer;
    }
`;

const Home = ({ fn, cb }) => {
  return (
    <Container>
      <div className="px-2">
        <Title>BlockGala 🎟️</Title>
        <Subtitle>
          Subscriptions Like You've Never Experienced. Really.
        </Subtitle>
      </div>
      <StyledDiv>
        <Web3Connect connectLabel="Connect with wallet" />
        <ButtonStyle onClick={() => fn()}>Launch App</ButtonStyle>
        <Widget
          src="c5d50293c3a3ed146051462e6e02e469acda10b517bfffeb3d34652076f0cb7c/widget/ArtheraInput"
          props={{
            fn: cb,
          }}
        />
      </StyledDiv>
    </Container>
  );
};

return <Home {...props} />;
