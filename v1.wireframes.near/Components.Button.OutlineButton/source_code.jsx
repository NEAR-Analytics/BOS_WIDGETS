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
const lineHeight = props.style.lineHeight;
const margin = props.style.margin;
const backgroundColor = props.style.backgroundColor;
const hoverColor = props.style.hoverColor;
const hoverFontColor = props.style.hoverFontColor;
const activeColor = props.style.activeColor;
const activeFontColor = props.style.activeFontColor;
const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";
const isLoading = props.isLoading ?? false;

const OutlineButton = styled.button`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border: ${(props) => props.border || "1px solid #000"};
  color: ${(props) => props.fontColor || "#000"};
  border-radius: ${(props) => props.borderRadius || "8px"};
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: ${(props) =>
    props.fontFamily ||
    "system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "600"};
  line-height: ${(props) => props.lineHeight || "20px"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "13px 23px"};
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  user-select: none;
  -webkit-user-select: none;
  width: ${(props) => props.width || "auto"};

  &:hover {
    background-color: ${(props) => props.hoverColor || "#0d6efd"};
    color: ${(props) => props.hoverFontColor || "#FFF"};
  }

  &:active {
    background-color: ${(props) => props.activeColor || "#0d6efd"};
    color: ${(props) => props.activeFontColor || "#FFF"};
  }
`;

const loaderStyle = {
  marginRight: props.style.loaderMarginRight ?? "0px",
  height: props.style.loaderHeight ?? "19px",
  width: props.style.loaderWidth ?? "19px",
};
return (
  <>
    {buttonHref == "" ? (
      <OutlineButton
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        lineHeight={lineHeight}
        margin={margin}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        activeFontColor={activeFontColor}
        hoverColor={hoverColor}
        hoverFontColor={hoverFontColor}
        style={inlineStyle}
        onClick={onClick}
        width={width}
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
      </OutlineButton>
    ) : (
      <OutlineButton
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        lineHeight={lineHeight}
        margin={margin}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        activeFontColor={activeFontColor}
        hoverColor={hoverColor}
        hoverFontColor={hoverFontColor}
        style={inlineStyle}
        onClick={onClick}
        width={width}
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
      </OutlineButton>
    )}
  </>
);
