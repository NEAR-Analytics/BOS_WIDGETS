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
const padding = props.style.padding;
const fontSize = props.style.fontSize;
const fontFamily = props.style.fontFamily;
const fontWeight = props.style.fontWeight;
const inlineStyle = props.inlineStyle;
const backgroundColor = props.style.backgroundColor;
const border = props.style.border;
const fontColor = props.style.fontColor;
const borderRadius = props.style.borderRadius;
const onClick = props.onClick ?? (() => {});
const activeColor = props.style.activeColor;
const hoverColor = props.style.hoverColor;
const width = props.style.width;
const minWidth = props.style.minWidth;

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";

const isLoading = props.isLoading ?? false;

const SimpleButton = styled.button`
  background-color: ${(props) => props.backgroundColor || "#4CAF50;"};
  border: ${(props) => props.border || "none"};
  color: ${(props) => props.fontColor || "white"};
  padding: ${(props) => props.padding || "10px 20px"};
  width: ${(props) => props.width || "100%"};
  min-width: ${(props) => props.minWidth || "40%"};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: ${(props) =>
    props.fontFamily ||
    "system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "600"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.hoverColor || "#45a049"};
  }

  &:active {
    background-color: ${(props) => props.activeColor || "#367b36"};
  }
`;

const loaderStyle = {
  marginRight: props.style.loaderMarginRight ?? "0px",
  height: props.style.loaderHeight ?? "20px",
  width: props.style.loaderWidth ?? "20px",
};
return (
  <>
    {buttonHref == "" ? (
      <SimpleButton
        type={type}
        padding={padding}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        width={width}
        minWidth={minWidth}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        hoverColor={hoverColor}
        style={inlineStyle}
        onClick={onClick}
        isDisable={isDisable}
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
      </SimpleButton>
    ) : (
      <SimpleButton
        type={type}
        padding={padding}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        width={width}
        minWidth={minWidth}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        hoverColor={hoverColor}
        style={inlineStyle}
        onClick={onClick}
        isDisable={isDisable}
        as={buttonAnchor}
        href={buttonHref}
      >
        {isLoading ? (
          <>
            <div
              className="spinner-border text-dark"
              style={loaderStyle}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : (
          <>{label}</>
        )}
      </SimpleButton>
    )}
  </>
);
