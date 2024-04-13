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
const textShadow = props.style.textShadow;
const hoverColor = props.style.hoverColor;
const activeColor = props.style.activeColor;

const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";
const isLoading = props.isLoading ?? false;

const LinkButton = styled.button`
  width: ${(props) => props.width || "100%"};
  background-color: ${(props) => props.backgroundColor || "#0d6efd"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  border-style: ${(props) => props.borderStyle || "none"};
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
    transition-duration: 0.1s;
    background-color: ${(props) => props.hoverColor || "#0451c2"};
  }

  &:active {
    background-color: ${(props) => props.activeColor || "#0451c2"};
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
      <LinkButton
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
        activeColor={activeColor}
        hoverColor={hoverColor}
        textShadow={textShadow}
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
      </LinkButton>
    ) : (
      <LinkButton
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
        activeColor={activeColor}
        hoverColor={hoverColor}
        textShadow={textShadow}
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
      </LinkButton>
    )}
  </>
);
