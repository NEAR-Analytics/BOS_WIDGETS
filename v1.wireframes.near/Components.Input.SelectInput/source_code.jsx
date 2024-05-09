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
const autofocus = props.autofocus ?? false;
const placeholder = props.placeholder;
const required = props.required ?? false;
const isDisable = props.isDisable ?? false;
const error = props.error ?? "";

const width = props.style.width;
const inlineStyle = props.inlineStyle;

const errorFontWeight = props.style.errorFontWeight;
const errorFontSize = props.style.errorFontSize;
const errorLineHeight = props.style.errorLineHeight;
const errorFontColor = props.style.errorFontColor;
const errorHeight = props.style.errorHeight;

const labelFontSize = props.style.labelFontSize;
const labelFontWeight = props.style.labelFontWeight;
const labelLineHeight = props.style.labelLineHeight;

const inputMarginBottom = props.style.inputMarginBottom;

const select = props.options;

const labelSide = props.labelSide ?? "";

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
const InputGroup = styled.div`
  flex-wrap: nowrap;
  margin-bottom: ${(props) => props.inputMarginBottom || "1rem"};
`;

const Select = styled.select`
  width: ${(props) => props.width || "20rem"};
`;

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
        <InputGroup inputMarginBottom={inputMarginBottom}>
          <Select
            type={type}
            name={name}
            autoComplete="off"
            autofocus={autofocus}
            placeholder={placeholder}
            onBlur={() => validate()}
            onValueChange={(value) =>
              onChange(options.find((option) => option.value === value))
            }
            required={required}
            readOnly={isDisable}
            style={style}
            className="form-select"
          >
            <option selected>{placeholder}</option>
            {select.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
          <p className="mt-1">
            <Error
              className={error ? "show" : ""}
              errorFontSize={errorFontSize}
              errorFontWeight={errorFontWeight}
              errorFontColor={errorFontColor}
              errorLineHeight={errorLineHeight}
              errorHeight={errorHeight}
            >
              {error}
            </Error>
          </p>
        </InputGroup>
      </MainContainer>
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
        <InputGroup inputMarginBottom={inputMarginBottom}>
          <Select
            type={type}
            name={name}
            autoComplete="off"
            autofocus={autofocus}
            placeholder={placeholder}
            onBlur={() => validate()}
            onValueChange={(value) =>
              onChange(options.find((option) => option.value === value))
            }
            required={required}
            readOnly={isDisable}
            style={style}
            className="form-select"
          >
            <option selected>{placeholder}</option>
            {select.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
          <p className="mt-1">
            <Error
              className={error ? "show" : ""}
              errorFontSize={errorFontSize}
              errorFontWeight={errorFontWeight}
              errorFontColor={errorFontColor}
              errorLineHeight={errorLineHeight}
              errorHeight={errorHeight}
            >
              {error}
            </Error>
          </p>
        </InputGroup>
      </Container>
    )}
  </div>
);
