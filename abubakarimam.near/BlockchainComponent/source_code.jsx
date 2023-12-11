const BlockchainSectionWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 50px 0;
  text-align: center;
`;

const BlockchainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #4caf50;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  margin-bottom: 15px;
`;

return (
  <BlockchainSectionWrapper>
    <BlockchainContent>
      <Title>The Power of Blockchain: Near Ecosystem</Title>
      <Paragraph>
        Blockchain technology, particularly Near Protocol, plays a crucial role
        in transforming our waste disposal ecosystem. Here's why it matters:
      </Paragraph>
      <Paragraph>
        <strong>Transparency:</strong> Near's blockchain ensures transparent and
        traceable waste disposal transactions. Every step of the process, from
        waste submission to rewards distribution, is recorded on an immutable
        ledger, fostering trust and accountability.
      </Paragraph>
      <Paragraph>
        <strong>Security:</strong> Near Protocol provides a secure and
        tamper-resistant environment. This level of security safeguards user
        data, prevents fraudulent activities, and ensures the integrity of the
        reward distribution system.
      </Paragraph>
      <Paragraph>
        <strong>Decentralization:</strong> Near's decentralized nature
        eliminates the need for a central authority, distributing control and
        decision-making power. This results in a fair and inclusive waste
        management platform, where participants actively contribute to the
        ecosystem's growth.
      </Paragraph>
      <Paragraph>
        <strong>Efficiency:</strong> Near's blockchain enables quick and
        efficient transactions, reducing the time and resources required for
        waste disposal and reward distribution. This efficiency makes the
        platform more accessible and user-friendly.
      </Paragraph>
    </BlockchainContent>
  </BlockchainSectionWrapper>
);
