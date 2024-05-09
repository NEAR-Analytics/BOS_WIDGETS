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

const validateInput = () => {
  if (inputText.trim() === "") {
    return "Input cannot be empty.";
  }
  return null;
};

const sideStartProps = {
  inputTitle: "Name",
  name: "firstname",
  placeholder: "Enter Name",
  type: "text",
  icon: "person-circle",
  iconSide: "start",
  iconColor: "#000",
  value: inputText,
  onChange: (val) => {
    setInputText(val);
  },
  validate: validateInput,
};

const sideEndProps = {
  inputTitle: "Last Name",
  name: "lastname",
  placeholder: "Enter Last Name",
  type: "text",
  iconColor: "#000",
  icon: "person-circle",
  iconSide: "end",
  required: true,
  value: inputText,
  onChange: (val) => {
    setInputText(val);
  },
  validate: validateInput,
};

const detail = `
const [inputText, setInputText] = useState("");

const handleTextChange = (event) => {
  const newTextValue = event.target.value;
  setInputText(newTextValue);
};

const validateInput = () => {
  if (inputText.trim() === "") {
    return "Input cannot be empty.";
  }
  return null;
};

const inputProps ={
  inputTitle:"Name",
  name: "firstname",
  placeholder: "Enter Name",
  icon: "person-circle",
  iconSide: "start",
  iconColor: "#000",
  style:{ 
    padding: "0.6em 2em",
    fontSize: "0.5em",
  },
  value: "${inputText}",
  onChange: (val) => {
    setInputText(val);
  },
  validate: validateInput,
  type:"text",
  isDisable: false,
};
return(
<Widget src="v1.wireframes.near/widget/Components.Input.InputFieldWithIcon" props={inputProps}/>
);`;

const explanation =
  "An input field with an icon is a user interface element that combines a standard text input field with an icon for visual enhancement or additional functionality. This is commonly used in forms, search bars, and other input fields where the icon provides context, visual cues, or interactive features.";
const propsExplanation = [
  {
    title: "inputTitle",
    content:
      "You can use inputTitle prop to specify the text or label displayed on a inputTitle element. e.g.",
    code: `const inputProps = {
      inputTitle:'Name',
    };`,
  },
  {
    title: "icon",
    required: "true",
    content:
      "The icon prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const inputProps = { 
      icon: "person-circle",
    };`,
  },
  {
    title: "iconColor",
    content:
      "The iconColor prop is used to dynamically set the fill color of the representing icon. e.g.",
    code: `const inputProps = { 
      iconColor: "#000",
    };`,
  },
  {
    title: "iconSize",
    content:
      "The iconSize prop is passed to the icon component, to set the size of the icon. e.g.",
    code: `const inputProps = { 
      iconSize: "16px",
    };`,
  },
  {
    title: "iconSide",
    content:
      "You can use iconSide props to set the icon to start or at the end side of the input field. e.g.",
    code: `const inputProps = { 
      iconSide: 'start',
    };`,
  },
  {
    title: "isDisable",
    content:
      "The isDisable prop is used to make an element non-interactive, meaning it cannot be clicked or modified by the user. e.g.",
    code: `const inputProps = { 
      isDisable: false,
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.,",
    code: `const inputProps = {
        style:{ 
          fontSize: '0.5em', 
          fontWeight: '600',
        },
      };`,
    children: [
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            width: '100%',
          }, 
        };`,
      },
      {
        title: "padding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.,",
        code: `const inputProps = {
          style:{ 
            padding: '0.5em 0.75em',
          }, 
        };`,
      },
      {
        title: "border",
        content:
          "The border props is used to set the border of an element. e.g.,",
        code: `const inputProps = {
          style:{ 
            border: 'none',
          }, 
        };`,
      },
      {
        title: "borderRadius",
        content:
          "The borderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.,",
        code: `const inputProps = {
          style:{ 
            borderRadius: '4px',
          }, 
        };`,
      },
      {
        title: "fontColor",
        content:
          "You can use fontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.,",
        code: `const inputProps = {
          style:{ 
            fontColor: '#000'
          }, 
        };`,
      },
      {
        title: "fontSize",
        content:
          "The fontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            fontSize: '16px',
          }, 
        };`,
      },
      {
        title: "boxShadow",
        content:
          "The boxShadow property is used to add shadow effects to an element's box. It allows you to create both inner shadows and outer shadows, providing depth and dimension to the appearance of elements on a webpage. e.g.,",
        code: `const inputProps = {
          style:{ 
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          }, 
        };`,
      },
      {
        title: "labelFontSize",
        content:
          "The labelFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelFontSize: '0.95em',
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
        title: "labelLineHeight",
        content:
          "The labelLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelLineHeight: '1.25em',
          }, 
        };`,
      },
      {
        title: "labelMinWidth",
        content:
          "The labelMinWidth props is used to specify the minimum width of an element. It ensures that the element will not become narrower than the specified minimum width, even if its content or the container's width is smaller. e.g.",
        code: `const inputProps = {
          style:{ 
            labelMinWidth: '18%',
          }, 
        };`,
      },
      {
        title: "labelFontColor",
        content:
          "You can use labelFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.,",
        code: `const inputProps = {
          style:{ 
            labelFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "errorFontWeight",
        content:
          "The errorFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.,",
        code: `const inputProps = {
          style:{ 
            errorFontWeight: '600',
          }, 
        };`,
      },
      {
        title: "errorFontSize",
        content:
          "The errorFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            errorFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "errorLineHeight",
        content:
          "The errorLineHeight property is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.,",
        code: `const inputProps = {
          style:{ 
            errorLineHeight: '1.25',
          }, 
        };`,
      },
      {
        title: "errorFontColor",
        content:
          "You can use errorFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.,",
        code: `const inputProps = {
          style:{ 
            errorFontColor: '#000'
          }, 
        };`,
      },
      {
        title: "errorHeight",
        content:
          "The errorHeight props is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.,",
        code: `const inputProps = {
          style:{ 
            errorHeight: '0px',
          }, 
        };`,
      },
      {
        title: "errorShowHeight",
        content:
          "The errorShowHeight props is used to set the height of an element. It determines the vertical size of the content box within the element's box model. e.g.,",
        code: `const inputProps = {
          style:{ 
            errorShowHeight: 'auto',
          }, 
        };`,
      },
      {
        title: "addonBorder",
        content:
          "The addonBorder props is used to set the border of an element. e.g.,",
        code: `const inputProps = {
          style:{ 
            addonBorder: '1.5px solid #e2e2e2',
          }, 
        };`,
      },
      {
        title: "addonBorderRadius",
        content:
          "The addonBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.,",
        code: `const inputProps = {
          style:{ 
            addonBorderRadius: '5px',
          }, 
        };`,
      },
      {
        title: "addonBackground",
        content:
          "You can use color names, hex codes, or RGB values to change background. e.g.",
        code: `const inputProps = {
          style:{ 
            addonBackground: 'none',
          }, 
        };`,
      },
      {
        title: "addonPadding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.,",
        code: `const inputProps = {
          style:{ 
            addonPadding: '0.5em 0.75em',
          }, 
        };`,
      },
      {
        title: "addonJustifyContent",
        content:
          "The addonJustifyContent props is used in flexbox layouts to align flex items along the main axis of the flex container e.g.",
        code: `const inputProps = {
          style:{ 
            addonJustifyContent: 'center',
          }, 
        };`,
      },
      {
        title: "addonWidth",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const inputProps = {
          style:{ 
            addonWidth: '18%',
          }, 
        };`,
      },
      {
        title: "addonHeight",
        content:
          "The addonHeight props is used to set the height of addon. e.g.",
        code: `const inputProps = {
          style:{ 
            addonHeight: '100%',
          }, 
        };`,
      },
      {
        title: "addonMinHeight",
        content:
          "The addonMinHeight props is used to set the minimum height of an element. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const inputProps = {
          style:{ 
            addonMinHeight: '38px',
          }, 
        };`,
      },
      {
        title: "addonFocusBorder",
        content:
          "The addonFocusBorder props is used to set the border of an element. e.g.,",
        code: `const inputProps = {
          style:{ 
            addonFocusBorder: '1.5px solid #1a73e8',
          }, 
        };`,
      },
    ],
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
    title: "validate",
    required: "true",
    content:
      "The validate typically refers to the process of checking whether data or inputs meet certain criteria or requirements. Validation is commonly used in various contexts to ensure that data is accurate, complete, and suitable for its intended purpose. e.g.,",
    code: `const inputProps = { 
      validate: validateInput;
    };`,
  },
  {
    title: "type",
    required: "true",
    content:
      "Input elements have different types, such as text, password, email, number, date, file each with its specific behavior. e.g.,",
    code: `const inputProps = { 
      type: "text",
    };`,
  },
  {
    title: "error",
    content:
      "error props is used to display Error messages and to inform users about errors or problems that occur during their interaction with a website or application. e.g.,",
    code: `const inputProps = { 
      error: "Please enter valid input",
    };`,
  },
  {
    title: "labelSide",
    content:
      "You can pass labelSide props to move the lable to the start of input field. e.g.,",
    code: `const inputProps = { 
      labelSide: "start",
    };`,
  },
];
const propsList = [sideStartProps, sideEndProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Input.InputFieldWithIcon"
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
