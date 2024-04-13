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

const logoHref = props.logoHref ?? "";
const logoSrc = props.logoSrc ?? "";
const logoAlt = props.logoAlt ?? "Company logo";
const companyName = props.companyName ?? "";

const menuBackground = props.style.menuBackground ?? "#000";
const menuWidth = props.style.menuWidth ?? "100%";
const menuMaxWidth = props.style.menuMaxWidth ?? "260px";
const menuMinHeight = props.style.menuMinHeight ?? "100vh";
const menuListBorder =
  props.style.menuListBorder ?? "1px solid rgba(255,255,255,0.1)";
const menuFontColor = props.style.menuFontColor ?? "#fff";
const menuFontSize = props.style.menuFontSize ?? "16px";
const menuFontPadding = props.style.menuFontPadding ?? "16px 16px";
const menuActiveColor = props.style.menuActiveColor ?? "#fff";
const menuActiveBackgroundColor =
  props.style.menuActiveBackgroundColor ?? "#3887BE";
const logoFontSize = props.style.logoFontSize ?? "30px";
const logoColor = props.style.logoColor ?? "#fff";
const logoPadding = props.style.logoPadding ?? "16px";
const logoWidth = props.style.logoWidth ?? "152px";
const logoHeight = props.style.logoHeight ?? "29px";

const menuLinks = props.menuLinks;

const sidebar = {
  vmenuwrap: {
    background: menuBackground,
    minHeight: menuMinHeight,
    width: menuWidth,
    maxWidth: menuMaxWidth,
  },
  ul: {
    margin: "0",
    listStyleType: "none",
    padding: "0",
  },
  li: {
    margin: "0px 0",
    boxSizing: "border-box",
    borderBottom: menuListBorder,
  },
  a: {
    color: menuFontColor,
    fontSize: menuFontSize,
    padding: menuFontPadding,
    lineHeight: "normal",
    display: "block",
  },
  active: {
    color: menuActiveColor,
    fontSize: menuFontSize,
    padding: menuFontPadding,
    lineHeight: "normal",
    display: "block",
    backgroundColor: menuActiveBackgroundColor,
  },
  logodiv: {
    padding: logoPadding,
    display: "block",
    textAlign: "center",
  },
  logo: {
    fontSize: logoFontSize,
    color: logoColor,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
};

return (
  <>
    <div style={sidebar.vmenuwrap}>
      <div style={sidebar.logodiv}>
        <a href={logoHref} style={sidebar.logo}>
          {logoSrc && (
            <img
              className="mb-3"
              style={{ width: logoWidth, height: logoHeight }}
              src={logoSrc}
              alt={logoAlt}
            />
          )}
          {companyName}
        </a>
      </div>
      <ul style={sidebar.ul}>
        {menuLinks.map((link, index) => (
          <li style={sidebar.li} key={index}>
            <a href={link.href} style={sidebar.a} target={link.target}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </>
);
