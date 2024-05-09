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
const iconSize = props.iconSize ?? "30px";
const type = props.style.type ?? "button";
const isDisable = props.isDisable ?? false;

const badgeTop = props.badge.style.top ?? "40%";
const badgeCount = props.badge.badgeCount;
const minHeight = props.badge.style.minHeight ?? "20px";
const badgeWidth = props.badge.style.minWidth ?? "20px";
const badgeBorder = props.badge.style.badgeBorder;
const badgeFontColor = props.badge.style.fontColor;
const badgeBackground = props.badge.style.background;

const onClick = props.onClick ?? (() => {});
const inlineStyle = props.inlineStyle;

const buttonHref = props.buttonHref ?? "";
const buttonAnchor = props.buttonAnchor ?? "a";

const iconColor = props.iconColor ?? "#0d6efd";
const isLoading = props.isLoading ?? false;

const SpanStyle = styled.button`
  top: ${(props) => props.badgeTop || "40%"};
  border: ${(props) => props.badgeBorder || "none"};
  min-height: ${(props) => props.minHeight || "20px"};
  min-width: ${(props) => props.minWidth || "20px"};
  color: ${(props) => props.fontColor || "#fff"};
  background: ${(props) => props.background || "#dc3545"};
`;

const loaderStyle = {
  marginRight: props.style.loaderMarginRight ?? "10px",
  height: props.style.loaderHeight ?? "30px",
  width: props.style.loaderWidth ?? "30px",
};
return (
  <>
    {buttonHref == "" ? (
      <>
        <Widget
          src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
          props={{
            iconName: icon,
            iconSize: iconSize,
            iconColor: iconColor,
          }}
        />
        <SpanStyle
          className="position-absolute start-80 translate-middle badge rounded-pill"
          badgeTop={badgeTop}
          minHeight={minHeight}
          minWidth={badgeWidth}
          badgeBorder={badgeBorder}
          fontColor={badgeFontColor}
          background={badgeBackground}
          style={inlineStyle}
          onClick={onClick}
          disabled={isDisable}
        >
          {badgeCount}
        </SpanStyle>
      </>
    ) : (
      <>
        <a
          href={buttonHref}
          cursor="pointer"
          style={{ textDecoration: "none" }}
        >
          <Widget
            src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
            props={{
              iconName: icon,
              iconSize: iconSize,
              iconColor: iconColor,
            }}
          />
        </a>

        <SpanStyle
          className="position-absolute start-80 translate-middle badge rounded-pill"
          badgeTop={badgeTop}
          minHeight={minHeight}
          minWidth={badgeWidth}
          badgeBorder={badgeBorder}
          fontColor={badgeFontColor}
          background={badgeBackground}
          style={inlineStyle}
          onClick={onClick}
          disabled={isDisable}
          as={buttonAnchor}
          href={buttonHref}
        >
          {badgeCount}
        </SpanStyle>
      </>
    )}
  </>
);
