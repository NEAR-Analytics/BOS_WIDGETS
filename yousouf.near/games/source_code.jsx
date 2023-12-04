const accountId = context.accountId;
const DevId = props.DevId ?? "yousouf.near";
const [selectedGame, setSelectedGame] = useState(null);

// Function to handle button click
const handleButtonClick = (game) => {
  setSelectedGame(game);
};

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}
const Container = styled.div`
  display: flex;
  max-width: 90%;
  border-radius:8px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #1a1a1a; 

  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 85px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffe; 
  max-width: 700px;

  span {
    display: inline-block;
    background: #62C6F2;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;
    max-width: 500px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    font-size: 50px;
    max-width: 80%;
    line-height: 1.2;

    span {
      border-radius: 10px;
      svg {
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 15px;
      }
    }
  }
`;

const Text = styled.p`
  align-items: center,
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#fff"}; /* White text color */
  margin: 15;
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }
  }
`;

const GameButton = styled.button`
  background-color: #333; 
  color: #ffe; 
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  margin: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

  &:hover {
    background-color: #555; 
  }
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};
`;

const Title = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 70px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffe; 
  max-width: 700px;

  span {
    display: inline-block;
    background: #62C6F2;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;
    max-width: 500px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    font-size: 50px;
    max-width: 80%;
    line-height: 1.2;

    span {
      border-radius: 10px;
      svg {
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 15px;
      }
    }
  }
`;

return (
  <Container center>
    <br />
    <Flex
      gap="23px"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Title>Game Gallery 🎲</Title>

      {!accountId ? (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://near.org/signup",
            label: "Create Account",
            variant: "outline-dark",
            size: "large",
          }}
        />
      ) : (
        <div>
          {!profile ? (
            <Flex gap="12px" direction="column" alignItems="center">
              <Widget src="hack.near/widget/pro.editor" />
            </Flex>
          ) : (
            <Flex gap="8px" direction="column" alignItems="center">
              <div
                style={{
                  maxWidth: "75%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h6
                  style={{
                    marginRight: "2px",
                    color: "#ffe",
                    textAlign: "center",
                  }}
                >
                  Connected Account :
                </h6>
                <Widget
                  src="near/widget/AccountProfileCard"
                  props={{
                    accountId: accountId,
                  }}
                />
              </div>

              <br />
              <Text
                size="23px"
                weight="555"
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                Games
                <hr />
              </Text>

              <Flex gap="12px">
                <GameButton onClick={() => handleButtonClick("tic-tac-toe")}>
                  <span
                    role="img"
                    aria-label="Tic-Tac-Toe"
                    style={{ fontSize: "96px" }}
                  >
                    🎮
                  </span>
                </GameButton>
                <GameButton onClick={() => handleButtonClick("rps")}>
                  <span
                    role="img"
                    aria-label="Rock-Paper-Scissors"
                    style={{ fontSize: "96px" }}
                  >
                    ✊✋✌️
                  </span>
                </GameButton>
                <GameButton onClick={() => handleButtonClick("crossword")}>
                  <span
                    role="img"
                    aria-label="Word Guessing Game"
                    style={{ fontSize: "96px" }}
                  >
                    🧩
                  </span>
                </GameButton>
              </Flex>

              {/* Render selected game widget */}
              {selectedGame === null ? (
                <p>Click to start</p>
              ) : (
                <Widget src={`yousouf.near/widget/${selectedGame}`} />
              )}
            </Flex>
          )}
          <hr />
          <GameButton onClick={() => alert("coming soon")}>
            <h4>Claim NFT 🎭</h4>
          </GameButton>
        </div>
      )}
    </Flex>
  </Container>
);
