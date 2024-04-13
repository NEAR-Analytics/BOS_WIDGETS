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
const label = props.inputTitle ?? "Title";
const type = props.type ?? "text";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const validate = props.validate ?? (() => {});
const autofocus = props.autofocus ?? false;
const placeholder = props.placeholder ?? "Placeholder";
const required = props.required ?? false;
const isDisable = props.isDisable ?? false;
const error = props.error ?? "";

const width = props.style.width;
const height = props.style.height;
const padding = props.style.padding;
const fontSize = props.style.fontSize;
const fontColor = props.style.fontColor;

const backgroundColor = props.style.backgroundColor;
const border = props.style.border;
const borderRadius = props.style.borderRadius;
const boxShadow = props.style.boxShadow;
/* ---------------------------------- error --------------------------------- */
const errorFontWeight = props.style.errorFontWeight;
const errorFontSize = props.style.errorFontSize;
const errorLineHeight = props.style.errorLineHeight;
const errorFontColor = props.style.errorFontColor;
const errorHeight = props.style.errorHeight;
const errorShowHeight = props.style.errorShowHeight;
/* ---------------------------------- error --------------------------------- */

/* ---------------------------------- label --------------------------------- */
const labelFontColor = props.style.labelFontColor;
const labelFontSize = props.style.labelFontSize;
const labelFontWeight = props.style.labelFontWeight;
const labelLineHeight = props.style.labelLineHeight;
const labelMinWidth = props.style.labelMinWidth;
/* ---------------------------------- label --------------------------------- */

/* ---------------------------------- Input --------------------------------- */
const borderTopLeftRadius = props.borderTopLeftRadius;
const borderBottomLeftRadius = props.borderBottomLeftRadius ?? "0";
const borderLeft = props.borderLeft ?? "none";
/* ---------------------------------- Input --------------------------------- */

/* ---------------------------------- Addon --------------------------------- */
const borderTopRightRadius = props.borderTopRightRadius;
const borderBottomRightRadius = props.borderBottomRightRadius;

const addonBorderTopLeftRadius = props.addonBorderTopLeftRadius;
const addonBorderBottomLeftRadius = props.addonBorderBottomLeftRadius;

const addonBorder = props.style.addonBorder;
const addonBorderRadius = props.style.addonBorderRadius;
const addonBackground = props.style.addonBackground;
const addonPadding = props.style.addonPadding;
const addonJustifyContent = props.style.addonJustifyContent;
const addonWidth = props.style.addonWidth;
const addonHeight = props.style.addonHeight;
const addonMinHeight = props.style.addonMinHeight;
const addonFocusBorder = props.style.addonFocusBorder;
/* ---------------------------------- Addon --------------------------------- */

const labelSide = props.labelSide ?? "";

const iconSize = props.iconSize ?? "16px";
const iconColor = props.iconColor ?? "#0d6efd";
const iconSide = props.iconSide ?? "";
const icon = props.icon ?? "exclamation-circle-fill";

const inlineStyle = props.inlineStyle;

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
  display: flex;
  flex-wrap: nowrap;
`;

const Addon = styled.span`
  border: ${(props) => props.addonBorder || "1.5px solid #e2e2e2"};
  border-radius: ${(props) => props.addonBorderRadius || "5px"};
  background: ${(props) => props.addonBackground || "none"};
  padding: ${(props) => props.addonPadding || "0.5em 0.75em"};
  display: flex;
  justify-content: ${(props) => props.addonJustifyContent || "center"};
  width: ${(props) => props.addonWidth || "18%"};
  height: ${(props) => props.addonHeight || "100%"};
  min-height: ${(props) => props.addonMinHeight || "38px"};
  border-top-right-radius: ${(props) => props.borderTopRightRadius || "0"};
  border-bottom-right-radius: ${(props) =>
    props.borderBottomRightRadius || "0"};
  border-top-left-radius: ${(props) => props.addonBorderTopLeftRadius || ""};
  border-bottom-left-radius: ${(props) =>
    props.addonBorderBottomLeftRadius || ""};

  &:focus {
    outline: none;
    border: ${(props) => props.addonFocusBorder || "1.5px solid #1a73e8"};
  }
`;

const Input = {
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: padding ?? "0.5em 0.75em",
  gap: "0.5em",
  textDecoration: "none",
  border: border ?? "1px solid #d0d5dd",
  boxShadow: boxShadow ?? "0px 1px 2px rgba(16, 24, 40, 0.05)",
  color: fontColor ?? "#101828",
  width: width ?? "100%",

  borderRadius: borderRadius ?? "0px",
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
            labelFontColor={labelFontColor}
            labelFontSize={labelFontSize}
            labelFontWeight={labelFontWeight}
            labelLineHeight={labelLineHeight}
            labelMinWidth={labelMinWidth}
          >
            {label} {required && <Error className="show">*Required</Error>}
          </Label>
          <div className="row">
            <InputGroup>
              {iconSide == "end" ? (
                <>
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
                    height={height}
                    style={Input}
                  />
                  <Addon
                    borderBottomRightRadius="5px"
                    borderTopRightRadius="5px"
                    addonBorderBottomLeftRadius="0"
                    addonBorderTopLeftRadius="0"
                    addonBorder={addonBorder}
                    addonBorderRadius={addonBorderRadius}
                    addonBackground={addonBackground}
                    addonPadding={addonPadding}
                    addonJustifyContent={addonJustifyContent}
                    addonWidth={addonWidth}
                    addonHeight={addonHeight}
                    addonMinHeight={addonMinHeight}
                    addonFocusBorder={addonFocusBorder}
                  >
                    <Widget
                      src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                      props={{
                        iconName: icon,
                        iconSize: iconSize,
                        iconColor: iconColor,
                      }}
                    />
                  </Addon>
                </>
              ) : (
                <>
                  <Addon
                    addonBorder={addonBorder}
                    addonBorderRadius={addonBorderRadius}
                    addonBackground={addonBackground}
                    addonPadding={addonPadding}
                    addonJustifyContent={addonJustifyContent}
                    addonWidth={addonWidth}
                    addonHeight={addonHeight}
                    addonMinHeight={addonMinHeight}
                    addonFocusBorder={addonFocusBorder}
                  >
                    <Widget
                      src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                      props={{
                        iconName: icon,
                        iconSize: iconSize,
                        iconColor: iconColor,
                      }}
                    />
                  </Addon>
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
                    height={height}
                    style={Input}
                  />
                </>
              )}
            </InputGroup>
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
      <>
        <Container>
          <Label
            labelFontColor={labelFontColor}
            labelFontSize={labelFontSize}
            labelFontWeight={labelFontWeight}
            labelLineHeight={labelLineHeight}
            labelMinWidth={labelMinWidth}
          >
            {label} {required && <Error className="show">*Required</Error>}
          </Label>
          <div className="row">
            <InputGroup>
              {iconSide == "end" ? (
                <>
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
                    height={height}
                    style={Input}
                  />
                  <Addon
                    borderBottomRightRadius="5px"
                    borderTopRightRadius="5px"
                    addonBorderBottomLeftRadius="0"
                    addonBorderTopLeftRadius="0"
                    addonBorder={addonBorder}
                    addonBorderRadius={addonBorderRadius}
                    addonBackground={addonBackground}
                    addonPadding={addonPadding}
                    addonJustifyContent={addonJustifyContent}
                    addonWidth={addonWidth}
                    addonHeight={addonHeight}
                    addonMinHeight={addonMinHeight}
                    addonFocusBorder={addonFocusBorder}
                  >
                    <Widget
                      src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                      props={{
                        iconName: icon,
                        iconSize: iconSize,
                        iconColor: iconColor,
                      }}
                    />
                  </Addon>
                </>
              ) : (
                <>
                  <Addon
                    addonBorder={addonBorder}
                    addonBorderRadius={addonBorderRadius}
                    addonBackground={addonBackground}
                    addonPadding={addonPadding}
                    addonJustifyContent={addonJustifyContent}
                    addonWidth={addonWidth}
                    addonHeight={addonHeight}
                    addonMinHeight={addonMinHeight}
                    addonFocusBorder={addonFocusBorder}
                  >
                    <Widget
                      src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                      props={{
                        iconName: icon,
                        iconSize: iconSize,
                        iconColor: iconColor,
                      }}
                    />
                  </Addon>
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
                    height={height}
                    style={Input}
                  />
                </>
              )}
            </InputGroup>
          </div>
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
      </>
    )}
  </div>
);
