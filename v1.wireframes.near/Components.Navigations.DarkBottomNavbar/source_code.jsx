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

const bottomNavDisplay = props.style.bottomNavDisplay ?? "flex";
const bottomNavJustifyContent =
  props.style.bottomNavJustifyContent ?? "space-around";
const bottomNavBackgroundColor = props.style.bottomNavBackgroundColor ?? "#333";
const bottomNavBottom = props.style.bottomNavBottom ?? "0px";
const bottomNavWidth = props.style.bottomNavWidth ?? "100%";
const bottomNavHeight = props.style.bottomNavHeight ?? "10vh";

const navItemDisplay = props.style.navItemDisplay ?? "flex";
const navItemAlignItems = props.style.navItemAlignItems ?? "center";
const navItemFontColor = props.style.navItemFontColor ?? "#fff";
const navItemPadding = props.style.navItemPadding ?? "12px 16px";
const navItemBorderRadius = props.style.navItemBorderRadius ?? "50px";
const navItemBackgroundColor =
  props.style.navItemBackgroundColor ?? "rgba(255, 255, 255, 0)";

const focusFontColor = props.style.focusFontColor ?? "#fff";
const focusBackgroundColor =
  props.style.focusBackgroundColor ?? "rgba(255, 255, 255, 0.2)";

const spanWidth = props.style.spanWidth ?? "100%";
const spanMarginLeft = props.style.spanMarginLeft ?? "8px";

const navSpanWidth = props.style.navSpanWidth ?? "0px";

const navBottom = props.style.navBottom ?? "-25px";
const navBorderRadius = props.style.navBorderRadius ?? "50%";
const navTransition = props.style.navTransition ?? "left 1s";
const navDisplay = props.style.navDisplay ?? "none";

const navContainerStyle = props.navContainerStyle;

const NavContainer = styled.div`
  display: ${bottomNavDisplay};
  justify-content: ${bottomNavJustifyContent};
  background-color: ${bottomNavBackgroundColor};
  bottom: ${bottomNavBottom};
  width: ${bottomNavWidth};
  height: ${bottomNavHeight};
`;

const NavItem = styled.a`
  display: ${navItemDisplay};
  align-items: ${navItemAlignItems};
  text-decoration: none;
  color: ${navItemFontColor};
  padding: ${navItemPadding};
  border-radius: ${navItemBorderRadius};
  background-color: ${navItemBackgroundColor};

  &:focus {
    text-decoration: none;
    color: ${focusFontColor};
    background-color: ${focusBackgroundColor};
    transition: 0.2s;

    span {
      width: ${spanWidth};
      margin-left: ${spanMarginLeft};
      transition: 0.2s;
    }
  }
`;

const Div = styled.div`
  bottom: ${navBottom};
  border-radius: ${navBorderRadius};
  transition: ${navTransition};
  display: ${navDisplay};
`;

const NavSpan = styled.span`
  width: ${navSpanWidth};
  overflow: hidden;
`;

const linksData = props.linksData ?? [];
const selectedButton = props.selectedButton;
const setSelectedButton = props.setSelectedButton;

const handleLinkClick = (id) => {
  setSelectedButton(id);
};

return (
  <NavContainer style={navContainerStyle}>
    <Div selectedButton={selectedButton} />
    {linksData.map((data) => (
      <NavItem
        href={data.href}
        className={selectedButton === data.id ? "active" : ""}
        onClick={() => handleLinkClick(data.id)}
      >
        <Widget
          src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
          props={{
            iconName: data.iconName,
            iconSize: data.iconSize,
            iconColor: data.iconColor,
          }}
        />
        <NavSpan>{data.text}</NavSpan>
      </NavItem>
    ))}
  </NavContainer>
);
