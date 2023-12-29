const { title, value, onChange, error } = props;

function getVariantColor() {
  if (variant === "red") return "rgb(252, 91, 91)";
  else if (variant === "green") return "rgb(0, 141, 106)";
  else if (variant === "grey") return "rgb(105, 105, 105)";
  return "#fff";
}
const variantColor = getVariantColor();

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const FormInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-top: 12px;
  border-radius: 12px;
  padding: 0 16px;
  align-items: center;
`;

const FormInputTitle = styled.div`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
    white-space: nowrap;
  }
`;

const FormInputError = styled.div`
  margin-top: 12px;
  color: rgb(252, 91, 91);
`;

const FormInputButtonGroup = styled.div`
  margin-top: 12px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  place-items: center;
  border: 1px solid #c0c0c0;
  overflow: hidden;
`;

const FormButton = styled.div`
  padding: 10px 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.selected &&
    `
    background: #232323;
  `}
  &:not(:first-of-type) {
    border-left: 1px solid #c0c0c0;
  }
  &:hover {
    background: #232323;
  }
`;

const buttonsData = [1, 5, 10, 20]
  .map((element) => String(element))
  .map((element) => ({
    value: element,
    onClick: () => onChange(element),
    selected: element === value,
  }));
return (
  <FormInputContainer>
    <FormInputLabel>
      <FormInputTitle>{title}</FormInputTitle>
    </FormInputLabel>
    <FormInputButtonGroup>
      {buttonsData.map((buttonData) => (
        <FormButton
          key={buttonData.value}
          selected={buttonData.selected}
          onClick={buttonData.onClick}
        >
          {buttonData.value}
        </FormButton>
      ))}
    </FormInputButtonGroup>
    {error && (
      <FormInputLabel>
        <FormInputError>{error}</FormInputError>
      </FormInputLabel>
    )}
  </FormInputContainer>
);
