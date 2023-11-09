const InputGroup = styled.div`
  position: relative;`;
const Input = styled.input`
  border: solid 1.5px #9e9e9e;
  border-radius: 1rem;
  background: none;
  padding: 1rem;
  font-size: 1rem;
  color: #f5f5f5;
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border: 1.5px solid #1a73e8;
  }

  &:valid + label,
  &:focus + label {
    transform: translateY(-70%) scale(0.8);
    padding: 0 0.2em;
    color: #2196f3;
    background-color: transparent; /* Remove background color when focused */
  }`;
const UserLabel = styled.label`
  position: absolute;
  left: 15px;
  color: #e8e8e8;
  pointer-events: none;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left top;
  transform: translateY(1rem);
  background-color: transparent; /* Set the initial background color */`;
  const text = props.text || "content"
 return(
      <InputGroup>
        <Input
        required
        type="text"
        name="text"
        autoComplete="off"
        className="input"
        />
    <UserLabel className="user-label">{text}</UserLabel>
  </InputGroup>
  )