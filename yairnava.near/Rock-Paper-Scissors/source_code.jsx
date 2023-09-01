const Container = styled.div`
  text-align: center;
  margin-top: 100px
`;

const Choice = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 10px;
`;

State.init({
  result: null,
  playerChoice: null,
  computerChoice: null,
});

const playGame = (userChoice) => {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let gameResult = "";

  if (userChoice === computerChoice) {
    gameResult = "It's a draw!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    gameResult = "You Won!";
  } else {
    gameResult = "You Lost!";
  }

  State.update({
    result: gameResult,
    computerChoice: computerChoice,
    playerChoice: userChoice,
  });
};

const getComputerChoiceImg = (option) => {
  console.log(option);
  switch (option) {
    case "rock":
      return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/piedra.png";
    case "paper":
      return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/papel.png";
    case "scissors":
      return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/tijera.png";
  }
};

return (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: "308px",
      backgroundImage:
        "url(https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/gameboyverde.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "370px",
      backgroundPosition: "top",
    }}
  >
    <div style={{ textAlign: "center" }}>
      {state.result && (
        <>
          <Container>
            <div class="row" style={{ marginTop: "-25px" }}>
              <div class="col-12">
                <p>CPU</p>
              </div>
              <div class="col-12">
                <img
                  style={{
                    height: "50px",
                    transform: "rotate(180deg)",
                    marginTop: "-15px",
                    marginBottom: "10px",
                  }}
                  src={getComputerChoiceImg(state.computerChoice)}
                />
              </div>
              <div class="col-12">
                <img
                  style={{ height: "50px" }}
                  src={getComputerChoiceImg(state.playerChoice)}
                />
              </div>
              <div class="col-12">
                <p>Player</p>
              </div>
              <div class="col-12">
                <p>{state.result}</p>
              </div>
            </div>
          </Container>
          <button
            style={{ marginTop: "5px" }}
            className="btn bg-dark btn-sm text-white"
            onClick={() =>
              State.update({
                result: null,
                playerChoice: null,
                computerChoice: null,
              })
            }
          >
            Reset Game
          </button>
        </>
      )}
      {!state.result && (
        <>
          <Container>
            <p>Choose an option</p>
            <Choice onClick={() => playGame("rock")}>
              <img
                style={{ height: "50px" }}
                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/piedra.png"
              />
            </Choice>
            <Choice onClick={() => playGame("paper")}>
              <img
                style={{ height: "50px" }}
                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/papel.png"
              />
            </Choice>
            <Choice onClick={() => playGame("scissors")}>
              <img
                style={{ height: "50px" }}
                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/tijera.png"
              />
            </Choice>
          </Container>
          <button
            style={{ marginTop: "45px" }}
            className="btn bg-dark btn-sm text-white"
            onClick={() =>
              State.update({
                result: null,
                playerChoice: null,
                computerChoice: null,
              })
            }
          >
            Reset Game
          </button>
        </>
      )}
    </div>
  </div>
);
