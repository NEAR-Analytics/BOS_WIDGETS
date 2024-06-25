const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 72px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  h3 {
    color: #fff;
    font-family: Poppins;
    font-size: 72px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 86.4px */
    letter-spacing: -2.88px;
    span {
      background: linear-gradient(87deg, #eca227 39.02%, #fc8119 108.97%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: Poppins;
      font-size: 72px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -2.88px;
    }
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 48px;
      span {
        font-size: 48px;
      }
    }
  }
`;
const Container = styled.div`
  position: relative;
  border-radius: 50px;
  border: 5px solid #000;
  opacity: 0.71;
  background: linear-gradient(
      0deg,
      rgba(96, 36, 133, 0.09) 0%,
      rgba(96, 36, 133, 0.09) 100%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
    linear-gradient(
      178deg,
      rgba(0, 0, 0, 0) 25.86%,
      rgba(0, 0, 0, 0.52) 101.16%
    ),
    rgba(115, 168, 107, 0.74);
`;
const Content = styled.div`
  padding: 20px;
  opacity: 0.7;
  p {
    color: #eaeaea;
    font-family: Poppins;
    font-size: 46px;
    font-style: normal;
    font-weight: 400;
    line-height: 72px; /* 156.522% */
    letter-spacing: -0.92px;
  }
  @media screen and (max-width: 768px) {
    p {
      font-size: 20px;
      line-height: 30px;
    }
    button {
      display: block;
    }
  }
`;
const ContainerButton = styled.div`
  position: absolute;
  right: 60px;
  bottom: 40px;
`;
const Impact = () => {
  return (
    <MainContainer>
      <h3>
        Expand <span>Your Impact</span>
      </h3>
      <Container>
        <Content>
          <p>
            Cooperative efforts can address global challenges and contribute to
            widespread positive change.
          </p>
          <Button>Start Now</Button>
        </Content>
      </Container>
    </MainContainer>
  );
};
return { Impact };
