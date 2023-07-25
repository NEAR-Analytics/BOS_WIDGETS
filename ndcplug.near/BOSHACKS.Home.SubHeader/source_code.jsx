const ownerId = "ndcplug.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 3.5em 3.5em 4.5em;
  gap: 3em;
  background: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 45%;
  gap: 2em;
  padding: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 1.625em;
    line-height: 1.5em;
    color: #000000;
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 0.9em;
    line-height: 1.25em;
    color: #000000;
  }

  ul {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.25em;
    color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    list-style-position: outside;
    padding-left: 1em;
    gap: 0.5em;
  }
`;

const Visual = styled.div`
  width: 55%;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3em;
  margin-top: 2em;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 1em;
    width: 60%;
    margin: 0 auto;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const visual = "bafkreifvatnpked4a364btyyyjmn46jngd44msyjyml5ik2qyvbop55msu";
const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <Text>
      <h2>Learn, build, win</h2>

      <p>Win prizes for shipping on BOS.</p>
      <ul>
        <li>Join 200+ builders shipping on BOS</li>
        <li>
          Learn via Build DAO Daily office hours and our 24/7 mentor support
        </li>
        <li>Win $10,000 in prizes</li>
      </ul>
      <ButtonContainer>
        <Widget src={`${ownerId}/widget/BOSHACKS.Register.Button`} />
        <Widget src={`${ownerId}/widget/BOSHACKS.Home.SpeakerButton`} />
      </ButtonContainer>
    </Text>
    <Visual>
      <img
        src={mapImage(visual)}
        alt="NEARCON Day 3 Layer 1 Stage Evolving NEAR Ecosystem Governence"
      />
    </Visual>
  </Container>
);
