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

const detail = `const data ={
  children : (<>
    <h1>This is full container.....</h1>
  </>)};
return(
<Widget src="v1.wireframes.near/widget/Components.Layout.ContainerFull" props={data} />
);`;

const explanation =
  "The container-fluid component is used to create a full-width container that spans the entire viewport width. It's a part of the grid system for creating responsive layouts.";

const propsExplanation = [
  {
    title: "children",
    required: "true",
    content:
      "The children typically refers to the elements or components nested within a parent element or component. You must have to add or pass the code inside children to do changes. e.g.",
    code: `const data = {
      children:(<>
        <h1>This is testing paragraph.....</h1>
      </>)
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const data = {
      style:{ 
        margin: '0',
        padding: '0',
      }, 
    };`,
    children: [
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            width: '100%',
          }, 
        };`,
      },
      {
        title: "height",
        content:
          "The height property is used to set the height of the container. e.g.",
        code: `const data = {
          style:{ 
            height: '100%',
          }, 
        };`,
      },
      {
        title: "minHeight",
        content:
          "The minHeight property is used to set the minimum height of the container. It ensures that the height of the element does not shrink below the specified minimum value, even if the content or other styles would otherwise make it smaller. e.g.",
        code: `const data = {
          badge:{ 
            style:{ 
              minHeight: '100%',
            },  
          },
        };`,
      },
      {
        title: "maxHeight",
        content:
          "The maxHeight property is used to set the maximum height of the container. It specifies the maximum height that an element can have, and if its content exceeds this limit, the overflow behavior will be applied to handle the excess content. e.g.",
        code: `const data = {
          style:{ 
            maxHeight: '100%',
          }, 
        };`,
      },
      {
        title: "maxWidth",
        content:
          "The maxWidth property is used to set the maximum width of the container. It prevents the element from becoming wider than the specified value, regardless of the size of its content or its containing parent. e.g.",
        code: `const data = {
          style:{ 
            maxWidth: '1200px',
          }, 
        };`,
      },
      {
        title: "margin",
        content:
          "The margin property is used to create space around an element, outside of any defined borders. It controls the amount of space between an element and adjacent elements. You can set the margin on all four sides of an element or individually for each side. e.g.",
        code: `const data = {
          style:{ 
            margin: '0',
          }, 
        };`,
      },
      {
        title: "padding",
        content:
          "The padding property is used to create space around the content inside an element. It defines the distance between the content of an element and its border. e.g.",
        code: `const data = {
          style:{ 
            padding: '0',
          }, 
        };`,
      },
      {
        title: "textWrap",
        content:
          "The textWrap props is used for text wrapping or word wrapping. e.g.",
        code: `const data = {
          style:{ 
            textWrap: 'wrap',
          }, 
        };`,
      },
      {
        title: "backgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const data = {
          style:{ 
            backgroundColor: 'transparent',
          }, 
        };`,
      },
      {
        title: "desktopPadding",
        content:
          "The desktopPadding props is used to create space around the content inside an element in that particular media. It defines the distance between the content of an element and its border. e.g.",
        code: `const data = {
          style:{ 
            desktopPadding: '0',
          }, 
        };`,
      },
      {
        title: "laptopPadding",
        content:
          "The laptopPadding props is used to create space around the content inside an element in that particular media. It defines the distance between the content of an element and its border. e.g.",
        code: `const data = {
          style:{ 
            laptopPadding: '0',
          }, 
        };`,
      },
      {
        title: "tabletPadding",
        content:
          "The tabletPadding props is used to create space around the content inside an element in that particular media. It defines the distance between the content of an element and its border. e.g.",
        code: `const data = {
          style:{ 
            tabletPadding: '0',
          }, 
        };`,
      },
    ],
  },
];

const data = {
  children: (
    <>
      <h1>This is full container.....</h1>
    </>
  ),
  style: {
    width: "100%",
    height: "100svh",
    padding: "1rem",
  },
  inlineStyle: {
    backgroundColor: "transparent",
    color: "#000",
  },
};

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <div className="col p-2">
        <Widget
          src={`v1.wireframes.near/widget/Components.Layout.ContainerFull`}
          props={data}
        />
      </div>
    </div>
  ),
  text: detail,
  explanation: explanation,
  propsExplanation: propsExplanation,
  displayLearningCard: "full",
};

return (
  <>
    <Widget
      src={`v1.wireframes.near/widget/Components.Learning.LearningCard`}
      props={props}
    />
  </>
);
