const FormContainer = styled.div`
  width:100%;
  background-color: #fff;
  box-shadow: 0 10px 60px rgb(218, 229, 255);
  border: 1px solid rgb(159, 159, 160);
  border-radius: 20px;
  padding: 2rem 0.7rem 0.7rem 0.7rem;
  text-align: center;
  font-size: 1.125rem;
  max-width: 320px;
`;

const FormTitle = styled.span`
  color: #000000;
  font-size: 1.8rem;
  font-weight: 500;
`;

const FormParagraph = styled.p`
  margin-top: 10px;
  font-size: 0.9375rem;
  color: rgb(105, 105, 105);
`;

const DropContainer = styled.label`
  background-color: #fff;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 2.1875rem;
  border-radius: 10px;
  border: 2px dashed rgb(171, 202, 255);
  color: #444;
  cursor: pointer;
  transition: background 0.2s ease-in-out, border 0.2s ease-in-out;

  &:hover {
    background: rgba(0, 140, 255, 0.164);
    border-color: rgba(17, 17, 17, 0.616);
  }
`;

const DropTitle = styled.span`
  color: #444;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color 0.2s ease-in-out;
`;

const FileInput = styled.input`
  width: 100%;
  max-width: 100%;
  color: #444;
  padding: 2px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(8, 8, 8, 0.288);
`;

const props = {
  copyBtn:
    "const FormContainer = styled.div`\n" +
    `  width:100%;
  background-color: #fff;
  box-shadow: 0 10px 60px rgb(218, 229, 255);
  border: 1px solid rgb(159, 159, 160);
  border-radius: 20px;
  padding: 2rem 0.7rem 0.7rem 0.7rem;
  text-align: center;
  font-size: 1.125rem;
  max-width: 320px;
` +
    "\n`;" +
    "\nconst FormTitle = styled.span`\n" +
    `  color: #000000;
  font-size: 1.8rem;
  font-weight: 500;
` +
    "\n`;" +
    "\nconst FormParagraph = styled.p`\n" +
    `  margin-top: 10px;
  font-size: 0.9375rem;
  color: rgb(105, 105, 105);
` +
    "\n`;" +
    "\nconst DropContainer = styled.label`\n" +
    `  background-color: #fff;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 2.1875rem;
  border-radius: 10px;
  border: 2px dashed rgb(171, 202, 255);
  color: #444;
  cursor: pointer;
  transition: background 0.2s ease-in-out, border 0.2s ease-in-out;

  &:hover {
    background: rgba(0, 140, 255, 0.164);
    border-color: rgba(17, 17, 17, 0.616);
  }
` +
    "\n`;" +
    "\nconst DropTitle = styled.span`\n" +
    `  color: #444;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color 0.2s ease-in-out;
` +
    "\n`;" +
    "\nconst FileInput = styled.input`\n" +
    `  width: 100%;
  max-width: 100%;
  color: #444;
  padding: 2px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(8, 8, 8, 0.288);
  ` +
    "\n`;" +
    `\n return(
          <FormContainer>
          <FormTitle>Upload your file</FormTitle>
          <FormParagraph>File should be an image</FormParagraph>
          <DropContainer htmlFor="file-input">
            <DropTitle>Drop files here</DropTitle>
            or
            <FileInput type="file" />
          </DropContainer>
        </FormContainer>
  )`,
  component: (
    <FormContainer>
      <FormTitle>Upload your file</FormTitle>
      <FormParagraph>File should be an image</FormParagraph>
      <DropContainer htmlFor="file-input">
        <DropTitle>Drop files here</DropTitle>
        or
        <FileInput type="file" />
      </DropContainer>
    </FormContainer>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.F0003",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardForm" props={props} />
  </>
);
