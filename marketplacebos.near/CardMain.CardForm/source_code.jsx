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

const Container = styled.label`
  margin-top:20px;
  display: block;
  position: relative;
  width:30px;
  cursor: pointer;
  user-select: none;
  position: absolute;
  bottom: 2px; 
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

const Card = styled.div`
  padding: 30px;
  background: ${(props) => (props.isWhiteBackground ? "#000000" : "#fffff")};
  width: 380px;
  height: 470px;
  display: flex;
  flex-direction: column;
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;
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

const ButtonCopy = styled.button`
  width: 5rem;
  height: 30px;
  font-size: 12px;
  background-color: black;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;


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
  background-color: #0a1929ff;

  svg {
    fill: white;
  }
`;

const ViewButton = styled.button`
  width: 5rem;
  height: 30px;
  font-size: 12px;
  background-color: black;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  position: absolute;
  bottom: 10px; /* Adjust the vertical position */
  right: 100px; /* Adjust the horizontal position */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;

`;

let copyBtn = props.copyBtn || "Copy Button";
props.copyBtn || <></>;
let component = props.component || <> </>;
let save = props.save || <> </>;
const detailLink = props.detailLink || "notfound";

return (
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
      <a href={detailLink}>
        <ViewButton>
          Code<i className="bi bi-code-slash"></i>
        </ViewButton>
      </a>
      <ToggleButton onClick={toggleButton1} isToggled={isToggleOn1}>
        {isToggleOn1 ? SunIcon : MoonIcon}
      </ToggleButton>
      <ButtonCopy
        placement="auto"
        overlay={
          <Tooltip>{state.copied ? "Copied!" : "Copy to clipboard"}</Tooltip>
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
              {props.clipboardIcon ?? <i className="bi bi-clipboard" />}{" "}
              {props.label}
            </>
          )}
        </TextCopy>
      </ButtonCopy>
    </CardBody>
  </Card>
);
