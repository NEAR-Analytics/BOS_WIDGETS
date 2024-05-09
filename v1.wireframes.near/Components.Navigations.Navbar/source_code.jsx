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
const logoHeight = props.logoHeight ?? "50px";
const logoWidth = props.logoWidth ?? "50px";

const logoAlt = props.logoAlt ?? "Company logo";
const companyName = props.companyName ?? "";
const linksData = props.linksData ?? [];
const navMode = props.navMode ?? "dark";
const isTopFix = props.isTopFix ?? false;

const navStyle = props.navStyle ?? {
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
};
const menuInlineStyle = props.menuInlineStyle;

const navbarClassNames = `navbar ${
  isTopFix === true ? "fixed-top" : ""
} navbar-expand-lg ${
  navMode === "light" ? "navbar-light" : "navbar-dark bg-dark"
}`;
const menuSide = props.menuSide ?? "right";
const ulClassName = `navbar-nav mb-2 mb-lg-0 ${
  menuSide === "left" ? "me-auto" : "ms-auto"
}`;
const isToggle = props.isToggle ?? false;

return (
  <>
    <div>
      <div className={navbarClassNames} style={navStyle}>
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href={logoHref}
            style={{ textDecoration: "none" }}
          >
            {logoSrc && (
              <img
                classNameName="mb-3"
                style={{ width: logoWidth, height: logoHeight }}
                src={logoSrc}
                alt={logoAlt}
              />
            )}
            {companyName}
          </a>
          {isToggle && (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
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
            </button>
          )}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={ulClassName}>
              {linksData.map((data) => (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={data.menuHref}
                    style={menuInlineStyle}
                  >
                    {data.menuName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
);
