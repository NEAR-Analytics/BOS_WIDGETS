/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */

/* -------------------------------------------------------------------------- */

const name = props.name ?? "inputField";
const label = props.inputTitle ?? "";
const type = props.type ?? "text";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const validate = props.validate ?? (() => {});
const autofocus = props.autofocus ?? false;
const placeholder = props.placeholder;
const required = props.required ?? false;
const isDisable = props.isDisable ?? false;
const error = props.error ?? "";

const width = props.style.width;
const padding = props.style.padding;
const border = props.style.border;
const fontSize = props.style.fontSize;
const fontColor = props.style.fontColor;
const borderRadius = props.style.borderRadius;
const borderShadow = props.style.borderShadow;

const inlineStyle = props.inlineStyle;

const errorFontWeight = props.style.errorFontWeight;
const errorFontSize = props.style.errorFontSize;
const errorLineHeight = props.style.errorLineHeight;
const errorFontColor = props.style.errorFontColor;
const errorHeight = props.style.errorHeight;
const errorShowHeight = props.style.errorShowHeight;

const labelFontSize = props.style.labelFontSize;
const labelFontWeight = props.style.labelFontWeight;
const labelLineHeight = props.style.labelLineHeight;
const labelMinWidth = props.style.labelMinWidth;
const labelFontColor = props.style.labelFontColor;

const labelSide = props.labelSide ?? "";

const style = props.style ?? Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;
const MainContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: ${(props) => props.labelFontWeight || "600"};
  font-size: ${(props) => props.labelFontSize || "0.95em"};
  line-height: ${(props) => props.labelLineHeight || "1.25"};
  min-width: ${(props) => props.labelMinWidth || "18%"};
  color: ${(props) => props.labelFontColor || "#000"};
`;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: ${(props) => props.errorFontWeight || "400"};
  font-size: ${(props) => props.errorFontSize || "0.75em"};
  line-height: ${(props) => props.errorLineHeight || "1.25em"};
  color: ${(props) => props.errorFontColor || "#ff4d4f"};
  height: ${(props) => props.errorHeight || "0px"};
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: ${(props) => props.errorShowHeight || "auto"};
  }
`;

if (props.type == "number") {
  const min = props.min;
  const max = props.max;
  const pattern = props.pattern;
} else {
  const min = props.min ?? "";
  const max = props.max ?? "";
  const pattern = props.pattern ?? "";
}

const Input = {
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: padding ?? "0.5em 0.75em",
  gap: "0.5em",
  textDecoration: "none",
  border: border ?? "1px solid #d0d5dd",
  boxShadow: borderShadow ?? "0px 1px 2px rgba(16, 24, 40, 0.05)",
  borderRadius: borderRadius ?? "4px",
  fontColor: fontColor ?? "#000",
  width: width ?? "100%",
  fontSize: fontSize ?? "16px",
};

const [inputValue, setInputValue] = useState(value);
const [debouncedInputValue, setDebouncedInputValue] = useState(value);

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

useEffect(() => {
  const timeoutId = setTimeout(() => {
    onChange(inputValue);
  }, 900);
  return () => clearTimeout(timeoutId);
}, [inputValue, 1000]);

return (
  <div>
    {labelSide == "start" ? (
      <>
        <MainContainer>
          <Label
            labelFontSize={labelFontSize}
            labelFontColor={labelFontColor}
            labelFontWeight={labelFontWeight}
            labelLineHeight={labelLineHeight}
            labelMinWidth={labelMinWidth}
          >
            {label} {required && <Error className="show">*Required</Error>}
          </Label>
          <div className="row">
            <input
              type={type}
              name={name}
              autoComplete="off"
              autofocus={autofocus}
              placeholder={placeholder}
              onBlur={() => validate()}
              value={inputValue}
              onChange={handleInputChange}
              required={required}
              readOnly={isDisable}
              style={style}
            />
            <Error
              className={error ? "show" : ""}
              errorFontSize={errorFontSize}
              errorFontWeight={errorFontWeight}
              errorFontColor={errorFontColor}
              errorLineHeight={errorLineHeight}
              errorHeight={errorHeight}
              errorShowHeight={errorShowHeight}
            >
              {error}
            </Error>
          </div>
        </MainContainer>
      </>
    ) : (
      <Container>
        <Label
          labelFontSize={labelFontSize}
          labelFontColor={labelFontColor}
          labelFontWeight={labelFontWeight}
          labelLineHeight={labelLineHeight}
          labelMinWidth={labelMinWidth}
        >
          {label} {required && <Error className="show">*Required</Error>}
        </Label>
        <input
          type={type}
          name={name}
          autoComplete="off"
          autofocus={autofocus}
          placeholder={placeholder}
          onBlur={() => validate()}
          value={inputValue}
          onChange={handleInputChange}
          required={required}
          readOnly={isDisable}
          style={style}
        />

        <Error
          className={error ? "show" : ""}
          errorFontSize={errorFontSize}
          errorFontWeight={errorFontWeight}
          errorFontColor={errorFontColor}
          errorLineHeight={errorLineHeight}
          errorHeight={errorHeight}
          errorShowHeight={errorShowHeight}
        >
          {error}
        </Error>
      </Container>
    )}
  </div>
);
