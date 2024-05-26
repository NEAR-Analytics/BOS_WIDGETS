const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 48px;
`;
const Matric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: 0.7;
  h2 {
    font-family: Poppins;
    font-size: 48px;
    font-weight: 300;
    line-height: 57.6px;
    letter-spacing: -0.04em;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    margin: 0;
  }
  p {
    font-family: Poppins;
    font-size: 89px;
    font-weight: 600;
    line-height: 106.8px;
    letter-spacing: -0.04em;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    gap: 0;
    margin-top: 0 !important;
    margin-right: 0 !important;
    h2 {
      font-size: 32px;
    }
    p {
      font-size: 56px;
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 99px;
  justify-content: flex-start;
  h3 {
    font-family: Poppins;
    font-size: 72px;
    font-weight: 500;
    line-height: 86.4px;
    letter-spacing: -0.04em;
    text-align: left;
    color: #fff;
    margin: 0;
    span {
      color: #eca227;
    }
  }
  p {
    font-family: Poppins;
    font-size: 42px;
    font-weight: 400;
    line-height: 58.8px;
    text-align: left;
    margin: 0;
    color: rgba(160, 160, 160, 1);
  }
  @media screen and (max-width: 768px) {
    margin: 0;
    h3 {
      font-size: 48px;
      align-self: center;
      span {
        font-size: 48px;
      }
    }
    p {
      line-height: 36px;
      font-size: 28px;
    }
  }
`;
const Exosystem = () => {
  return (
    <Container>
      <Content>
        <h3>
          Connecting <span>the exosystem</span>
        </h3>
        <p>
          A Resource Innovation initiative focused on welcoming future-ready
          organizations into programs and protocols that accellerate growth
          internally and globally
        </p>
      </Content>
      <Matric
        style={{
          alignItems: "flex-end",
          marginTop: "50px",
          marginRight: "100px",
        }}
      >
        <h2>Builders</h2>
        <p>+70</p>
      </Matric>
    </Container>
  );
};
return { Exosystem };
