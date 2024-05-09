/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/
// With the setup in this repo (see package.json and build.js), you can import
// individual files from src/includes/ folder. They will be inlined here
// before publishing.
/* INCLUDE: "includes/common.jsx" */
function someFunction() {
  return "someFunction output";
}
/* END_INCLUDE: "includes/common.jsx" */





function MainComponent(props) {
  if (!props.color) {
    return "No color is specified!";
  }

  return (
    <>
      <h2 style={{ color: props.color }}>Component color is {props.color}.</h2>
      <p> Let's see someFunction output: {someFunction()}</p>
    </>
  );
}

return MainComponent(props, context);