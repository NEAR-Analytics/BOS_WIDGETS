const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ff9933; /* Saffron color */
  border: 4px solid #138808; /* Green color */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  margin-bottom: 0.5em;
  flex-wrap: wrap;
`;

const Greeting = styled.p`
  font-size: 20px;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

State.init({
  name: "", // Initialize name as an empty string
});

const handleNameChange = (e) => {
  State.update({ name: e.target.value });
};

return (
  <div className="d-flex flex-column align-items-center">
    <LabelArea>
      <Image
        src="https://zealy-webapp-images-prod.s3.eu-west-1.amazonaws.com/public/5d8a56da-0df6-4e25-ba2d-c2029e8dd760-logo.png"
        alt="Logo"
      />
      <Input
        type="text"
        value={state.name} // Bind input value to state
        onChange={handleNameChange}
        placeholder="Enter your name"
        style={{ maxWidth: "200px" }}
      />
    </LabelArea>
    {state.name && <Greeting>Greetings to {state.name}!</Greeting>}
  </div>
);
