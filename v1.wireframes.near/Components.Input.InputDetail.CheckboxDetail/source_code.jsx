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
const handleTextChange = (event) => {
  const newTextValue = event.target.value;
  setInputText(newTextValue);
};

const [isChecked, setIsChecked] = useState(true);

const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
};

const checkBoxProps = {
  id: "check",
  name: "check",
  checkboxTitle: "Checkbox",
  onChange: () => {
    handleCheckboxChange();
  },
  value: isChecked,
};

const detail = `
const [isChecked, setIsChecked] = useState(true);

const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
};

const checkBoxProps ={
  id: "check",
  name: "check",
  checkboxTitle: "Checkbox",
  value: ${isChecked},
  onChange: () => {
    handleCheckboxChange();
  },
};
return(
<Widget src="v1.wireframes.near/widget/Components.Input.Checkbox" props={checkBoxProps}/>
);`;

const explanation =
  "Checkboxes are interactive input elements commonly used in forms and user interfaces to allow users to select one or more options from a set of choices. They are represented by small square boxes that can either be checked (selected) or unchecked (deselected).";
const propsExplanation = [
  {
    title: "iconName",
    required: "true",
    content:
      "The icon prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const checkBoxProps = { 
      iconName: "check2",
    };`,
  },
  {
    title: "iconSize",
    content:
      "The iconSize prop is passed to the icon component, to set the size of the icon. e.g.",
    code: `const checkBoxProps = { 
      iconSize: "20px",
    };`,
  },
  {
    title: "iconColor",
    content:
      "The iconColor prop is used to dynamically set the fill color of the representing icon. e.g.",
    code: `const checkBoxProps = { 
      iconColor: "#fff",
    };`,
  },
  {
    title: "labelSide",
    content:
      "You can pass labelSide props to move the label to the end of input field. e.g.",
    code: `const checkBoxProps = { 
      labelSide: "end",
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const checkBoxProps = {
        style:{ 
          checkboxPadding: '2px 0px 0px 0px', 
          checkboxBorder: '1px solid #a8acb3', 
          checkboxWidth: '1.5em', 
        },
      };`,
    children: [
      {
        title: "boxDisplay",
        content:
          "The boxDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            boxDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "boxJustifyContent",
        content:
          "The boxJustifyContent props is used to align flex items along the main axis of the flex container. It determines how remaining space in the flex container is distributed among the flex items when there is extra space available. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            boxJustifyContent: 'flex-start',
          }, 
        };`,
      },
      {
        title: "boxAlignItems",
        content:
          "The boxAlignItems props is used to define how flex items are aligned along the cross axis of their flex container in navbar. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            boxAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "boxGap",
        content:
          "The boxGap property is used to specify the spacing between flex items in a flex container. It is part of the Flexbox layout model and provides a convenient way to add consistent spacing between items without the need for additional margin or padding styles. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            boxGap: '0.5em',
          }, 
        };`,
      },
      {
        title: "checkboxBackground",
        content:
          "The checkboxBackground props is used to specify the background of an element. It allows you to set the color that will be displayed behind the content and padding of the element. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxBackground: 'none',
          }, 
        };`,
      },
      {
        title: "checkboxPadding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxPadding: '2px 0px 0px 0px',
          }, 
        };`,
      },
      {
        title: "checkboxWidth",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxWidth: '1.5em',
          }, 
        };`,
      },
      {
        title: "checkboxMinWidth",
        content:
          "You can control the size by simply setting a minimum width for checkboxes. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxMinWidth: '1.5em',
          }, 
        };`,
      },
      {
        title: "checkboxMaxWidth",
        content:
          "The property checkboxMaxWidth is used to set the maximum width of checkbox. It specifies the maximum width that an element can take up within its containing element or the viewport, depending on its context. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxMaxWidth: '1.5em',
          }, 
        };`,
      },
      {
        title: "checkboxHeight",
        content:
          "The property checkboxHeight is used to set the height of checkboxes. However, you can control the height of checkboxes indirectly using the height property. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxHeight: '1.5em',
          }, 
        };`,
      },
      {
        title: "checkboxDisplay",
        content:
          "The checkboxDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "checkboxJustifyContent",
        content:
          "The checkboxJustifyContent props is used to align flex items along the main axis of the flex container. It determines how remaining space in the flex container is distributed among the flex items when there is extra space available. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxJustifyContent: 'center',
          }, 
        };`,
      },
      {
        title: "checkboxAlignItems",
        content:
          "The checkboxAlignItems props is used to define how flex items are aligned along the cross axis of their flex container in navbar. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "checkboxBorder",
        content:
          "The checkboxBorder props is used to set the border of checkbox. It allows you to define the width, style, and color of the four borders (top, right, bottom, and left) of an element's box. The border property is often shorthand for setting individual border properties like border-width, border-style, and border-color e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxBorder: '1px solid #a8acb3',
          }, 
        };`,
      },
      {
        title: "checkboxBorderRadius",
        content:
          "The checkboxBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxBorderRadius: '5px',
          }, 
        };`,
      },
      {
        title: "checkboxCheckedBackground",
        content:
          "The checkboxCheckedBackground props is used to specify the background of an element. It allows you to set the color that will be displayed behind the content and padding of the element. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            checkboxCheckedBackground: '#202024',
          }, 
        };`,
      },
      {
        title: "labelFontStyle",
        content:
          "The labelFontStyle props is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            labelFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "labelFontWeight",
        content:
          "The labelFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            labelFontWeight: '400',
          }, 
        };`,
      },
      {
        title: "labelFontSize",
        content:
          "The labelFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            labelFontSize: '1em',
          }, 
        };`,
      },
      {
        title: "labelLineHeight",
        content:
          "The labelLineHeight props is used to specify the height of each line of text within an element. It defines the amount of vertical space between lines, affecting the spacing between the baselines of adjacent lines of text. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            labelLineHeight: '1em',
          }, 
        };`,
      },
      {
        title: "labelFontColor",
        content:
          "You can use labelFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            labelFontColor: '#202024'
          }, 
        };`,
      },
      {
        title: "labelMarginLeft",
        content:
          "The labelMarginLeft props is used to specify the margin of label on its left side. It determines the amount of space between the element and adjacent elements or the container's edge on the left-hand side. e.g.",
        code: `const checkBoxProps = {
          style:{ 
            labelMarginLeft: '3px'
          }, 
        };`,
      },
    ],
  },
  {
    title: "onChange",
    required: "true",
    content:
      "The onChange event is commonly used with input elements such as text inputs, checkboxes, radio buttons, and select dropdowns to capture user input. e.g.",
    code: `const checkBoxProps = { 
      onChange: () => {
        handleCheckboxChange();
      },
    };`,
  },
  {
    title: "type",
    required: "true",
    content:
      "Input elements have different types, such as text, password, email, number, date, file each with its specific behavior. e.g.",
    code: `const checkBoxProps = { 
      type: "checkbox",
    };`,
  },
];
const propsList = [checkBoxProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Input.Checkbox"
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
