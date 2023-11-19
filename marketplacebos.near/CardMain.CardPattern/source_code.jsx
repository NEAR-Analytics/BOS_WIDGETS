const CenteredCardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
      <SaveButton onClick={toggleSaveButton1} isToggled={isToggleSave1}>
        {SaveIcon}
        {save}
      </SaveButton>
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
