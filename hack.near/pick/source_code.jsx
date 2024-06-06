const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 70vh;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 12px;
`;

const TeamButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: ${(props) =>
    props.isSelected ? "3px 5px 8px rgba(0, 0, 0.3, 0.3)" : "none"};
  padding: 15px;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.isSelected ? "#388e3c" : "#000")};
  margin: 23px;
  font-family: Courier, sans-serif;

  &:hover {
    box-shadow: 3px 5px 8px rgba(0, 0, 0.3, 0.3);
  }
`;

const SubmitButton = styled.button`
  background-color: #388e3c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: Courier, sans-serif;
  transition: all 0.3s;

  &:hover {
    background-color: #2e7d32;
  }
`;

const TeamImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const [selectedTeam, setSelectedTeam] = useState(null);

const handleTeamSelect = (team) => {
  setSelectedTeam(team);
};

const pickData = {
  challenge: {
    name: "T20 World Cup",
    year: "2024",
    rounds: {
      round0: {
        match1: {
          pick: selectedTeam,
        },
      },
    },
  },
};

const handleSubmit = () => {
  Social.set(pickData);
};

return (
  <Container>
    <a href="https://www.icc-cricket.com/tournaments/t20cricketworldcup">
      <img
        style={{ width: "200px" }}
        className="mt-5"
        src="https://builders.mypinata.cloud/ipfs/QmRQT2q6YbfVQSpgCbsfs1WTpk4LMey8FVHDKkWFToyspB"
      />
    </a>
    <Section>
      <TeamButton
        isSelected={selectedTeam === "Pakistan"}
        onClick={() => handleTeamSelect("Pakistan")}
      >
        <TeamImage
          src="https://builders.mypinata.cloud/ipfs/QmbbsDP34mKKP42WHgJwBSnMVvWnj9JiV9wJ3JyiVxsdEN"
          alt="Pakistan Cricket Team Logo"
        />
        <div style={{ textAlign: "center" }}>
          <b>Pakistan</b>
        </div>
      </TeamButton>
      <TeamButton
        isSelected={selectedTeam === "India"}
        onClick={() => handleTeamSelect("India")}
      >
        <TeamImage
          src="https://builders.mypinata.cloud/ipfs/QmWiHPLeP2LTxT9hNham3XhWNPT13n2YviPZK8YPKYyAzu"
          alt="India Cricket Team Logo"
        />
        <div style={{ textAlign: "center" }}>
          <b>India</b>
        </div>
      </TeamButton>
    </Section>
    <Section>
      <div className="d-flex flex-column align-items-center justify-content-center">
        {context.accountId && (
          <SubmitButton onClick={handleSubmit}>Make Your Pick</SubmitButton>
        )}
        <div className="ms-3">
          <Widget
            src="hack.near/widget/timer"
            props={{
              startTime: 1717574582000,
              endTime: 1717943400000,
            }}
          />
        </div>
      </div>
    </Section>
  </Container>
);
