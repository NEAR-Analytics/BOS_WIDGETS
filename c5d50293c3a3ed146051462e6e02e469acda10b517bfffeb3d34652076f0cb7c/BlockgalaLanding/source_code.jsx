const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: radial-gradient(circle farthest-side at -15% 85%, rgba(90, 122, 255, .36), rgba(0, 0, 0, 0) 42%),
              radial-gradient(circle farthest-side at 100% 30%, rgba(245, 40, 145, 0.25), rgba(0, 0, 0, 0) 60%);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-align: center;
  margin-top: 5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(156, 163, 175);
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  max-width: 48rem;
  width: 92%;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 2rem;
`;

const Home = () => {
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
      </StyledDiv>
    </Container>
  );
};

return <Home {...props} />;
