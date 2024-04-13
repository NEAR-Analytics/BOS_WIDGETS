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

const [showAlert, setShowAlert] = useState(false);

const handleClick = () => {
  setShowAlert(true);
};

const handleClose = () => {
  setShowAlert(false);
};

const alert = {
  children: (
    <div>
      <Widget
        src="v1.wireframes.near/widget/Components.Alert.AlertStates"
        props={{
          mainTitle: "Alert",
          alertTitle: "This is an alert..!",
          isIcon: true,
          iconClose: true,
          iconColor: "red",
          cancelIconColor: "#fff",
          onClick: () => {
            handleClose();
          },
        }}
      />
    </div>
  ),
};

const alertProps = {
  alert: alert,
  showAlert: showAlert,
  setShowAlert: setShowAlert,
};

const detail = `
const [showAlert, setShowAlert] = useState(false);

const handleClick = () => {
  setShowAlert(true);
};

const handleClose = () => {
  setShowAlert(false);
};

const alert = {
  children: (
    <div>
      <Widget
        src="v1.wireframes.near/widget/Components.Alert.AlertStates"
        props={{
          mainTitle: "Alert",
          alertTitle: "This is an alert..!",
          isIcon: true,
          iconClose: true,
          iconColor: "red",
          cancelIconColor: "#fff",
          onClick: () => {
            handleClose();
          },
        }}
      />
    </div>
  ),
};

const alertProps ={
  alert: alert,
  showAlert: showAlert,
  setShowAlert: setShowAlert,
};
return(
  <div className="p-2">
    <Widget
      src="v1.wireframes.near/widget/Components.Button.SimpleButton"
      props={{
        buttonTitle: "Show Alert",
        type: "button",
        style: {
          backgroundColor: "#0d6efd",
          activeColor: "#0451c2",
          hoverColor: "#0451c2",
          fontColor: "#fff",
        },
        onClick: () => {
          handleClick();
        },
      }}
    />
    <Widget
      src="v1.wireframes.near/widget/Components.Alert.Alert"
      props={alertProps}
    />
</div>
);`;
const explanation =
  "The alert function is used to display a dialog box with a specified message. It's commonly used for displaying alerts, notifications, or messages to users in web applications.";

const propsExplanation = [
  {
    title: "children",
    required: "true",
    content:
      "You can pass children prop to pass and use any alert displayed on an alert element. e.g.",
    code: `const alert = {
      children: (
        <div>
          <Widget
            src="v1.wireframes.near/widget/Components.Alert.AlertStates"
            props={{
              mainTitle: "Alert",
              alertTitle: "This is an alert..!",
              isIcon: true,
              iconClose: true,
              iconColor: "red",
              cancelIconColor: "#fff",
              onClick: () => {
                handleClose();
              },
            }}
          />
        </div>
      ),
    };`,
  },
  {
    title: "handleClick",
    required: "true",
    content:
      "This handleClick function is intended to be used as an event handler, commonly for handling click events in user interfaces.  e.g.",
    code: `const handleClick = () => {
      setShowAlert(true);
    };`,
  },
  {
    title: "handleClose",
    required: "true",
    content:
      "This function is likely intended to be used as an event handler for closing or dismissing a component.  e.g.",
    code: `const handleClose = () => {
      setShowAlert(false);
    };`,
  },
  {
    title: "alert",
    required: "true",
    content:
      "You can pass alert prop as above defined constant file to displayed on an alert element. e.g.",
    code: `const alertProps = {
      alert: alert,
    };`,
  },
  {
    title: "showAlert",
    required: "true",
    content:
      "The term showAlert is used as a function or method used to display an alert message to the user in a web application. This function is commonly used to provide important information, notifications, warnings, errors, or confirmation messages to the user. e.g.",
    code: `const alertProps = { 
      showAlert: showAlert,
    };`,
  },
  {
    title: "setShowAlert",
    required: "true",
    content:
      "The term setShowAlert is used as a function or method used to control the visibility or state of an alert component in an application. In React, it's common to use state variables and setter functions to manage the state of components and trigger UI updates. e.g.",
    code: `const alertProps = { 
      setShowAlert: setShowAlert,
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const alertProps = {
        style:{ 
          fontSize: '16px', 
          fontWeight: '600', 
        }, 
      };`,
    children: [
      {
        title: "position",
        content:
          "The position property is used to specify the positioning method of an element within its containing element or the document as a whole. It's a fundamental CSS property that allows you to control the layout and placement of elements on a webpage. e.g.",
        code: `const alertProps = {
          style:{ 
            position: 'fixed',
          }, 
        };`,
      },
      {
        title: "top",
        content:
          "The position property is used to specify the positioning method of an element within its containing element or the document as a whole. It's a fundamental CSS property that allows you to control the layout and placement of elements on a webpage. e.g.",
        code: `const alertProps = {
          style:{ 
            top: '8%',
          }, 
        };`,
      },
      {
        title: "left",
        content:
          "The left property is used to specify the distance an absolutely positioned element should be offset from the left edge of its containing element or the viewport, depending on the value of the position property. e.g.",
        code: `const alertProps = {
          style:{ 
            left: '50%',
          }, 
        };`,
      },
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const alertProps = {
          style:{ 
            backgroundColor: 'transparent',
          },
        };`,
      },
      {
        title: "padding",
        content:
          "It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const alertProps = {
          style:{ 
            padding: '0px',
          }, 
        };`,
      },
      {
        title: "minWidth",
        content:
          "The minWidth property is used to set the minimum width of an element. It ensures that the element's width does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const alertProps = {
          style:{ 
            minWidth: '60%',
          }, 
        };`,
      },
      {
        title: "border",
        content:
          "The border props is used to set the border of an element. e.g.",
        code: `const alertProps = {
          style:{ 
            border: 'none',
          }, 
        };`,
      },
      {
        title: "borderRadius",
        content:
          "The borderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const alertProps = {
          style:{ 
            borderRadius: '5px',
          }, 
        };`,
      },
      {
        title: "boxShadow",
        content:
          "The box-shadow property is used to add shadow effects to an element's box. It allows you to create both inner shadows and outer shadows, providing depth and dimension to the appearance of elements on a webpage. e.g.",
        code: `const alertProps = {
          style:{ 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        };`,
      },
    ],
  },
  {
    title: "inlineStyle",
    content: "You will be able to add your Inline style here. e.g.",
    code: `const alertProps = { 
      inlineStyle: { 
        fontSize: '16px',
      }, 
    };`,
  },
];

const propsList = [alertProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <div className="p-2">
        <Widget
          src="v1.wireframes.near/widget/Components.Button.SimpleButton"
          props={{
            buttonTitle: "Show Alert",
            type: "button",
            style: {
              backgroundColor: "#0d6efd",
              activeColor: "#0451c2",
              hoverColor: "#0451c2",
              fontColor: "#fff",
            },
            onClick: () => {
              handleClick();
            },
          }}
        />
        <Widget
          src="v1.wireframes.near/widget/Components.Alert.Alert"
          props={alertProps}
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
