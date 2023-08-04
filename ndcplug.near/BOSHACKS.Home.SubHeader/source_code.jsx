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

      <p>
        Win over $15,000 in prizes for shipping decentralized frontends and
        on-chain components.
      </p>
      <ul>
        <li>
          Learn everything you need to build fully decentralized frontends and
          multi-chain applications all in JavaScrip
        </li>
        <li>
          Receive mentorship from top BOS builders via daily office hours and
          24/7 chat Telegram support
        </li>
        <li>
          General: Build anything you want on BOS for the chance to win general
          prizes.
        </li>
      </ul>
      <ButtonContainer>
        <Widget src={`${ownerId}/widget/BOSHACKS.Register.Button`} />
      </ButtonContainer>
    </Text>
    {false && (
      <Visual>
        <img src={mapImage(visual)} alt="Illia Talking" />
      </Visual>
    )}

    <Text>
      <p>Builder Tracks Include</p>
      <ul>
        <li>
          📱 Social & NFTs: Integrate digital assets, ship integrations with
          other social networks, build better discovery tools, and streamline
          user onboarding experiences
        </li>
        <li>
          🏛️ Impact & Governance: build composable regenerative and
          decentralized governance systems{" "}
        </li>
        <li>
          ⛓️ Multichain & DeFi: Leverage multichain integrations & rebuild the
          frontends of top DeFi apps on BOS and connect them to their original
          contracts on any EVM chain.
        </li>
        <li>
          🛠️ Dev Experience: Enhance the BOS developer experience by building
          tools that make it faster, cheaper, and more straightforward to ship
          on-chain components on Near and Ethereum
        </li>
        <li>
          Check out a list of project ideas
          <a href="https://nearbuilders.com/bounty" target="_blank">
            here
          </a>
        </li>
      </ul>
      {false && (
        <ButtonContainer>
          <Widget src={`${ownerId}/widget/BOSHACKS.Home.SpeakerButton`} />
        </ButtonContainer>
      )}
    </Text>

    {false && (
      <Visual>
        <img src={mapImage(visual)} alt="Illia Talking" />
      </Visual>
    )}
  </Container>
);
