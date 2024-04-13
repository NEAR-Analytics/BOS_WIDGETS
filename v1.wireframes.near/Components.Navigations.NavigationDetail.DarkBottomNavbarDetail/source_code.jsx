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

const Content = styled.div`
  padding: 2%;
  height: 80svh;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  position: relative;
`;

const data = {
  children: (
    <>
      <Content>
        {selectedButton === "schedule" && (
          <>
            <h1>Schedule</h1>
          </>
        )}
        {selectedButton === "alerts" && (
          <>
            <h1>Alerts</h1>
          </>
        )}
        {selectedButton === "home" && <h1>home</h1>}
        {selectedButton === "map" && <h1>Map</h1>}
        {selectedButton === "help" && <h1>Help</h1>}
      </Content>
    </>
  ),
};

const bottomNavProps = {
  selectedButton: selectedButton,
  setSelectedButton: setSelectedButton,
  linksData: [
    {
      id: "home",
      text: "Home",
      iconName: "house",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
    {
      id: "alerts",
      text: "Alert",
      iconName: "bell",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
    {
      id: "map",
      text: "Map",
      iconName: "pin-map",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
    {
      id: "schedule",
      text: "Schedule",
      iconName: "calendar2-check",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
    {
      id: "help",
      text: "Help",
      iconName: "question-octagon",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
  ],
};

const detail = `
const data = {
  children: (
    <>
      <Content>
        {selectedButton === "schedule" && (
          <><h1>Schedule</h1></>
        )}
        {selectedButton === "alerts" && (
          <>
            <h1>Alerts</h1>
          </>
        )}
        {selectedButton === "home" && <h1>Home</h1>}
        {selectedButton === "map" && <h1>Map</h1>}
        {selectedButton === "help" && <h1>Help</h1>}
      </Content>
    </>
  ),
};

const bottomNavProps ={
  linksData: [
    {
      id: "home",
      text: "Home",
      iconName: "house",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
    {
      id: "alert",
      text: "Alert",
      iconName: "bell",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
    {
      id: "map",
      text: "Map",
      iconName: "pin-map",
      iconSize: "30px",
      iconColor: "#fff",
      href: "#",
    },
  ],
};
return(
<Widget src="v1.wireframes.near/widget/Components.Navigations.DarkBottomNavbar" props={bottomNavProps} />
);`;

const explanation =
  "A bottom navigation bar, often referred to as Bottom Nav, is a user interface component commonly found in mobile applications or websites. It typically appears at the bottom of the screen and provides navigation options for users to move between different sections or pages of the application.";

const propsExplanation = [
  {
    title: "children",
    required: "true",
    content:
      "The children typically refers to the elements or components nested within a parent element or component. You must have to add or pass the code inside children to do changes. e.g.",
    code: `const bottomNavProps = {
      children: (
        <>
          <Content>
            {selectedButton === "schedule" && (
              <>
                <h1>Schedule</h1>
              </>
            )}
            {selectedButton === "alerts" && (
              <>
                <h1>Alerts</h1>
              </>
            )}
          <Content>  
        </>  
      )  
    };`,
  },
  {
    title: "selectedButton",
    required: "true",
    content:
      "You can use the selectedButton props is used as a variable in code to represent a button that has been selected or is in a selected state. e.g.",
    code: `const bottomNavProps = {
      selectedButton : selectedButton,
    };`,
  },
  {
    title: "setSelectedButton",
    required: "true",
    content:
      "You can use the setSelectedButton props to update the appearance or behavior of buttons based on user interaction or programmatic logic. e.g.",
    code: `const bottomNavProps = {
      setSelectedButton : setSelectedButton,
    };`,
  },
  {
    title: "linksData",
    required: "true",
    content:
      "The linksData appears to be an array of objects containing information about links, particularly for navigation purposes. e.g.",
    code: `const bottomNavProps = {
      linksData : [
        {
          id: "home",
          text: "Home",
          iconName: "house",
          iconSize: "30px",
          iconColor: "#fff",
          href: "#",
        },
        {
          id: "alert",
          text: "Alert",
          iconName: "bell",
          iconSize: "30px",
          iconColor: "#fff",
          href: "#",
        },
        {
          id: "map",
          text: "Map",
          iconName: "pin-map",
          iconSize: "30px",
          iconColor: "#fff",
          href: "#",
        },
      ]
    };`,
    children: [
      {
        title: "id",
        required: "true",
        content:
          "The id property appears to specify a unique identifier for an element.. e.g.",
        code: `const bottomNavProps = {
          linksData:[
            { 
              id: "home",
            }, 
          ]
        };`,
      },
      {
        title: "text",
        required: "true",
        content:
          "Each object in the array contain properties like text to specify the text content of the link. e.g.",
        code: `const bottomNavProps = {
          linksData:[
            { 
              text: 'Home',
            }, 
          ]
        };`,
      },
      {
        title: "iconName",
        required: "true",
        content:
          "The iconName property appears to be part of an object or data structure that represents an icon. e.g.",
        code: `const bottomNavProps = {
          linksData:[
            { 
              iconName: "bell",
            }, 
          ]
        };`,
      },
      {
        title: "iconSize",
        content:
          "The iconSize property appears to specify the size of an icon. e.g.",
        code: `const bottomNavProps = {
          linksData:[
            { 
              iconSize: "30px",
            }, 
          ]
        };`,
      },
      {
        title: "iconColor",
        content:
          "The iconColor appears is used to the color property, which is commonly used to set the color of an icon. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            iconColor: '#fff',
          }, 
        };`,
      },
      {
        title: "href",
        required: "true",
        content: "The href attribute is crucial for creating hyperlinks. e.g.",
        code: `const bottomNavProps = {
          linksData:[
            { 
              href: "#",
            }, 
          ]
        };`,
      },
    ],
  },
  {
    title: "navContainerStyle",
    content: "You can use 'navContainerStyle' props to add your Inline style and for customization. e.g.",
    code: `const bottomNavProps = { 
      navContainerStyle: { 
        color: "#000",
      }, 
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const bottomNavProps = {
      style: {
        navPosition: "none",
      },
    };`,
    children: [
      {
        title: "bottomNavDisplay",
        content:
          "The bottomNavDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            bottomNavDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "bottomNavJustifyContent",
        content:
          "The bottomNavJustifyContent props is used to align flex items along the main axis of the flex container. It determines how remaining space in the flex container is distributed among the flex items when there is extra space available. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            bottomNavJustifyContent: 'space-around',
          }, 
        };`,
      },
      {
        title: "bottomNavBackgroundColor",
        content:
          "The bottomNavBackgroundColor props is used to specify the background color of an element. It allows you to set the color that will be displayed behind the content and padding of the element. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            bottomNavBackgroundColor: '#fff',
          }, 
        };`,
      },
      {
        title: "bottomNavBottom",
        content:
          "The bottomNavBottom props is used to specify the distance between the bottom edge of a positioned element and the bottom edge of its containing block. It applies only to positioned elements, meaning elements with a position value other than static (such as relative, absolute, fixed, or sticky). e.g.",
        code: `const bottomNavProps = {
          style:{ 
            bottomNavBottom: '0px',
          }, 
        };`,
      },
      {
        title: "bottomNavWidth",
        content:
          "The bottomNavWidth property is used to set the width of area. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            bottomNavWidth: '100%',
          }, 
        };`,
      },
      {
        title: "bottomNavHeight",
        content:
          "The bottomNavHeight property is used to set the width of area. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            bottomNavHeight: '10vh',
          }, 
        };`,
      },
      {
        title: "navItemDisplay",
        content:
          "The navItemDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navItemDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "navItemAlignItems",
        content:
          "The navItemAlignItems props is used to define how flex items are aligned along the cross axis of their flex container in navbar. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navItemAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "navItemFontColor",
        content:
          "The navItemFontColor props is used to the color property, which is commonly used to set the text color of an element. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navItemFontColor: '#fff',
          }, 
        };`,
      },
      {
        title: "navItemPadding",
        content:
          "The navItemPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navItemPadding: '12px 16px',
          }, 
        };`,
      },
      {
        title: "navItemBorderRadius",
        content:
          "The navItemBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navItemBorderRadius: '50px',
          }, 
        };`,
      },
      {
        title: "navItemBackgroundColor",
        content:
          "The navItemBackgroundColor props is used to specify the background color of an element. It allows you to set the color that will be displayed behind the content and padding of the element. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navItemBackgroundColor: 'rgba(255, 255, 255, 0)',
          }, 
        };`,
      },
      {
        title: "focusFontColor",
        content:
          "The focusFontColor property is used to specify the color of the text when an element gains focus, typically through keyboard navigation or mouse clicks. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            focusFontColor: '#fff',
          }, 
        };`,
      },
      {
        title: "focusBackgroundColor",
        content:
          "The focusBackgroundColor property is used to specify the background color of an element when it gains focus, typically through keyboard navigation or mouse clicks. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            focusBackgroundColor: 'rgba(255, 255, 255, 0.2)',
          }, 
        };`,
      },
      {
        title: "spanWidth",
        content:
          "The spanWidth property is used to specify the horizontal dimension of <span> elements, determining how wide they appear on the screen. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            spanWidth: '100%',
          }, 
        };`,
      },
      {
        title: "spanMarginLeft",
        content:
          "The spanMarginLeft property is used to specify the amount of space between the left edge of <span> elements and their surrounding content or elements. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            spanMarginLeft: '8px',
          }, 
        };`,
      },
      {
        title: "navBottom",
        content:
          "The navBottom props is used to specify the distance between the bottom edge of a positioned element and the bottom edge of its containing block. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navBottom: '-25px',
          }, 
        };`,
      },
      {
        title: "navrBorderRadius",
        content:
          "The navrBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navrBorderRadius: '50%',
          }, 
        };`,
      },
      {
        title: "navTransition",
        content:
          "The navTransition props is used to smoothly animate changes to CSS properties over a specified duration. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navTransition: 'left 1s',
          }, 
        };`,
      },
      {
        title: "navDisplay",
        content:
          "The navDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navDisplay: 'none',
          }, 
        };`,
      },
      {
        title: "navSpanWidth",
        content:
          "The navSpanWidth property is used to specify the horizontal dimension of <span> elements, determining how wide they appear within the navigation bar. e.g.",
        code: `const bottomNavProps = {
          style:{ 
            navSpanWidth: '0px',
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
        src={`v1.wireframes.near/widget/Components.Navigations.DarkBottomNavbar`}
        props={bottomNavProps}
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
