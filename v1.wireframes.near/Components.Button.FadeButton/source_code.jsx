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
const backgroundColor = props.style.backgroundColor;
const boxshadow = props.style.boxshadow;
const activeColor = props.style.activeColor;
const activeBoxShadow = props.style.activeBoxShadow;
const hoverColor = props.style.hoverColor;
const hoverBoxShadow = props.style.hoverBoxShadow;

const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";
const isLoading = props.isLoading ?? false;

const FadeButton = styled.button`
  align-items: center;
  background-clip: padding-box;
  background-color: ${(props) => props.backgroundColor || "#fa6400"};
  border: ${(props) => props.border || "1px solid transparent"};
  border-radius: ${(props) => props.borderRadius || ".25rem"};
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
  padding: ${(props) =>
    props.padding || "calc(.875rem - 1px) calc(1.5rem - 1px)"};
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: ${(props) => props.width || "auto"};
  &:hover,
  &:focus {
    background-color: ${(props) => props.hoverColor || "#fb8332"};
    box-shadow: ${(props) =>
      props.hoverBoxShadow || "rgba(0, 0, 0, 0.1) 0 4px 12px"};
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${(props) => props.activeColor || "#c85000"};
    box-shadow: ${(props) =>
      props.activeBoxShadow || "rgba(0, 0, 0, .06) 0 2px 4px"};
    transform: translateY(0);
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
      <FadeButton
        type={type}
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        hoverColor={hoverColor}
        style={inlineStyle}
        activeBoxShadow={activeBoxShadow}
        hoverBoxShadow={hoverBoxShadow}
        boxshadow={boxshadow}
        fontFamily={fontFamily}
        width={width}
        lineHeight={lineHeight}
        disabled={isDisable}
        onClick={onClick}
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
      </FadeButton>
    ) : (
      <FadeButton
        type={type}
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        hoverColor={hoverColor}
        style={inlineStyle}
        activeBoxShadow={activeBoxShadow}
        hoverBoxShadow={hoverBoxShadow}
        boxshadow={boxshadow}
        fontFamily={fontFamily}
        width={width}
        lineHeight={lineHeight}
        disabled={isDisable}
        onClick={onClick}
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
      </FadeButton>
    )}
  </>
);
