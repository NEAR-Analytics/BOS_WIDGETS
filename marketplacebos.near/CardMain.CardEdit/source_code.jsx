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
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);

const SaveButton = styled.button`
  width: 80px;
  height: 35px;
  display: flex;
  align-items: center;
  background-color: white;
  color: black;
  font-size:10px;
  border-radius: 2em;
  padding: 0.5rem;
  position: absolute; 
  bottom: 10px;
  right: 10px;

`;

const EditorContainer = styled.div`
  top:20px;
  background-color: none;
  color: black;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  border: 0.1rem solid #000000;
  border-radius: 14px;
  padding: 10px;
  position: relative;
  height: 60vh;
`;

const TextAreaWrapper = styled.div`
  overflow: hidden;
  height: 100%; 

`;

const [isToggleSave1, setIsToggleSave1] = useState(false);
const toggleSaveButton1 = () => {
  setIsToggleSave1((prevState) => !prevState);
};

const SaveIcon = (
  <i
    className={
      isToggleSave1 ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark-heart"
    }
  ></i>
);

let copyBtn = props.copyBtn || "Copy Button";
props.copyBtn || <></>;
let component = props.component || <> </>;
let text = props.text || <></>;
let save = props.save || <> </>;
let editText = props.editText || <> </>;
let elementP = props.elementP || <> </>;

let editInput = props.editInput || <> </>;

// let elementP = props.elementP || <> </>;

return (
  <>
    <CardM>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <CardM>
              <Card isWhiteBackground={!isWhiteBackground1}>
                <CardBody>
                  <CenteredCardWrapper>{component}</CenteredCardWrapper>
                  <ToggleButton onClick={toggleButton1} isToggled={isToggleOn1}>
                    {isToggleOn1 ? SunIcon : MoonIcon}
                  </ToggleButton>
                </CardBody>
              </Card>
            </CardM>
          </div>
          <div className="col-md-6">
            <CardM>
              <EditorContainer>
                <TextAreaWrapper>
                  <div>Props AVAILABLE: {editText}</div>
                  {editInput}
                </TextAreaWrapper>
              </EditorContainer>
            </CardM>
          </div>
        </div>
      </div>
    </CardM>
  </>
);
