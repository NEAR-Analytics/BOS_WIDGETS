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
const ownerId = "v1.wireframes.near";

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

const propsExplanation = [];

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <div className="p-2">
        <Widget
          src="v1.wireframes.near/widget/Components.Table.Table"
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
      src={`v1.wireframes.near/widget/Components.Card.LearningCard`}
      props={props}
    />
  </>
);
