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
const navWidth = props.style.navWidth ?? "50%";
const navPosition = props.style.navPosition ?? "fixed";
const navBottom = props.style.navBottom ?? "0px";
const navleft = props.style.navleft ?? "25%";
const navDisplay = props.style.navDisplay ?? "flex";
const navJustifyContent = props.style.navJustifyContent ?? "center";
const navAlignItems = props.style.navAlignItems ?? "center";
const navMargin = props.style.navMargin ?? "0px";
const navBackgroundColor = props.style.navBackgroundColor ?? "#fff";
const navBorderRadius = props.style.navBorderRadius ?? "20px 20px 0px 0px";
const navPadding = props.style.navPadding ?? "30px 0px 15px";

const navLaptopWidth = props.style.navLaptopWidth ?? "100%";
const navLaptopLeft = props.style.navLaptopLeft ?? "0";

const navFontColor = props.style.navFontColor ?? "#822b61";
const navFontSize = props.style.navFontSize ?? "20px";
const navIconTop = props.style.navIconTop ?? "-13%";
const navIconLeft = props.style.navIconLeft ?? "0";
const navIconZIndex = props.style.navIconZIndex ?? "9";
const navSpanFontSize = props.style.navSpanFontSize ?? "18px";
const navSpanBottom = props.style.navSpanBottom ?? "-16px";

const navActiveSpanBottom = props.style.navActiveSpanBottom ?? "0px";
const navActiveIconTop = props.style.navActiveIconTop ?? "-60%";

/* --------------------------------- Slider --------------------------------- */
const navSliderBottom = props.style.navSliderBottom ?? "-25px";
const navSliderBorderRadius = props.style.navSliderBorderRadius ?? "50%";
const navSliderTransition = props.style.navSliderTransition ?? "left 1s";
/* --------------------------------- Slider --------------------------------- */

/* -------------------------------- ListItem -------------------------------- */
const listItemWidth = props.style.listItemWidth ?? "75px";
const listItemHeight = props.style.listItemHeight ?? "45px";
const listItemTextAlign = props.style.listItemTextAlign ?? "center";
const listItemDisplay = props.style.listItemDisplay ?? "block";
const listItemTransition = props.style.listItemTransition ?? "1s";
const listItemPosition = props.style.listItemPosition ?? "relative";

const listItemIconWidth = props.style.listItemIconWidth ?? "100%";
const listItemIconPosition = props.style.listItemIconPosition ?? "absolute";

const listItemSpanDisplay = props.style.listItemSpanDisplay ?? "block";
const listItemSpanWidth = props.style.listItemSpanWidth ?? "100%";
const listItemSpanPosition = props.style.listItemSpanPosition ?? "absolute";
const listItemSpanZIndex = props.style.listItemSpanZIndex ?? "9";
const listItemSpanOpacity = props.style.listItemSpanOpacity ?? "0";

const listItemActiveSpanOpacity = props.style.listItemActiveSpanOpacity ?? "1";

const bottomNavWrapperStyle = props.bottomNavWrapperStyle;
/* -------------------------------- ListItem -------------------------------- */
const linksData = props.linksData ?? [];

const BottomNavWrapper = styled.ul`
  width: ${navWidth};
  position: ${navPosition};
  bottom: ${navBottom};
  left: ${navleft};
  display: ${navDisplay};
  justify-content: ${navJustifyContent};
  align-items: ${navAlignItems};
  background-color: ${navBackgroundColor};
  margin: ${navMargin};
  border-radius: ${navBorderRadius};
  padding: ${navPadding};
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media (max-width: 900px) {
    width: ${navLaptopWidth};
    left: ${navLaptopLeft};
  }
`;

const Slider = styled.div`
  bottom: ${navSliderBottom};
  border-radius: ${navSliderBorderRadius};
  transition: ${navSliderTransition};
`;

const ListItem = styled.li`
  a {
    width: ${listItemWidth};
    height: ${listItemHeight};
    color: ${navFontColor};
    text-align: ${listItemTextAlign};
    font-size: ${navFontSize};
    display: ${listItemDisplay};
    transition: ${listItemTransition};
    position: ${listItemPosition};
    i {
      width: ${listItemIconWidth};
      position: ${listItemIconPosition};
      top: ${navIconTop};
      left: ${navIconLeft};
      transition-delay: 0.3s;
      transition: 1s cubic-bezier(0.49, -0.35, 0.77, 1.44);
      z-index: ${navIconZIndex};
    }
    span {
      display: ${listItemSpanDisplay};
      font-size: ${navSpanFontSize};
      width: ${listItemSpanWidth};
      position: ${listItemSpanPosition};
      bottom: ${navSpanBottom};
      transition-delay: 0.3s;
      transition: 1s cubic-bezier(0.49, -0.35, 0.77, 1.44);
      z-index: ${listItemSpanZIndex};
      opacity: ${listItemSpanOpacity};
    }
    &.active-icon {
      i {
        top: ${navActiveIconTop};
        transition-delay: 0.3s;
        transition: 1s cubic-bezier(0.49, -0.35, 0.77, 1.44);
      }
      span {
        bottom: ${navActiveSpanBottom};
        transition-delay: 0.5s;
        transition: 1s cubic-bezier(0.49, -0.35, 0.77, 1.44);
        opacity: ${listItemActiveSpanOpacity};
      }
    }
  }
`;

const selectedButton = props.selectedButton;
const setSelectedButton = props.setSelectedButton;

const handleLinkClick = (id) => {
  setSelectedButton(id);
};

const navComponent = {
  children: (
    <>
      <BottomNavWrapper style={bottomNavWrapperStyle}>
        <Slider selectedButton={selectedButton} />
        {linksData.map((link) => (
          <ListItem style={{ paddingInlineEnd: "1.2%" }}>
            <a
              href={link.href}
              className={selectedButton === link.id ? "active-icon" : ""}
              onClick={() => handleLinkClick(link.id)}
            >
              <Widget
                src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                props={{
                  iconName: link.iconName,
                  iconSize: link.iconSize,
                }}
              />
              <span>{link.text}</span>
            </a>
          </ListItem>
        ))}
      </BottomNavWrapper>
    </>
  ),
};

return (
  <>
    <Widget
      src={`v1.wireframes.near/widget/Components.Layout.Container`}
      props={navComponent}
    />
  </>
);
