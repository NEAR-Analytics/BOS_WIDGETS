const ContainerCheckbox = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1px solid #384bff;
  margin-right: 8px;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 12px;
  line-height: 17.88px;
  color: #7a818b;
  cursor: pointer;
`;

const ActionsGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const ActionButton = styled.div`
  display: flex;
  height: 42px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 90px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border: ${(props) => (props.$primary ? "initial" : "1px solid #E2E2E5")};
  background: ${(props) => (props.$primary ? "#02193A" : "initial")};
  color: ${(props) => (props.$primary ? "#fff" : "initial")};

  &:hover {
    background: ${(props) => (props.$primary ? "#1c3559" : "#eee")};
  }

  &:active {
    background: ${(props) => (props.$primary ? "#020c19" : "#ddd")};
  }
`;

return (
  <>
    {props.isDoNotShowChecked ? null : (
      <ContainerCheckbox>
        <CheckboxInput
          type="checkbox"
          checked={props.checked}
          onChange={props.onDoNotShowChange}
        />
        <Label htmlFor="checkbox">Don't show this guide again</Label>
      </ContainerCheckbox>
    )}

    <ActionsGroup>
      {props.buttons.map((btn, i) => (
        <ActionButton
          $primary={btn.variant == "primary" ? true : false}
          onClick={btn.onClick}
          disabled={btn.disabled}
        >
          {btn.label}
        </ActionButton>
      ))}
    </ActionsGroup>
  </>
);
