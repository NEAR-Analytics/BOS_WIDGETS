const [isWhiteBackground1, setIsWhiteBackground1] = useState(true);
const [isToggleOn1, setIsToggleOn1] = useState(true);

const toggleButton1 = () => {
  setIsToggleOn1((prevState) => !prevState);
  setIsWhiteBackground1((prevState) => !prevState);
};

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
  border: 0.1rem solid #000000;
  border-radius: 1em;
  overflow: hidden;
  position: relative;
  justify-content: center;
  align-items: center;
  transition: background 500ms;
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
  background-color: ${(props) => (props.isToggled ? "#ff8408ff" : "#0a1929ff")};
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
  background-color: #0a1929ff;
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
    background-color: #0a1929ff;
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
  background-color: #0a1929ff;
`;

const SvgIconCopy = styled.span`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #0a1929ff;

  svg {
    fill: white;
  }
`;

const EditorContainer = styled.div`
  top:20px;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  border: none;
  border-radius: 14px;
  padding: 10px;
  position: relative;
  height: 60vh;
`;

const TextAreaWrapper = styled.div`
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
  height: 100%; 
  border-radius: 14px;

`;

const TextArea = styled.textarea`
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  border: none;
  padding: 10px;
  width: 100%;
  height: 100%;
  resize: none;
  outline: none;
`;

const [isToggleSave1, setIsToggleSave1] = useState(false);
const toggleSaveButton1 = () => {
  setIsToggleSave1((prevState) => !prevState);
};
const SaveButton = styled.button`
  width: 2.3rem;
  height: 30px;
  background-color: ${(props) => (props.isToggled ? "#f79a55" : "#0a1929ff")};
  border: none;
  border-radius: 24px;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  left: 10px; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: background-color 300ms;
`;

const SaveIcon = (
  <i
    className={
      isToggleSave1 ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark-heart"
    }
  ></i>
);

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
                  <SaveButton
                    onClick={toggleSaveButton1}
                    isToggled={isToggleSave1}
                  >
                    {SaveIcon}
                    {save}
                  </SaveButton>
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
