const widget_owner_id = "nearukraineguild.near";

const OuterWrapper = styled.div`
 height: 100vh; /* Встановлення повноекранної висоти */
font-size: 16px;
`;

const Text = styled.div`
  position: absolute; /* Абсолютне позиціонування */
  top: 15%; /* Встановлення відступу від верхнього краю на 50% від висоти екрану */
  left: 50%; /* Встановлення відступу від лівого краю на 50% від ширини екрану */
  transform: translate(-50%, -50%); /* Трансформація для центрування */
  color: #ffffff;
  font-family: 'Kodchasan', sans-serif;
  margin: 20px; 
  font-size: 3vw;
`;

const Social = styled.div`
  position: absolute; /* Абсолютне позиціонування */
  bottom: 0; /* Встановлення відступу від нижнього краю на 0 */
  left: 50%; /* Поміщаємо блок посередині */
  transform: translateX(-50%); /* Трансформація для центрування по горизонталі */
`;

const Tittle = styled.div`
  position: absolute; /* Абсолютне позиціонування */
  top: 15%; /* Встановлення відступу від верхнього краю на 50% від висоти екрану */
  left: 50%; /* Встановлення відступу від лівого краю на 50% від ширини екрану */
  transform: translate(-50%, -50%); /* Трансформація для центрування */
  color: #ffffff;
  font-family: 'Kodchasan', sans-serif;
  margin: 20px; 
`;

const Wrapper = styled.div`
  position: absolute; /* Абсолютне позиціонування */
  top: 50%; /* Встановлення відступу від верхнього краю на 50% від висоти екрану */
  left: 50%; /* Встановлення відступу від лівого краю на 50% від ширини екрану */
  transform: translate(-50%, -50%); /* Трансформація для центрування */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 600px; /* Ширина контейнера вмісту */
  margin: 20px; /* Додано поля */
  padding: 20px; /* Додано внутрішні відступи */
  background: linear-gradient(135deg, #0e121e, #1a1f2e); /* Доданий фон */
  color: #ffffff;
  font-family: 'Kodchasan', sans-serif;
  border: 2px solid white;
  border-radius: 10px; /* Заокруглені кути */
`;

const Button = styled.button`
  font-size: 18px;
  margin: 10px;
  padding: 15px 25px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #203343;
  color: #ffffff;
  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5c91df;
  }
`;

const ResultText = styled.p`
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
`;

const Star = styled.span`
  color: #ffd700;
`;

const choices = ["rock", "paper", "scissors"];

const randomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (user, computer) => {
  if (user === computer) return "It's a tie!";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
};

const [userChoice, setUserChoice] = useState(null);
const [computerChoice, setComputerChoice] = useState(null);
const [result, setResult] = useState(null);

const handleClick = (choice) => {
  setUserChoice(choice);
  const computerChoice = randomChoice();
  setComputerChoice(computerChoice);
  setResult(determineWinner(choice, computerChoice));
};

return (
  <OuterWrapper>
    <Widget
      src={`${widget_owner_id}/widget/MysteryBox.Manage.Components.MenuHeader`}
    />
    <Tittle>
      <h1>Rock Paper Scissors</h1>
    </Tittle>
    <Wrapper>
      <div>
        <Button onClick={() => handleClick("rock")}>Rock</Button>
        <Button onClick={() => handleClick("paper")}>Paper</Button>
        <Button onClick={() => handleClick("scissors")}>Scissors</Button>
      </div>
      {userChoice && computerChoice && result && (
        <ResultText>
          <span>Your choice: {userChoice}</span>
          <span>/</span>
          <span>Computer's choice: {computerChoice}</span>
          <br />
          <span></span>
          <br />
          Result: {result}
        </ResultText>
      )}
    </Wrapper>
    <Widget
      src={`${widget_owner_id}/widget/MysteryBox.Components.BackgroundStars`}
    />
    <Social>
      <Widget
        src={`${widget_owner_id}/widget/MysteryBox.Manage.Components.Socials`}
      />
    </Social>
  </OuterWrapper>
);
