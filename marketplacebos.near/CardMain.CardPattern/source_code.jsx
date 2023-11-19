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
  background: black;
  width: 780px;
  height: 610px;
  display: flex;
  flex-direction: column;
  background: white;
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
  height: 100%;
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

const [isToggleSave1, setIsToggleSave1] = useState(false);
const toggleSaveButton1 = () => {
  setIsToggleSave1((prevState) => !prevState); // Toggle the save button state
};

const SaveButton = styled.button`
  width: 2.3rem;
  height: 30px;
  background-color: ${(props) => (props.isToggled ? "#f79a55" : "black")};
  border: none;
  border-radius: 24px;
  cursor: pointer;
  position: absolute;
  bottom: 10px; /* Adjust the vertical position */
  left: 10px; /* Adjust the horizontal position */
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
  <Card>
    <CardBody>
      {component}
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
