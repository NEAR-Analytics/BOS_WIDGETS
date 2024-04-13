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

const mainContainerMinWidth = props.style.mainContainerMinWidth ?? "85px";

const navPosition = props.style.navPosition ?? "relative";
const navPadding = props.style.navPadding ?? "0.5em";
const navMargin = props.style.navMargin ?? "0.25em 0";
const navFontStyle = props.style.navFontStyle ?? "normal";
const navFontWeight = props.style.navFontWeight ?? "600";
const navFontSize = props.style.navFontSize ?? "0.8em";
const navLineHeight = props.style.navLineHeight ?? "1em";
const navFontColor = props.style.navFontColor ?? "#3a3f42";
const navBorderRadius = props.style.navBorderRadius ?? "5px";
const navDisplay = props.style.navDisplay ?? "flex";
const navJustifyContent = props.style.navJustifyContent ?? "center";
const navAlignItems = props.style.navAlignItems ?? "center";
const navGap = props.style.navGap ?? "0.75em";

const navTabletWidth = props.style.navTabletWidth ?? "100%";
const navTabletBackgroundColor =
  props.style.navTabletBackgroundColor ?? "#f2f1ea";
const navTabletBorderRadius = props.style.navTabletBorderRadius ?? "0px";
const navTabletDisplay = props.style.navTabletDisplay ?? "flex";
const navTabletJustifyContent =
  props.style.navTabletJustifyContent ?? "flex-start";
const navTabletMinHeight = props.style.navTabletMinHeight ?? "60px";
const navTabletMargin = props.style.navTabletMargin ?? "0px";
const navTabletBorderBottom =
  props.style.navTabletBorderBottom ?? "1px #dbdbd7 solid";

const navHoverFontColor = props.style.navHoverFontColor ?? "#667085";
const navHoverBackgroundColor =
  props.style.navHoverBackgroundColor ?? "#f9fafb";

const navSpanDisplay = props.style.navSpanDisplay ?? "flex";
const navSpanAlignItems = props.style.navSpanAlignItems ?? "center";
const navSpanJustifyContent = props.style.navSpanJustifyContent ?? "center";
const navSpanTextAlign = props.style.navSpanTextAlign ?? "center";

const containerDisplay = props.style.containerDisplay ?? "flex";
const containerMarginRight = props.style.containerMarginRight ?? "2.5em";
const containerGap = props.style.containerGap ?? "0.8em";
const containerMaxHeight = props.style.containerMaxHeight ?? "90vh";
const containerPadding = props.style.containerPadding ?? "0px 0px 100px 0px";
const containerTop = props.style.containerTop ?? "120px";

const containerTabletWidth = props.style.containerTabletWidth ?? "90%";
const containerTabletZIndex = props.style.containerTabletZIndex ?? "1";
const containerTabletMarginLeft =
  props.style.containerTabletMarginLeft ?? "5px";
const containerTabletMarginRight =
  props.style.containerTabletMarginRight ?? "0px";
const containerTabletMarginBottom =
  props.style.containerTabletMarginBottom ?? "2.5em";
const containerTabletBorderTopRightRadius =
  props.style.containerTabletBorderTopRightRadius ?? "5px";
const containerTabletBorderTopLeftRadius =
  props.style.containerTabletBorderTopLeftRadius ?? "5px";
const containerTabletGap = props.style.containerTabletGap ?? "0px";
const containerTabletBackgroundColor =
  props.style.containerTabletBackgroundColor ?? "#f2f1ea";

const containerStyle = props.containerStyle;
const navContainerStyle = props.navContainerStyle;

const navLinks = props.linksData;

const NavItem = styled.div`
  position: ${navPosition};
  cursor: pointer;
  padding: ${navPadding};
  margin: ${navMargin};
  font-style: ${navFontStyle};
  font-weight: ${navFontWeight};
  font-size: ${navFontSize};
  line-height: ${navLineHeight};
  color: ${navFontColor};
  border-radius: ${navBorderRadius};
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  display: ${navDisplay};
  flex-direction: column;
  justify-content: ${navJustifyContent};
  align-items: ${navAlignItems};
  gap: ${navGap};

  @media screen and (max-width: 768px) {
    width: ${navTabletWidth};
    flex-direction: row;
    background-color: ${navTabletBackgroundColor};
    border-radius: ${navTabletBorderRadius};
    display: ${navTabletDisplay};
    justify-content: ${navTabletJustifyContent};
    min-height: ${navTabletMinHeight};
    margin: ${navTabletMargin};
    border-bottom: ${navTabletBorderBottom};
  }

  &:hover {
    color: ${navHoverFontColor};
    text-decoration: none;
    background-color: ${navHoverBackgroundColor};
  }

  span {
    display: ${navSpanDisplay};
    align-items: ${navSpanAlignItems};
    justify-content: ${navSpanJustifyContent};
    text-align: ${navSpanTextAlign};
  }
`;

const navItem = ({ text, icon, id, iconSelected }) => (
  <Link to={`/${id}`} style={{ textDecoration: "none" }}>
    <NavItem
      onClick={() => {
        props.update({
          tab: id,
          collapsible: true,
        });
      }}
    >
      {id === props.tab ? iconSelected : icon}
      <span>{text}</span>
    </NavItem>
  </Link>
);

const MainContainer = styled.div`
  min-width: ${mainContainerMinWidth};
`;

const NavContainer = styled.div`
  display: ${containerDisplay};
  flex-direction: column;
  margin-right: ${containerMarginRight};
  gap: ${containerGap};
  max-height: ${containerMaxHeight};
  padding: ${containerPadding};
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  top: ${containerTop};

  @media screen and (max-width: 768px) {
    width: ${containerTabletWidth};
    z-index: ${containerTabletZIndex};
    margin-left: ${containerTabletMarginLeft};
    margin-right: ${containerTabletMarginRight};
    margin-bottom: ${containerTabletMarginBottom};
    border-top-right-radius: ${containerTabletBorderTopRightRadius};
    border-top-left-radius: ${containerTabletBorderTopLeftRadius};
    gap: ${containerTabletGap};
    background-color: ${containerTabletBackgroundColor};
  }
`;

const content = (
  <MainContainer style={containerStyle}>
    <NavContainer style={navContainerStyle}>
      {navLinks?.map((link, index) => {
        return navItem({
          text: link.text,
          id: link.id,
          icon: link.icon,
          iconSelected: link.iconSelected,
        });
      })}
    </NavContainer>
  </MainContainer>
);

if (!props.collapsible) {
  return content;
}

return <div />;
