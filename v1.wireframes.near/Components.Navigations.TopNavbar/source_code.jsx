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

/* --------------------------------- Navbar --------------------------------- */
const navZIndex = props.style.navZIndex;
const navDisplay = props.style.navDisplay;
const navAlignItems = props.style.navAlignItems;
const navJustifyContent = props.style.navJustifyContent;
const navPadding = props.style.navPadding;
const navFlex = props.style.navFlex;
const navOrder = props.style.navOrder;
const navAlignSelf = props.style.navAlignSelf;
const navFlexGrow = props.style.navFlexGrow;
const navPosition = props.style.navPosition;
const navTop = props.style.navTop;
const navHeight = props.style.navHeight;
const navMinHeight = props.style.navMinHeight;
const navBoxShadow = props.style.navBoxShadow;
const navBackdropFilter = props.style.navBackdropFilter;
const navBackgroungColor = props.style.navBackgroungColor ?? "#fff";
/* --------------------------------- Navbar --------------------------------- */

/* -------------------------------- LogoArea -------------------------------- */
const logoDisplay = props.style.logoDisplay;
const Width = props.style.Width;
const logoPadding = props.style.logoPadding;
const logoGap = props.style.logoGap;
const logoFontStyle = props.style.logoFontStyle;
const logoFontWeight = props.style.logoFontWeight;
const logoFontSize = props.style.logoFontSize;
const logoLineHeight = props.style.logoLineHeight;
const logoFontColor = props.style.logoFontColor;
const logoHoverFontColor = props.style.logoHoverFontColor;
/* -------------------------------- LogoArea -------------------------------- */

/* ------------------------------- ActionArea ------------------------------- */
const actionAreaDisplay = props.style.actionAreaDisplay;
const actionAreaJustifyContent = props.style.actionAreaJustifyContent;
const actionAreaAlignItems = props.style.actionAreaAlignItems;
const actionAreaPadding = props.style.actionAreaPadding;
const actionAreaGap = props.style.actionAreaGap;
/* ------------------------------- ActionArea ------------------------------- */

/* ---------------------------------- Label --------------------------------- */
const labelDisplay = props.style.labelDisplay ?? "flex";
const labelAlignItems = props.style.labelAlignItems ?? "center";
const labelPadding = props.style.labelPadding ?? "0px";
const labelGap = props.style.labelGap ?? "0.5em";
const labelFlex = props.style.labelFlex ?? "none";
const labelOrder = props.style.labelOrder ?? "0";
const labelAlignSelf = props.style.labelAlignSelf ?? "stretch";
const labelFontFamily = props.style.labelFontFamily ?? "Mona Sans";
const labelFontStyle = props.style.labelFontStyle ?? "normal";
const labelFontWeight = props.style.labelFontWeight ?? "500";
const labelFontSize = props.style.labelFontSize ?? "1em";
const labelLineHeight = props.style.labelLineHeight ?? "1em";
const labelTextAlign = props.style.labelTextAlign ?? "right";
const labelFontColor = props.style.labelFontColor ?? "#011340";
/* ---------------------------------- Label --------------------------------- */

/* ---------------------------------- Info ---------------------------------- */
const infoDisplay = props.style.infoDisplay ?? "flex";
const infoAlignItems = props.style.infoAlignItems ?? "center";
const infoPadding = props.style.infoPadding ?? "0px";
const infoGap = props.style.infoGap ?? "0.5em";
const infoFlex = props.style.infoFlex ?? "none";
const infoOrder = props.style.infoOrder ?? "0";
const infoAlignSelf = props.style.infoAlignSelf ?? "stretch";
const infoFontFamily = props.style.infoFontFamily ?? "Mona Sans";
const infoFontStyle = props.style.infoFontStyle ?? "normal";
const infoFontWeight = props.style.infoFontWeight ?? "500";
const infoFontSize = props.style.infoFontSize ?? "1em";
const infoLineHeight = props.style.infoLineHeight ?? "1em";
const infoTextAlign = props.style.infoTextAlign ?? "right";
const infoFontColor = props.style.infoFontColor ?? "#011340";
/* ---------------------------------- Info ---------------------------------- */

/* ----------------------------- AccountLogoArea ---------------------------- */
const accLogoDisplay = props.style.accLogoDisplay ?? "block";
const accLogoPadding = props.style.accLogoPadding ?? "0px";
const accLogoGap = props.style.accLogoGap ?? "0.7em";
const accLogoFontStyle = props.style.accLogoFontStyle ?? "normal";
const accLogoFontWeight = props.style.accLogoFontWeight ?? "700";
const accLogoFontSize = props.style.accLogoFontSize ?? "1em";
const accLogoLineHeight = props.style.accLogoLineHeight ?? "1em";
const accLogoFontColor = props.style.accLogoFontColor ?? "#11181c";
const accLogoHoverFontColor = props.style.accLogoHoverFontColor ?? "#11181c";
/* ----------------------------- AccountLogoArea ---------------------------- */

const mobileDisplay = props.style.mobileDisplay;


const accountId = props.accountId || "";
const info = props.info ?? "";
const logoHref = props.logoHref ?? "#";
const logoHeight = props.logoHeight ?? "29px";
const logoWidth = props.logoWidth ?? "152px";
const logoAlt = props.logoAlt ?? "company logo";
const logoSrc =
  props.logoSrc ??
  `https://www.gravatar.com/avatar/wireframe?s=150&d=identicon`;
const logoInlineStyle = props.logoInlineStyle;

const hideLocation = props.hideLocation ?? false;
const logoutUrl = props.logoutUrl ?? "#";

const secretKey = props.secretKey;
const uid = props.uid;
const label = props.label;
const isAdmin = props.isAdmin;
const isSuper = props.isSuper;
const inAdminPage = props.inAdminPage;
const adminUrl = props.adminUrl ?? "";
const userUrl = props.userUrl ?? "";

const eventId = props.eventId ?? "";

const Navbar = styled.div`
  z-index: ${(props) => props.navZIndex || "10"};
  display: ${(props) => props.navDisplay || "flex"};
  flex-direction: row;
  align-items: ${(props) => props.navAlignItems || "center"};
  justify-content: ${(props) => props.navJustifyContent || "space-between"};
  padding: ${(props) => props.navPadding || "0 10px"};
  flex: ${(props) => props.navFlex || "none"};
  order: ${(props) => props.navOrder || "0"};
  align-self: ${(props) => props.navAlignSelf || "stretch"};
  flex-grow: ${(props) => props.navFlexGrow || "0"};
  position: ${(props) => props.navPosition || "sticky"};
  top: ${(props) => props.navTop || "0"};
  height: ${(props) => props.navHeight || "10vh"};
  min-height: ${(props) => props.navMinHeight || "10vh"};
  box-shadow: ${(props) =>
    props.navBoxShadow || "rgba(0, 0, 0, 0.35) 0px 5px 15px"};
  background-color: ${props.collapsible ? "transparent" : navBackgroungColor};
  backdrop-filter: ${(props) => props.navBackdropFilter || "blur(8px)"};
`;

const HideInMobile = styled.span`
  @media screen and (max-width: 768px) {
    display: ${(props) => props.mobileDisplay || "none"};
  }
`;

const LogoArea = styled.a`
  display: ${(props) => props.logoDisplay || "block"};
  width: ${(props) => props.Width || "5em"};
  padding: ${(props) => props.logoPadding || "0px"};
  gap: ${(props) => props.logoGap || "0.7em"};
  font-style: ${(props) => props.logoFontStyle || "normal"};
  font-weight: ${(props) => props.logoFontWeight || "700"};
  font-size: ${(props) => props.logoFontSize || "1em"};
  line-height: ${(props) => props.logoLineHeight || "1em"};
  color: ${(props) => props.logoFontColor || "#11181c"};
  transform: translateY(0.675em);

  &:hover {
    text-decoration: none;
    color: ${(props) => props.logoHoverFontColor || "#11181c"};
  }
`;

const ActionArea = styled.div`
  display: ${(props) => props.actionAreaDisplay || "flex"};
  flex-direction: row;
  justify-content: ${(props) => props.actionAreaJustifyContent || "flex-end"};
  align-items: ${(props) => props.actionAreaAlignItems || "flex-start"};
  padding: ${(props) => props.actionAreaPadding || "0px"};
  gap: ${(props) => props.actionAreaGap || "1em"};
`;

const Info = styled.div`
  display: ${infoDisplay};
  flex-direction: row;
  align-items: ${infoAlignItems};
  padding: ${infoPadding};
  gap: ${infoGap};
  flex: ${infoFlex};
  order: ${infoOrder};
  align-self: ${infoAlignSelf};
  font-family: ${infoFontFamily};
  font-style: ${infoFontStyle};
  font-weight: ${infoFontWeight};
  font-size: ${infoFontSize};
  line-height: ${infoLineHeight};
  text-align: ${infoTextAlign};
  color: ${infoFontColor};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Label = styled.div`
  display: ${labelDisplay};
  flex-direction: row;
  align-items: ${labelAlignItems};
  padding: ${labelPadding};
  gap: ${labelGap};
  flex: ${labelFlex};
  order: ${labelOrder};
  align-self: ${labelAlignSelf};
  font-family: ${labelFontFamily};
  font-style: ${labelFontStyle};
  font-weight: ${labelFontWeight};
  font-size: ${labelFontSize};
  line-height: ${labelLineHeight};
  text-align: ${labelTextAlign};
  color: ${labelFontColor};
`;

const AccountLogoArea = styled.a`
  display: ${accLogoDisplay};
  padding: ${accLogoPadding};
  gap: ${accLogoGap};
  font-style: ${accLogoFontStyle};
  font-weight: ${accLogoFontWeight};
  font-size: ${accLogoFontSize};
  line-height: ${accLogoLineHeight};
  color: ${accLogoFontColor};
  transform: translateY(0.675em);

  &:hover {
    text-decoration: none;
    color: ${accLogoHoverFontColor};
  }
`;

const Image = styled.img`
  width: ${logoWidth};
  height: ${logoHeight};
`;

const trimName = (uid) => {
  let name = (uid || "")?.replace("." + eventId, "");

  if (name.length > 12) {
    name = name.substring(0, 15) + "...";
  }

  return "@" + name;
};

const companyName = props.companyName ?? "";
const registerButton = props.registerButton ?? <></>;

const inlineStyle = props.inlineStyle;
const linksData = props.linksData;
const url = `https://www.gravatar.com/avatar/${accountId}?s=150&d=identicon`;

State.init({ img: null });

const information = <Info>{info}</Info>;

const logo = (
  <LogoArea
    href={logoHref}
    onClick={() => props.update({ tab: "home" })}
    logoDisplay={logoDisplay}
    Width={Width}
    logoPadding={logoPadding}
    logoGap={logoGap}
    logoFontStyle={logoFontStyle}
    logoFontWeight={logoFontWeight}
    logoFontSize={logoFontSize}
    logoLineHeight={logoLineHeight}
    logoFontColor={logoFontColor}
    logoHoverFontColor={logoHoverFontColor}
  >
    {logoSrc != null || logoSrc != undefined ? (
      <Image
        className="mb-3"
        style={logoInlineStyle}
        src={logoSrc}
        alt={logoAlt}
      />
    ) : (
      { companyName }
    )}
  </LogoArea>
);

const accountLogo = (
  <AccountLogoArea>
    <Image
      className="mb-3"
      src={url}
      style={{
        borderRadius: "40px",
        width: "40px",
        height: "40px",
      }}
      alt="profile pic"
    />
  </AccountLogoArea>
);

const actions = (
  <ActionArea
    actionAreaDisplay={actionAreaDisplay}
    actionAreaJustifyContent={actionAreaJustifyContent}
    actionAreaAlignItems={actionAreaAlignItems}
    actionAreaPadding={actionAreaPadding}
    actionAreaGap={actionAreaGap}
  >
    {!props.hideLocation && <> {information}</>}

    <div class="dropdown">
      <div id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
        {accountId != null || accountId != "" ? (
          <> {accountLogo}</>
        ) : (
          <>
            <Widget
              src="v1.wireframes.near/widget/Components.Button.IconButton"
              props={{
                label: "Code",
                icon: "list",
                style: {
                  border: "none",
                  borderRadius: "none",
                  fontColor: navMode == "dark" ? "white" : "black",
                  backgroundColor: "transparent",
                },
                iconSize: "15px",
                type: "button",
              }}
            />
          </>
        )}
      </div>
      {/* {accountId && ( */}
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
        {(isAdmin || isSuper) && (
          <li>
            {" "}
            <Link
              to={inAdminPage ? userUrl : adminUrl}
              style={{ color: "currentColor" }}
            >
              <button class="dropdown-item" type="button">
                {inAdminPage ? "UserPanel" : "Admin Panel"}
              </button>
            </Link>
          </li>
        )}
        {linksData?.map((link) => (
          <li>
            <Link to={link.menuHref}>
              <button class="dropdown-item" type="button">
                {link.menuName}
              </button>
            </Link>
          </li>
        ))}
        {accountId && (
          <>
            <li>
              <Link to={logoutUrl}>
                <button class="dropdown-item" type="button">
                  Logout
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
    {accountId ? <></> : <>{registerButton}</>}
  </ActionArea>
);

return (
  <Navbar
    navZIndex={navZIndex}
    navDisplay={navDisplay}
    navAlignItems={navAlignItems}
    navJustifyContent={navJustifyContent}
    navPadding={navPadding}
    navFlex={navFlex}
    navOrder={navOrder}
    navAlignSelf={navAlignSelf}
    navFlexGrow={navFlexGrow}
    navPosition={navPosition}
    navTop={navTop}
    navHeight={navHeight}
    navMinHeight={navMinHeight}
    navBoxShadow={navBoxShadow}
    navBackdropFilter={navBackdropFilter}
    style={inlineStyle}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      {logo}

      {label ? (
        <Label>{label}</Label>
      ) : (
        <>{uid != null && uid != undefined && <Label>{trimName(uid)}</Label>}</>
      )}
    </div>

    {actions}
  </Navbar>
);
