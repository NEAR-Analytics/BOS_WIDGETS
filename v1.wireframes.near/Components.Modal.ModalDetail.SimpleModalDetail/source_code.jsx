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

const [showModal, setShowModal] = useState(false);

const modalProps = {
  modalTitle: "Modal Title",
  content: "Are you sure, want to save changes?",
  isDisable: false,
  showModal: showModal,
  setShowModal: setShowModal,
};

const detail = `const modalProps ={
  modalTitle: "Modal Title",
  style:{
    backgroundColor:"#0d6efd",
    fontColor: "#fff",
  },
  isDisable: false,
  showModal: showModal,
  setShowModal: setShowModal,
};
return(
  <div className="p-2">
    <Widget
      src="v1.wireframes.near/widget/Components.Button.SimpleButton"
      props={{
        buttonTitle: "Modal",
        type: "button",
        style: {
          backgroundColor: "#0d6efd",
          activeColor: "#0451c2",
          hoverColor: "#0451c2",
          fontColor: "#fff",
        },
        onClick: () => {
          setShowModal(!showModal);
        },
      }}
    />
    <Widget
      src="v1.wireframes.near/widget/Components.Modal.SimpleModal"
      props={modalProps}
    />
</div>
);`;
const explanation =
  "A modal, short for modal dialog, is a user interface element that appears as a dialog box or popup window on top of the main content of a webpage or application. It temporarily blocks interaction with the rest of the page until the user interacts with it. Modals are commonly used to focus the user's attention on important information, requests, or tasks without navigating away from the current context.";

const propsExplanation = [
  {
    title: "modalTitle",
    required: "true",
    content:
      "You can use modalTitle prop to specify the text or label displayed on a modal element. e.g.",
    code: `const modalProps = {
      modalTitle:'Modal Title',
    };`,
  },
  {
    title: "content",
    required: "true",
    content:
      "Here content props is used to display the substance or information presented within a modal. e.g.",
    code: `const modalProps = {
      content:'Are you sure, want to save changes?',
    };`,
  },
  {
    title: "isDisable",
    content:
      "The isDisable prop is used to make an element non-interactive, meaning it cannot be clicked or modified by the user. e.g.",
    code: `const modalProps = { 
      isDisable: false,
    };`,
  },
  {
    title: "showModal",
    required: "true",
    content:
      "The term showModal is used as a function or method used to display an alert message to the user in a web application. This function is commonly used to provide important information, notifications, warnings, errors, or confirmation messages to the user. e.g.",
    code: `const modalProps = { 
      showModal: showModal,
    };`,
  },
  {
    title: "setShowModal",
    required: "true",
    content:
      "The term setShowModal is used as a function or method used to control the visibility or state of an alert component in an application. In React, it's common to use state variables and setter functions to manage the state of components and trigger UI updates. e.g.",
    code: `const modalProps = { 
      setShowModal: setShowModal,
    };`,
  },
  {
    title: "style",
    required: "true",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const modalProps = {
       style:{ 
          fontSize: '16px', 
          fontWeight: '600', 
        }, 
      };`,
    children: [
      {
        title: "dialogWidth",
        content:
          "You can set the dialogWidth using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogWidth: '400px',
          }, 
        };`,
      },
      {
        title: "dialogMinWidth",
        content:
          "The dialogMinWidth props is used to specify the minimum width of an element. It ensures that the element will not become narrower than the specified minimum width, even if its content or the container's width is smaller. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogMinWidth: '300px',
          }, 
        };`,
      },
      {
        title: "dialogBorder",
        content:
          "The dialogBorder props is used to set the border of an element. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogBorder: 'none',
          }, 
        };`,
      },
      {
        title: "dialogBorderRadius",
        content:
          "The dialogBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogBorderRadius: '10px',
          }, 
        };`,
      },
      {
        title: "dialogHeight",
        content:
          "The dialogHeight props is used to set the height of dialog div. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogHeight: 'auto',
          }, 
        };`,
      },
      {
        title: "dialogBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogBackgroundColor: '#fff',
          }, 
        };`,
      },
      {
        title: "dialogPosition",
        content:
          "The position property is used to specify the positioning method of an element within its containing element or the document as a whole. It's a fundamental CSS property that allows you to control the layout and placement of elements on a webpage. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogPosition: 'fixed',
          }, 
        };`,
      },
      {
        title: "dialogTop",
        content:
          "The dialogTop props is used to specify the vertical position of an absolutely positioned element relative to its containing block. It defines the distance between the top edge of the positioned element and the top edge of its containing block. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogTop: '0%',
          }, 
        };`,
      },
      {
        title: "dialogBottom",
        content:
          "The dialogBottom props is used to specify the distance between the bottom edge of a positioned element and the bottom edge of its containing block. It applies only to positioned elements, meaning elements with a position value other than static (such as relative, absolute, fixed, or sticky). e.g.",
        code: `const alertProps = {
          style:{ 
            dialogBottom: '100%',
          }, 
        };`,
      },
      {
        title: "dialogLeft",
        content:
          "The left property is used to specify the distance an absolutely positioned element should be offset from the left edge of its containing element or the viewport, depending on the value of the position property. e.g.",
        code: `const modalProps = {
          style:{ 
            dialogLeft: '50%',
          }, 
        };`,
      },
      {
        title: "contentWidth",
        content:
          "You can set the contentWidth using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const modalProps = {
          style:{ 
            contentWidth: 'auto',
          }, 
        };`,
      },
      {
        title: "contentBorder",
        content:
          "The contentBorder props is used to set the border of an element. e.g.",
        code: `const modalProps = {
          style:{ 
            contentBorder: '1px solid #000',
          }, 
        };`,
      },
      {
        title: "contentBorderRadius",
        content:
          "The contentBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const modalProps = {
          style:{ 
            contentBorderRadius: '10px',
          }, 
        };`,
      },
      {
        title: "contentHeight",
        content:
          "The contentHeight props is used to set the height of content body. e.g.",
        code: `const modalProps = {
          style:{ 
            contentHeight: 'auto',
          }, 
        };`,
      },
      {
        title: "contentBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const modalProps = {
          style:{ 
            contentBackgroundColor: '#fff',
          }, 
        };`,
      },
      {
        title: "headerBorder",
        content:
          "The headerBorder props is used to set the border of an element. e.g.",
        code: `const modalProps = {
          style:{ 
            headerBorder: 'none',
          }, 
        };`,
      },
      {
        title: "headerBorderBottom",
        content:
          "The headerBorderBottom props is used to define the style, color, and width of the bottom border of an element. It allows you to add a decorative or structural line at the bottom of an element, separating it from the content below or enhancing its visual appearance. e.g.",
        code: `const modalProps = {
          style:{ 
            headerBorderBottom: '1px solid #ddd',
          }, 
        };`,
      },
      {
        title: "headerBorderRadius",
        content:
          "The headerBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const modalProps = {
          style:{ 
            headerBorderRadius: '10px 10px 0 0',
          }, 
        };`,
      },
      {
        title: "headerHeight",
        content:
          "The headerHeight props is used to set the height of body. e.g.",
        code: `const modalProps = {
          style:{ 
            headerHeight: 'auto',
          }, 
        };`,
      },
      {
        title: "headerBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const modalProps = {
          style:{ 
            headerBackgroundColor: '#fff',
          }, 
        };`,
      },
      {
        title: "headerDisplay",
        content:
          "The headerDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const modalProps = {
          style:{ 
            headerDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "headerAlignItems",
        content:
          "The headerAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const modalProps = {
          style:{ 
            headerAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "headerJustifyContent",
        content:
          "The headerJustifyContent props is used in flexbox layouts to align flex items along the main axis of the flex container e.g.",
        code: `const modalProps = {
          style:{ 
            headerJustifyContent: 'space-between',
          }, 
        };`,
      },
      {
        title: "headerMinHeight",
        content:
          "The headerMinHeight props is used to set the minimum height of an element. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const modalProps = {
          style:{ 
            headerMinHeight: '65px',
          }, 
        };`,
      },
      {
        title: "headerPadding",
        content:
          "The headerPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const modalProps = {
          style:{ 
            headerPadding: '0px 10px 0px 10px',
          }, 
        };`,
      },
      {
        title: "titleFontColor",
        content:
          "You can use titleFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const modalProps = {
          style:{ 
            titleFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "titleFontSize",
        content:
          "The titleFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const modalProps = {
          style:{ 
            titleFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "titleFontWeight",
        content:
          "The titleFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const modalProps = {
          style:{ 
            titleFontWeight: '500',
          }, 
        };`,
      },
      {
        title: "titleFontFamily",
        content:
          "The titleFontFamily props is used to define the typeface or font family that should be applied to the text content within an element. It specifies a prioritized list of font family names and/or generic family names. e.g.",
        code: `const modalProps = {
          style:{ 
            titleFontFamily: 'system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif',
          }, 
        };`,
      },
      {
        title: "bodyBorder",
        content:
          "The bodyBorder props is used to set the border of an element. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyBorder: 'none',
          }, 
        };`,
      },
      {
        title: "bodyBorderBottom",
        content:
          "The bodyBorderBottom props is used to define the style, color, and width of the bottom border of an element. It allows you to add a decorative or structural line at the bottom of an element, separating it from the content below or enhancing its visual appearance. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyBorderBottom: '1px solid #ddd',
          }, 
        };`,
      },
      {
        title: "bodyBorderRadius",
        content:
          "The bodyBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyBorderRadius: 'none',
          }, 
        };`,
      },
      {
        title: "bodyHeight",
        content: "The bodyHeight props is used to set the height of body. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyHeight: 'auto',
          }, 
        };`,
      },
      {
        title: "bodyBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyBackgroundColor: '#fff',
          }, 
        };`,
      },
      {
        title: "bodyDisplay",
        content:
          "The bodyDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "bodyAlignItems",
        content:
          "The bodyAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "bodyJustifyContent",
        content:
          "The bodyJustifyContent props is used in flexbox layouts to align flex items along the main axis of the flex container e.g.",
        code: `const modalProps = {
          style:{ 
            bodyJustifyContent: 'space-between',
          }, 
        };`,
      },
      {
        title: "bodyMinHeight",
        content:
          "The bodyMinHeight props is used to set the minimum height of an element. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyMinHeight: '65px',
          }, 
        };`,
      },
      {
        title: "bodyPadding",
        content:
          "The bodyPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyPadding: '2px 10px 2px 10px',
          }, 
        };`,
      },
      {
        title: "bodyFontColor",
        content:
          "You can use bodyFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "bodyFontSize",
        content:
          "The bodyFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "bodyFontWeight",
        content:
          "The bodyFontWeight props is used to set the thickness or boldness of the characters in text. It accepts numeric values, font weight keywords, or named values to specify the level of boldness. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyFontWeight: '400',
          }, 
        };`,
      },
      {
        title: "bodyFontFamily",
        content:
          "The bodyFontFamily props is used to define the typeface or font family that should be applied to the text content within an element. It specifies a prioritized list of font family names and/or generic family names. e.g.",
        code: `const modalProps = {
          style:{ 
            bodyFontFamily: 'system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif',
          }, 
        };`,
      },
      {
        title: "footerPadding",
        content:
          "The footerPadding props determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const modalProps = {
          style:{ 
            footerPadding: '5px 10px 5px 10px',
          }, 
        };`,
      },
      {
        title: "closeBtnBorder",
        content:
          "The closeBtnBorder props is used to set the border of close button element. e.g.",
        code: `const modalProps = {
          style:{ 
            closeBtnBorder: 'none',
          }, 
        };`,
      },
      {
        title: "closeBtnPadding",
        content:
          "The closeBtnPadding props determines the internal spacing within close button element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const modalProps = {
          style:{ 
            closeBtnPadding: '0px 6px',
          }, 
        };`,
      },
      {
        title: "closeBtnBorderRadius",
        content:
          "The closeBtnBorderRadius props is used to create rounded corners for close button element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const modalProps = {
          style:{ 
            closeBtnBorderRadius: '100%',
          }, 
        };`,
      },
      {
        title: "closeBtnBackground",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const modalProps = {
          style:{ 
            closeBtnBackground: 'transparent',
          }, 
        };`,
      },
      {
        title: "closeBtnActiveBoxShadow",
        content:
          "The term closeBtnActiveBoxShadow typically refers to applying a box shadow effect to an element when it is in an active state, such as when it is clicked or pressed. e.g.",
        code: `const modalProps = {
          style:{ 
            closeBtnActiveBoxShadow: 'none',
          }, 
        };`,
      },
    ],
  },
];

const propsList = [modalProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <div className="p-2">
        <Widget
          src="v1.wireframes.near/widget/Components.Button.SimpleButton"
          props={{
            buttonTitle: "Modal",
            type: "button",
            style: {
              backgroundColor: "#0d6efd",
              activeColor: "#0451c2",
              hoverColor: "#0451c2",
              fontColor: "#fff",
            },
            onClick: () => {
              setShowModal(!showModal);
            },
          }}
        />
        <Widget
          src="v1.wireframes.near/widget/Components.Modal.SimpleModal"
          props={modalProps}
        />
      </div>
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
