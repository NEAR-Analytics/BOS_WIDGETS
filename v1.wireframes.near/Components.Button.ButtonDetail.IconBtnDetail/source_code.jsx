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
const hyperlink = "https://wireframes.design";

const iconSendProps = {
  icon: "send",
  iconColor: "#fff",
  iconSize: "22px",
  style: {
    backgroundColor: "#0d6efd",
    activeBoxShadow: "#0451c2",
    hoverBoxShadow: "#408cfd",
    height: "49px",
    width: "50px",
    loaderHeight: "24px",
    loaderWidth: "24px",
  },
  type: "button",
};

const iconDeleteProps = {
  icon: "trash",
  iconSize: "22px",
  style: {
    backgroundColor: "#ddd",
    border: "1px solid #0d6efd",
    fontColor: "#0d6efd",
    height: "49px",
    width: "50px",
    loaderHeight: "24px",
    loaderWidth: "24px",
  },
  type: "button",
};
const linkBtnProps = {
  icon: "link-45deg",
  iconSize: "22px",
  style: {
    backgroundColor: "#ddd",
    border: "1px solid #0d6efd",
    fontColor: "#0d6efd",
    hoverBoxShadow: "#408cfd",
    height: "49px",
    width: "50px",
    loaderHeight: "24px",
    loaderWidth: "24px",
  },
  type: "button",
  buttonHref: hyperlink,
};

const detail = `const buttonProps ={
  icon: "send", 
  iconSize: "22px",
  style:{ 
    backgroundColor:"#0d6efd",
    activeBoxShadow: "#0451c2",
    hoverBoxShadow: "#408cfd",
    border: "1px solid #0d6efd",
    fontColor: "#0d6efd",
    height: "49px",
    width: "50px",
    loaderHeight: "24px",
    loaderWidth: "24px",
  },
  type:"button",
  isDisable: false,
  isLoading: false,
  buttonHref: "${hyperlink}",
};
return(
<Widget src="v1.wireframes.near/widget/Components.Button.IconButton" props={buttonProps} />
);`;

const explanation =
  "The Icon Button stands as a dynamic solution for applications, marrying simplicity with visual impact. By leveraging icons as a central element, this component offers a streamlined way to convey actions, enhance navigation, and elevate the overall aesthetic of your user interface.";
const propsExplanation = [
  {
    title: "buttonHref",
    required: "false",
    content:
      "You can use buttonHref as the anchor element, which acts as a hyperlink, and clicking it will navigate to the specified URL. For navigation you can use either 'onClick' method, or 'buttonHref' props. If you're using 'buttonHref' then 'onClick' method won't work. e.g.",
    code: `const buttonProps = { 
      buttonHref: "${hyperlink}",
    };`,
  },
  {
    title: "isDisable",
    content:
      "The isDisable prop is used to make an element non-interactive, meaning it cannot be clicked or modified by the user. e.g.",
    code: `const buttonProps = { 
      isDisable: false,
    };`,
  },
  {
    title: "icon",
    required: "true",
    content:
      "The icon prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const buttonProps = { 
      icon: "bi bi-send",
    };`,
  },
  {
    title: "iconColor",
    content:
      "The iconColor prop is used to dynamically set the fill color of the representing icon. e.g.",
    code: `const buttonProps = { 
      iconColor: "#fff",
    };`,
  },
  {
    title: "iconSize",
    content:
      "The iconSize prop is passed to the icon component, to set the size of the icon. e.g.",
    code: `const buttonProps = { 
      iconSize: "20px",
    };`,
  },
  {
    title: "style",
    required: "true",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const buttonProps = {
      style:{ 
        fontSize: '0.5em', 
        fontWeight: '600', 
        border: '1px solid', 
      },
    };`,
    children: [
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const buttonProps = {
          style:{ 
            width: 'auto',
          }, 
        };`,
      },
      {
        title: "border",
        content:
          "The border props is used to set the border of an element. e.g.",
        code: `const buttonProps = {
          style:{ 
            border: '1px solid transparent',
          }, 
        };`,
      },
      {
        title: "padding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const buttonProps = {
          style:{ 
            padding: '5px 3px',
          },
        };`,
      },
      {
        title: "fontSize",
        content:
          "The fontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontSize: '16px',
          }, 
        };`,
      },
      {
        title: "fontColor",
        content:
          "You can use fontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontColor: '#fff',
          }, 
        };`,
      },
      {
        title: "fontFamily",
        content:
          "The fontFamily props is used to define the typeface or font family that should be applied to the text content within an element. It specifies a prioritized list of font family names and/or generic family names. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontFamily: 'system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif',
          }, 
        };`,
      },
      {
        title: "fontWeight",
        content:
          "The fontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontWeight: '600',
          }, 
        };`,
      },
      {
        title: "borderRadius",
        content:
          "The borderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const buttonProps = {
          style:{ 
            borderRadius: '100%',
          }, 
        };`,
      },
      {
        title: "lineHeight",
        content:
          "The lineHeight property is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const buttonProps = {
          style:{ 
            lineHeight: '1.25',
          }, 
        };`,
      },
      {
        title: "boxShadow",
        content:
          "The boxShadow property is used to add shadow effects to an element's box. It allows you to create both inner shadows and outer shadows, providing depth and dimension to the appearance of elements on a webpage. e.g.",
        code: `const buttonProps = {
          style:{ 
            boxShadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0',
          }, 
        };`,
      },
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const buttonProps = {
          style:{ 
            backgroundColor: 'transparent',
          }, 
        };`,
      },
      {
        title: "activeBoxShadow",
        content:
          "The term activeBoxShadow typically refers to applying a box shadow effect to an element when it is in an active state, such as when it is clicked or pressed. e.g.",
        code: `const buttonProps = {
          style:{ 
            activeBoxShadow: 'rgba(0, 0, 0, 0.25) 0 3px 8px',
          }, 
        };`,
      },
      {
        title: "hoverBoxShadow",
        content:
          "The term hoverBoxShadow refers to applying a box shadow effect to an element when it is hovered over by the mouse. e.g.",
        code: `const buttonProps = {
          style:{ 
            hoverBoxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 12px',
          }, 
        };`,
      },
      {
        title: "loaderHeight",
        content:
          "The loaderHeight props is used to set the height of loader/spinner. e.g.",
        code: `const buttonProps = {
          style:{ 
            loaderHeight: '30px',
          }, 
        };`,
      },
      {
        title: "loaderWidth",
        content:
          "You can use loaderWidth props to set the width of loader/spinner using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const buttonProps = {
          style:{ 
            loaderWidth: '30px',
          }, 
        };`,
      },
      {
        title: "loaderMarginRight",
        content:
          "The loaderMarginRight props is used to specify the margin of loader/spinner on its right side. It determines the amount of space between the loader/spinner and adjacent elements or the container's edge on the right-hand side. e.g.",
        code: `const buttonProps = {
          style:{ 
            loaderMarginRight: '0px',
          }, 
        };`,
      },
    ],
  },
  {
    title: "inlineStyle",
    content: "You will be able to add your Inline style here. e.g.",
    code: `const buttonProps = { 
      inlineStyle: { 
        fontSize: '0.5em',
      }, 
    };`,
  },
  {
    title: "onClick",
    content:
      "You can add your onClick method here. For navigation you can use either 'onClick' method, or 'buttonHref' props. e.g.",
    code: `const buttonProps = { 
      onClick: () => {
        State.update({ show: !state.show, 
          showProp: false 
        });
      },
    };`,
  },
  {
    title: "type",
    required: "true",
    content:
      "Buttons can have different types, such as submit, reset, or button, each with its specific behavior. e.g.",
    code: `const buttonProps = { 
      type: "button",
    };`,
  },
];

const propsList = [iconSendProps, iconDeleteProps, linkBtnProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Button.IconButton"
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
