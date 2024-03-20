const HelloWorldComponent = () => {
  // State variable to track if the button is pressed
  const [buttonPressed, setButtonPressed] = useState(false);

  // Function to handle button click
  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  return (
    <div>
      {/* Button element */}
      <button onClick={handleButtonClick}>Press Me</button>
      {/* Display "Hello" when the button is pressed */}
      {buttonPressed && <p>Hello</p>}
    </div>
  );
};

export default HelloWorldComponent;
