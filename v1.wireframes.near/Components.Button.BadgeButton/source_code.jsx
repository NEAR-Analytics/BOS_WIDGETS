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
const BadgeButton = styled.button`
  background-color: ${(props) =>
    props.backgroundColor || "#4CAF50;"}; /* Green */
  border: ${(props) => props.border || "none"};
  color: ${(props) => props.fontColor || "#fff"};
  padding: ${(props) => props.padding || "10px 12px"};
  width: ${(props) => props.width || "100%"};
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

const SpanStyle = styled.button`
  top: ${(props) => props.badgeTop || "35%"};
  border: ${(props) => props.badgeBorder || "none"};
`;

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
const backgroundColor = props.style.backgroundColor;
const hoverColor = props.style.hoverColor;
const activeColor = props.style.activeColor;

const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const badgeTop = props.badge.style.top ?? "35%";
const badgeCount = props.badge.badgeCount;
const badgeBorder = props.badge.style.badgeBorder;

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";
const isLoading = props.isLoading ?? false;
const loaderStyle = {
  marginRight: props.style.loaderMarginRight ?? "10px",
  height: props.style.loaderHeight ?? "30px",
  width: props.style.loaderWidth ?? "30px",
};

return (
  <>
    {buttonHref == "" ? (
      <BadgeButton
        padding={padding}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        width={width}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        hoverColor={hoverColor}
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
          <>
            {label}
            <SpanStyle
              className="position-absolute start-80 translate-middle badge rounded-pill bg-danger"
              badgeTop={badgeTop}
              badgeBorder={badgeBorder}
            >
              {badgeCount}
            </SpanStyle>
          </>
        )}
      </BadgeButton>
    ) : (
      <BadgeButton
        padding={padding}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        width={width}
        backgroundColor={backgroundColor}
        border={border}
        fontColor={fontColor}
        borderRadius={borderRadius}
        activeColor={activeColor}
        hoverColor={hoverColor}
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
          <>
            {label}
            <SpanStyle
              className="position-absolute start-80 translate-middle badge rounded-pill bg-danger"
              badgeTop={badgeTop}
              badgeBorder={badgeBorder}
            >
              {badgeCount}
            </SpanStyle>
          </>
        )}
      </BadgeButton>
    )}
  </>
);
