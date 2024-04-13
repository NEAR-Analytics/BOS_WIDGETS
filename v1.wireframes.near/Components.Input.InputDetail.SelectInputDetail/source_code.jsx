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

const options = [
  {
    id: 1,
    value: "india",
    label: "India",
  },
  {
    id: 2,
    value: "america",
    label: "America",
  },
  {
    id: 3,
    value: "uk",
    label: "UK",
  },
  {
    id: 4,
    value: "canada",
    label: "Canada",
  },
];

const customSelectProps = {
  inputTitle: "Select Country",
  name: "select",
  placeholder: "Select",
  type: "text",
  options: options,
  value: inputText,
  required: true,
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

const validateInput = () => {
  if (inputText.trim() === "") {
    return "Input cannot be empty.";
  }
  return null;
};

const options = [
  {
    id: 1,
    value: "india",
    label: "India",
  },
  {
    id: 2,
    value: "america",
    label: "America",
  },
  {
    id: 3,
    value: "uk",
    label: "UK",
  },
  {
    id: 4,
    value: "canada",
    label: "Canada",
  },
];

const customSelectProps = {
  inputTitle: "Select Country",
  name: "select",
  placeholder: "Select",
  type: "text",
  options: options,
  value: inputText,
  required: true,
  onChange: (val) => {
    setInputText(val);
  },
};

return(
<Widget src="v1.wireframes.near/widget/Components.Input.InputFieldWithOptions" props={inputProps}/>
);`;

const explanation =
  "A select dropdown, also known as a select box or dropdown menu, is a user interface element commonly used to present a list of options to the user, allowing them to select one option from the list. It typically consists of a dropdown arrow or button and a list of selectable options.";
const propsExplanation = [
  {
    title: "inputTitle",
    content:
      "You can use inputTitle prop to specify the text or label displayed on a inputTitle element. e.g.",
    code: `const inputProps = {
      inputTitle:'Select Country',
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
    title: "placeholder",
    content:
      "The placeholder attribute is commonly used in input elements, particularly in text-based input fields and select dropdowns. It provides a hint or example text to users about the expected format or content for the input field before they start typing or making a selection. e.g.",
    code: `const inputProps = { 
      placeholder: "Select",
    };`,
  },
  {
    title: "required",
    content:
      "The required attribute is used in form elements to specify that the input field must be filled out before the form can be submitted. e.g.",
    code: `const inputProps = { 
      required: false,
    };`,
  },
  {
    title: "options",
    content:
      "An array named options, which contains objects representing selectable options for a dropdown menu. Each object in the array represents one option and contains properties such as id, value, and label. e.g.,",
    code: `const inputProps = {
      options: options;
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.,",
    code: `const inputProps = {
       style:{ 
          fontWeight: '600', 
          border: '1px solid' 
        },
      };`,
    children: [
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.,",
        code: `const inputProps = {
          style:{ 
            width: '20rem',
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
        title: "inputMarginBottom",
        content:
          "This inputMarginBottom property is used to specify the amount of space between the bottom edge of an input field and the next element or content below it. e.g.,",
        code: `const inputProps = {
          style:{ 
            inputMarginBottom: '1rem',
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
            errorFontColor: '#ff4d4f'
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
    required: "true",
    content:
      "error props is used to display Error messages and to inform users about errors or problems that occur during their interaction with a website or application. e.g.,",
    code: `const inputProps = { 
      error: "Please select",
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
const propsList = [customSelectProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Input.SelectInput"
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
