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

const admin = "/";
const user = "/";

const data = {
  logoHref: "#",
  logoSrc: "https://wireframes.design/wireframes-logo.png",
  logoAlt: "wireframe logo",
  logoHeight: "29px",
  logoWidth: "152px",
  info: "Jan 18-19 London",
  hideLocation: false,
  companyName: "",
  registerButton: "",
  adminUrl: admin,
  userUrl: user,
  linksData: [
    {
      menuHref: "#",
      menuName: "Home",
    },
    {
      menuHref: "#",
      menuName: "About",
    },
  ],
};

const detail = `
const admin = "/";
const user = "/";

const data ={
  logoHref : "#",
  logoSrc : "https://wireframes.design/wireframes-logo.png",
  logoAlt : "wireframe logo",
  logoHeight:"29px",
  logoWidth:"152px",
  info:"Jan 18-19 London",
  hideLocation:false,
  companyName:"",
  registerButton: "",
  adminUrl: "${admin}",
  userUrl: "${user}",
};
return(
  <Widget src="v1.wireframes.near/widget/Components.Navigations.TopNavbar" props={data}/>
);`;
const explanation =
  "A top navbar, also known as a top navigation bar or simply a navbar, is a user interface element commonly found at the top of a webpage or application. It typically contains links, buttons, or other interactive elements that allow users to navigate to different sections of the website or access important features and pages.";

const propsExplanation = [
  {
    title: "logoHref",
    required: "true",
    content:
      "You can use the logoHref props to specify the destination of a hyperlink, which is typically an anchor <a> element. This attribute determines the URL that the browser navigates to when the user clicks on the hyperlink. e.g.",
    code: `const data = {
      logoHref : "#",
    };`,
  },
  {
    title: "logoSrc",
    required: "true",
    content:
      "You can use the logoSrc props to specify the source (URL) of external resources, such as images. e.g.",
    code: `const data = {
      logoSrc : "https://wireframes.design/wireframes-logo.png",
    };`,
  },
  {
    title: "logoAlt",
    required: "true",
    content:
      "You can use the logoAlt props to provide alternative text for an image element. It stands for alternative text and is used to describe the content of the element when it cannot be displayed to the user. e.g.",
    code: `const data = {
      logoAlt : "company logo",
    };`,
  },
  {
    title: "logoHeight",
    content:
      "The logoHeight props is used to set the height of an image element. It determines the vertical size of the content box within the element's box model. e.g.",
    code: `const data = {
      logoHeight : "29px",
    };`,
  },
  {
    title: "logoWidth",
    content:
      "The logoWidth props is used to set the width of an image element. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
    code: `const data = {
      logoWidth : "152px",
    };`,
  },
  {
    title: "info",
    content:
      "The term info typically refers to information or details provided to users within a user interface to convey important messages, instructions, or context. In web development, info can be presented in various forms, such as tooltips, info icons, help text, or informational messages. e.g.",
    code: `const data = {
      info : "Jan 18-19 London",
    };`,
  },
  {
    title: "hideLocation",
    content:
      "You can pass the value of hideLocation props as true or false to hide or unhide the info displayed at the right in the top navbar. e.g.",
    code: `const data = {
      hideLocation : false,
    };`,
  },
  {
    title: "companyName",
    content:
      "The companyName props refers to the name of a company or organization. The 'companyName' prop is used to display or refer to the name of the company associated with a website, application, or brand. e.g.",
    code: `const data = {
      companyName : "Wireframe",
    };`,
  },
  {
    title: "registerButton",
    content:
      "You can use the registerButton props to apply a button used in a user interface to initiate the registration process for a service, application, or platform. e.g.",
    code: `const data = {
      registerButton : "",
    };`,
  },
  {
    title: "adminUrl",
    content:
      "The term adminUrl likely refers to a URL that provides access to administrative or backend functionality of a system, website, or application. e.g.",
    code: `const data = {
      adminUrl : admin,
    };`,
  },
  {
    title: "userUrl",
    content:
      "The term userUrl likely refers to a URL that provides access to user-specific functionality or content within a system, website, or application. e.g.",
    code: `const data = {
      userUrl : user,
    };`,
  },
  {
    title: "inlineStyle",
    content: "You will be able to add your Inline style here. e.g.",
    code: `const data = { 
      inlineStyle: { 
        fontSize: '16px',
      }, 
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const data = {
      style:{ 
        margin-right: 'auto',
        padding-right: '2%',
      } 
    };`,
    children: [
      {
        title: "navZIndex",
        content:
          "The navZIndex props is used to controls the stacking order of positioned elements of navbar. It specifies the z-axis position of an element and determines whether it appears in front of or behind other elements. e.g.",
        code: `const data = {
          style:{ 
            navZIndex: '10',
          }, 
        };`,
      },
      {
        title: "navDisplay",
        content:
          "The navDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const data = {
          style:{ 
            navDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "navAlignItems",
        content:
          "The navAlignItems props is used to define how flex items are aligned along the cross axis of their flex container in navbar. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const data = {
          style:{ 
            navAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "navJustifyContent",
        content:
          "The navJustifyContent props is used to align flex items along the main axis of the flex container. It determines how remaining space in the flex container is distributed among the flex items when there is extra space available. e.g.",
        code: `const data = {
          style:{ 
            navJustifyContent: 'space-between',
          }, 
        };`,
      },
      {
        title: "navPadding",
        content:
          "The navPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            navPadding: '0 10px',
          }, 
        };`,
      },
      {
        title: "navFlex",
        content:
          "The navFlex props is refers property display: flex; and its associated flexbox layout model. e.g.",
        code: `const data = {
          style:{ 
            navFlex: 'none',
          }, 
        };`,
      },
      {
        title: "navOrder",
        content:
          "The navOrder props is used in conjunction with Flexbox to control the order in which flex items are displayed within a flex container. e.g.",
        code: `const data = {
          style:{ 
            navOrder: '0',
          }, 
        };`,
      },
      {
        title: "navAlignSelf",
        content:
          "The navAlignSelf props is used within a Flexbox layout to control the alignment of individual flex items along the cross axis, overriding the default alignment set by the container's align-items property for that specific item. e.g.",
        code: `const data = {
          style:{ 
            navAlignSelf: 'stretch',
          }, 
        };`,
      },
      {
        title: "navFlexGrow",
        content:
          "The navFlexGrow props is used within a Flexbox layout to specify how much a flex item should grow relative to other flex items within the same flex container when there is available space along the main axis. e.g.",
        code: `const data = {
          style:{ 
            navFlexGrow: '0',
          }, 
        };`,
      },
      {
        title: "navPosition",
        content:
          "The navPosition props is used to specify the positioning method of an element relative to its containing element or the document itself. It allows you to control the placement of a navbar element within the layout of a webpage. e.g.",
        code: `const data = {
          style:{ 
            navPosition: 'sticky',
          }, 
        };`,
      },
      {
        title: "navTop",
        content:
          "The navTop props is used to specify the vertical position of a positioned element relative to its containing block. It applies only to elements with a position value other than static (e.g., relative, absolute, fixed, or sticky). e.g.",
        code: `const data = {
          style:{ 
            navTop: '0',
          }, 
        };`,
      },
      {
        title: "navHeight",
        content:
          "The navTop props is used to specify the vertical position of a positioned element relative to its containing block. It applies only to elements with a position value other than static (e.g., relative, absolute, fixed, or sticky). e.g.",
        code: `const data = {
          style:{ 
            navHeight: '10vh',
          }, 
        };`,
      },
      {
        title: "navMinHeight",
        content:
          "The navMinHeight props is used to set the minimum height of a navbar element. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const data = {
          style:{ 
            navMinHeight: '10vh',
          }, 
        };`,
      },
      {
        title: "navBoxShadow",
        content:
          "The navBoxShadow props is used to add shadow effects to the navbar element's box. It allows you to create both inner shadows and outer shadows, providing depth and dimension to the appearance of elements on a webpage. e.g.",
        code: `const data = {
          style:{ 
            navBoxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          }, 
        };`,
      },
      {
        title: "navBackdropFilter",
        content:
          "The navBackdropFilter props is used to apply graphical effects to the area behind the navbar element. It allows you to blur or color-shift the background behind an element, creating effects such as frosted glass or applying color filters to the content behind the element. e.g.",
        code: `const data = {
          style:{ 
            navBackdropFilter: 'blur(8px)',
          }, 
        };`,
      },
      {
        title: "logoDisplay",
        content:
          "The logoDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const data = {
          style:{ 
            logoDisplay: 'block',
          }, 
        };`,
      },
      {
        title: "Width",
        content:
          "The Width property is used to set the width of area in which logo is placed. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            Width: '5em',
          }, 
        };`,
      },
      {
        title: "logoPadding",
        content:
          "The logoPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            logoPadding: '0px',
          }, 
        };`,
      },
      {
        title: "logoGap",
        content:
          "The logoGap props is used to specify the spacing between flex items in navbar. It is part of the Flexbox layout model and provides a convenient way to add consistent spacing between items without the need for additional margin or padding styles. e.g.",
        code: `const data = {
          style:{ 
            logoGap: '0.7em',
          }, 
        };`,
      },
      {
        title: "logoFontStyle",
        content:
          "The logoFontStyle props is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const data = {
          style:{ 
            logoFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "logoFontWeight",
        content:
          "The logoFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const data = {
          style:{ 
            logoFontWeight: '700',
          }, 
        };`,
      },
      {
        title: "logoFontSize",
        content:
          "The logoFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const data = {
          style:{ 
            logoFontSize: '1em',
          }, 
        };`,
      },
      {
        title: "logoLineHeight",
        content:
          "The logoLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const data = {
          style:{ 
            logoLineHeight: '1em',
          }, 
        };`,
      },
      {
        title: "logoFontColor",
        content:
          "The logoFontColor props is used to the color property, which is commonly used to set the text color of an element. e.g.",
        code: `const data = {
          style:{ 
            logoFontColor: '#11181c',
          }, 
        };`,
      },
      {
        title: "logoHoverFontColor",
        content:
          "The logoHoverFontColor typically refers to changing the color of an element when the user hovers over it. e.g.",
        code: `const data = {
          style:{ 
            logoHoverFontColor: '#11181c',
          }, 
        };`,
      },
      {
        title: "actionAreaDisplay",
        content:
          "The actionAreaDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const data = {
          style:{ 
            actionAreaDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "actionAreaJustifyContent",
        content:
          "The actionAreaJustifyContent props is used to align flex items along the main axis of the flex container. It determines how remaining space in the flex container is distributed among the flex items when there is extra space available. e.g.",
        code: `const data = {
          style:{ 
            actionAreaJustifyContent: 'flex-end',
          }, 
        };`,
      },
      {
        title: "actionAreaAlignItems",
        content:
          "The actionAreaAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const data = {
          style:{ 
            actionAreaAlignItems: 'flex-start',
          }, 
        };`,
      },
      {
        title: "actionAreaPadding",
        content:
          "The actionAreaPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            actionAreaPadding: '0px',
          }, 
        };`,
      },
      {
        title: "actionAreaGap",
        content:
          "The actionAreaGap props is used to specify the spacing between flex items. It is part of the Flexbox layout model and provides a convenient way to add consistent spacing between items without the need for additional margin or padding styles. e.g.",
        code: `const data = {
          style:{ 
            actionAreaGap: '1em',
          }, 
        };`,
      },
      {
        title: "infoDisplay",
        content:
          "The infoDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const data = {
          style:{ 
            infoDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "infoAlignItems",
        content:
          "The infoAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const data = {
          style:{ 
            infoAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "infoPadding",
        content:
          "The infoPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            infoPadding: '0px',
          }, 
        };`,
      },
      {
        title: "infoGap",
        content:
          "The infoGap props is used to specify the spacing between flex items. It is part of the Flexbox layout model and provides a convenient way to add consistent spacing between items without the need for additional margin or padding styles. e.g.",
        code: `const data = {
          style:{ 
            infoGap: '0.5em',
          }, 
        };`,
      },
      {
        title: "infoFlex",
        content:
          "The infoFlex props is refers property display: flex; and its associated flexbox layout model. e.g.",
        code: `const data = {
          style:{ 
            infoFlex: 'none',
          }, 
        };`,
      },
      {
        title: "infoOrder",
        content:
          "The infoOrder props is used in conjunction with Flexbox to control the order in which flex items are displayed within a flex container. e.g.",
        code: `const data = {
          style:{ 
            infoOrder: '0',
          }, 
        };`,
      },
      {
        title: "infoAlignSelf",
        content:
          "The infoAlignSelf props is used within a Flexbox layout to control the alignment of individual flex items along the cross axis, overriding the default alignment set by the container's align-items property for that specific item. e.g.",
        code: `const data = {
          style:{ 
            infoAlignSelf: 'stretch',
          }, 
        };`,
      },
      {
        title: "infoFontFamily",
        content:
          "The infoFontFamily props is used to define the typeface or font family that should be applied to the text content within an element. It specifies a prioritized list of font family names and/or generic family names. e.g.",
        code: `const data = {
          style:{ 
            infoFontFamily: 'Mona Sans',
          }, 
        };`,
      },
      {
        title: "infoFontStyle",
        content:
          "The infoFontStyle props is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const data = {
          style:{ 
            infoFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "infoFontWeight",
        content:
          "The infoFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const data = {
          style:{ 
            infoFontWeight: '500',
          }, 
        };`,
      },
      {
        title: "infoFontSize",
        content:
          "The infoFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const data = {
          style:{ 
            infoFontSize: '1em',
          }, 
        };`,
      },
      {
        title: "infoLineHeight",
        content:
          "The infoLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const data = {
          style:{ 
            infoLineHeight: '1em',
          }, 
        };`,
      },
      {
        title: "infoTextAlign",
        content:
          "The infoTextAlign props is used to specify the horizontal alignment of text within its containing element. It determines how text is positioned within the box of the element, whether it's aligned to the left, right, centered, or justified. e.g.",
        code: `const data = {
          style:{ 
            infoTextAlign: 'right',
          }, 
        };`,
      },
      {
        title: "infoFontColor",
        content:
          "The infoFontColor props is used to the color property, which is commonly used to set the text color of an element. e.g.",
        code: `const data = {
          style:{ 
            infoFontColor: '#011340',
          }, 
        };`,
      },
      {
        title: "labelDisplay",
        content:
          "The labelDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const data = {
          style:{ 
            labelDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "labelAlignItems",
        content:
          "The labelAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const data = {
          style:{ 
            labelAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "labelPadding",
        content:
          "The labelPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            labelPadding: '0px',
          }, 
        };`,
      },
      {
        title: "labelGap",
        content:
          "The labelGap props is used to specify the spacing between flex items. It is part of the Flexbox layout model and provides a convenient way to add consistent spacing between items without the need for additional margin or padding styles. e.g.",
        code: `const data = {
          style:{ 
            labelGap: '0.5em',
          }, 
        };`,
      },
      {
        title: "labelFlex",
        content:
          "The labelFlex props is refers property display: flex; and its associated flexbox layout model. e.g.",
        code: `const data = {
          style:{ 
            labelFlex: 'none',
          }, 
        };`,
      },
      {
        title: "labelOrder",
        content:
          "The labelOrder props is used in conjunction with Flexbox to control the order in which flex items are displayed within a flex container. e.g.",
        code: `const data = {
          style:{ 
            labelOrder: '0',
          }, 
        };`,
      },
      {
        title: "labelAlignSelf",
        content:
          "The labelAlignSelf props is used within a Flexbox layout to control the alignment of individual flex items along the cross axis, overriding the default alignment set by the container's align-items property for that specific item. e.g.",
        code: `const data = {
          style:{ 
            labelAlignSelf: 'stretch',
          }, 
        };`,
      },
      {
        title: "labelFontFamily",
        content:
          "The labelFontFamily props is used to define the typeface or font family that should be applied to the text content within an element. It specifies a prioritized list of font family names and/or generic family names. e.g.",
        code: `const data = {
          style:{ 
            labelFontFamily: 'Mona Sans',
          }, 
        };`,
      },
      {
        title: "labelFontStyle",
        content:
          "The labelFontStyle props is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const data = {
          style:{ 
            labelFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "labelFontWeight",
        content:
          "The labelFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const data = {
          style:{ 
            labelFontWeight: '500',
          }, 
        };`,
      },
      {
        title: "labelFontSize",
        content:
          "The labelFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const data = {
          style:{ 
            labelFontSize: '1em',
          }, 
        };`,
      },
      {
        title: "labelLineHeight",
        content:
          "The labelLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const data = {
          style:{ 
            labelLineHeight: '1em',
          }, 
        };`,
      },
      {
        title: "labelTextAlign",
        content:
          "The labelTextAlign props is used to specify the horizontal alignment of text within its containing element. It determines how text is positioned within the box of the element, whether it's aligned to the left, right, centered, or justified. e.g.",
        code: `const data = {
          style:{ 
            labelTextAlign: 'right',
          }, 
        };`,
      },
      {
        title: "labelFontColor",
        content:
          "The labelFontColor props is used to the color property, which is commonly used to set the text color of an element. e.g.",
        code: `const data = {
          style:{ 
            labelFontColor: '#011340',
          }, 
        };`,
      },
      {
        title: "accLogoDisplay",
        content:
          "The accLogoDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const data = {
          style:{ 
            accLogoDisplay: 'block',
          }, 
        };`,
      },
      {
        title: "accLogoPadding",
        content:
          "The accLogoPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            accLogoPadding: '0px',
          }, 
        };`,
      },
      {
        title: "accLogoGap",
        content:
          "The accLogoGap props is used to specify the spacing between flex items in navbar. It is part of the Flexbox layout model and provides a convenient way to add consistent spacing between items without the need for additional margin or padding styles. e.g.",
        code: `const data = {
          style:{ 
            accLogoGap: '0.7em',
          }, 
        };`,
      },
      {
        title: "accLogoFontStyle",
        content:
          "The accLogoFontStyle props is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const data = {
          style:{ 
            accLogoFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "accLogoFontWeight",
        content:
          "The accLogoFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const data = {
          style:{ 
            accLogoFontWeight: '700',
          }, 
        };`,
      },
      {
        title: "accLogoFontSize",
        content:
          "The accLogoFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const data = {
          style:{ 
            accLogoFontSize: '1em',
          }, 
        };`,
      },
      {
        title: "accLogoLineHeight",
        content:
          "The accLogoLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const data = {
          style:{ 
            accLogoLineHeight: '1em',
          }, 
        };`,
      },
      {
        title: "accLogoFontColor",
        content:
          "The accLogoFontColor props is used to the color property, which is commonly used to set the text color of an element. e.g.",
        code: `const data = {
          style:{ 
            accLogoFontColor: '#11181c',
          }, 
        };`,
      },
      {
        title: "accLogoHoverFontColor",
        content:
          "The accLogoHoverFontColor typically refers to changing the color of an element when the user hovers over it. e.g.",
        code: `const data = {
          style:{ 
            accLogoHoverFontColor: '#11181c',
          }, 
        };`,
      },
    ],
  },
];

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <Widget
        src={`v1.wireframes.near/widget/Components.Navigations.TopNavbar`}
        props={data}
      />
    </div>
  ),
  text: detail,
  explanation: explanation,
  propsExplanation: propsExplanation,
  displayLearningCard: "full",
};

return (
  <>
    <Widget
      src={`v1.wireframes.near/widget/Components.Learning.LearningCard`}
      props={props}
    />
  </>
);
