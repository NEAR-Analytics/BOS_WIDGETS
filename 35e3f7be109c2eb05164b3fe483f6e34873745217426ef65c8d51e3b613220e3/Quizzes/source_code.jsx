const Wrapper = styled.div`
  .SwitchRoot {
/* Style for the main container */
body {
  background-color: #f2f2f2;
  padding: 200;
  margin: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Style for the heading */
h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 120px;
}

/* Style for the quiz options */
p {
  color: #0066cc;
  font-size: 20px;
  margin-bottom: 20px;
}

/* Style for the input field */
input {
  padding: 200px;
  border-radius: 600px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

/* Style for the button */
button {
  background-color: #0066cc;
  color: #fff;
  padding: 16px 360px;
  border-radius: 700px;
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
        <button> start quiz 01 </button>
        <p>2. Intermediate Quiz</p>
        <button> start quiz 02 </button>
        <p>3. Advanced Quiz</p>
        <button> start quiz 03 </button>

        <p> Or you can study more first: </p>
        <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/intro">
          <button> main page</button>
        </a>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
