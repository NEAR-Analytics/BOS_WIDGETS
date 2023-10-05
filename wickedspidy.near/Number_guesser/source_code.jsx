//css...
const body = styled.div`

    height:100%;
    box-sizing:border-box;
    margin:0;

    .body{
      padding-top:20%;
      display:flex;
      align-item:center;
      justify-content:center;
      box-sizing :border-box;
    }

    .wrapper{
      border-radius:12px;
      padding:30px 40px;
      background:grey;
      text-aling:center;
      box-shadow:0 5px 10px rgba(0,0,0,0.1);
    }
     .header{
      font-size:18px;
      font-wight:400;
      color:#333;
    }
    .p{
      color :#333;
    }
    .wrapper .input-field{
      display:flex;
      justify-content:center;
      gap:20px;
      margin :25px 0;
    }
    .input-field input,
    .input-field button{
      height:50px;
      width:calc(100%/2-20px);
      outline:none;
      padding :0 20px;
      border-radious:8px;
      font-size:18px;
    }
    .input-field input{
      text-aling:center;
      color:#707070;
      width:110px;
      border:1px solid #aaa;
    }

    input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

    .input-field input :disabled{
      cursor: not-allowed;
    }

    .input-field button{
      border:none;
      background:#4a9;
      color :#fff;
      cursor:pointer;
      transition:0.3s;
    }

    .input-field button:actice{
      transform:scale(0.97);
    }
`;

const NumberGuessingGame = () => {
  // Initialize game state
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [userInput, setUserInput] = useState("");
  const [remainingChances, setRemainingChances] = useState(10);
};
// Function to generate a random number between 1 and 100
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

// Function to handle user input change
const handleInputChange = (event) => {
  setUserInput(event.target.value);
};

// Function to handle the "Check" button click
const handleCheckClick = () => {
  const guess = parseInt(userInput, 10);

  if (isNaN(guess)) {
    alert("Please enter a valid number.");
    return;
  }

  if (guess === targetNumber) {
    alert(`Congratulations! You guessed the correct number: ${targetNumber}`);
    setUserInput("");
    setRemainingChances(10);
    setTargetNumber(generateRandomNumber());
  } else {
    const newChances = remainingChances - 1;
    setRemainingChances(newChances);

    if (newChances === 0) {
      alert(
        `Sorry, you've run out of chances. The correct number was ${targetNumber}`
      );
      setUserInput("");
      setRemainingChances(10);
      setTargetNumber(generateRandomNumber());
    } else {
      alert(
        guess < targetNumber ? "Try a higher number." : "Try a lower number."
      );
    }
  }
};

//html...
return (
  <body>
    <div class="body">
      <div class="wrapper">
        <div class="header">Guess a number from 1 to 100</div>
        <p class="guesss"></p>

        <div class="input-field">
          <input type="number" value={userInput} onChange={handleInputChange} />
          <button onClick={handleCheckClick}> check </button>
        </div>

        <p>
          You have <span class="chance">10</span> chances{" "}
        </p>
      </div>
    </div>
  </body>
);
