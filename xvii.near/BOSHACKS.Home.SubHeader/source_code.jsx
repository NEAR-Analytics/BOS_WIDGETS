const ownerId = "xvii.near";

const Title = styled.div`
padding: 3em;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding-left: 3.5em;
    padding-right: 3.5em;
    margin-bottom: 3em;
  gap: 3em;
  background: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
  .title {
    flex-direction: row;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 45%;
  gap: 0.5em;
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
  width: 5o%;
  border-radius: 20px;
  margin-left: 3em;

  img {
    width: 75%;
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
  <>
    <Title>
      <h2 className="title">Fun! Learn! Earn!</h2>
    </Title>
    <Container>
      <Text>
        <ul>
          <li>
            Explore Web3 Topics: Engaging weekly lectures on cutting-edge
            blockchain and decentralized technology.
          </li>
          <li>
            Connect with Experts: Learn from industry-leading guest lecturers
            during the course.
          </li>
          <li>
            Earn While You Learn: Opportunities to earn through various
            blockchain initiatives.
          </li>
        </ul>
        <p>Topics Include: </p>
        <ul>
          <li>🏆 Intro to Blockchain & NEAR Protocal</li>
          <li>📱 Data Retrival & Analysis</li>
          <li>🏛️ Data Transformation and Visualization</li>
          <li>⛓️ Governance, DeFi, NFT's, Gaming</li>
          <li>🛠️ Zero-Knowledge Proofs and More!</li>
        </ul>
        <p>
          {" "}
          Learn more
          <a href="https://hackmd.io/Jz4_FasRQGWdGGuifBU6Kw" target="_blank">
            here
          </a>
        </p>
        <ButtonContainer>
          <Widget src={`${ownerId}/widget/BOSHACKS.Register.Button`} />
        </ButtonContainer>
      </Text>
      {true && (
        <Visual>
          <img
            src="https://ipfs.near.social/ipfs/bafkreicea6j7t23wuakldwekrtjtdvcuikmnme3tsvbtixuhspeoe4mph4"
            alt="Illia Talking"
          />
        </Visual>
      )}
    </Container>
  </>
);
//hasch
