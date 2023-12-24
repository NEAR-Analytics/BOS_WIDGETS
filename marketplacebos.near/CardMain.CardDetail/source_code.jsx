const [isWhiteBackground1, setIsWhiteBackground1] = useState(true);
const [isToggleOn1, setIsToggleOn1] = useState(true);

const toggleButton1 = () => {
  setIsToggleOn1((prevState) => !prevState);
  setIsWhiteBackground1((prevState) => !prevState);
};

const Container = styled.label`
  margin-top:20px;
  display: block;
  position: relative;
  width:30px;
  cursor: pointer;
  user-select: none;
  position: absolute;
  bottom: 20px; 
  left: 10px; 
  display: flex;
  align-items: center;
  justify-content: center;
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & svg {
    position: relative;
    top: 0;
    left: 0;
    height: 50px;
    width: 50px;
    transition: all 0.3s;
    fill: #666;

    &:hover {
      transform: scale(1.1);
    }
  }

  & input:checked ~ svg {
    fill: #E3474F;
  }
`;

const CenteredCardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardM = styled.div`
  padđing: 110px;   
`;

const Card = styled.div`
  top:20px;
  padding: 30px;
  background: ${(props) => (props.isWhiteBackground ? "#000000" : "#fffff")};
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;  border-radius: 1em;
  overflow: hidden;
  position: relative;
  justify-content: center;
  align-items: center;
  transition: background 500ms;
        @media screen and (max-width: 768px) and (max-height: 1024px) {
    width: 80%; 
    height: 45vh;
    padding: 10px; 
  }
`;

const CardBody = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardFooter = styled.div`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleButton = styled.button`
  font-family: inherit;
  width: 1.6rem;
  height: 1.6rem;
  background-color: ${(props) => (props.isToggled ? "black" : "black")};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px; /* Điều chỉnh vị trí theo y */
  right: 10px; /* Điều chỉnh vị trí theo x */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: background-color 300ms;
  
`;

const SunIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

const MoonIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
      clipRule="evenodd"
    />
  </svg>
);

const ColorText = styled.div`
  font-family: inherit;
  position: absolute;
  padding:1px;
  background-color: ${(props) => (props.isToggled ? "#ff8408ff" : "black")};
  border: 1;
  border-radius:14px;
  cursor: pointer;
  position: absolute;
  top: 10px; /* Điều chỉnh vị trí theo y */
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: background-color 300ms;
`;
const ButtonCopy = styled.button`
  width: 5rem;
  height: 30px;
  font-size: 12px;
  background-color: black;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
   &:hover {
    background-color: black;
  }

`;

const TextCopy = styled.span`
  margin-left:10px;
  font-size: 12px;
  font: bold;
  width: 70%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: black;
`;

const SvgIconCopy = styled.span`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: black;

  svg {
    fill: white;
  }
`;

const EditorContainer = styled.div`
  top:20px;
  background-color: black;
  color: #d4d4d4;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;  border-radius: 14px;
  padding: 10px;
  position: relative;
  height: 60vh;
    width: 100%;

          @media screen and (max-width: 768px) and (max-height: 1024px) {
    width: 80%; 
    height: 45vh;
    padding: 10px; 
  }
`;

const TextAreaWrapper = styled.div`
  overflow: hidden;
  height: 100%; 
  border-radius: 14px;
  

`;

const TextArea = styled.textarea`
  background-color: black;
  color: #d4d4d4;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  border: none;
  padding: 10px;
  width: 100%;
    height: 45vh;
  resize: none;
  outline: none;
          @media screen and (max-width: 768px) and (max-height: 1024px) {
    width: 80%; 
    height: 45vh;
    padding: 10px; 
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.25);
  }
  &:active {
    transform: scale(1);
  }
`;

const StyledSVG = styled.svg`
  width: 50px;
  height: 50px;
  fill: none; /* You can use fill instead of stroke in styled-components */
  stroke: #4299e1; /* Replace with your desired color */
`;

let copyBtn = props.copyBtn || "Copy Button";
props.copyBtn || <></>;
let component = props.component || <> </>;
let text = props.text || <></>;
let save = props.save || <> </>;

return (
  <>
    <a href="https://near.social/fastui.near/widget/FastUI">
      <StyledButton title="Go Back">
        <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M11 6L5 12M5 12L11 18M5 12H19"
          />
        </StyledSVG>
      </StyledButton>
    </a>
    <CardM>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <CardM>
              <Card isWhiteBackground={!isWhiteBackground1}>
                <CardBody>
                  <CenteredCardWrapper>{component}</CenteredCardWrapper>
                  <Container>
                    <input type="checkbox" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                      <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                    </svg>
                  </Container>
                  <ColorText>{isToggleOn1 ? "#FFFFFF" : "#000000"}</ColorText>
                  <ToggleButton onClick={toggleButton1} isToggled={isToggleOn1}>
                    {isToggleOn1 ? SunIcon : MoonIcon}
                  </ToggleButton>
                  <ButtonCopy
                    placement="auto"
                    overlay={
                      <Tooltip>
                        {state.copied ? "Copied!" : "Copy to clipboard"}
                      </Tooltip>
                    }
                  >
                    <TextCopy
                      onClick={() => {
                        clipboard.writeText(copyBtn).then(() => {
                          State.update({ copied: true });
                          if (props.onCopy) {
                            props.onCopy(copyBtn);
                          }
                        });
                      }}
                    >
                      Copy
                      {state.copied ? (
                        <>
                          {props.copiedIcon ?? (
                            <i className="bi bi-clipboard2-check-fill" />
                          )}{" "}
                          {props.copiedLabel ?? props.label}
                        </>
                      ) : (
                        <>
                          {props.clipboardIcon ?? (
                            <i className="bi bi-clipboard" />
                          )}{" "}
                          {props.label}
                        </>
                      )}
                    </TextCopy>
                  </ButtonCopy>
                </CardBody>
              </Card>
            </CardM>
          </div>
          <div className="col-md-6">
            <CardM>
              <EditorContainer>
                <TextAreaWrapper>
                  <TextArea value={text} />
                </TextAreaWrapper>
              </EditorContainer>
            </CardM>
          </div>
        </div>
      </div>
    </CardM>
  </>
);
