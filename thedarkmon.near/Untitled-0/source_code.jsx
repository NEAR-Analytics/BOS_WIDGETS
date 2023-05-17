return <div>Hello World</div>;
import React from "react";
import ReactDOM from "react-dom";
class TwoButtons extends React.Component {
  handleClick1() {
    alert("Вы нажали кнопку 1!");
  }

  handleClick2() {
    alert("Вы нажали кнопку 2!");
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick1}>Кнопка 1</button>
        <button onClick={this.handleClick2}>Кнопка 2</button>
      </div>
    );
  }
}

ReactDOM.render(<TwoButtons />, document.getElementById("root"));
