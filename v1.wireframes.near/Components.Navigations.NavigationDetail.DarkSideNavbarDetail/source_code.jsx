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
  navMode: "dark",
  companyName: "",
  style: {
    menuBackground: "#000",
    menuWidth: "100%",
    menuMaxWidth: "260px",
    menuMinHeight: "100vh",
    menuListBorder: "1px solid rgba(255,255,255,0.1)",
    menuFontColor: "#fff",
    menuFontSize: "16px",
    menuFontPadding: "16px 16px",
    menuActiveColor: "#fff",
    menuActiveBackgroundColor: "#3887BE",
    logoFontSize: "30px",
    logoColor: "#fff",
    logoPadding: "16px",
    logoHeight: "29px",
    logoWidth: "152px",
  },
  menuLinks: [
    {
      href: "#",
      name: "Home",
    },
    {
      href: "#",
      name: "About",
    },
    {
      href: "#",
      name: "Contact Us",
    },
    {
      href: "#",
      name: "Blog",
    },
  ],
};

const detail = `const data ={
  logoHref: "#",
  logoSrc:
    "https://wireframes.design/wireframes-logo.png",
  logoAlt: "Wireframe logo",
  navMode: "dark",
  companyName: "",
  style: {
    menuBackground: "#000",
    menuWidth: "100%",
    menuMaxWidth: "260px",
    logoHeight: "29px",
    logoWidth: "152px",
  },
  menuLinks: [
    {
      href: "#",
      name: "Home",
    },
    {
      href: "#",
      name: "About",
    },
  ],
};
return(
<Widget src="v1.wireframes.near/widget/Components.Navigations.DarkSideNavbar" props={data} />
);`;

const explanation =
  "A side navbar, also known as a sidebar or drawer menu, is a navigation component typically positioned along the side of a webpage or application interface. It provides a space-efficient way to display navigation links, menu items, or other functional elements while conserving vertical space.";

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
    title: "navMode",
    content:
      "You can use navMode props to change the theme mode, such as light mode or dark mode. e.g.",
    code: `const data = {
      navMode : "dark",
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
    title: "menuLinks",
    required: "true",
    content:
      "The menuLinks appears to be an array of objects containing information about links, particularly for navigation purposes. e.g.",
    code: `const data = {
      menuLinks : [
        {
          href: "#",
          name: "Home",
        },
        {
          href: "#",
          name: "About",
        },
        {
          href: "#",
          name: "Contact Us",
        },
        {
          href: "#",
          name: "Blog",
        },
      ],
    };`,
    children: [
      {
        title: "href",
        required: "true",
        content: "The href attribute is crucial for creating hyperlinks. e.g.",
        code: `const data = {
          linksData:[
            { 
              href: "#",
            }, 
          ]
        };`,
      },
      {
        title: "name",
        required: "true",
        content:
          "Each object in the array contain properties like name to specify the text content of the link. e.g.",
        code: `const data = {
          linksData:[
            { 
              name: 'Home',
            }, 
          ]
        };`,
      },
    ],
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const data = {
      style:{ 
        logoHeight : "29px",
        logoWidth : "152px",
      }, 
    };`,
    children: [
      {
        title: "logoHeight",
        content:
          "The logoHeight props is used to set the height of an image element. It determines the vertical size of the content box within the element's box model. e.g.",
        code: `const data = {
          style: {
            logoHeight : "29px",
          },
        };`,
      },
      {
        title: "logoWidth",
        content:
          "The logoWidth props is used to set the width of an image element. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style: {
            logoWidth : "152px",
          },
        };`,
      },
      {
        title: "menuBackground",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const data = {
          style:{ 
            menuBackground: '#000',
          }, 
        };`,
      },
      {
        title: "menuWidth",
        content:
          "You can set the menuWidth using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            menuWidth: '100%',
          }, 
        };`,
      },
      {
        title: "menuMaxWidth",
        content:
          "The menuMaxWidth props is used to set the maximum width of an element. It prevents the element from becoming wider than the specified value, regardless of the size of its content or its containing parent. e.g.",
        code: `const data = {
          style:{ 
            menuMaxWidth: '260px',
          }, 
        };`,
      },
      {
        title: "menuMinHeight",
        content:
          "The menuMinHeight props is used to set the minimum height of an element. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const data = {
          style:{ 
            menuMinHeight: '100vh',
          }, 
        };`,
      },
      {
        title: "menuListBorder",
        content:
          "The menuListBorder props is used to set the border of an element. e.g.",
        code: `const data = {
          style:{ 
            menuListBorder: '1px solid rgba(255,255,255,0.1)',
          }, 
        };`,
      },
      {
        title: "menuFontColor",
        content:
          "You can use menuFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const data = {
          style:{ 
            menuFontColor: '#fff',
          }, 
        };`,
      },
      {
        title: "menuFontSize",
        content:
          "The menuFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const data = {
          style:{ 
            menuFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "menuFontPadding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            menuFontPadding: '16px 16px',
          }, 
        };`,
      },
      {
        title: "menuActiveColor",
        content:
          "You can use menuActiveColor props to change the color of an element when it's in the active state. e.g.",
        code: `const data = {
          style:{ 
            menuActiveColor: '#fff',
          }, 
        };`,
      },
      {
        title: "menuActiveBackgroundColor",
        content:
          "You can use menuActiveBackgroundColor props to change the background color by using color names, hex codes, or RGB values to change background color when it's in the active state. e.g.",
        code: `const data = {
          style:{ 
            menuActiveBackgroundColor: '#3887BE',
          }, 
        };`,
      },
      {
        title: "logoFontSize",
        content:
          "The logoFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const data = {
          style:{ 
            logoFontSize: '30px',
          }, 
        };`,
      },
      {
        title: "logoColor",
        content:
          "You can use logoColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const data = {
          style:{ 
            logoColor: '#fff',
          }, 
        };`,
      },
      {
        title: "logoPadding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            logoPadding: '16px',
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
        src={`v1.wireframes.near/widget/Components.Navigations.DarkSideNavbar`}
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
