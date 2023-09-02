/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/
/* INCLUDE: "common.jsx" */
/* END_INCLUDE: "common.jsx" */





function MainComponent(props) {
  if (!props.color) {
    return "No color is specified!";
  }

  return (
    <h2 style={{ color: props.color }}>
      Component color is {props.color}. Let's see someFunction output:{" "}
      {someFunction()}
    </h2>
  );
}

return MainComponent(props, context);