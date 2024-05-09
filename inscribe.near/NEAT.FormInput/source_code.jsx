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
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-top: 12px;
  border-radius: 12px;
  padding: 0 16px;
  align-items: center;
  .FormInput::placeholder {
    color: #ffffff44;
  }
`;

const FormInputTitle = styled.div`
  font-size: 18px;
  font-weight: ${titleNormal ? "500" : "bold"};

  @media (max-width: 768px) {
    font-size: 14px;
    white-space: nowrap;
  }
`;

const MaxContent = styled.div`
  font-size: 14px;
  color: white;
  font-size: 700;
  display: flex;
  .hide-in-pc {
    display: none;
  }
  .hide-in-mobile {
    display: inline-block;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    white-space: nowrap;
    display: inline-block;
    .hide-in-mobile {
      display: none;
    }
    .hide-in-pc {
      display: inline-block;
    }
  }
`;

const MaxValue = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: white;
  font-size: 700;
  margin-left: 4px;
  ${onClickMax
    ? `
      text-decoration: underline;
      text-underline-offset: 3px;
    `
    : ``}
`;

const UnitContent = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const FormInputError = styled.div`
  margin-top: 12px;
  color: rgb(252, 91, 91);
`;



const {
  title,
  maxTitle,
  maxMobileTitle,
  maxValue,
  value,
  unit,
  onChange,
  onClickMax,
  error,
  variant,
  disabled,
  placeholder,
  titleNormal,
} = props;

function getVariantColor() {
  if (variant === "red") return "rgb(252, 91, 91)";
  else if (variant === "green") return "rgb(0, 141, 106)";
  else if (variant === "grey") return "rgb(105, 105, 105)";
  return "#fff";
}
const variantColor = getVariantColor();

return (
  <FormInputContainer>
    <FormInputLabel>
      <FormInputTitle>{title}</FormInputTitle>
      {maxTitle && (
        <MaxContent>
          {maxMobileTitle && (
            <>
              <div className="hide-in-mobile">{maxTitle}</div>
              <div className="hide-in-pc">{maxMobileTitle}</div>
            </>
          )}
          {!maxMobileTitle && maxTitle}
          <MaxValue onClick={onClickMax} disabled={!onClickMax}>
            {maxValue}
          </MaxValue>
        </MaxContent>
      )}
    </FormInputLabel>
    <FormInputRow
      style={{
        border: `1px solid ${variantColor}`,
      }}
    >
      <input
        className="FormInput"
        style={{
          width: "100%",
          background: "transparent",
          border: "0",
          "font-size": "16px",
          "font-weight": "bold",
          color: variantColor,
          outline: "none",
          "box-shadow": "none",
          "margin-right": "16px",
          "-webkit-appearance": "none",
          "-moz-appearance": "textfield",
          cursor: disabled ? "not-allowed" : "auto",
        }}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
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
