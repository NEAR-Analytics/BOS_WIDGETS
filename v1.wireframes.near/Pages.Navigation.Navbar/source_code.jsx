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
const activeLink = props.activeLink;
const navData = {
  navMode: "light",
  logoHref: "https://wireframes.design",
  companyName: "Wireframes",
  isToggle: true,
  isTopFix: true,
  navStyle: {
    background: "white",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  inlineStyle: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    fontFamily: "Exo",
  },
  menuInlineStyle: {
    fontSize: "20px",
    fontWeight: "500",
    textDecoration: "none",
  },
  linksData: [
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.AlertIndex",
      menuName: "Alert",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.ButtonIndex",
      menuName: "Button",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.CardIndex",
      menuName: "Card",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.CarouselIndex",
      menuName: "Carousel",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.IconIndex",
      menuName: "Icon",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.InputIndex",
      menuName: "Input",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.LayoutIndex",
      menuName: "Layout",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.ModalIndex",
      menuName: "Modal",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.NavigationIndex",
      menuName: "Navigation",
    },
    {
      menuHref: "/embed/v1.wireframes.near/widget/Pages.TableIndex",
      menuName: "Table",
    },
  ],
};

return (
  <>
    <Widget
      src={`v1.wireframes.near/widget/Components.Navigations.Navbar`}
      props={navData}
    />
  </>
);
