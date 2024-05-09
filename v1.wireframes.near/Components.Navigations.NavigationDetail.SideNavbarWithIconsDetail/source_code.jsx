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

const travel = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "airplane-engines",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const travelSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "airplane-engines-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const profileSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "person-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const profile = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "person",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const homeSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "house-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const home = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "house",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const schedule = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "calendar-check",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const scheduleSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "calendar-check-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const registerSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "ticket-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const register = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "ticket",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const hackathonSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "file-code-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const hackathon = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "file-code",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const speakers = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "people",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const speakersSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "people-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const help = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "patch-question",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const helpSelected = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "patch-question-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);

const data = {
  logoHref: "#",
  logoSrc: "https://wireframes.design/wireframes-logo.png",
  logoAlt: "Wireframe logo",

  linksData: [
    {
      text: "Profile",
      id: "profile",
      icon: profile,
      iconSelected: profileSelected,
    },
    {
      text: "Home",
      id: "home",
      icon: home,
      iconSelected: homeSelected,
    },
    {
      text: "Register",
      id: "register",
      icon: register,
      iconSelected: registerSelected,
    },
    {
      text: "Speakers",
      id: "speakers",
      icon: speakers,
      iconSelected: speakersSelected,
    },
    {
      text: "Schedule",
      id: "schedule",
      icon: schedule,
      iconSelected: scheduleSelected,
    },
    {
      text: "Hackathon",
      id: "hackathon",
      icon: hackathon,
      iconSelected: hackathonSelected,
    },
    {
      text: "Travel",
      id: "travel",
      icon: travel,
      iconSelected: travelSelected,
    },
    {
      text: "Help",
      id: "help",
      icon: help,
      iconSelected: helpSelected,
    },
  ],
};

const detail = `
const profileSelected = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "person-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);

const profile = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "person",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);

const homeSelected = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "house-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const home = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "house",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);

const registerSelected = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "ticket-fill",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);
const register = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "ticket",
      iconSize: "30px",
      iconColor: "#000",
    }}
  />
);

const data ={
  logoHref: "#",
  logoSrc: "https://wireframes.design/wireframes-logo.png",
  logoAlt: "Wireframe logo",
  linksData: [
    {
      text: "Profile",
      id: "profile",
      icon: profile,
      iconSelected: profileSelected,
    },
    {
      text: "Home",
      id: "home",
      icon: home,
      iconSelected: homeSelected,
    },
    {
      text: "Register",
      id: "register",
      icon: register,
      iconSelected: registerSelected,
    },
  ],
};
return(
<Widget src="v1.wireframes.near/widget/Components.Navigations.SideNavbar1" props={data} />
);`;

const explanation =
  "A side navbar, also known as a sidebar or side menu, is a navigation menu typically positioned vertically along one side of a webpage. It provides users with quick access to various sections or pages of a website, enhancing navigation and user experience.";

const propsExplanation = [
  {
    title: "linksData",
    required: "true",
    content:
      "The linksData appears to be an array of objects containing information about links, particularly for navigation purposes. e.g.",
    code: `const data = {
      linksData: [
        {
          text: "Profile",
          id: "profile",
          icon: profile,
          iconSelected: profileSelected,
        },
        {
          text: "Home",
          id: "home",
          icon: home,
          iconSelected: homeSelected,
        },
        {
          text: "Register",
          id: "register",
          icon: register,
          iconSelected: registerSelected,
        },
      ]
    };`,
    children: [
      {
        title: "text",
        required: "true",
        content:
          "ou can use the text property to display the text 'Profile' in your application's user interface. e.g.",
        code: `const data = {
          linksData:[
            { 
              text: "Profile",
            }, 
          ]
        };`,
      },
      {
        title: "id",
        required: "true",
        content:
          "The object represents a data structure with a single property id, which has the value 'profile'. e.g.",
        code: `const data = {
          linksData:[
            { 
              id: "profile",
            }, 
          ]
        };`,
      },
      {
        title: "icon",
        required: "true",
        content:
          "The object appears to represent a data structure with a property named icon, which likely refers to an icon associated with a profile. e.g.",
        code: `const data = {
          linksData:[
            { 
              icon: profile,
            }, 
          ]
        };`,
      },
      {
        title: "iconSelected",
        required: "true",
        content:
          "The object 'iconSelected' represents a data structure where the property iconSelected is associated with the value registerSelected. e.g.",
        code: `const data = {
          linksData:[
            { 
              iconSelected: registerSelected,
            }, 
          ]
        };`,
      },
    ],
  },
  {
    title: "containerStyle",
    content: "You can use 'containerStyle' props to add your Inline style here. e.g.",
    code: `const data = { 
      containerStyle: { 
        height: '100%',
      }, 
    };`,
  },
  {
    title: "navContainerStyle",
    content: "You can use 'navContainerStyle' props to add your Inline style and for customization. e.g.",
    code: `const data = { 
      navContainerStyle: { 
        height: '100%',
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
      }, 
    };`,
    children: [
      {
        title: "mainContainerMinWidth",
        content:
          "The mainContainerMinWidth props is used to set the minimum width of outer div. It ensures that the element's width does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const data = {
          style:{ 
            mainContainerMinWidth: '85px',
          }, 
        };`,
      },
      {
        title: "navPosition",
        content:
          "The props navPosition is used to the positioning of a navigation element, such as a navbar or menu, within a webpage layout. This positioning can determine where the navigation appears relative to other content on the page. e.g.",
        code: `const data = {
          style:{ 
            navPosition: 'relative',
          }, 
        };`,
      },
      {
        title: "navPadding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            navPadding: '0.5em',
          }, 
        };`,
      },
      {
        title: "navMargin",
        content:
          "The navMargin props refers to the margin applied to a navigation element, such as a navbar or menu. Margins control the spacing between the navigation element and other elements on the page, providing visual separation and defining the layout. e.g.",
        code: `const data = {
          style:{ 
            navMargin: '0.25em 0',
          }, 
        };`,
      },
      {
        title: "navFontStyle",
        content:
          "The navFontStyle props is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const data = {
          style:{ 
            navFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "navFontWeight",
        content:
          "The navFontWeight props is used to specify the weight (thickness) of the font for text elements. e.g.",
        code: `const data = {
          style:{ 
            navFontWeight: '600',
          }, 
        };`,
      },
      {
        title: "navFontSize",
        content:
          "The navFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const data = {
          style:{ 
            navFontSize: '0.8em',
          }, 
        };`,
      },
      {
        title: "navLineHeight",
        content:
          "The navLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const data = {
          style:{ 
            navLineHeight: '1em',
          }, 
        };`,
      },
      {
        title: "navFontColor",
        content:
          "You can use navFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const data = {
          style:{ 
            navFontColor: '#3a3f42',
          }, 
        };`,
      },
      {
        title: "navBorderRadius",
        content:
          "The navBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const data = {
          style:{ 
            navBorderRadius: '5px',
          }, 
        };`,
      },
      {
        title: "navDisplay",
        content:
          "The navDisplay props is used to control how the navigation is displayed within the layout of a webpage. e.g.",
        code: `const data = {
          style:{ 
            navDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "navJustifyContent",
        content:
          "The navJustifyContent props is property used in flexbox layouts to align flex items along the main axis of the flex container. e.g.",
        code: `const data = {
          style:{ 
            navJustifyContent: 'center',
          }, 
        };`,
      },
      {
        title: "navAlignItems",
        content:
          "The navAlignItems props could be used to control the alignment of items within the navigation container. e.g.",
        code: `const data = {
          style:{ 
            navAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "navGap",
        content:
          "The navGap props is used to specify the spacing between flex items in a flex container. e.g.",
        code: `const data = {
          style:{ 
            navGap: '0.75em',
          }, 
        };`,
      },
      {
        title: "navTabletWidth",
        content:
          "The props navTabletWidth is used to specify the width of a navigation element, specifically targeting tablet-sized devices. This props is a part of a responsive design approach where the layout of elements, such as navigation menus, adjusts based on the screen size or device type. e.g.",
        code: `const data = {
          style:{ 
            navTabletWidth: '100%',
          }, 
        };`,
      },
      {
        title: "navTabletBackgroundColor",
        content:
          "The props navTabletBackgroundColor used to specify the background color of a navigation element, specifically targeting tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            navTabletBackgroundColor: '#f2f1ea',
          }, 
        };`,
      },
      {
        title: "navTabletBorderRadius",
        content:
          "The props navTabletBorderRadius is used to specify the border radius of a navigation element, specifically targeting tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            navTabletBorderRadius: '0px',
          }, 
        };`,
      },
      {
        title: "navTabletDisplay",
        content:
          "The navTabletDisplay props is used in the context of responsive web design to control the display behavior of a navigation element specifically for tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            navTabletDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "navTabletJustifyContent",
        content:
          "The navTabletJustifyContent props aimed at specifying the alignment of content within a navigation element, particularly targeted at tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            navTabletJustifyContent: 'flex-start',
          }, 
        };`,
      },
      {
        title: "navTabletMinHeight",
        content:
          "The props navTabletMinHeight is used to specify the minimum height of a navigation element, specifically targeting tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            navTabletMinHeight: '60px',
          }, 
        };`,
      },
      {
        title: "navTabletMargin",
        content:
          "The props navTabletMargin is used to specify the margin of a navigation element, particularly targeted at tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            navTabletMargin: '0px',
          }, 
        };`,
      },
      {
        title: "navTabletBorderBottom",
        content:
          "The props navTabletBorderBottom intended to specify the bottom border style of a navigation element, specifically targeting tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            navTabletBorderBottom: '1px #dbdbd7 solid',
          }, 
        };`,
      },
      {
        title: "navHoverFontColor",
        content:
          "The props navHoverFontColor used to specify the color of the font when a user hovers over a navigation element, such as a menu item or link. e.g.",
        code: `const data = {
          style:{ 
            navHoverFontColor: '#667085',
          }, 
        };`,
      },
      {
        title: "navHoverBackgroundColor",
        content:
          "The props navHoverBackgroundColor used to specify the background color of a navigation element when a user hovers over it. e.g.",
        code: `const data = {
          style:{ 
            navHoverBackgroundColor: '#f9fafb',
          }, 
        };`,
      },
      {
        title: "navSpanDisplay",
        content:
          "The navSpanDisplay is a custom CSS property intended to specify the display property of <span> elements within a navigation component. e.g.",
        code: `const data = {
          style:{ 
            navSpanDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "navSpanAlignItems",
        content:
          "The navSpanAlignItems appears to represent props intended to control the alignment of <span> elements within a navigation component. e.g.",
        code: `const data = {
          style:{ 
            navSpanAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "navSpanJustifyContent",
        content:
          "The props navSpanJustifyContent appears to aimed at controlling the horizontal alignment of <span> elements within a navigation component. e.g.",
        code: `const data = {
          style:{ 
            navSpanJustifyContent: 'center',
          }, 
        };`,
      },
      {
        title: "navSpanTextAlign",
        content:
          "The props navSpanTextAlign aimed at specifying the text alignment of <span> elements within a navigation component. e.g.",
        code: `const data = {
          style:{ 
            navSpanTextAlign: 'center',
          }, 
        };`,
      },
      {
        title: "containerDisplay",
        content:
          "The containerDisplay props is used as a custom CSS property aimed at specifying the display property of a container element. e.g.",
        code: `const data = {
          style:{ 
            containerDisplay: 'flex',
          },   
        };`,
      },
      {
        title: "containerMarginRight",
        content:
          "The props containerMarginRight is used as a custom CSS property aimed at specifying the right margin of a container element. e.g.",
        code: `const data = {
          style:{ 
            containerMarginRight: '2.5em',
          }, 
        };`,
      },
      {
        title: "containerGap",
        content:
          "The containerGap likely refers to a custom CSS property used to specify the gap or spacing between child elements within a container. e.g.",
        code: `const data = {
          style:{ 
            containerGap: '0.8em',
          }, 
        };`,
      },
      {
        title: "containerMaxHeight",
        content:
          "The containerMaxHeight props is used as a custom CSS property intended to set the maximum height of a container element. e.g.",
        code: `const data = {
          style:{ 
            containerMaxHeight: '90vh',
          }, 
        };`,
      },
      {
        title: "containerPadding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const data = {
          style:{ 
            containerPadding: '0px 0px 100px 0px',
          }, 
        };`,
      },
      {
        title: "containerTop",
        content:
          "The containerTop as a custom CSS property intended to set the vertical position of a container element. e.g.",
        code: `const data = {
          style:{ 
            containerTop: '120px',
          }, 
        };`,
      },
      {
        title: "containerTabletWidth",
        content:
          "The containerTabletWidth appears to indicate a custom CSS property intended to specify the width of a container element specifically for tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletWidth: '90%',
          }, 
        };`,
      },
      {
        title: "containerTabletZIndex",
        content:
          "The containerTabletZIndex props is used as a custom CSS property aimed at setting the z-index of a container element for tablets, it is used within a media query targeting tablet-sized screens. e.g.",
        code: `const data = {
          style:{ 
            containerTabletZIndex: '1',
          }, 
        };`,
      },
      {
        title: "containerTabletMarginLeft",
        content:
          "The containerTabletMarginLeft props suggests a custom CSS property used to define the left margin of a container element on tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletMarginLeft: '5px',
          }, 
        };`,
      },
      {
        title: "containerTabletMarginRight",
        content:
          "The containerTabletMarginRight props suggests a custom CSS property used to define the right margin of a container element on tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletMarginRight: '0px',
          }, 
        };`,
      },
      {
        title: "containerTabletMarginBottom",
        content:
          "The containerTabletMarginBottom props suggests a custom CSS property used to define the bottom margin of a container element on tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletMarginBottom: '2.5em',
          }, 
        };`,
      },
      {
        title: "containerTabletBorderTopRightRadius",
        content:
          "The containerTabletBorderTopRightRadius props suggests a custom CSS property used to define the border-top-right-radius of a container element on tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletBorderTopRightRadius: '5px',
          }, 
        };`,
      },
      {
        title: "containerTabletBorderTopLeftRadius",
        content:
          "The containerTabletBorderTopLeftRadius props suggests a custom CSS property used to define the border-top-left-radius of a container element on tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletBorderTopLeftRadius: '5px',
          }, 
        };`,
      },
      {
        title: "containerTabletGap",
        content:
          "The containerTabletGap likely represents a custom CSS property used to specify the gap or spacing between child elements within a container specifically for tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletGap: '0px',
          }, 
        };`,
      },
      {
        title: "containerTabletBackgroundColor",
        content:
          "The props containerTabletBackgroundColor appears to represent a custom CSS property aimed at defining the background color of a container element specifically for tablet-sized devices. e.g.",
        code: `const data = {
          style:{ 
            containerTabletBackgroundColor: '#f2f1ea',
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
        src={`v1.wireframes.near/widget/Components.Navigations.SideNavbarWithIcons`}
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
