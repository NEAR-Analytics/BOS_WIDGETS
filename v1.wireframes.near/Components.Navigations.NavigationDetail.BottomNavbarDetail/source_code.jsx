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
        {selectedButton === "home" && <h1>Home</h1>}
        {selectedButton === "map" && <h1>Map</h1>}
        {selectedButton === "help" && <h1>Help</h1>}
      </Content>
    </>
  ),
};

const navData = {
  selectedButton: selectedButton,
  setSelectedButton: setSelectedButton,
  style: {
    navPosition: "none",
  },
  linksData: [
    {
      text: "Home",
      href: "#",
      iconName: "person",
      iconSize: "35px",
      iconColor: "#822b61",
      id: "home",
    },
    {
      text: "Alert",
      href: "#",
      iconName: "bell",
      iconSize: "35px",
      iconColor: "#822b61",
      id: "alerts",
    },
    {
      text: "Map",
      href: "#",
      iconName: "pin-map",
      iconSize: "35px",
      iconColor: "#822b61",
      id: "map",
    },
    {
      text: "Shedule",
      href: "#",
      iconName: "calendar2-check",
      iconSize: "35px",
      iconColor: "#822b61",
      id: "schedule",
    },
    {
      text: "Help",
      href: "#",
      iconName: "question-octagon",
      iconSize: "35px",
      iconColor: "#822b61",
      id: "help",
    },
  ],
};

const detail = `
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
        {selectedButton === "home" && <h1>Home</h1>}
        {selectedButton === "map" && <h1>Map</h1>}
        {selectedButton === "help" && <h1>Help</h1>}
      </Content>
    </>
  ),
};

const navData = {
  selectedButton: selectedButton,
  setSelectedButton: setSelectedButton,
  style: {
    navPosition: "none",
  },
  linksData: [
    {
      text: "Home",
      href: "#",
      iconName: "person",
      iconSize: "35px",
      iconColor: "#822b61",
      id: "home",
    },
    {
      text: "Alert",
      href: "#",
      iconName: "bell",
      iconSize: "35px",
      iconColor: "#822b61",
      id: "alerts",
    },
  ]
};
return(
  src="v1.wireframes.near/widget/Components.Navigations.BottomNavbar" props={navData} />
);`;
const explanation =
  "A bottom navigation bar, often referred to as Bottom Nav, is a user interface component commonly found in mobile applications or websites. It typically appears at the bottom of the screen and provides navigation options for users to move between different sections or pages of the application.";

const propsExplanation = [
  {
    title: "children",
    required: "true",
    content:
      "The children typically refers to the elements or components nested within a parent element or component. You must have to add or pass the code inside children to do changes. e.g.",
    code: `const data = {
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
    code: `const navData = {
      selectedButton : selectedButton,
    };`,
  },
  {
    title: "setSelectedButton",
    required: "true",
    content:
      "You can use the setSelectedButton props to update the appearance or behavior of buttons based on user interaction or programmatic logic. e.g.",
    code: `const navData = {
      setSelectedButton : setSelectedButton,
    };`,
  },
  {
    title: "linksData",
    required: "true",
    content:
      "The linksData appears to be an array of objects containing information about links, particularly for navigation purposes. e.g.",
    code: `const navData = {
      linksData : [
        {
          text: "Home",
          href: "#",
          iconName: "person",
          iconSize: "35px",
          iconColor: "#822b61",
          id: "home",
        },
        {
          text: "Alert",
          href: "#",
          iconName: "bell",
          iconSize: "35px",
          iconColor: "#822b61",
          id: "alerts",
        },
      ]
    };`,
    children: [
      {
        title: "text",
        required: "true",
        content:
          "Each object in the array contain properties like text to specify the text content of the link. e.g.",
        code: `const navData = {
          linksData:[
            { 
              text: 'Home',
            }, 
          ]
        };`,
      },
      {
        title: "href",
        required: "true",
        content: "The href attribute is crucial for creating hyperlinks. e.g.",
        code: `const navData = {
          linksData:[
            { 
              href: "#",
            }, 
          ]
        };`,
      },
      {
        title: "iconName",
        required: "true",
        content:
          "The iconName property appears to be part of an object or data structure that represents an icon. e.g.",
        code: `const navData = {
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
        code: `const navData = {
          linksData:[
            { 
              iconSize: "35px",
            }, 
          ]
        };`,
      },
      {
        title: "iconColor",
        content:
          "The iconColor appears is used to the color property, which is commonly used to set the color of an icon. e.g.",
        code: `const navData = {
          style:{ 
            iconColor: '#822b61',
          } 
        };`,
      },
      {
        title: "id",
        required: "true",
        content:
          "The id property appears to specify a unique identifier for an element.. e.g.",
        code: `const navData = {
          linksData:[
            { 
              id: "home",
            }, 
          ]
        };`,
      },
    ],
  },
  {
    title: "bottomNavWrapperStyle",
    content: "You can use 'bottomNavWrapperStyle' props to add your Inline style for the customization applied to a navigation component, such as a navbar or menu. These styles are used to customize the appearance and behavior of the navigation element. e.g.",
    code: `const data = { 
      bottomNavWrapperStyle: { 
        color: '#000';
      }, 
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const navData = {
      style: {
        navPosition: "none",
      },
    };`,
    children: [
      {
        title: "navWidth",
        content:
          "The navWidth property is used to set the width of area. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const navData = {
          style:{ 
            navWidth: '50%',
          }, 
        };`,
      },
      {
        title: "navPosition",
        content:
          "The navPosition props is used to specify the positioning method of an element relative to its containing element or the document itself. It allows you to control the placement of a navbar element within the layout of a webpage. e.g.",
        code: `const navData = {
          style:{ 
            navPosition: 'fixed',
          }, 
        };`,
      },
      {
        title: "navBottom",
        content:
          "The navBottom props is used to specify the distance between the bottom edge of a positioned element and the bottom edge of its containing block. It applies only to positioned elements, meaning elements with a position value other than static (such as relative, absolute, fixed, or sticky). e.g.",
        code: `const navData = {
          style:{ 
            navBottom: '0px',
          }, 
        };`,
      },
      {
        title: "navleft",
        content:
          "The navleft props is used to specify the distance between the left edge of a positioned element and the left edge of its containing block. It applies only to positioned elements, meaning elements with a position value other than static (such as relative, absolute, fixed, or sticky). e.g.",
        code: `const navData = {
          style:{ 
            navleft: '25%',
          }, 
        };`,
      },
      {
        title: "navDisplay",
        content:
          "The navDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const navData = {
          style:{ 
            navDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "navJustifyContent",
        content:
          "The navJustifyContent props is used to align flex items along the main axis of the flex container. It determines how remaining space in the flex container is distributed among the flex items when there is extra space available. e.g.",
        code: `const navData = {
          style:{ 
            navJustifyContent: 'center',
          }, 
        };`,
      },
      {
        title: "navAlignItems",
        content:
          "The navAlignItems props is used to define how flex items are aligned along the cross axis of their flex container in navbar. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const navData = {
          style:{ 
            navAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "navMargin",
        content:
          "The navMargin props is used to create space around an element, outside of any defined borders. It controls the amount of space between an element and adjacent elements. You can set the margin on all four sides of an element or individually for each side. e.g.",
        code: `const navData = {
          style:{ 
            navMargin: '0px',
          }, 
        };`,
      },
      {
        title: "navBackgroundColor",
        content:
          "The navBackgroundColor props is used to specify the background color of an element. It allows you to set the color that will be displayed behind the content and padding of the element. e.g.",
        code: `const navData = {
          style:{ 
            navBackgroundColor: '#fff',
          }, 
        };`,
      },
      {
        title: "navBorderRadius",
        content:
          "The navBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const navData = {
          style:{ 
            navBorderRadius: '20px 20px 0px 0px',
          }, 
        };`,
      },
      {
        title: "navPadding",
        content:
          "The navPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const navData = {
          style:{ 
            navPadding: '30px 0px 15px',
          }, 
        };`,
      },
      {
        title: "navLaptopWidth",
        content:
          "The navLaptopWidth property is used to set the width of box in a particular media. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const navData = {
          style:{ 
            navLaptopWidth: '100%',
          }, 
        };`,
      },
      {
        title: "navLaptopLeft",
        content:
          "The navLaptopLeft props is used to specify the distance between the left edge of a positioned element and the left edge of its containing block. It applies only to positioned elements, meaning elements with a position value other than static (such as relative, absolute, fixed, or sticky). e.g.",
        code: `const navData = {
          style:{ 
            navLaptopLeft: '0',
          }, 
        };`,
      },
      {
        title: "navFontColor",
        content:
          "The navFontColor props is used to the color property, which is commonly used to set the text color of an element. e.g.",
        code: `const navData = {
          style:{ 
            navFontColor: '#822b61',
          }, 
        };`,
      },
      {
        title: "navFontSize",
        content:
          "The navFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const navData = {
          style:{ 
            navFontSize: '20px',
          }, 
        };`,
      },
      {
        title: "navIconTop",
        content:
          "The navIconTop props is used to specify the vertical position of a positioned element relative to its containing block. It applies only to elements with a position value other than static (e.g., relative, absolute, fixed, or sticky). e.g.",
        code: `const navData = {
          style:{ 
            navIconTop: '-13%',
          }, 
        };`,
      },
      {
        title: "navIconLeft",
        content:
          "The navIconLeft props is used to specify the distance between the left edge of a positioned element and the left edge of its containing block. It applies only to positioned elements, meaning elements with a position value other than static (such as relative, absolute, fixed, or sticky). e.g.",
        code: `const navData = {
          style:{ 
            navIconLeft: '0',
          }, 
        };`,
      },
      {
        title: "navIconZIndex",
        content:
          "The navIconZIndex props is used to controls the stacking order of positioned elements of navbar. It specifies the z-axis position of an element and determines whether it appears in front of or behind other elements. e.g.",
        code: `const navData = {
          style:{ 
            navIconZIndex: '9',
          }, 
        };`,
      },
      {
        title: "navSpanFontSize",
        content:
          "The navSpanFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const navData = {
          style:{ 
            navSpanFontSize: '18px',
          }, 
        };`,
      },
      {
        title: "navSpanBottom",
        content:
          "The navSpanBottom props is used to specify the distance between the bottom edge of a positioned element and the bottom edge of its containing block. e.g.",
        code: `const navData = {
          style:{ 
            navSpanBottom: '-16px',
          }, 
        };`,
      },
      {
        title: "navActiveSpanBottom",
        content:
          "The navActiveSpanBottom props is used to specify the distance between the bottom edge of a positioned element and the bottom edge of its containing block when it is in the active state. e.g.",
        code: `const navData = {
          style:{ 
            navActiveSpanBottom: '0px',
          }, 
        };`,
      },
      {
        title: "navActiveIconTop",
        content:
          "The navActiveIconTop props is used to specify the vertical position of a positioned element relative to its containing block. It applies only when the icon is in the active state. e.g.",
        code: `const navData = {
          style:{ 
            navActiveIconTop: '-60%',
          }, 
        };`,
      },
      {
        title: "navSliderBottom",
        content:
          "The navSliderBottom props is used to specify the distance between the bottom edge of a positioned element and the bottom edge of its containing block. e.g.",
        code: `const navData = {
          style:{ 
            navSliderBottom: '-25px',
          }, 
        };`,
      },
      {
        title: "navSliderBorderRadius",
        content:
          "The navSliderBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const navData = {
          style:{ 
            navSliderBorderRadius: '50%',
          }, 
        };`,
      },
      {
        title: "navSliderTransition",
        content:
          "The navSliderTransition props is used to smoothly animate changes to CSS properties over a specified duration. e.g.",
        code: `const navData = {
          style:{ 
            navSliderTransition: 'left 1s',
          }, 
        };`,
      },
      {
        title: "listItemWidth",
        content:
          "The listItemWidth property is used to set the width of area. It determines the horizontal size of the content box within an element's box model. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const navData = {
          style:{ 
            listItemWidth: '75px',
          }, 
        };`,
      },
      {
        title: "listItemHeight",
        content:
          "The listItemHeight props is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.",
        code: `const navData = {
          style:{ 
            listItemHeight: '45px',
          }, 
        };`,
      },
      {
        title: "listItemTextAlign",
        content:
          "The listItemTextAlign props is used to specify the horizontal alignment of text within its containing element. It determines how text is positioned within the box of the element, whether it's aligned to the left, right, centered, or justified. e.g.",
        code: `const navData = {
          style:{ 
            listItemTextAlign: 'center',
          }, 
        };`,
      },
      {
        title: "listItemDisplay",
        content:
          "The listItemDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const navData = {
          style:{ 
            listItemDisplay: 'block',
          }, 
        };`,
      },
      {
        title: "listItemTransition",
        content:
          "The listItemTransition props is used to smoothly animate changes to CSS properties over a specified duration. e.g.",
        code: `const navData = {
          style:{ 
            listItemTransition: '1s',
          }, 
        };`,
      },
      {
        title: "listItemPosition",
        content:
          "The listItemPosition props is used to specify the positioning method of an element relative to its containing element or the document itself. It allows you to control the placement of a navbar element within the layout of a webpage. e.g.",
        code: `const navData = {
          style:{ 
            listItemPosition: 'relative',
          }, 
        };`,
      },
      {
        title: "listItemIconWidth",
        content:
          "The listItemIconWidth props is used to set the width of icon. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const navData = {
          style:{ 
            listItemIconWidth: '100%',
          }, 
        };`,
      },
      {
        title: "listItemIconPosition",
        content:
          "The listItemIconPosition props is used to specify the positioning method of an element relative to its containing element or the document itself. It allows you to control the placement of a navbar element within the layout of a webpage. e.g.",
        code: `const navData = {
          style:{ 
            listItemIconPosition: 'absolute',
          }, 
        };`,
      },
      {
        title: "listItemSpanDisplay",
        content:
          "The listItemSpanDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const navData = {
          style:{ 
            listItemSpanDisplay: 'block',
          }, 
        };`,
      },
      {
        title: "listItemSpanWidth",
        content:
          "The listItemSpanWidth props is used to set the width of icon. You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const navData = {
          style:{ 
            listItemSpanWidth: '100%',
          }, 
        };`,
      },
      {
        title: "listItemSpanPosition",
        content:
          "The listItemSpanPosition props is used to specify the positioning method of an element relative to its containing element or the document itself. It allows you to control the placement of a navbar element within the layout of a webpage. e.g.",
        code: `const navData = {
          style:{ 
            listItemSpanPosition: 'absolute',
          }, 
        };`,
      },
      {
        title: "listItemSpanZIndex",
        content:
          "The listItemSpanZIndex props is used to controls the stacking order of positioned elements of navbar. It specifies the z-axis position of an element and determines whether it appears in front of or behind other elements. e.g.",
        code: `const data = {
          style:{ 
            listItemSpanZIndex: '9',
          }, 
        };`,
      },
      {
        title: "listItemSpanOpacity",
        content:
          "The listItemSpanOpacity props is used to specify the transparency level of an element. It affects the entire element, including its content, background, and any child elements. e.g.",
        code: `const data = {
          style:{ 
            listItemSpanOpacity: '0',
          }, 
        };`,
      },
      {
        title: "listItemActiveSpanOpacity",
        content:
          "The listItemActiveSpanOpacity props is used to specify the transparency level of an element. It affects the entire element, including its content, background, and any child elements.This prop will work when the span is in active state. e.g.",
        code: `const data = {
          style:{ 
            listItemActiveSpanOpacity: '1',
          }, 
        };`,
      },
    ],
  },
];

const props = {
  copyBtn: detail,
  component: (
    <div className="row" style={{ textAlign: "-webkit-center" }}>
      <Widget
        src={`v1.wireframes.near/widget/Components.Navigations.BottomNavbar`}
        props={navData}
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
