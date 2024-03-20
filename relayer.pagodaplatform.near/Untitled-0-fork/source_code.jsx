const widget_owner_id = "nearukraineguild.near";

const OuterWrapper = styled.div`
 height: 85vh;
`;

const Tittle = styled.div`
    position: sticky;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    background-color: #151718;
    z-index: 1000;
    padding: 12px;
`;

const Text = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-family: 'Kodchasan', sans-serif;
  margin: 20px; 
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
  height: 350px;
  width: 600px;
  margin: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #0e121e, #1a1f2e);
  color: #ffffff;
  font-family: 'Kodchasan', sans-serif;
  border: 2px solid white;
  border-radius: 10px;
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

const choices = ["Камінь", "Бумага", "Ножиці"];

const randomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (user, computer) => {
  if (user === computer) return <h2>"Нічия!"</h2>;
  if (
    (user === "Камінь" && computer === "Ножиці") ||
    (user === "Бумага" && computer === "Камінь") ||
    (user === "Ножиці" && computer === "Бумага")
  ) {
    return <h2>"Ви виграли!"</h2>;
  } else {
    return <h2>"Ви програли!"</h2>;
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
    <Tittle>
      <a class="logo-link" href="/">
        <svg
          width="155"
          height="26"
          viewBox="0 0 155 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="logotype"
        >
          <path
            d="M9.55396 20.518L2 13.009L9.55396 5.5"
            stroke="#3D7FFF"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M19.536 5.5L27 13.009L19.536 20.518"
            stroke="#3D7FFF"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M39.82 20.5V6.5H42.5L50.24 16.96H49.68C49.6267 16.5467 49.58 16.1467 49.54 15.76C49.5 15.36 49.46 14.96 49.42 14.56C49.3933 14.1467 49.3667 13.7267 49.34 13.3C49.3267 12.86 49.3133 12.4 49.3 11.92C49.2867 11.4267 49.28 10.8933 49.28 10.32V6.5H52.22V20.5H49.5L41.6 9.94L42.36 9.96C42.4267 10.6533 42.48 11.2467 42.52 11.74C42.5733 12.22 42.6133 12.64 42.64 13C42.6667 13.36 42.6867 13.6733 42.7 13.94C42.7267 14.2067 42.74 14.46 42.74 14.7C42.7533 14.94 42.76 15.1933 42.76 15.46V20.5H39.82ZM60.4752 20.7C59.3285 20.7 58.3285 20.4667 57.4752 20C56.6218 19.5333 55.9552 18.8933 55.4752 18.08C54.9952 17.2667 54.7552 16.3333 54.7552 15.28C54.7552 14.4667 54.8885 13.72 55.1552 13.04C55.4218 12.36 55.7952 11.7733 56.2752 11.28C56.7552 10.7733 57.3218 10.3867 57.9752 10.12C58.6418 9.84 59.3618 9.7 60.1352 9.7C60.8552 9.7 61.5218 9.83333 62.1352 10.1C62.7485 10.3533 63.2752 10.72 63.7152 11.2C64.1685 11.6667 64.5152 12.22 64.7552 12.86C64.9952 13.5 65.1018 14.2 65.0752 14.96L65.0552 15.84H56.5552L56.0952 14.1H62.7152L62.3952 14.46V14.02C62.3685 13.66 62.2485 13.3333 62.0352 13.04C61.8352 12.7467 61.5752 12.52 61.2552 12.36C60.9352 12.2 60.5752 12.12 60.1752 12.12C59.5885 12.12 59.0885 12.2333 58.6752 12.46C58.2752 12.6867 57.9685 13.02 57.7552 13.46C57.5418 13.9 57.4352 14.4333 57.4352 15.06C57.4352 15.7 57.5685 16.2533 57.8352 16.72C58.1152 17.1867 58.5018 17.5533 58.9952 17.82C59.5018 18.0733 60.0952 18.2 60.7752 18.2C61.2418 18.2 61.6685 18.1267 62.0552 17.98C62.4418 17.8333 62.8552 17.58 63.2952 17.22L64.6552 19.12C64.2685 19.4667 63.8418 19.76 63.3752 20C62.9085 20.2267 62.4285 20.4 61.9352 20.52C61.4418 20.64 60.9552 20.7 60.4752 20.7ZM71.1339 20.7C70.2539 20.7 69.4606 20.46 68.7539 19.98C68.0472 19.5 67.4872 18.8467 67.0739 18.02C66.6606 17.1933 66.4539 16.2467 66.4539 15.18C66.4539 14.1133 66.6606 13.1733 67.0739 12.36C67.5006 11.5333 68.0739 10.8867 68.7939 10.42C69.5139 9.94 70.3339 9.7 71.2539 9.7C71.7739 9.7 72.2472 9.78 72.6739 9.94C73.1139 10.0867 73.4939 10.2933 73.8139 10.56C74.1472 10.8267 74.4272 11.1333 74.6539 11.48C74.8806 11.8267 75.0406 12.2 75.1339 12.6L74.5339 12.5V9.92H77.3539V20.5H74.4939V17.96L75.1339 17.9C75.0272 18.2733 74.8539 18.6267 74.6139 18.96C74.3739 19.2933 74.0739 19.5933 73.7139 19.86C73.3672 20.1133 72.9739 20.32 72.5339 20.48C72.0939 20.6267 71.6272 20.7 71.1339 20.7ZM71.9139 18.24C72.4472 18.24 72.9139 18.1133 73.3139 17.86C73.7139 17.6067 74.0206 17.2533 74.2339 16.8C74.4606 16.3333 74.5739 15.7933 74.5739 15.18C74.5739 14.58 74.4606 14.0533 74.2339 13.6C74.0206 13.1467 73.7139 12.7933 73.3139 12.54C72.9139 12.2733 72.4472 12.14 71.9139 12.14C71.3939 12.14 70.9339 12.2733 70.5339 12.54C70.1472 12.7933 69.8406 13.1467 69.6139 13.6C69.3872 14.0533 69.2739 14.58 69.2739 15.18C69.2739 15.7933 69.3872 16.3333 69.6139 16.8C69.8406 17.2533 70.1472 17.6067 70.5339 17.86C70.9339 18.1133 71.3939 18.24 71.9139 18.24ZM80.2013 20.5V9.92H82.9413L83.0413 13.32L82.5613 12.62C82.7213 12.0733 82.9813 11.58 83.3413 11.14C83.7013 10.6867 84.1213 10.3333 84.6013 10.08C85.0946 9.82667 85.6079 9.7 86.1413 9.7C86.3679 9.7 86.5879 9.72 86.8013 9.76C87.0146 9.8 87.1946 9.84667 87.3413 9.9L86.5813 13.02C86.4213 12.94 86.2279 12.8733 86.0013 12.82C85.7746 12.7533 85.5413 12.72 85.3013 12.72C84.9813 12.72 84.6813 12.78 84.4013 12.9C84.1346 13.0067 83.9013 13.1667 83.7013 13.38C83.5013 13.58 83.3413 13.82 83.2213 14.1C83.1146 14.38 83.0613 14.6867 83.0613 15.02V20.5H80.2013ZM100.044 20.7C99.1769 20.7 98.3836 20.5933 97.6636 20.38C96.9569 20.1667 96.3236 19.8533 95.7636 19.44C95.2169 19.0267 94.7236 18.5267 94.2836 17.94L96.1636 15.8C96.8169 16.7067 97.4636 17.3267 98.1036 17.66C98.7569 17.98 99.4636 18.14 100.224 18.14C100.637 18.14 101.004 18.0867 101.324 17.98C101.657 17.86 101.917 17.6933 102.104 17.48C102.29 17.2667 102.384 17.0133 102.384 16.72C102.384 16.5067 102.337 16.3133 102.244 16.14C102.15 15.9533 102.017 15.7933 101.844 15.66C101.67 15.5133 101.464 15.3867 101.224 15.28C100.984 15.16 100.717 15.06 100.424 14.98C100.13 14.8867 99.8103 14.8133 99.4636 14.76C98.7169 14.5867 98.0636 14.38 97.5036 14.14C96.9436 13.8867 96.4769 13.58 96.1036 13.22C95.7303 12.8467 95.4503 12.4267 95.2636 11.96C95.0903 11.4933 95.0036 10.9667 95.0036 10.38C95.0036 9.78 95.1369 9.22667 95.4036 8.72C95.6703 8.2 96.0369 7.75333 96.5036 7.38C96.9836 7.00667 97.5303 6.72 98.1436 6.52C98.7703 6.32 99.4303 6.22 100.124 6.22C100.977 6.22 101.724 6.32 102.364 6.52C103.004 6.70667 103.557 6.98 104.024 7.34C104.504 7.7 104.904 8.14 105.224 8.66L103.324 10.5C103.044 10.1267 102.737 9.81333 102.404 9.56C102.084 9.30667 101.73 9.12 101.344 9C100.97 8.86667 100.584 8.8 100.184 8.8C99.7436 8.8 99.3636 8.86 99.0436 8.98C98.7236 9.08667 98.4703 9.24667 98.2836 9.46C98.1103 9.67333 98.0236 9.93333 98.0236 10.24C98.0236 10.48 98.0836 10.6933 98.2036 10.88C98.3236 11.0667 98.4969 11.2333 98.7236 11.38C98.9503 11.5133 99.2236 11.6333 99.5436 11.74C99.8636 11.8467 100.217 11.94 100.604 12.02C101.337 12.1667 101.997 12.36 102.584 12.6C103.17 12.84 103.67 13.1333 104.084 13.48C104.51 13.8133 104.837 14.2133 105.064 14.68C105.29 15.1333 105.404 15.6467 105.404 16.22C105.404 17.1667 105.177 17.9733 104.724 18.64C104.27 19.3067 103.644 19.82 102.844 20.18C102.044 20.5267 101.11 20.7 100.044 20.7ZM112.641 20.7C111.561 20.7 110.594 20.4667 109.741 20C108.901 19.52 108.234 18.8667 107.741 18.04C107.261 17.2133 107.021 16.2667 107.021 15.2C107.021 14.1333 107.261 13.1933 107.741 12.38C108.234 11.5533 108.901 10.9 109.741 10.42C110.594 9.94 111.561 9.7 112.641 9.7C113.707 9.7 114.661 9.94 115.501 10.42C116.354 10.9 117.021 11.5533 117.501 12.38C117.981 13.1933 118.221 14.1333 118.221 15.2C118.221 16.2667 117.981 17.2133 117.501 18.04C117.021 18.8667 116.354 19.52 115.501 20C114.661 20.4667 113.707 20.7 112.641 20.7ZM112.641 18.22C113.161 18.22 113.627 18.0933 114.041 17.84C114.454 17.5733 114.774 17.2133 115.001 16.76C115.241 16.2933 115.361 15.7733 115.361 15.2C115.361 14.6133 115.241 14.0933 115.001 13.64C114.774 13.1733 114.454 12.8133 114.041 12.56C113.627 12.2933 113.161 12.16 112.641 12.16C112.107 12.16 111.634 12.2933 111.221 12.56C110.807 12.8267 110.481 13.1867 110.241 13.64C110.001 14.0933 109.887 14.6133 109.901 15.2C109.887 15.7733 110.001 16.2933 110.241 16.76C110.481 17.2133 110.807 17.5733 111.221 17.84C111.634 18.0933 112.107 18.22 112.641 18.22ZM124.958 20.7C123.944 20.7 123.038 20.46 122.238 19.98C121.438 19.5 120.804 18.8467 120.338 18.02C119.884 17.1933 119.658 16.2533 119.658 15.2C119.658 14.16 119.884 13.2267 120.338 12.4C120.804 11.56 121.438 10.9 122.238 10.42C123.038 9.94 123.944 9.7 124.958 9.7C125.904 9.7 126.771 9.87333 127.558 10.22C128.344 10.5667 128.958 11.0467 129.398 11.66L127.838 13.54C127.651 13.2867 127.418 13.06 127.138 12.86C126.858 12.6467 126.551 12.48 126.218 12.36C125.898 12.24 125.564 12.18 125.218 12.18C124.671 12.18 124.184 12.3133 123.758 12.58C123.344 12.8333 123.018 13.1867 122.778 13.64C122.538 14.0933 122.418 14.6133 122.418 15.2C122.418 15.7733 122.538 16.2867 122.778 16.74C123.031 17.18 123.371 17.54 123.798 17.82C124.224 18.0867 124.704 18.22 125.238 18.22C125.584 18.22 125.911 18.1733 126.218 18.08C126.524 17.9733 126.811 17.82 127.078 17.62C127.358 17.42 127.611 17.18 127.838 16.9L129.378 18.78C128.924 19.3533 128.298 19.82 127.498 20.18C126.698 20.5267 125.851 20.7 124.958 20.7ZM131.437 20.5V9.92H134.277V20.5H131.437ZM132.837 7.74C132.291 7.74 131.864 7.60667 131.557 7.34C131.251 7.07333 131.097 6.69333 131.097 6.2C131.097 5.74667 131.251 5.38 131.557 5.1C131.877 4.80667 132.304 4.66 132.837 4.66C133.384 4.66 133.811 4.8 134.117 5.08C134.424 5.34667 134.577 5.72 134.577 6.2C134.577 6.66667 134.417 7.04 134.097 7.32C133.791 7.6 133.371 7.74 132.837 7.74ZM141.271 20.7C140.391 20.7 139.597 20.46 138.891 19.98C138.184 19.5 137.624 18.8467 137.211 18.02C136.797 17.1933 136.591 16.2467 136.591 15.18C136.591 14.1133 136.797 13.1733 137.211 12.36C137.637 11.5333 138.211 10.8867 138.931 10.42C139.651 9.94 140.471 9.7 141.391 9.7C141.911 9.7 142.384 9.78 142.811 9.94C143.251 10.0867 143.631 10.2933 143.951 10.56C144.284 10.8267 144.564 11.1333 144.791 11.48C145.017 11.8267 145.177 12.2 145.271 12.6L144.671 12.5V9.92H147.491V20.5H144.631V17.96L145.271 17.9C145.164 18.2733 144.991 18.6267 144.751 18.96C144.511 19.2933 144.211 19.5933 143.851 19.86C143.504 20.1133 143.111 20.32 142.671 20.48C142.231 20.6267 141.764 20.7 141.271 20.7ZM142.051 18.24C142.584 18.24 143.051 18.1133 143.451 17.86C143.851 17.6067 144.157 17.2533 144.371 16.8C144.597 16.3333 144.711 15.7933 144.711 15.18C144.711 14.58 144.597 14.0533 144.371 13.6C144.157 13.1467 143.851 12.7933 143.451 12.54C143.051 12.2733 142.584 12.14 142.051 12.14C141.531 12.14 141.071 12.2733 140.671 12.54C140.284 12.7933 139.977 13.1467 139.751 13.6C139.524 14.0533 139.411 14.58 139.411 15.18C139.411 15.7933 139.524 16.3333 139.751 16.8C139.977 17.2533 140.284 17.6067 140.671 17.86C141.071 18.1133 141.531 18.24 142.051 18.24ZM150.358 20.5V5.7H153.198V20.5H150.358Z"
            fill="white"
          ></path>
        </svg>
      </a>
      <span>" "</span>
      <span class="navigation-section">
        <span class="sc-bcXHqe erjwfB">
          <a href="/"> Home </a>
        </span>
        <span>" "</span>
        <span class="sc-bcXHqe erjwfB">
          <a href="/edit"> Editor </a>
        </span>
        <span>" "</span>
        <span class="sc-bcXHqe erjwfB">
          <a
            href="https://social.near-docs.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="arrow-up-right"
            >
              <path
                d="M17.25 15.25V6.75H8.75"
                stroke="#9BA1A6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M17 7L6.75 17.25"
                stroke="#9BA1A6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </a>
        </span>
      </span>
    </Tittle>
    <Widget
      src={`${widget_owner_id}/widget/MysteryBox.Manage.Components.MenuHeader`}
    />
    <Wrapper>
      <h1>Камінь Ножиці Бумага</h1>
      <div>
        <Button onClick={() => handleClick("Камінь")}>Rock</Button>
        <Button onClick={() => handleClick("Бумага")}>Paper</Button>
        <Button onClick={() => handleClick("Ножиці")}>Scissors</Button>
      </div>
      {userChoice && computerChoice && result && (
        <ResultText>
          <span>Ви обрали: {userChoice}</span>
          <span>/</span>
          <span>Комп'ютор обрав: {computerChoice}</span>
          <br />
          <span></span>
          <br />
          Результат: {result}
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
      <br />
    </Social>
  </OuterWrapper>
);
