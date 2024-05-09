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

const messageIconProps = {
  icon: "envelope-fill",
  iconSize: "30px",
  badge: {
    badgeCount: "1",
    style: {
      top: "40%",
    },
  },
  type: "button",
  buttonHref: hyperlink,
};

const maxValueIconProps = {
  icon: "trash",
  iconColor: "#000",
  badge: {
    badgeCount: "99+",
    style: {
      top: "40%",
    },
  },
  type: "button",
};

const detail = `
const buttonProps ={
  icon: "envelope-fill",
  iconColor: "#000",
  badge:{ 
    badgeCount: "1",
    style: {
      top: "40%",
    },
  },
  type:"button",
  buttonHref: "${hyperlink}",
};
return(
<Widget src="v1.wireframes.near/widget/Components.Button.BadgeIconButton" props={buttonProps} />
);`;

const explanation =
  "The Badge Icons component is a sophisticated and expressive UI element that marries the clarity of icons with the communicative power of dynamic badges. By adding badges to icons, developers can create a visually striking and informative user interface, offering users a quick and engaging way to interpret essential information.";
const propsExplanation = [
  {
    title: "icon",
    required: "true",
    content:
      "The icon prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const buttonProps = { 
      icon: "envelope-fill",
    };`,
  },
  {
    title: "iconColor",
    content:
      "The iconColor prop is used to dynamically set the fill color of the representing icon. e.g.",
    code: `const buttonProps = { 
      iconColor: "#0d6efd",
    };`,
  },
  {
    title: "iconSize",
    content:
      "The iconSize prop is passed to the icon component, to set the size of the icon. e.g.",
    code: `const inputProps = { 
      iconSize: "30px",
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
    title: "badge",
    required: "true",
    content: "You can use the badge attribute to apply styles to badge. e.g.",
    code: `const buttonProps = {
      badge:{ 
        icon: "envelope-fill",
        iconColor: "#000",
        iconSize: "30px",
        badgeCount: "99+",
        style:{
          top: "40%",
        },
      }, 
    };`,
    children: [
      {
        title: "fontColor",
        content:
          "You can use fontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const buttonProps = {
          badge:{ 
            style:{ 
              fontColor: '#fff',
            }, 
          }, 
        };`,
      },
      {
        title: "background",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const buttonProps = {
          badge:{ 
            style:{ 
              background: '#dc3545',
            }, 
          }, 
        };`,
      },
      {
        title: "border",
        content:
          "The border props is used to set the border of an element. e.g.",
        code: `const buttonProps = {
          badge:{ 
            style:{ 
              border: 'none',
            }, 
          }, 
        };`,
      },
      {
        title: "minWidth",
        content:
          "The minWidth property is used to specify the minimum width that an element should have. It ensures that the element's width is never less than the specified minimum width, even if the content inside the element is smaller. e.g.",
        code: `const buttonProps = {
          badge:{ 
            style:{ 
              minWidth: '20px',
            }, 
          },
        };`,
      },
      {
        title: "minHeight",
        content:
          "The minHeight property is used to set the minimum height of an element. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const buttonProps = {
          badge:{ 
            style:{ 
              minHeight: '20px',
            },  
          },
        };`,
      },
      {
        title: "badgeTop",
        content:
          "The term badgeTop seems to refer to positioning a badge element at the top of another element, such as a button or a container. A badge is typically a small piece of content, often containing a number or a short text, used to provide additional information or to visually indicate some status or notification. e.g.",
        code: `const buttonProps = {
          badge:{ 
            style:{ 
              badgeTop: '40%',
            }, 
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
      "You can add your onClick method here. For navigation you can use either 'onClick' method, or 'buttonHref' props. If you're using 'buttonHref' then 'onClick' method won't work. e.g.",
    code: `const buttonProps = { 
      onClick: () => {
        State.update({ show: !state.show, 
          showProp: false 
        });
      },
    };`,
  },
];

const propsList = [messageIconProps, maxValueIconProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data) => (
        <div className="col p-2">
          <Widget
            src="v1.wireframes.near/widget/Components.Button.BadgeIconButton"
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
