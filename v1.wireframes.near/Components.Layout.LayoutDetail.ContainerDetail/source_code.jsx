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

const Text = styled.p`
  font-size: ${(props) => props.fontSize || "10px"};
`;

const fontSize = props.style.fontSize;

const detail = `const data ={
  children : (<>
    <p>This is a simple example of using a container styled component.</p>
  </>)};
return(
<Widget src="v1.wireframes.near/widget/Components.Layout.Container" props={data} />
);`;

const explanation =
  "A container typically refers to a structural element or layout component used to group and organize other elements within a webpage or user interface. Containers are often used to manage the layout, spacing, and alignment of content, helping to create a structured and visually appealing design.";

const propsExplanation = [
  {
    title: "children",
    required: "false",
    content:
      "The children typically refers to the elements or components nested within a parent element or component. You must have to add or pass the code inside children to do changes. e.g.",
    code: `const data = {
      children:(<>
        <p>This is a simple example of using a container styled component.</p>
      </>)
    };`,
  },
  {
    title: "style",
    required: "false",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const data = {
      style:{ 
        margin-right: 'auto',
        padding-right: '2%',
      } 
    };`,
    children: [
      {
        title: "width",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            width: '96%',
          } 
        };`,
      },
      {
        title: "marginRight",
        content:
          "The marginRight property is used to define the spacing between the right edge of an element and adjacent elements or its containing block. It allows you to control the amount of space that appears on the right side of an element, creating separation between it and other elements. e.g.",
        code: `const data = {
          style:{ 
            marginRight: 'auto',
          } 
        };`,
      },
      {
        title: "marginLeft",
        content:
          "The marginLeft property is used to define the spacing between the left edge of an element and adjacent elements or its containing block. It allows you to control the amount of space that appears on the left side of an element, creating separation between it and other elements. e.g.",
        code: `const data = {
          style:{ 
            marginLeft: 'auto',
          } 
        };`,
      },
      {
        title: "paddingRight",
        content:
          "The paddingRight property is used to define the spacing between the content of an element and its right-hand side border. It allows you to create space inside an element, effectively increasing the distance between the content and the right edge of the element's border. e.g.",
        code: `const data = {
          style:{ 
            paddingRight: '2%',
         } 
        };`,
      },
      {
        title: "paddingLeft",
        content:
          "The paddingLeft property is used to define the spacing between the content of an element and its left-hand side border. It allows you to create space inside an element, effectively increasing the distance between the content and the left edge of the element's border. e.g.",
        code: `const data = {
          style:{ 
            paddingLeft: '2%',
         } 
        };`,
      },
      {
        title: "textWrap",
        content:
          "The textWrap props is used for text wrapping or word wrapping. e.g.",
        code: `const data = {
          style:{ 
            textWrap: 'wrap',
         } 
        };`,
      },
      {
        title: "mobileWidth",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            mobileWidth: '94%',
          } 
        };`,
      },
      {
        title: "tabletWidth",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            tabletWidth: '92%',
          } 
        };`,
      },
      {
        title: "laptopWidth",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            laptopWidth: '90%',
          } 
        };`,
      },
      {
        title: "desktopWidth",
        content:
          "You can set the width using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const data = {
          style:{ 
            desktopWidth: '88%',
          } 
        };`,
      },
    ],
  },
];

const data = {
  children: (
    <>
      <p fontSize={fontSize}>
        This is a simple example of using a container styled component.
      </p>
    </>
  ),
};

const props = {
  copyBtn: detail,
  component: (
    <div>
      <Widget
        src={`v1.wireframes.near/widget/Components.Layout.Container`}
        props={data}
      />
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
