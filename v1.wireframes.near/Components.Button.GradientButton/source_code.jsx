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


const label = props.buttonTitle ?? "Title";
const type = props.style.type ?? "button";
const isDisable = props.isDisable ?? false;

const width = props.style.width;
const border = props.style.border;
const padding = props.style.padding;
const fontSize = props.style.fontSize;
const fontColor = props.style.fontColor;
const fontFamily = props.style.fontFamily;
const fontWeight = props.style.fontWeight;
const borderRadius = props.style.borderRadius;
const height = props.style.height;
const borderStyle = props.style.borderStyle;
const backgroundColor = props.style.backgroundColor;
const boxShadow = props.style.boxShadow;
const textShadow = props.style.textShadow;

const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";
const isLoading = props.isLoading ?? false;

const GradientButton = styled.button`
  width: ${(props) => props.width || "100%"};
  background-image: ${(props) =>
    props.backgroundColor ||
    "linear-gradient(220deg, #003973, #E5E5BE 180%, #003973 30%)"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  border-style: ${(props) => props.borderStyle || "none"};
  box-sizing: border-box;
  color: ${(props) => props.fontColor || "#fff"};
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${(props) =>
    props.fontFamily ||
    "system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "600"};
  height: ${(props) => props.height || "3rem"};
  padding: ${(props) => props.padding || "10px 20px"};
  text-align: center;
  text-shadow: ${(props) =>
    props.textShadow || "rgba(0, 0, 0, 0.25) 0 3px 8px"};
  transition: all 0.5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: ${(props) => props.boxShadow || "rgb(0,57,115) 0 1px 30px"};
    transition-duration: 0.1s;
  }
`;

const loaderStyle = {
  marginRight: props.style.loaderMarginRight ?? "10px",
  height: props.style.loaderHeight ?? "30px",
  width: props.style.loaderWidth ?? "30px",
};
return (
  <>
    {buttonHref == "" ? (
      <GradientButton
        width={width}
        padding={padding}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        height={height}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        textShadow={textShadow}
        boxShadow={boxShadow}
        borderStyle={borderStyle}
        style={inlineStyle}
        onClick={onClick}
        type={type}
        disabled={isDisable}
      >
        {isLoading ? (
          <>
            <div
              className="spinner-border text-light"
              style={loaderStyle}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : (
          <>{label}</>
        )}
      </GradientButton>
    ) : (
      <GradientButton
        width={width}
        padding={padding}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        height={height}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        textShadow={textShadow}
        boxShadow={boxShadow}
        borderStyle={borderStyle}
        style={inlineStyle}
        onClick={onClick}
        type={type}
        disabled={isDisable}
        as={buttonAnchor}
        href={buttonHref}
      >
        {isLoading ? (
          <>
            <div
              className="spinner-border text-light"
              style={loaderStyle}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : (
          <>{label}</>
        )}
      </GradientButton>
    )}
  </>
);
