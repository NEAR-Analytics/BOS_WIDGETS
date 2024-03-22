const widget_owner_id = "nearukraineguild.near";

// Код для віджету
const Widget = ({ src }) => {
  return <iframe src={src} title="Widget" />;
};

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

const ContainerNav = styled.div`
  position: absolute;
  display: flex;
  top: 10%;
  flex-wrap: wrap;
  height: 100%;
  width: 20%;
  padding: 20px;
  overflow: auto;
  flex-direction: column; 

  @media (max-width: 768px) {
    top: -60%;
    left: 5%;
    width: 100%;
    flex-direction: row; /* Рядок для елементів на мобільних пристроях */
    justify-content: space-between; /* Рівномірний розподіл простору між елементами */
  }
`;

const ContainerBox = styled.div`
  position: absolute;
  display: flex;
  top: 10%;
  left: 20%;
  flex-wrap: wrap;
  height: 100%;
  width: 80%;
  padding: 20px;
  overflow: auto;

  @media (max-width: 768px) {
    top: 70%;
    left: 5%;
    width: 100%;
    transform: translateY(-50%);
  }
`;

const Square = styled.div`
  width: 20vw; /* Змінено розмір на 150px */
  height: 40vh; /* Змінено розмір на 150px */
  margin: 40px; /* Збільшено відступи */
  padding: 20px;
  position: relative; /* Додано позиціонування */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s, height 0.3s; /* Анімація зміни розміру */
  border-radius: 20px; /* Заокруглення углів */
  box-shadow: 0 0 20px 5px rgba(255,255,255,0.7); /* Тінь */
  

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    width: 40vh; /* 90% ширини екрану на мобільних пристроях */
    height: 50vw; /* Автоматична висота для адаптації контенту */
    margin: 20px auto; /* Зменшуємо марджин */
  }
`;

const Number = styled.span`
  color: white;
`;

const NumberWords = ({ number }) => {
  const numberWords = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
  ];
  return <Number>{numberWords[number - 1]}</Number>;
};

const WidgetContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrimaryText = styled.p`
@media (min-width: 512px) {
    font-size: 28px;
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
  align-self: flex-end;

`;

const Navigation = styled.div`
  position: absolute;
  top: 10%;
  left: 5%; /* Встановлюємо відступ зліва */
  display: flex;
  flex-direction: column;
  gap: 20px; /* Відступ між елементами */
  z-index: 1; /* Забезпечуємо, що навігація буде над квадратами */
`;

const NavItem = styled.div`
  color: white;
  text-decoration: none;
  font-size: 18px;
  text-transform: uppercase;
  position: relative; /* Позиціонуємо для підкреслення */
  
  &:hover::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px; /* Змініть це значення, якщо вам потрібна інша товщина лінії */
    width: 100%;
    height: 2px; /* Товщина лінії */
    background-color: white;
  }
`;

const renderSquares = () => {
  const squares = [];
  for (let i = 1; i <= 12; i++) {
    if (i === 1) {
      // Додаємо віджет у перший квадрат
      squares.push(
        <Square key={i}>
          <WidgetContainer>
            <svg
              width="50%"
              height="60%"
              viewBox="0 0 17 20"
              fill="none"
              {...props}
            >
              <path
                d="M8.122 7.246a.468.468 0 0 0-.469.468v8.853a.468.468 0 0 0 .937 0V7.714a.468.468 0 0 0-.468-.468Z"
                fill="#8DBFEA"
              />
            </svg>
          </WidgetContainer>
          <PrimaryText>Delete Button</PrimaryText>
        </Square>
      );
    } else {
      // Додаємо інші квадрати з номерами
      squares.push(
        <Square key={i}>
          <NumberWords number={i} />
        </Square>
      );
    }
  }
  return squares;
};

return (
  <Container>
    <ContainerNav>
      <PrimaryText>
        <NavItem href="#">Головна</NavItem>
        <NavItem href="#">Контакти</NavItem>
        <NavItem href="#">Про нас</NavItem>
      </PrimaryText>
    </ContainerNav>
    <ContainerBox>{renderSquares()}</ContainerBox>

    <Widget
      src={`${widget_owner_id}/widget/MysteryBox.Components.BackgroundStars`}
    />
  </Container>
);
