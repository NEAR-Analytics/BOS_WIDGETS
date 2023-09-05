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
  finish: false,
  playerChoice: null,
  computerChoice: null,
  roundsWonByPlayer: 0,
  roundsWonByCPU: 0,
  currentRound: 1,
});

const playGame = (userChoice) => {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  if (userChoice === computerChoice) {
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    State.update({
      roundsWonByPlayer: state.roundsWonByPlayer + 1,
    });
  } else {
    State.update({
      roundsWonByPlayer: state.roundsWonByCPU + 1,
    });
  }

  State.update({
    computerChoice: computerChoice,
    playerChoice: userChoice,
  });

  if (state.currentRound + 1 <= 3) {
    setTimeout(() => {
      State.update({
        playerChoice: null,
        computerChoice: null,
        currentRound: state.currentRound + 1,
      });
    }, "1500");
  } else {
    setTimeout(() => {
      State.update({
        finish: true,
      });
    }, "1500");
    setTimeout(() => {
      State.update({
        finish: false,
        playerChoice: null,
        computerChoice: null,
        roundsWonByPlayer: 0,
        roundsWonByCPU: 0,
        currentRound: 1,
      });
    }, "4000");
  }
};

const getComputerChoiceImg = (option) => {
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
      width: "370px",
      marginInline: "auto",
      display: "flex",
      justifyContent: "center",
      height: "308px",
      backgroundImage:
        "url(https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/gameboyverde.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "370px",
      backgroundPosition: "top",
    }}
  >
    <div style={{ textAlign: "center" }}>
      {!state.finish && state.playerChoice && (
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
                    opacity: "0.8",
                  }}
                  src={getComputerChoiceImg(state.computerChoice)}
                />
              </div>
              <div class="col-12">
                <img
                  style={{ height: "50px", opacity: "0.8" }}
                  src={getComputerChoiceImg(state.playerChoice)}
                />
              </div>
              <div class="col-12">
                <p>Player</p>
              </div>
            </div>
          </Container>
          <div
            class="col-12"
            style={{
              marginTop: "-15px",
              fontSize: "9px",
              color: "white",
            }}
          >
            <p>Round: {state.currentRound}</p>
          </div>
        </>
      )}
      {!state.finish && !state.playerChoice && (
        <>
          <Container>
            <p>Choose an option</p>
            <Choice onClick={() => playGame("rock")}>
              <img
                style={{ height: "50px", opacity: "0.8" }}
                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/piedra.png"
              />
            </Choice>
            <Choice onClick={() => playGame("paper")}>
              <img
                style={{ height: "50px", opacity: "0.8" }}
                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/papel.png"
              />
            </Choice>
            <Choice onClick={() => playGame("scissors")}>
              <img
                style={{ height: "50px", opacity: "0.8" }}
                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/tijera.png"
              />
            </Choice>
          </Container>
          <div
            class="col-12"
            style={{
              marginTop: "25px",
              fontSize: "9px",
              color: "white",
            }}
          >
            <p>Round: {state.currentRound}</p>
          </div>
        </>
      )}
      {state.finish && (
        <>
          <Container>
            <p>Player: {state.roundsWonByPlayer} wins</p>
            <p>CPU: {state.roundsWonByCPU} wins</p>
            <p style={{ fontWeight: "bold" }}>
              {state.roundsWonByPlayer > state.roundsWonByCPU
                ? "You Won!"
                : roundsWonByPlayer < roundsWonByComputer
                  ? "You Lost!"
                  : "It's a draw!"}
            </p>
          </Container>
        </>
      )}
    </div>
  </div>
);
