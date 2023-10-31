const FormContainer = styled.div`
  width: 300px;
  background: linear-gradient(#212121, #212121) padding-box,
    linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;

  button:active {
    scale: 0.95;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #717171;
  font-weight: 600;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  color: #fff;
  font-family: inherit;
  background-color: transparent;
  border: 1px solid #414141;

  &::placeholder {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-color: #e81cff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  resize: none;
  color: #fff;
  height: 96px;
  border: 1px solid #414141;
  background-color: transparent;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #e81cff;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 40%;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #fff;
    border-color: #fff;
  }
`;

const props = {
  copyBtn:
    "const FormContainer = styled.div`\n" +
    `  width: 300px;
  background: linear-gradient(#212121, #212121) padding-box,
    linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;

  button:active {
    scale: 0.95;
  }
` +
    "\n`;" +
    "\nconst FormWrapper = styled.div`\n" +
    `  display: flex;
  flex-direction: column;
  gap: 20px;
` +
    "\n`;" +
    "\nconst FormGroup = styled.div`\n" +
    `  display: flex;
  flex-direction: column;
  gap: 2px;
` +
    "\n`;" +
    "\nconst Label = styled.label`\n" +
    `  display: block;
  margin-bottom: 5px;
  color: #717171;
  font-weight: 600;
  font-size: 12px;
` +
    "\n`;" +
    "\nconst Input = styled.input`\n" +
    `  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  color: #fff;
  font-family: inherit;
  background-color: transparent;
  border: 1px solid #414141;

  &::placeholder {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-color: #e81cff;
  }
` +
    "\n`;" +
    "\nconst TextArea = styled.textarea`\n" +
    `  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  resize: none;
  color: #fff;
  height: 96px;
  border: 1px solid #414141;
  background-color: transparent;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #e81cff;
  }` +
    "\n`;" +
    "\nconst SubmitButton = styled.button`\n" +
    `  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 40%;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #fff;
    border-color: #fff;
  } ` +
    "\n`;" +
    `\n return(
  <FormContainer>
    <FormWrapper>
      <FormGroup>
        <Label htmlFor="email">Company Email</Label>
        <Input type="text" id="email" name="email" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="textarea">How Can We Help You?</Label>
        <TextArea name="textarea" id="textarea" rows="10" cols="50" required />
      </FormGroup>
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormWrapper>
  </FormContainer>
  )`,
  component: (
    <FormContainer>
      <FormWrapper>
        <FormGroup>
          <Label htmlFor="email">Company Email</Label>
          <Input type="text" id="email" name="email" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="textarea">How Can We Help You?</Label>
          <TextArea
            name="textarea"
            id="textarea"
            rows="10"
            cols="50"
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormWrapper>
    </FormContainer>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.F0002",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardForm" props={props} />
  </>
);
