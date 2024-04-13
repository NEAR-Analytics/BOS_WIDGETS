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
const fontSize = props.style.fontSize;
const fontColor = props.style.fontColor;
const fontFamily = props.style.fontFamily;
const fontWeight = props.style.fontWeight;
const borderRadius = props.style.borderRadius;
const beforeBorderRadius = props.style.beforeBorderRadius;
const height = props.style.height;
const outline = props.style.outline;
const backgroundColor = props.style.backgroundColor;
const backgroundSize = props.style.backgroundSize;
const filter = props.style.filter;
const afterFontColor = props.style.afterFontColor;
const afterBackgroundColor = props.style.afterBackgroundColor;
const beforeBackgroundColor = props.style.beforeBackgroundColor;
const beforeWidth = props.style.beforeWidth;
const beforeHeight = props.style.beforeHeight;

const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const lableDisplay = props.style.lableDisplay;
const lableAlignItems = props.style.lableAlignItems;
const lableHeight = props.style.lableHeight;
const lableJustifyContent = props.style.lableJustifyContent;

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";
const isLoading = props.isLoading ?? false;

const GlowButton = styled.button`
  height: ${(props) => props.height || "3em"};
  width: ${(props) => props.width || "8em"};
  border: ${(props) => props.border || "none"};
  outline: ${(props) => props.outline || "none"};
  color: ${(props) => props.fontColor || "#fff"};
  background: ${(props) => props.backgroundColor || "#000"};
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: ${(props) => props.borderRadius || "10px"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "600"};
  font-family: ${(props) =>
    props.fontFamily ||
    "system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif"};

  &:before {
    content: "";
    background-image: ${(props) =>
      props.beforeBackgroundColor ||
      "linear-gradient(45deg, #5ec5c3, #177396, #1c80d5, #8a1351, #104a7b, #002bff, #7a00ff, #9422a8, #36ffea)"};
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: ${(props) => props.backgroundSize || "400%"};
    z-index: -1;
    filter: ${(props) => props.filter || "blur(5px)"};
    width: ${(props) => props.beforeWidth || "calc(100% + 4px)"};
    height: ${(props) => props.beforeHeight || "calc(100% + 4px)"};
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: ${(props) => props.beforeBorderRadius || "10px"};
  }

  &:active {
    color: ${(props) => props.afterFontColor || "#fff"};
  }

  &:active:after {
    background: transparent;
  }

  &:hover:before {
    opacity: 1;
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${(props) => props.afterBackgroundColor || "#111"};
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const Label = styled.div`
  display: ${(props) => props.lableDisplay || "flex"};
  align-items: ${(props) => props.lableAlignItems || "center"};
  height: ${(props) => props.lableHeight || "100%"};
  justify-content: ${(props) => props.lableJustifyContent || "center"};
  text-decoration: "none";
`;

const loaderStyle = {
  marginRight: props.style.loaderMarginRight ?? "10px",
  height: props.style.loaderHeight ?? "30px",
  width: props.style.loaderWidth ?? "30px",
};
return (
  <>
    {buttonHref == "" ? (
      <GlowButton
        width={width}
        height={height}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        backgroundColor={backgroundColor}
        backgroundSize={backgroundSize}
        beforeBackgroundColor={beforeBackgroundColor}
        afterBackgroundColor={afterBackgroundColor}
        afterFontColor={afterFontColor}
        border={border}
        beforeWidth={beforeWidth}
        beforeHeight={beforeHeight}
        outline={outline}
        filter={filter}
        fontColor={fontColor}
        borderRadius={borderRadius}
        beforeBorderRadius={beforeBorderRadius}
        hoverColor={hoverColor}
        style={inlineStyle}
        onClick={onClick}
        type={type}
        disabled={isDisable}
      >
        <Label
          lableHeight={lableHeight}
          lableDisplay={lableDisplay}
          lableAlignItems={lableAlignItems}
          lableJustifyContent={lableJustifyContent}
        >
          {" "}
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
        </Label>
      </GlowButton>
    ) : (
      <GlowButton
        width={width}
        height={height}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        backgroundColor={backgroundColor}
        backgroundSize={backgroundSize}
        beforeBackgroundColor={beforeBackgroundColor}
        afterBackgroundColor={afterBackgroundColor}
        afterFontColor={afterFontColor}
        border={border}
        beforeWidth={beforeWidth}
        beforeHeight={beforeHeight}
        outline={outline}
        filter={filter}
        fontColor={fontColor}
        borderRadius={borderRadius}
        beforeBorderRadius={beforeBorderRadius}
        hoverColor={hoverColor}
        style={inlineStyle}
        onClick={onClick}
        type={type}
        disabled={isDisable}
        as={buttonAnchor}
        href={buttonHref}
      >
        <Label
          lableHeight={lableHeight}
          lableDisplay={lableDisplay}
          lableAlignItems={lableAlignItems}
          lableJustifyContent={lableJustifyContent}
        >
          {" "}
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
        </Label>
      </GlowButton>
    )}
  </>
);
