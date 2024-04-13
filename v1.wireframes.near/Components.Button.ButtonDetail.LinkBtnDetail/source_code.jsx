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

const linkFirstProps = {
  buttonTitle: "Link",
  style: {
    backgroundColor: "#0d6efd",
    activeColor: "#0451c2",
    hoverColor: "#408cfd",
  },
  type: "button",
  buttonHref: hyperlink,
};

const linkSecondProps = {
  buttonTitle: "Link",
  style: {
    hoverColor: "none",
    activeColor: "#fff",
    backgroundColor: "transaprent",
    border: "1px solid #0d6efd",
    fontColor: "#0d6efd",
  },
  type: "button",
  buttonHref: hyperlink,
};

const disabledProps = {
  buttonTitle: "Disabled",
  style: {
    backgroundColor: "#9292a0",
    activeColor: "#9292a0",
    hoverColor: "#9292a0",
    fontColor: "#fff",
  },
  type: "button",
  isDisable: true,
  buttonHref: hyperlink,
};

const detail = `const buttonProps ={
  buttonTitle:"Link", 
  style:{ 
    backgroundColor:"#0d6efd",
    activeColor: "#0451c2",
    hoverColor: "#408cfd",
    fontColor: "#fff",
  },
  type:"button",
  isDisable: true,
  buttonHref: "${hyperlink}",
};
return(
<Widget src="v1.wireframes.near/widget/Components.Button.LinkButton" props={buttonProps} />
);`;

const explanation =
  "The Link Button is a dynamic and user-centric UI element crafted to bridge the gap between traditional hyperlinks and interactive buttons. By combining the familiar appearance of a link with the functionality of a button, this component offers developers a powerful tool to create cohesive and user-friendly navigation within their applications.";
const propsExplanation = [
  {
    title: "buttonTitle",
    required: "true",
    content:
      "You can use buttonTitle prop to specify the text or label displayed on a button element. e.g.",
    code: `const buttonProps = {
      buttonTitle:'Link',
    };`,
  },
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
    title: "isLoading",
    content:
      "The isLoading prop is used to conditionally render loading spinners, placeholders, or other UI elements to indicate to the user that content is being loaded. e.g.",
    code: `const buttonProps = { 
      isLoading: false,
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
            width: '100%',
          }, 
        };`,
      },
      {
        title: "border",
        content:
          "The border props is used to set the border of an element. e.g.",
        code: `const buttonProps = {
          style:{ 
            border: 'none',
          }, 
        };`,
      },
      {
        title: "padding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const buttonProps = {
          style:{ 
            padding: '10px 20px',
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
            borderRadius: '8px',
          }, 
        };`,
      },
      {
        title: "height",
        content:
          "The height property is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.",
        code: `const buttonProps = {
          style:{ 
            height: '3rem',
          }, 
        };`,
      },
      {
        title: "borderStyle",
        content:
          "The borderStyle property is used to specify the style of the border of an element's box. It determines the appearance of the border by defining the pattern of the line drawn around the element. e.g.",
        code: `const buttonProps = {
          style:{ 
            borderStyle: 'none',
          }, 
        };`,
      },
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const buttonProps = {
          style:{ 
            backgroundColor: '#0d6efd',
          }, 
        };`,
      },
      {
        title: "textShadow",
        content:
          "The textShadow property is used to add shadow effects to text. It allows you to specify one or more shadows that are applied to the text of an element. e.g.",
        code: `const buttonProps = {
          style:{ 
            textShadow: 'rgba(0, 0, 0, 0.25) 0 3px 8px',
          }, 
        };`,
      },
      {
        title: "hoverColor",
        content:
          "You can use hoverColor props to change the color of an element when it's in the hover state. e.g.",
        code: `const buttonProps = {
          style:{ 
            hoverColor: '#0451c2',
          }, 
        };`,
      },
      {
        title: "activeColor",
        content:
          "You can use activeColor props to change the color of an element when it's in the active state. e.g.",
        code: `const buttonProps = {
          style:{ 
            activeColor: '#0451c2',
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
            loaderMarginRight: '10px',
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

const propsList = [linkFirstProps, linkSecondProps, disabledProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Button.LinkButton"
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
