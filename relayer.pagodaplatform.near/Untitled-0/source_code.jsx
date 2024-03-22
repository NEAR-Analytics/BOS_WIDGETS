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
`;

const ContainerBox = styled.div`
  position: absolute;
  display: flex;
  top: 10%;
  left: 20%;
  flex-wrap: wrap;
  height: 100%;
  width: 80%;
  padding: 20px; /* Додано більші відступи */
  overflow: auto;
`;

const Square = styled.div`
  width: 30vw; /* Змінено розмір на 150px */
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
  overflow: hidden; /* Приховує вміст, який виходить за межі */
  
transition: transform 0.3s ease; /* Додано перехід для плавного збільшення */
  
  &:hover {
    transform: scale(1.2); /* Збільшення у два рази при наведенні */
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

  font-size: 4vh;

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
                d="M10.885 7.246a.468.468 0 0 0-.468.468v8.853a.469.469 0 0 0 .937 0V7.714a.468.468 0 0 0-.469-.468Zm-5.526 0a.468.468 0 0 0-.468.468v8.853a.469.469 0 0 0 .936 0V7.714a.468.468 0 0 0-.468-.468Z"
                fill="#8DBFEA"
              />
              <path
                d="M1.33 5.954v11.54c0 .682.25 1.323.687 1.782.435.461 1.04.723 1.674.724h8.862a2.306 2.306 0 0 0 1.673-.724c.437-.46.687-1.1.687-1.782V5.954a1.79 1.79 0 0 0-.459-3.518h-2.398V1.85A1.84 1.84 0 0 0 10.201 0H6.042a1.84 1.84 0 0 0-1.855 1.85v.586H1.79a1.79 1.79 0 0 0-.459 3.518Zm11.223 13.11H3.69c-.801 0-1.424-.689-1.424-1.57V5.995h11.71v11.5c0 .88-.623 1.568-1.424 1.568ZM5.124 1.85a.902.902 0 0 1 .918-.913h4.16a.902.902 0 0 1 .918.913v.586H5.123V1.85ZM1.79 3.372h12.665a.843.843 0 1 1 0 1.687H1.79a.843.843 0 1 1 0-1.687Z"
                fill="#8DBFEA"
              />
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
