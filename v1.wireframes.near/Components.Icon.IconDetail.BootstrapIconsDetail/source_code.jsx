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

const iconProps = {
  iconName: "x-circle",
  iconColor: "#000",
  iconSize: "2em",
};
const sendIconProps = {
  iconName: "send",
  iconColor: "#000",
  iconSize: "2em",
};
const personIconProps = {
  iconName: "person-circle",
  iconColor: "#000",
  iconSize: "2em",
};

const iconUrl = (
  <>
    <a href="https://icons.getbootstrap.com/" target="_blank">
      Bootstrap Icons
    </a>
  </>
);

const detail = `const iconProps ={
  iconName: "x-circle",
  iconColor: "#000",
  iconSize: "2em"
};
return(
<Widget src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons" props={iconProps}/>
);`;
const explanation =
  "Bootstrap Icons are a set of open-source SVG icons provided by Bootstrap, a popular front-end framework for building responsive and mobile-first websites. These icons are designed to seamlessly integrate with Bootstrap components and can be easily used in web development projects.";

const propsExplanation = [
  {
    title: "iconName",
    required: "true",
    content:
      "The icon prop can accept an icon name or identifier, allowing the component to dynamically select and render the appropriate icon based on the provided name. e.g.",
    code: `const iconProps = { 
      iconName: "x-circle",
    };`,
  },
  {
    title: "iconColor",
    content:
      "The iconColor prop is used to dynamically set the fill color of the representing icon. e.g.",
    code: `const iconProps = { 
      iconColor: "#000",
    };`,
  },
  {
    title: "iconSize",
    content:
      "The iconSize prop is passed to the icon component, to set the size of the icon. e.g.",
    code: `const iconProps = { 
      iconSize: "2em",
    };`,
  },
  {
    title: "iconMargin",
    content:
      "The iconMargin props is used to create space around the icon element, outside of any defined borders. It controls the amount of space between an element and adjacent elements. You can set the margin on all four sides of an element or individually for each side. e.g.",
    code: `const iconProps = { 
      iconMargin: "0px 0px 0px 0px",
    };`,
  },
  {
    title: "iconPadding",
    content:
      "The iconPadding props is used to create space around the icon inside an element. It defines the distance between the icon of an element and its border. e.g.",
    code: `const iconProps = { 
      iconPadding: "0px 0px 0px 0px",
    };`,
  },
];

const propsList = [iconProps, sendIconProps, personIconProps];

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      {propsList.map((data, index) => (
        <div className="col ms-auto">
          <Widget
            src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
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
