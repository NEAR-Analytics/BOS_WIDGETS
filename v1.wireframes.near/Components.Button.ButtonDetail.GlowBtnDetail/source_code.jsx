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

const btnGlowBlackProps = {
  buttonTitle: "Black Button",
  type: "button",
};

const btnGlowWhiteProps = {
  buttonTitle: "White Button",
  style: {
    backgroundColor: "#fff",
    border: "2px solid black",
    fontColor: "black",
    afterBackgroundColor: "#fff",
  },
  type: "button",
};

const disabledProps = {
  buttonTitle: "Disabled",
  style: {
    afterBackgroundColor: "#9292a0",
    activeColor: "#9292a0",
    hoverColor: "#9292a0",
    fontColor: "#fff",
  },
  type: "button",
  isDisable: true,
};
const linkBtnProps = {
  buttonTitle: "Link",
  style: {
    backgroundColor: "#fff",
    border: "2px solid #0d6efd",
    fontColor: "#0d6efd",
    afterBackgroundColor: "#fff",
  },
  type: "button",
  buttonHref: hyperlink,
};

const detail = `const buttonProps ={
  buttonTitle:"Black Button",
  style:{ 
    backgroundColor: "#fff",
    border:"2px solid #0d6efd", 
    fontColor:"#0d6efd",
  },

  type:"button",
  isDisable: false,
  buttonHref: "${hyperlink}",
};
return(
<Widget src="v1.wireframes.near/widget/Components.Button.GlowButton" props={buttonProps} />
);`;

const explanation =
  "The Glow Button component is a versatile and eye-catching UI element that effortlessly combines functionality with style. With its subtle yet captivating glow effect, this component adds a modern and sophisticated flair to your applications, making user interactions more delightful.";
const propsExplanation = [
  {
    title: "buttonTitle",
    required: "true",
    content:
      "You can use buttonTitle prop to specify the text or label displayed on a button element. e.g.",
    code: `const buttonProps = {
      buttonTitle:'Black Button',
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
      isDisable: false,
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
            width: '8em',
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
            borderRadius: '10px',
          }, 
        };`,
      },
      {
        title: "height",
        content:
          "The height property is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.",
        code: `const buttonProps = {
          style:{ 
            height: '3em',
          }, 
        };`,
      },
      {
        title: "outline",
        content:
          "The outline property is used to create a visible border around an element, outside of its border edge. Unlike the border property, the outline does not affect the layout of the element or take up space. e.g.",
        code: `const buttonProps = {
          style:{ 
            outline: 'none',
          }, 
        };`,
      },
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const buttonProps = {
          style:{ 
            backgroundColor: '3000',
          }, 
        };`,
      },
      {
        title: "backgroundSize",
        content:
          "The backgroundSize property is used to specify the size of the background image of an element. It determines how the background image is scaled and positioned within the element's background area. e.g.",
        code: `const buttonProps = {
          style:{ 
            backgroundSize: '400%',
          }, 
        };`,
      },

      {
        title: "filter",
        content:
          "The filter property is used to apply graphical effects like blurring, color shifting, or modifying the brightness and contrast of an element's content. It allows you to apply various visual effects to images, backgrounds, or even entire elements. e.g.",
        code: `const buttonProps = {
          style:{ 
            filter: 'blur(5px)',
          }, 
        };`,
      },
      {
        title: "afterFontColor",
        content:
          "The term afterFontColor property or commonly used naming convention is used to change the font color of the content generated by these pseudo-elements like ::after, you would typically use the property. e.g.",
        code: `const buttonProps = {
          style:{ 
            afterFontColor: '#fff',
          }, 
        };`,
      },
      {
        title: "afterBackgroundColor",
        content:
          "The term afterBackgroundColor typically refers to setting the background color of the content generated by the ::after pseudo-element. e.g.",
        code: `const buttonProps = {
          style:{ 
            afterBackgroundColor: '#111',
          }, 
        };`,
      },
      {
        title: "beforeBackgroundColor",
        content:
          "The term afterBackgroundColor typically refers to setting the background color of the content generated by the ::before pseudo-element. e.g.",
        code: `const buttonProps = {
          style:{ 
            beforeBackgroundColor: 'linear-gradient(45deg, #5ec5c3, #177396, #1c80d5, #8a1351, #104a7b, #002bff, #7a00ff, #9422a8, #36ffea)',
          }, 
        };`,
      },
      {
        title: "beforeWidth",
        content:
          "The beforeWidth props is referred to the usage of the ::before pseudo-element to set its width property. e.g.",
        code: `const buttonProps = {
          style:{ 
            beforeWidth: 'calc(100% + 4px)',
          }, 
        };`,
      },
      {
        title: "beforeHeight",
        content:
          "The beforeHeight props is referred to the usage of the ::before pseudo-element to set its height property. e.g.",
        code: `const buttonProps = {
          style:{ 
            beforeHeight: 'calc(100% + 4px)',
          }, 
        };`,
      },
      {
        title: "beforeBorderRadius",
        content:
          "The beforeBorderRadius props is referred to the border-radius property used in conjunction with the ::before pseudo-element. e.g.",
        code: `const buttonProps = {
          style:{ 
            beforeBorderRadius: '10px',
          }, 
        };`,
      },
      {
        title: "lableHeight",
        content:
          "The lableHeight props is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.",
        code: `const buttonProps = {
          style:{ 
            lableHeight: '100%',
          }, 
        };`,
      },
      {
        title: "lableDisplay",
        content:
          "The lableDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const buttonProps = {
          style:{ 
            lableDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "lableAlignItems",
        content:
          "The lableAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const buttonProps = {
          style:{ 
            lableAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "lableJustifyContent",
        content:
          "The justifyContent props is used in flexbox layouts to align flex items along the main axis of the flex container e.g.",
        code: `const buttonProps = {
          style:{ 
            lableJustifyContent: 'center',
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

const propsList = [
  btnGlowBlackProps,
  btnGlowWhiteProps,
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
            src="v1.wireframes.near/widget/Components.Button.GlowButton"
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
