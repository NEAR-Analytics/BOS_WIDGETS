const Wrapper = styled.div`
  .SwitchRoot {
    /* Style for the main container */
div {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
}

/* Style for the heading */
h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 100px;
}

/* Style for the quiz options */
p {
  color: #0066cc;
  font-size: 18px;
  margin-bottom: 55px;
}

/* Style for the input field */
input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

/* Style for the button */
button {
  background-color: #0066cc;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #004c99;
}
}
  .SwitchThumb {
      }
`;
return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <div>
        <h1>Quizzes:</h1>
        <p>1. Beginner Quiz</p>
        <p>2. Intermediate Quiz</p>
        <p>3. Advanced Quiz</p>
        Please enter the number of the quiz you want to take or press '0' to go
        back: <input />
        <button>submit </button>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
