const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const LeftCardImg =
  "https://ipfs.near.social/ipfs/bafkreif3muxalp4mkfqqbrm7urmsohx645ok6e7t544gj6dt2ys7f7fhpm";
const RightCardImg =
  "https://ipfs.near.social/ipfs/bafybeigjgor7pm2ekq3dpfytf2uz2mdwmh3m5bhkmhvcyghtq5a2nzgzte";
const MainContainer = styled.div`
  /* padding: 48px 72px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 2rem;
  margin: 0 3rem;
  @media screen and (max-width: 768px) {
    /* grid-template-columns: repeat(1, minmax(0, 1fr)); */
  }
`;
const LeftCard = styled.div`
  background-image: url(${LeftCardImg});
  background: linear-gradient(180deg, #774441 0%, #473608 100%);
  grid-column: span 6 / span 6;
  background-size: cover;
  border-radius: 24px;
  padding: 48px;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 32px;
  h3 {
    color: #fff;
    font-family: Poppins;
    font-size: 48px;
    font-weight: 500;
    line-height: 120%; /* 57.6px */
    letter-spacing: -1.92px;
    margin: 0;
  }
  p {
    color: var(--Yellow, rgba(255, 175, 81, 1));
    font-family: Poppins;
    font-size: 20px;
    margin: 0;
  }
  button {
    width: max-content;
    background: rgba(255, 255, 255, 0.2);
  }
  @media screen and (max-width: 1025px) {
    h3 {
      font-size: 38px;
    }
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 500px) {
    background-size: cover;
    padding: 16px;
    gap: 18px;
    h3 {
      font-size: 26px;
    }
    p {
      font-size: 12px;
    }
  }
`;
const RightCard = styled.div`
  background-image: url(${RightCardImg});
  background: rgba(45, 134, 128, 0.92);
  background-size: cover;
  border-radius: 24px;
  grid-column: span 6 / span 6;
  padding: 48px;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 32px;
  h3 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 48px;
    font-weight: 500;
    line-height: 120%; /* 57.6px */
    letter-spacing: -1.92px;
    margin: 0;
  }
  p {
    color: var(--A0A0A0, #a0a0a0);
    font-family: Poppins;
    font-size: 20px;
    margin: 0;
  }
  button {
    width: max-content;
  }
  @media screen and (max-width: 1025px) {
    h3 {
      font-size: 38px;
    }
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 500px) {
    background-size: cover;
    padding: 16px;
    gap: 18px;
    h3 {
      font-size: 26px;
    }
    p {
      font-size: 12px;
    }
  }
`;
const Cards = () => {
  return (
    <MainContainer>
      <h3>
        Let's grow <span>Together</span>
      </h3>
      <Container>
        <LeftCard>
          <h3>Earn Yield</h3>
          <p>
            Join the roster of paid contributors and coordinate with fellow
            builders to get involved.
          </p>
          <Button>Invest here</Button>
        </LeftCard>
        <RightCard>
          <h3>Ask the Commons</h3>
          <p>
            We are here to listen, support, and bring projects to life! Ask
            questions and share updates.
          </p>
          <Button variant="primary">Collect Here</Button>
        </RightCard>
      </Container>
    </MainContainer>
  );
};
return { Cards };
