const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 48px;
    width: 80%;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
`;

const Header = styled.h1`
  font-size: 24px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
  font-weight: 600;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};

  i {
    margin-right: 4px;
  }
`;

return (
  <Wrapper>
    <Header>AI Nexus Documentation</Header>
    <Text>
      To get started, the Create Agent button is all you need. A minimum agent
      has a name and a prompt, instructions to give context to a user's
      question. Launch your agent then you can being working with it.
    </Text>
    <Text>
      As a user using an agent you can choose from several models. The Near
      Llama 7b model service is available (but rate limited) to all users. Users
      with a a Groq or OpenAI API key can use those services as well. Users can
      also point to a model they are running locally.
    </Text>
    <Text>
      To build a custom agent UI, start by
      <Link
        to={
          "https://near.org/near/widget/ComponentDetailsPage?src=near/widget/AI.Agent.AgentChat"
        }
      >
        forking this component
      </Link>
    </Text>
  </Wrapper>
);
