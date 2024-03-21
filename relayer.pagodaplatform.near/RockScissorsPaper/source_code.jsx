const widget_owner_id = "nearukraineguild.near";

const OuterWrapper = styled.div`
radial-gradient(at center bottom, rgb(27, 39, 53) 0%, rgb(9, 10, 15) 100%);
 height: 100%;
 width: 110%;
 margin: -10%; /* Змінено з -20% на -20px для вирівнювання */
 padding: 0;
 border: 2px solid green;
`;

const Block = styled.div`
radial-gradient(at center bottom, rgb(27, 39, 53) 0%, rgb(9, 10, 15) 100%);
height: 100vh; /* Встановлюємо висоту на 100% висоти вікна */
width: 100vw; /* Встановлюємо ширину на 100% ширини вікна */
margin: 0;
border: 2px solid green;
padding: 0;
`;

const Text = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-family: 'Kodchasan', sans-serif;
  
  font-size: 3vw;
`;

const Social = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto; /* Вирівнює по центру по горизонталі */
  width: 90%;
  
  padding: 20px;
  color: #ffffff;
  font-family: 'Kodchasan', sans-serif;
  font-size: 3vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Вирівнює кнопки по центру по горизонталі */
  width: 100%; /* Розтягує контейнер на всю ширину */
  
`;

const Button = styled.button`
  font-size: 2vw;
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
  font-size: 2.5vw;
  text-align: center; 
`;

const PrimaryText = styled.p`
  @media (min-width: 512px) {
    font-size: 40px;
    width: 100%;
  }

  width: 100%;
  font-size: 20px;

  font-family: 'Kodchasan', sans-serif;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;

  padding: 0;
  margin: 0;

  white-space: pre-line;
`;

const choices = ["Камінь", "Бумага", "Ножиці"];

const randomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (user, computer) => {
  if (user === computer) return <ResultText>"Нічия!"</ResultText>;
  if (
    (user === "Камінь" && computer === "Ножиці") ||
    (user === "Бумага" && computer === "Камінь") ||
    (user === "Ножиці" && computer === "Бумага")
  ) {
    return <ResultText>"Ви виграли!"</ResultText>;
  } else {
    return <ResultText>"Ви програли!"</ResultText>;
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
  <Block>
    <OuterWrapper>
      <Widget
        src={`${widget_owner_id}/widget/MysteryBox.Manage.Components.MenuHeader`}
      />
      <Wrapper>
        <PrimaryText>
          <Widget
            src={`${widget_owner_id}/widget/MysteryBox.Manage.Components.PrimaryText`}
          />
          Камінь Ножиці Бумага
          <ButtonContainer>
            <Button onClick={() => handleClick("Камінь")}>Камінь</Button>
            <Button onClick={() => handleClick("Бумага")}>Бумага</Button>
            <Button onClick={() => handleClick("Ножиці")}>Ножиці</Button>
          </ButtonContainer>
          {userChoice && computerChoice && result && (
            <ResultText>
              Ви обрали: {userChoice} / Комп'ютор обрав: {computerChoice}
              <span></span>
              Результат: {result}
            </ResultText>
          )}
        </PrimaryText>
        <Social>
          <Widget
            src={`${widget_owner_id}/widget/MysteryBox.Manage.Components.Socials`}
          />
          <br />
        </Social>
      </Wrapper>
      <Widget
        src={`${widget_owner_id}/widget/MysteryBox.Components.BackgroundStars`}
      />
    </OuterWrapper>
  </Block>
);
