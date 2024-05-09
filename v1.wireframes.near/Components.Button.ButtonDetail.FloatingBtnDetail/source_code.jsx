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

const iconArrowUpProps = {
  icon: "bi bi-arrow-up",
  iconColor: "#fff",
  iconSize: "25px",
  style: {
    backgroundColor: "#0d6efd",
    activeBoxShadow: "#0451c2",
    hoverBoxShadow: "#408cfd",
    height: "59px",
    width: "60px",
  },
  type: "button",
};

const iconPlusProps = {
  icon: "bi bi-plus",
  iconColor: "#fff",
  iconSize: "25px",
  style: {
    backgroundColor: "#9c27b0",
    activeBoxShadow: "#0451c2",
    hoverBoxShadow: "#408cfd",
    height: "59px",
    width: "60px",
  },
  type: "button",
};

const iconPencilProps = {
  icon: "bi bi-pencil-fill",
  iconSize: "25px",
  style: {
    backgroundColor: "#ddd",
    border: "1px solid #0d6efd",
    activeBoxShadow: "#0451c2",
    hoverBoxShadow: "#0451c2",
    height: "59px",
    width: "60px",
  },
  type: "button",
  buttonHref: hyperlink,
};

const detail = `const buttonProps ={
  icon: "plus",
  iconColor: "#fff",
  iconSize: "25px",
  style: {
    backgroundColor: "#9c27b0",
    activeBoxShadow: "#0451c2",
    hoverBoxShadow: "#408cfd",
    height: "59px",
    width: "60px",
  },
  onClick: () => {},
  type: "button",
  buttonHref: "${hyperlink}",
};
return(
<Widget src="v1.wireframes.near/widget/Components.Button.FloatingButton" props={buttonProps} />
);`;

const explanation =
  "The Floating Button component is a contemporary and user-centric addition to your application, providing a subtle yet impactful design element. By incorporating floating motion to buttons, developers can enhance user interactions, guide attention to key actions, and contribute to an overall modern and sophisticated visual experience.";
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
      isDisable: true,
    };`,
  },
  {
    title: "icon",
    required: "true",
    content:
      "The icon prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const buttonProps = { 
      icon: "plus",
    }`,
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
      iconSize: "25px",
    };`,
  },
  {
    title: "style",
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
        title: "height",
        content:
          "The height property is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.",
        code: `const buttonProps = {
          style:{ 
            height: 'auto',
          }, 
        };`,
      },
      {
        title: "minHeight",
        content:
          "The minHeight property is used to set the minimum height of an element. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const buttonProps = {
          style:{ 
            minHeight: '39px',
          }, 
        };`,
      },
      {
        title: "minWidth",
        content:
          "The minWidth property is used to specify the minimum width of an element. It ensures that the element will not become narrower than the specified minimum width, even if its content or the container's width is smaller. e.g.",
        code: `const buttonProps = {
          style:{ 
            minWidth: '40px',
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
        title: "borderRadius",
        content:
          "The borderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const buttonProps = {
          style:{ 
            borderRadius: '5px',
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
            activeBoxShadow: 'rgba(0, 0, 0, .06) 0 2px 4px',
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

const propsList = [iconPlusProps, iconArrowUpProps, iconPencilProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Button.FloatingButton"
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
