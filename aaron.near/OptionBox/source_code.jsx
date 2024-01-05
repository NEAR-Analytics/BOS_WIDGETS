const OptionBoxContainer = styled.div`
    width: 30%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    margin: 20px;
`;
const OptionBoxHeading = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const OptionBoxList = styled.ul`
    list-style-position: inside;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const OptionBoxListItem = styled.li`
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
`;

const Button = styled.button`
    display: inline-block;
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

return (
  <OptionBoxContainer>
    <OptionBoxHeading>{props.heading}</OptionBoxHeading>
    <OptionBoxList>
      {props.listItems.map((item) => {
        return (
          <OptionBoxListItem>
            <EmojiEventsIcon fontSize="small" />
            {item}
          </OptionBoxListItem>
        );
      })}
    </OptionBoxList>
    <Button
      onClick={(e) => {
        if (props.disabled) {
          e.preventDefault();
          return;
        }
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      disabled={props.disabled}
      style={{ ...props.style }}
    >
      {props.buttonText}
    </Button>
  </OptionBoxContainer>
);
