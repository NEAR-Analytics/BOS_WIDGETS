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

const data = {
  logoHref: "#",
  logoSrc: "https://wireframes.design/wireframes-logo.png",
  logoAlt: "Wireframe logo",
  companyName: "",
  logoHeight: "29px",
  logoWidth: "152px",
  isTopFix: false,
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

const detail = `const data ={
  logoHref: "#",
  logoSrc:
    "https://wireframes.design/wireframes-logo.png",
  logoAlt: "Wireframe logo",
  companyName: "",
  isTopFix:false,
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
return(
<Widget src="v1.wireframes.near/widget/Components.Layout.Navbar" props={data} />
);`;

const explanation =
  "A simple navbar, is a fundamental component of a user interface that typically provides navigation links to different sections or pages of a website or web application. It serves as a menu system that allows users to easily navigate through the content.";

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
      logoAlt : "Wireframe logo",
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
    title: "linksData",
    required: "true",
    content:
      "The linksData appears to be an array of objects containing information about links, particularly for navigation purposes. e.g.",
    code: `const data = {
      linksData : [
        {
          menuHref: "#",
          menuName: "Home",
        },
        {
          menuHref: "#",
          menuName: "About",
        },
      ]
    };`,
    children: [
      {
        title: "menuHref",
        required: "true",
        content:
          "The menuHref attribute is crucial for creating hyperlinks. e.g.",
        code: `const data = {
          linksData:[
            { 
              menuHref: "#",
            }, 
          ]
        };`,
      },
      {
        title: "menuName",
        required: "true",
        content:
          "Each object in the array contain properties like menuName to specify the text content of the link. e.g.",
        code: `const data = {
          linksData:[
            { 
              menuName: 'Home',
            }, 
          ]
        };`,
      },
    ],
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
    title: "navMode",
    content:
      "You can use navMode props to change the theme mode, such as light mode or dark mode. e.g.",
    code: `const data = {
      navMode : "dark",
    };`,
  },
  {
    title: "menuSide",
    content:
      "You can use menuSide props to shift the navigation menus to 'left' or 'right'.the 'menuSide' to 'right' indicates that the menu items are aligned to the right side of the header or navigation bar. e.g.",
    code: `const data = {
      menuSide : "right",
    };`,
  },
  {
    title: "menuInlineStyle",
    content: "You can use 'menuInlineStyle' props to add your Inline style for customization. These styles are specific to the menu component and control its appearance and behavior. e.g.",
    code: `const data = { 
      menuInlineStyle: { 
        height: '100%',
        backgroundColor: 'transparent',
      }, 
    };`,
  },
  {
    title: "navStyle",
    content: "You can use 'navStyle' props to add your Inline style for the customization applied to a navigation component, such as a navbar or menu. These styles are used to customize the appearance and behavior of the navigation element. e.g.",
    code: `const data = { 
      navStyle: { 
        height: '100%',
        backgroundColor: 'transparent',
      }, 
    };`,
  },
];

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <Widget
        src={`v1.wireframes.near/widget/Components.Navigations.Navbar`}
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
