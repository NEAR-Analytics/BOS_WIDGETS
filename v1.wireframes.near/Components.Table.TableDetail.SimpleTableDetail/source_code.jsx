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

const data = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Alice", age: 30 },
  { id: 3, name: "Bob", age: 35 },
];
const tableProps = {
  tableData: data,
  style: {
    tableBackgroundColor: "#fff",
    tHeadFontColor: "#000",
  },
};

const detail = `const data = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Alice', age: 30 },
  { id: 3, name: 'Bob', age: 35 },
];
const tableProps ={
  tableData: data,
  style: {
    tableBackgroundColor: "#fff",
    tHeadFontColor: "#000",
  },
};
return(
<Widget src="v1.wireframes.near/widget/Components.Table.SimpleTable" props={tableProps}/>
);`;
const explanation =
  "A table is an element used to organize data into rows and columns. It's a fundamental component for displaying structured information on a webpage. Each row typically represents a record or an entry, while each column represents a specific attribute or piece of information.";

const propsExplanation = [
  {
    title: "tableData",
    required: "true",
    content:
      "tableData is likely a variable or object name, indicating that it holds data structured like a table. e.g.",
    code: `const tableProps = {
      tableData: data,
    };`,
  },
  {
    title: "tableStyle",
    content:
      "The tableStyle props refers to the table component. You can customize the table by using this prop. e.g.",
    code: `const tableProps = { 
      tableStyle: {
        padding: 1px,
        margin: 1px,
      },
    }`,
  },
  {
    title: "tableHeadStyle",
    content:
      "The tableHeadStyle props refers to the table head section of table component. You can customize the table head by using this tableHeadStyle prop. e.g.",
    code: `const tableProps = { 
      tableHeadStyle: {
        padding: 1px,
      },
    }`,
  },
  {
    title: "tableRowStyle",
    content:
      "The tableRowStyle props refers to the table row section of table component. You can customize the row of table by using this tableRowStyle prop. e.g.",
    code: `const tableProps = { 
      tableRowStyle: {
        padding: 2px,
        textAlign: center,
      },
    };`,
  },
  {
    title: "tableHeaderStyle",
    content:
      "The tableHeaderStyle props refers to the table header inside body section of table component. You can customize the table header by using the tableHeaderStyle prop. e.g.",
    code: `const tableProps = { 
      tableHeaderStyle: {
        padding: 2px,
        color: #000;
      },
    };`,
  },
  {
    title: "tableBodyRowStyle",
    content:
      "The tableBodyRowStyle props refers to the table row inside body of table component. You can customize the row of table body by using this tableBodyRowStyle prop. e.g.",
    code: `const tableProps = { 
      tableBodyRowStyle: {
        textAlign: center,
      },
    };`,
  },
  {
    title: "tableCellStyle",
    content:
      "The tableCellStyle props refers to the cells of the table component. You can customize the cells of table by using this tableCellStyle prop. e.g.",
    code: `const tableProps = { 
      tableCellStyle: {
        backgroundColor: transparent,
      },
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const tableProps = {
        style:{ 
          tableBackgroundColor: "#fff",
          tHeadFontColor: "#000", 
        }, 
      };`,
    children: [
      {
        title: "tableWidth",
        content:
          "You can set the tableWidth using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const tableProps = {
          style:{ 
            tableWidth: '100%',
          }, 
        };`,
      },
      {
        title: "tableBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color of table. e.g.",
        code: `const tableProps = {
        style:{ 
          tableBackgroundColor: '#fff',
        }, 
      };`,
      },
      {
        title: "tableBorder",
        content:
          "The tableBorder props is used to set the border of an element. e.g.",
        code: `const tableProps = {
          style:{ 
            tableBorder: 'none',
          }, 
        };`,
      },
      {
        title: "tableBorderRadius",
        content:
          "The tableBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const tableProps = {
          style:{ 
            tableBorderRadius: 'none',
          }, 
        };`,
      },
      {
        title: "tHeadBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color of table. e.g.",
        code: `const tableProps = {
        style:{ 
          tHeadBackgroundColor: '#f2f2f2',
        }, 
      };`,
      },
      {
        title: "tHeadFontColor",
        content:
          "You can use tHeadFontColor props to set the text color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const tableProps = {
          style:{ 
            tHeadFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "tHeadFontSize",
        content:
          "The tHeadFontSize props is used to set the size of the text content within an element. It specifies the height of the font in pixels, em units, percentages, or other length units. e.g.",
        code: `const tableProps = {
          style:{ 
            tHeadFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "tRowBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color of table. e.g.",
        code: `const tableProps = {
        style:{ 
          tRowBackgroundColor: '#f2f2f2',
        }, 
      };`,
      },
      {
        title: "tHeaderPadding",
        content:
          "The tHeaderPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const tableProps = {
          style:{ 
            tHeaderPadding: '10px 10px',
          }, 
        };`,
      },
      {
        title: "tHeaderTextAlign",
        content:
          "The tHeaderTextAlign props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const tableProps = {
          style:{ 
            tHeaderTextAlign: 'left',
          }, 
        };`,
      },
      {
        title: "tHeaderBorder",
        content:
          "The tHeaderBorder props is used to set the border of an element. e.g.",
        code: `const tableProps = {
          style:{ 
            tHeaderBorder: 'none',
          }, 
        };`,
      },
      {
        title: "tHeaderBorderBottom",
        content:
          "The tHeaderBorderBottom props is used to define the style, color, and width of the bottom border of an element. It allows you to add a decorative or structural line at the bottom of an element, separating it from the content below or enhancing its visual appearance. e.g.",
        code: `const tableProps = {
          style:{ 
            tHeaderBorderBottom: '1px solid #ddd',
          }, 
        };`,
      },
      {
        title: "tCellPadding",
        content:
          "The tHeaderPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const tableProps = {
          style:{ 
            tHeaderPadding: '8px 10px',
          }, 
        };`,
      },
      {
        title: "tCellTextAlign",
        content:
          "The tCellTextAlign props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const tableProps = {
          style:{ 
            tCellTextAlign: 'left',
          }, 
        };`,
      },
      {
        title: "tCellBorderBottom",
        content:
          "The tCellBorderBottom props is used to define the style, color, and width of the bottom border of an element. It allows you to add a decorative or structural line at the bottom of an element, separating it from the content below or enhancing its visual appearance. e.g.",
        code: `const tableProps = {
          style:{ 
            tCellBorderBottom: '1px solid #ddd',
          }, 
        };`,
      },
    ],
  },
];

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <div className="p-2">
        <Widget
          src="v1.wireframes.near/widget/Components.Table.SimpleTable"
          props={tableProps}
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
