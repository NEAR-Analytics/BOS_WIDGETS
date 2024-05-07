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

const ownerId = "v1.wireframes.near";

const primaryProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    border: "1px solid #0d6efd",
    fontColor: "#0d6efd",
  },
};

const secondaryProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    fontColor: "#444e57",
    border: "1px solid #444e57",
  },
};

const successProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    fontColor: "#2f7332",
    border: "1px solid #2f7332",
  },
};
const dangerProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    fontColor: "#ab1f2c",
    border: "1px solid #ab1f2c",
  },
};

const warningProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    fontColor: "#fb8332",
    border: "1px solid #fb8332",
  },
};

const darkProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    fontColor: "#000",
    border: "1px solid #000",
  },
};

const disabledProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    fontColor: "#9292a0",
    border: "1px solid #9292a0",
  },
};

const lightProps = {
  alertTitle: "An outline alert—check it out!",
  style: {
    fontColor: "#000",
    border: "1px solid #0d6efd",
  },
};

const detail = `const alertProps ={
  alertTitle: "An outline alert—check it out!", 
  style:{
    fontColor:"#0d6efd",
    border: "1px solid #000",
  },
  isIcon: false,
  iconClose: false,
};
return(
<Widget src="v1.wireframes.near/widget/Components.Alert.OutlineAlert" props={alertProps}/>
);`;

const explanation =
  "The outline-alert function is used to display a dialog box with a specified message. It's commonly used for displaying alerts, notifications, or messages to users in web applications.An outline is a border-like visual styling that is drawn around the outside of an element, typically to provide visual emphasis without affecting the layout or dimensions of the element.";
const propsExplanation = [
  {
    title: "alertTitle",
    required: "true",
    content:
      "You can use alertTitle prop to specify the text or label displayed on an alert element. e.g.",
    code: `const alertProps = {
      alertTitle:'An outline alert—check it out!',
    };`,
  },
  {
    title: "icon",
    content:
      "The icon prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const alertProps = { 
      icon: "exclamation-triangle-fill",
    };`,
  },
  {
    title: "isIcon",
    content:
      "The isIcon props is potentially refer to a boolean flag or property used to indicate whether an element or component should display an icon. e.g.",
    code: `const alertProps = { 
      isIcon: false,
    };`,
  },
  {
    title: "iconClose",
    content:
      "The iconClose props suggests a specific icon used to represent a 'close' action or functionality within a user interface. This icon is typically used in modal dialogs, alerts, popups, or other UI elements where the user needs to dismiss or close a component. e.g.",
    code: `const alertProps = { 
      iconClose: false,
    };`,
  },
  {
    title: "iconColor",
    content:
      "The iconColor prop is used to dynamically set the fill color of the representing icon. e.g.",
    code: `const alertProps = { 
      iconColor: "#0d6efd",
    };`,
  },
  {
    title: "iconSize",
    content:
      "The iconSize prop is passed to the icon component, to set the size of the icon. e.g.",
    code: `const alertProps = { 
      iconSize: "20px",
    };`,
  },
  {
    title: "cancelIconName",
    content:
      "The cancelIconName prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const alertProps = { 
      cancelIconName: "x-lg",
    };`,
  },
  {
    title: "cancelIconColor",
    content:
      "The cancelIconColor prop is used to dynamically set the fill color of the representing icon. e.g.",
    code: `const alertProps = { 
      cancelIconColor: "#000",
    };`,
  },
  {
    title: "cancelIconSize",
    content:
      "The cancelIconSize prop is passed to the icon component, to set the size of the icon. e.g.",
    code: `const alertProps = { 
      cancelIconSize: "20px",
    };`,
  },
  {
    title: "style",
    required: "true",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const alertProps = {
       style:{ 
          fontSize: '16px', 
          fontWeight: '600', 
        }, 
      };`,
    children: [
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const alertProps = {
          style:{ 
            backgroundColor: 'transparent',
          }, 
        };`,
      },
      {
        title: "fontColor",
        content:
          "You can use fontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const alertProps = {
          style:{ 
            fontColor: '#fff',
          }, 
        };`,
      },
      {
        title: "padding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const alertProps = {
          style:{ 
            padding: '1rem',
          }, 
        };`,
      },
      {
        title: "fontSize",
        content:
          "The fontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const alertProps = {
          style:{ 
            fontSize: '16px',
          }, 
        };`,
      },
      {
        title: "fontFamily",
        content:
          "The fontFamily props is used to define the typeface or font family that should be applied to the text content within an element. It specifies a prioritized list of font family names and/or generic family names. e.g.",
        code: `const alertProps = {
          style:{ 
            fontFamily: 'system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif',
          }, 
        };`,
      },
      {
        title: "fontWeight",
        content:
          "The fontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const alertProps = {
          style:{ 
            fontWeight: '600',
          }, 
        };`,
      },
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const alertProps = {
          style:{ 
            width: '100%',
          }, 
        };`,
      },
      {
        title: "height",
        content:
          "The height property is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.",
        code: `const alertProps = {
          style:{ 
            height: 'auto',
          }, 
        };`,
      },
      {
        title: "border",
        content:
          "The border props is used to set the border of an element. e.g.",
        code: `const alertProps = {
          style:{ 
            border: '1px solid #000',
          }, 
        };`,
      },
      {
        title: "borderRadius",
        content:
          "The borderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const alertProps = {
          style:{ 
            borderRadius: '5px',
          }, 
        };`,
      },
      {
        title: "containerDisplay",
        content:
          "The containerDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.,",
        code: `const alertProps = {
          style:{ 
            containerDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "iconMargin",
        content:
          "The iconMargin property is used to create space around an element, outside of any defined borders. It controls the amount of space between an element and adjacent elements. You can set the margin on all four sides of an element or individually for each side. e.g.,",
        code: `const alertProps = {
          style:{ 
            iconMargin: '0 5px 0',
          }, 
        };`,
      },
      {
        title: "innerContainerWidth",
        content:
          "You can use innerContainerWidth to set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const alertProps = {
          style:{ 
            innerContainerWidth: '100%',
          }, 
        };`,
      },
      {
        title: "innerContainerDisplay",
        content:
          "The innerContainerDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.,",
        code: `const alertProps = {
          style:{ 
            innerContainerDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "innerContainerJustifyContent",
        content:
          "The innerContainerJustifyContent props is used in flexbox layouts to align flex items along the main axis of the flex container e.g.",
        code: `const alertProps = {
          style:{ 
            innerContainerJustifyContent: 'space-between',
          }, 
        };`,
      },
      {
        title: "contentWidth",
        content:
          "You can use contentWidth to set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const alertProps = {
          style:{ 
            contentWidth: '100%',
          }, 
        };`,
      },
      {
        title: "contentAlignItems",
        content:
          "The contentAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const alertProps = {
          style:{ 
            contentAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "contentDisplay",
        content:
          "The contentDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.,",
        code: `const alertProps = {
          style:{ 
            contentDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "iconCloseDisplay",
        content:
          "The iconCloseDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.,",
        code: `const alertProps = {
          style:{ 
            iconCloseDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "iconCloseAlignItems",
        content:
          "The iconCloseAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const alertProps = {
          style:{ 
            iconCloseAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "closeBtnBackground",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const alertProps = {
          style:{ 
            closeBtnBackground: 'none'
          }, 
        };`,
      },
      {
        title: "closeBtnBorder",
        content:
          "The closeBtnBorder props is used to set the border of an element. e.g.",
        code: `const alertProps = {
          style:{ 
            closeBtnBorder: 'none',
          }, 
        };`,
      },
      {
        title: "closeBtnBorderRadius",
        content:
          "The closeBtnBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const alertProps = {
          style:{ 
            closeBtnBorderRadius: '10px',
          }, 
        };`,
      },
    ],
  },
  {
    title: "inlineStyle",
    content: "You will be able to add your Inline style here. e.g.",
    code: `const alertProps = { 
      inlineStyle: { 
        fontSize: '16px',
      }, 
    };`,
  },
];

const propsList = [
  primaryProps,
  secondaryProps,
  successProps,
  dangerProps,
  warningProps,
  darkProps,
  disabledProps,
  lightProps,
];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Alert.OutlineAlert"
            props={data}
          />
        </div>
      ))}
    </div>
  ),
  text: detail,
  explanation: explanation,
  propsExplanation: propsExplanation,
};

return (
  <>
    <Widget
      src={`v1.wireframes.near/widget/Components.Learning.LearningCard`}
      props={props}
    />
  </>
);
