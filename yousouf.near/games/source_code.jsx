const accountId = context.accountId;
const DevId = props.DevId ?? "yousouf.near";
const [selectedGame, setSelectedGame] = useState(null);
const [hoveredGame, setHoveredGame] = useState(null);

const handleButtonClick = (game) => {
  setSelectedGame(game);
  setHoveredGame(null);
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius : 25px;
  padding: 2px;
  background-color: #1a1a1a;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: calc(50px + 2vw);
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffe;
  max-width: 700px;

  @media (max-width: 900px) {
    font-size: calc(40px + 1.5vw);
    max-width: 500px;
  }

  @media (max-width: 480px) {
    font-size: calc(30px + 1vw);
    max-width: 80%;
  }

  span {
    display: inline-block;
    background: #62C6F2;
    border-radius: 20px;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }
`;

const Text = styled.p`
  align-items: center;
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "16px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#fff"}; /* White text color */
  margin: 15px;

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }
  }

  .game-name {
    color: #62C6F2;
    font-weight: bold;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin: 10px;
  }
`;

const GameButton = styled.button`
  background-color: #333;
  color: #ffe;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  width : 220px;
  cursor: pointer;
  border-radius: 8px;
  margin: 5px;
  box-shadow: 0  4px 6px rgba(0, 0, 0, 0.1); 

transition : transform 0.3s ease-in-out;
    &:hover {
      background-color: #555;
      color: #ffe;
      transform: scale(1.1);
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
   @media (max-width: 768px) {
        font-size: 40px;
    }

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
      <Title>Game Gallery 🎲 🎮</Title>

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

              <Flex
                gap="12px"
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <GameButton onClick={() => handleButtonClick("tic-tac-toe")}>
                  <span
                    role="img"
                    aria-label="Tic-Tac-Toe"
                    style={{ fontSize: "18px" }}
                  >
                    Tic-Tac-Toe
                    <img
                      style={{ width: "200px", height: "150px" }}
                      src="https://res-console.cloudinary.com/dundn5oa3/media_explorer_thumbnails/aa16804de8a268d8cf530c7082f24c8c/detailed"
                    />
                  </span>
                  {hoveredGame === "Tic-Tac-Toe" && (
                    <span className="game-name">Tic-Tac-Toe</span>
                  )}
                </GameButton>

                <GameButton onClick={() => handleButtonClick("rps")}>
                  <span
                    role="img"
                    aria-label="Rock, Paper, Scissors"
                    style={{ fontSize: "18px" }}
                  >
                    Rock, Paper, Scissors
                    <img
                      style={{ width: "200px", height: "150px" }}
                      src="https://res-console.cloudinary.com/dundn5oa3/media_explorer_thumbnails/e7567c86686a4b95433fa274681fe3c5/detailed"
                    />
                  </span>
                  {hoveredGame === "Rock, Paper, Scissors" && (
                    <span className="game-name">Rock, Paper, Scissors</span>
                  )}
                </GameButton>

                <GameButton onClick={() => handleButtonClick("crossword")}>
                  <span
                    role="img"
                    aria-label="Word Guessing game"
                    style={{ fontSize: "18px" }}
                  >
                    Word Guessing game
                    <img
                      style={{ width: "200px", height: "150px" }}
                      src="https://res-console.cloudinary.com/dundn5oa3/media_explorer_thumbnails/43aa275f9fbd5e093c02ca4d1da1ae73/detailed"
                    />
                  </span>
                  {hoveredGame === "Word Guessing game" && (
                    <span className="game-name">Word Guessing game</span>
                  )}
                </GameButton>
                <GameButton onClick={() => handleButtonClick("card")}>
                  <span
                    role="img"
                    aria-label="Card Matching"
                    style={{ fontSize: "18px" }}
                  >
                    Card Matching Game
                    <img
                      style={{ width: "200px", height: "150px" }}
                      src="https://res-console.cloudinary.com/dundn5oa3/media_explorer_thumbnails/23f6d9ed090213f3f09a5ece0affdfa4/detailed"
                    />
                  </span>
                  {hoveredGame === "Card Matching" && (
                    <span className="game-name">Card Matching</span>
                  )}
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
        </div>
      )}
    </Flex>
  </Container>
);
