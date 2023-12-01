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

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 85px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
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
  color: ${(p) => p.color ?? "#000"};
  margin: 15;
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }
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

const Container = styled.div`
  display: flex;
  max-width: 80%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;

  @media (max-width: 480px) {
    max-width: 80%;
  }
`;

return (
  <Container center>
    <Flex
      gap="23px"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <H1>Game Gallery on BOS</H1>

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
            <Flex gap="12px" direction="column" alignItems="left">
              <div style={{ maxWidth: "90%" }}>
                <Widget
                  src="near/widget/AccountProfileCard"
                  props={{
                    accountId: accountId,
                  }}
                />
                <hr />
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
              </Text>

              {/* Buttons for each game */}
              <Flex gap="12px">
                <button onClick={() => handleButtonClick("tic-tac-toe")}>
                  ✖️ 🔘 ✖️ 🔘 ✖️ 🔘 ✖️ ✖️ ✖️ 🔘 🔘 ✖️ ✖️ 🔘 ✖️ 🔘 ✖️ ✖️ 🔘 🔘 ✖️
                  🔘 ✖️ 🔘
                </button>
                <button onClick={() => handleButtonClick("rps")}>💖</button>
                <button onClick={() => handleButtonClick("crossword")}>
                  ⭐
                </button>
              </Flex>

              {/* Render selected game widget */}
              {selectedGame === null ? (
                <p>Click to start</p>
              ) : (
                <Widget src={`yousouf.near/widget/${selectedGame}`} />
              )}
            </Flex>
          )}
        </div>
      )}
    </Flex>
  </Container>
);
