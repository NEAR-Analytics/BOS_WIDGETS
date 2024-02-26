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

const primaryProps = {
  buttonTitle: "Simple",
  style: {
    border: "1px solid #0d6efd",
    hoverColor: "#0d6efd",
    fontColor: "#0d6efd",
  },
  type: "button",
};

const secondaryProps = {
  buttonTitle: "Simple",
  style: {
    activeColor: "#444e57",
    hoverColor: "#444e57",
    fontColor: "#444e57",
    border: "1px solid #444e57",
  },
  type: "button",
};

const successProps = {
  buttonTitle: "Simple",
  style: {
    activeColor: "#2f7332",
    hoverColor: "#2f7332",
    fontColor: "#2f7332",
    border: "1px solid #2f7332",
  },
  type: "submit",
};
const dangerProps = {
  buttonTitle: "Simple",
  style: {
    activeColor: "#ab1f2c",
    hoverColor: "#ab1f2c",
    fontColor: "#ab1f2c",
    border: "1px solid #ab1f2c",
  },
  type: "button",
};

const warningProps = {
  buttonTitle: "Simple",
  style: {
    activeColor: "#fb8332",
    hoverColor: "#fb8332",
    fontColor: "#fb8332",
    border: "1px solid #fb8332",
  },
  type: "button",
};

const darkProps = {
  buttonTitle: "Simple",
  style: {
    activeColor: "#000",
    hoverColor: "#000",
    fontColor: "#000",
    border: "1px solid #000",
  },
  type: "button",
};

const disabledProps = {
  buttonTitle: "Simple",
  style: {
    backgroundColor: "#9292a0",
    activeColor: "#9292a0",
    hoverColor: "#9292a0",
  },
  type: "button",
  isDisable: true,
};

const linkBtnProps = {
  buttonTitle: "Simple",
  style: {
    backgroundColor: "#fff",
    activeColor: "#9292a0",
    hoverColor: "#9292a0",
    border: "1px solid #0d6efd",
  },
  type: "button",
  buttonHref: hyperlink,
};

const detail = `const buttonProps ={
  buttonTitle:"Simple", 
  style:{ 
    activeColor:"#0d6efd",
    hoverColor:"#0d6efd",
    fontColor:"#0d6efd",
    border: "1px solid #000"
  },
  type:"button",
  isDisable: false,
  buttonHref: "${hyperlink}",
};
return(
<Widget src="v1.wireframes.near/widget/Components.Button.OutlineButton" props={buttonProps} />
);`;

const explanation =
  "The Outline Button is a refined UI element designed to provide a subtle yet impactful visual contrast within your applications. With its minimalist approach and sleek outline, this component effortlessly integrates into a variety of design schemes, making it an ideal choice for projects aiming for a modern and polished look.";
const propsExplanation = [
  {
    title: "buttonTitle",
    required: "true",
    content:
      "You can use buttonTitle prop to specify the text or label displayed on a button element. e.g.",
    code: `const buttonProps = {
      buttonTitle:'Simple',
    };`,
  },
  {
    title: "buttonHref",
    required: "false",
    content:
      "You can use buttonHref as the anchor element, which acts as a hyperlink, and clicking it will navigate to the specified URL. e.g.",
    code: `const buttonProps = { 
      buttonHref: "${hyperlink}",
    }`,
  },
  {
    title: "isDisable",
    content:
      "The isDisable prop is used to make an element non-interactive, meaning it cannot be clicked or modified by the user. e.g.",
    code: `const buttonProps = { 
      isDisable: false,
    }`,
  },
  {
    title: "isLoading",
    content:
      "The isLoading prop is used to conditionally render loading spinners, placeholders, or other UI elements to indicate to the user that content is being loaded. e.g.",
    code: `const buttonProps = { 
      isLoading: false,
    }`,
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
          border: '1px solid' 
      } 
    };`,
    children: [
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const buttonProps = {
          style:{ 
            width: 'auto',
         } 
        };`,
      },
      {
        title: "border",
        content:
          "The border props is used to set the border of an element. e.g.",
        code: `const buttonProps = {
          style:{ 
            border: '1px solid #000',
         } 
        };`,
      },
      {
        title: "padding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const buttonProps = {
          style:{ 
            padding: '13px 23px',
         } 
        };`,
      },
      {
        title: "fontSize",
        content:
          "The fontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontSize: '16px',
         } 
        };`,
      },
      {
        title: "fontColor",
        content:
          "You can use fontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontColor: '#000',
         } 
        };`,
      },
      {
        title: "fontFamily",
        content:
          "The fontFamily props is used to define the typeface or font family that should be applied to the text content within an element. It specifies a prioritized list of font family names and/or generic family names. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontFamily: 'system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif',
         } 
        };`,
      },
      {
        title: "fontWeight",
        content:
          "The fontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const buttonProps = {
          style:{ 
            fontWeight: '600',
         } 
        };`,
      },
      {
        title: "borderRadius",
        content:
          "The borderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const buttonProps = {
          style:{ 
            borderRadius: '8px',
         } 
        };`,
      },
      {
        title: "lineHeight",
        content:
          "The lineHeight property is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const buttonProps = {
          style:{ 
            lineHeight: '20px',
         } 
        };`,
      },
      {
        title: "margin",
        content:
          "The margin property is used to create space around an element, outside of any defined borders. It controls the amount of space between an element and adjacent elements. You can set the margin on all four sides of an element or individually for each side. e.g.",
        code: `const buttonProps = {
          style:{ 
            margin: '0px',
         } 
        };`,
      },
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const buttonProps = {
          style:{ 
            backgroundColor: '#0d6efd',
          } 
        };`,
      },
      {
        title: "hoverColor",
        content:
          "You can use hoverColor props to change the color of an element when it's in the hover state. e.g.",
        code: `const buttonProps = {
          style:{ 
            hoverColor: '#0d6efd',
         } 
        };`,
      },
      {
        title: "hoverFontColor",
        content:
          "The term hoverFontColor typically refers to changing the color of text when the user hovers over it. e.g.",
        code: `const buttonProps = {
          style:{ 
            hoverFontColor: '#FFF',
         } 
        };`,
      },
      {
        title: "activeColor",
        content:
          "You can use activeColor props to change the color of an element when it's in the active state. e.g.",
        code: `const buttonProps = {
          style:{ 
            activeColor: '#0d6efd',
         } 
        };`,
      },
      {
        title: "activeFontColor",
        content:
          "The term activeFontColor typically refers to changing the color of text when an element is in an active state, such as when it is clicked or pressed. This effect can be achieved using CSS and the :active pseudo-class to apply different styles to an element when it's activated. e.g.",
        code: `const buttonProps = {
          style:{ 
            activeFontColor: '#FFF',
         } 
        };`,
      },
      {
        title: "loaderHeight",
        content:
          "The loaderHeight props is used to set the height of loader/spinner. e.g.",
        code: `const buttonProps = {
          style:{ 
            loaderHeight: '19px',
          } 
        };`,
      },
      {
        title: "loaderWidth",
        content:
          "You can use loaderWidth props to set the width of loader/spinner using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const buttonProps = {
          style:{ 
            loaderWidth: '19px',
          } 
        };`,
      },
      {
        title: "loaderMarginRight",
        content:
          "The loaderMarginRight props is used to specify the margin of loader/spinner on its right side. It determines the amount of space between the loader/spinner and adjacent elements or the container's edge on the right-hand side. e.g.",
        code: `const buttonProps = {
          style:{ 
            loaderMarginRight: '0px',
          } 
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
    } 
  };`,
  },
  {
    title: "onClick",
    content: "You can add your onClick method here. e.g.",
    code: `const buttonProps = { 
      onClick: () => {
        State.update({ show: !state.show, 
          showProp: false });
        }
    }`,
  },
  {
    title: "type",
    required: "true",
    content:
      "Buttons can have different types, such as submit, reset, or button, each with its specific behavior. e.g.",
    code: `const buttonProps = { 
      type: "button",
    }`,
  }
];

const propsList = [
  primaryProps,
  secondaryProps,
  successProps,
  dangerProps,
  warningProps,
  disabledProps,
  linkBtnProps,
];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Button.OutlineButton"
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
