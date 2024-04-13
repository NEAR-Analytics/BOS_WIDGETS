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
const [inputText, setInputText] = useState("");

const handleTextChange = (event) => {
  const newTextValue = event.target.value;
  setInputText(newTextValue);
};

const toggleProps = {
  toggleTitle: "Toggle",
  value: inputText,
  onChange: (val) => {
    setInputText(val);
  },
};

const detail = `
const [inputText, setInputText] = useState("");

const handleTextChange = (event) => {
  const newTextValue = event.target.value;
  setInputText(newTextValue);
};

const inputProps ={
  toggleTitle: "Toggle",
  value: "${inputText}",
  style:{ 
    alignItems: "center",
    labelFontSize: "16px",
  },
  onChange: ((val) => {
    setInputText(val);
  }),
  isDisable : false,
};
return(
<Widget src="v1.wireframes.near/widget/Components.Input.Toggle" props={inputProps}/>
);`;

const explanation =
  "Toggle switches allow users to switch between two states, typically 'on' and 'off', 'enabled' and 'disabled', or 'checked' and 'unchecked'. This is commonly used for settings, preferences, and toggling features.";
const propsExplanation = [
  {
    title: "toggleTitle",
    content:
      "You can use inputTitle prop to specify the text or label displayed beside toggle element. e.g.",
    code: `const inputProps = {
      toggleTitle:'Toggle',
    };`,
  },
  {
    title: "isDisable",
    content:
      "The isDisable prop is used to make an element non-interactive, meaning it cannot be clicked or modified by the user. e.g.",
    code: `const inputProps = { 
      isDisable: true,
    };`,
  },
  {
    title: "required",
    content:
      "The required attribute is used to specify that an input field must be filled out by the user before submitting a form. When applied to an input element, it indicates that the field is mandatory, and the form cannot be submitted until the required field is completed. e.g.",
    code: `const inputProps = { 
      required: false,
    };`,
  },
  {
    title: "onChange",
    required: "true",
    content:
      "The onChange event is commonly used with input elements such as text inputs, checkboxes, radio buttons, and select dropdowns to capture user input. e.g.,",
    code: `const inputProps = { 
      onChange: ((val) => {
        setInputText(val);
      })
    };`,
  },
  {
    title: "value",
    required: "true",
    content:
      "The value attribute is used to specify the initial value or current value of an input element, such as text input, checkbox, radio button, select dropdown, or hidden input. It allows you to define the default or pre-selected value for the input field. e.g.,",
    code: `const inputProps = { 
      value: "${inputText}",
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.,",
    code: `const inputProps = {
        toggleTitle:"Toggle",
        required: false,
        value: "${inputText}",
        style:{ 
          alignItems: "center",
          labelFontSize: "16px",
        },
        isDisable : false,
      };`,
    children: [
      {
        title: "display",
        content:
          "The display property is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.,",
        code: `const inputProps = {
          style:{ 
            display: 'flex',
          }, 
        };`,
      },
      {
        title: "justifyContent",
        content:
          "The justifyContent props is used in flexbox layouts to align flex items along the main axis of the flex container e.g.",
        code: `const inputProps = {
          style:{ 
            justifyContent: 'flex-start',
          }, 
        };`,
      },
      {
        title: "alignItems",
        content:
          "The alignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const inputProps = {
          style:{ 
            alignItems: 'center',
          }, 
        };`,
      },
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            width: 'fit-content',
          }, 
        };`,
      },
      {
        title: "borderWidth",
        content:
          "The borderWidth property is used to specify the width of the borders of an element. It allows you to control the thickness of the border surrounding an element's content area. e.g.,",
        code: `const inputProps = {
          style:{ 
            borderWidth: '0px',
          }, 
        };`,
      },
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const inputProps = {
        style:{ 
          backgroundColor: '#49a3fd',
        }, 
      };`,
      },
      {
        title: "switchWidth",
        content:
          "You can set the width of switch using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            switchWidth: '50px',
          }, 
        };`,
      },
      {
        title: "switchHeight",
        content:
          "The switchHeight props is used to set the height of the switch. e.g.",
        code: `const modalProps = {
          style:{ 
            switchHeight: '25px',
          }, 
        };`,
      },
      {
        title: "switchBorderWidth",
        content:
          "The switchBorderWidth props is used to specify the width of the borders of an element. It allows you to control the thickness of the border surrounding an element's content area. e.g.,",
        code: `const inputProps = {
          style:{ 
            switchBorderWidth: '0px',
          }, 
        };`,
      },
      {
        title: "switchPadding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.,",
        code: `const inputProps = {
          style:{ 
            switchPadding: '0px',
          }, 
        };`,
      },
      {
        title: "switchBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const inputProps = {
          style:{ 
            switchBackgroundColor: 'gray',
          }, 
        };`,
      },
      {
        title: "switchBorderRadius",
        content:
          "The switchBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.,",
        code: `const inputProps = {
          style:{ 
            switchBorderRadius: '9999px',
          }, 
        };`,
      },
      {
        title: "switchPosition",
        content:
          "The switchPosition propes is used to specify the positioning method of an element relative to its containing element or the document itself. It allows you to control the placement of an element within the layout of a webpage. e.g.,",
        code: `const inputProps = {
          style:{ 
            switchPosition: 'relative',
          }, 
        };`,
      },
      {
        title: "switchBoxShadow",
        content:
          "The switchBoxShadow props is used to add shadow effects to an element's box. It allows you to create both inner shadows and outer shadows, providing depth and dimension to the appearance of elements on a webpage. e.g.,",
        code: `const inputProps = {
          style:{ 
            switchBoxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          }, 
        };`,
      },
      {
        title: "thumbDisplay",
        content:
          "The thumbDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.,",
        code: `const inputProps = {
          style:{ 
            thumbDisplay: 'block',
          }, 
        };`,
      },
      {
        title: "thumbWidth",
        content:
          "You can set the width thumb switch using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            thumbWidth: '21px',
          }, 
        };`,
      },
      {
        title: "thumbHeight",
        content:
          "The thumbHeight props is used to set the height of the switch thumb. e.g.",
        code: `const modalProps = {
          style:{ 
            thumbHeight: '21px',
          }, 
        };`,
      },
      {
        title: "thumbBorderWidth",
        content:
          "The thumbBorderWidth props is used to specify the width of the borders of an element. It allows you to control the thickness of the border surrounding an element's content area. e.g.,",
        code: `const inputProps = {
          style:{ 
            thumbBorderWidth: '0px',
          }, 
        };`,
      },
      {
        title: "thumbBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const inputProps = {
          style:{ 
            thumbBackgroundColor: '#fff',
          }, 
        };`,
      },
      {
        title: "thumbBorderRadius",
        content:
          "The thumbBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.,",
        code: `const inputProps = {
          style:{ 
            thumbBorderRadius: '9999px',
          }, 
        };`,
      },
      {
        title: "thumbBoxShadow",
        content:
          "The thumbBoxShadow props is used to add shadow effects to an element's box. It allows you to create both inner shadows and outer shadows, providing depth and dimension to the appearance of elements on a webpage. e.g.,",
        code: `const inputProps = {
          style:{ 
            thumbBoxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          }, 
        };`,
      },
      {
        title: "labelFontSize",
        content:
          "The labelFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "labelFontWeight",
        content:
          "The labelFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelFontWeight: '400',
          }, 
        };`,
      },
      {
        title: "labelMarginLeft",
        content:
          "The labelMarginLeft props is used to specify the margin of an element on its left side. It determines the amount of space between the element and adjacent elements or the container's edge on the left-hand side. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelMarginLeft: '10px',
          }, 
        };`,
      },
      {
        title: "labelMarginRight",
        content:
          "The labelMarginRight props is used to specify the margin of an element on its right side. It determines the amount of space between the element and adjacent elements or the container's edge on the right-hand side. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelMarginRight: '10px',
          }, 
        };`,
      },
      {
        title: "labelLineHeight",
        content:
          "The labelLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelLineHeight: '1em',
          }, 
        };`,
      },
      {
        title: "labelFontColor",
        content:
          "You can use labelFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelFontColor: 'gray',
          }, 
        };`,
      },
    ],
  },
];
const propsList = [toggleProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Input.Toggle"
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
