const {
  title,
  maxTitle,
  maxValue,
  value,
  unit,
  onChange,
  onClickMax,
  error,
  varient,
} = props;

function getVarientColor() {
  if (varient === "red") return "rgb(252, 91, 91)";
  if (varient === "green") return "rgb(0, 141, 106)";
  return "#fff";
}
const varientColor = getVarientColor();

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
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
`;

const MaxContent = styled.div`
  font-size: 14px;
  color: white;
  font-size: 700;
  display: flex;
`;

const MaxValue = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: white;
  font-size: 700;
  margin-left: 4px;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const UnitContent = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const FormInputError = styled.div`
  margin-top: 12px;
  color: rgb(252, 91, 91);
`;
return (
  <FormInputContainer>
    <FormInputLabel>
      <FormInputTitle>{title}</FormInputTitle>
      {maxTitle && (
        <MaxContent>
          {maxTitle}
          <MaxValue onClick={onClickMax}>{maxValue}</MaxValue>
        </MaxContent>
      )}
    </FormInputLabel>
    <FormInputRow
      style={{
        border: `1px solid ${varientColor}`,
      }}
    >
      <input
        style={{
          width: "100%",
          background: "transparent",
          border: "0",
          "font-size": "16px",
          "font-weight": "bold",
          color: varientColor,
          outline: "none",
          "box-shadow": "none",
          "margin-right": "16px",
          "-webkit-appearance": "none",
          "-moz-appearance": "textfield",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellcheck="false"
      />
      <UnitContent>{unit}</UnitContent>
    </FormInputRow>
    {error && (
      <FormInputLabel>
        <FormInputError>{error}</FormInputError>
      </FormInputLabel>
    )}
  </FormInputContainer>
);
