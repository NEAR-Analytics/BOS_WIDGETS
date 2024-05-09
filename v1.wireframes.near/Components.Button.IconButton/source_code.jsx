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

const icon = props.icon ?? "";
const iconSize = props.iconSize ?? "20px";
const type = props.style.type ?? "button";
const isDisable = props.isDisable ?? false;
const iconColor = props.iconColor ?? "#0d6efd";

const width = props.style.width;
const height = props.style.height;
const minHeight = props.style.minHeight;
const minWidth = props.style.minWidth;
const border = props.style.border;
const padding = props.style.padding;
const fontSize = props.style.fontSize;
const fontColor = props.style.fontColor;
const fontFamily = props.style.fontFamily;
const fontWeight = props.style.fontWeight;
const borderRadius = props.style.borderRadius;
const lineHeight = props.style.lineHeight;
const boxshadow = props.style.boxshadow;
const backgroundColor = props.style.backgroundColor;
const activeBoxShadow = props.style.activeBoxShadow;
const hoverBoxShadow = props.style.hoverBoxShadow;
const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";

const IconButton = styled.button`
  align-items: center;
  background-clip: padding-box;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border: ${(props) => props.border || "1px solid transparent"};
  border-radius: ${(props) => props.borderRadius || "100%"};
  box-shadow: ${(props) =>
    props.boxshadow || "rgba(0, 0, 0, 0.02) 0 1px 3px 0"};
  box-sizing: border-box;
  color: ${(props) => props.fontColor || "#fff"};
  cursor: pointer;
  display: inline-flex;
  font-family: ${(props) =>
    props.fontFamily ||
    "system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "600"};
  justify-content: center;
  line-height: ${(props) => props.lineHeight || "1.25"};
  padding: ${(props) => props.padding || "5px 3px"};
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  min-height: ${(props) => props.minHeight || "39px"};
  min-width: ${(props) => props.minWidth || "40px"};
  &:hover,
  &:focus {
    box-shadow: ${(props) =>
      props.hoverBoxShadow || "rgba(0, 0, 0, 0.1) 0 4px 12px"};
  }

  &:active {
    box-shadow: ${(props) =>
      props.activeBoxShadow || "rgba(0, 0, 0, .06) 0 2px 4px"};
    transform: translateY(0);
  }
`;

const isLoading = props.isLoading ?? false;
const loaderStyle = {
  marginRight: props.style.loaderMarginRight ?? "0px",
  height: props.style.loaderHeight ?? "30px",
  width: props.style.loaderWidth ?? "30px",
};

return (
  <>
    {buttonHref == "" ? (
      <IconButton
        type={type}
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        hoverColor={hoverColor}
        style={inlineStyle}
        activeBoxShadow={activeBoxShadow}
        hoverBoxShadow={hoverBoxShadow}
        boxshadow={boxshadow}
        fontFamily={fontFamily}
        width={width}
        height={height}
        minHeight={minHeight}
        minWidth={minWidth}
        lineHeight={lineHeight}
        disabled={isDisable}
        onClick={onClick}
        icon={icon}
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
          <>
            <Widget
              src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
              props={{
                iconName: icon,
                iconSize: iconSize,
                iconColor: iconColor,
              }}
            />
          </>
        )}
      </IconButton>
    ) : (
      <IconButton
        type={type}
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        hoverColor={hoverColor}
        style={inlineStyle}
        activeBoxShadow={activeBoxShadow}
        hoverBoxShadow={hoverBoxShadow}
        boxshadow={boxshadow}
        fontFamily={fontFamily}
        width={width}
        height={height}
        minHeight={minHeight}
        minWidth={minWidth}
        lineHeight={lineHeight}
        disabled={isDisable}
        onClick={onClick}
        icon={icon}
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
          <>
            <Widget
              src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
              props={{
                iconName: icon,
                iconSize: iconSize,
                iconColor: iconColor,
              }}
            />
          </>
        )}
      </IconButton>
    )}
  </>
);
