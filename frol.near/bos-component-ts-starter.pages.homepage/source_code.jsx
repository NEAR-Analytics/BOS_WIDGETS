/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/







// TypeScript! Yay!




// Just create a default export function (no need to `return` it, see `.bos`
// folder after `npm run build` if you want to understand what is happening)
function MainComponent(props, context) {
  return (
    <>
      <h1>
        {props.customWelcomeMessage ?? "Welcome"}, {context.accountId}
      </h1>
      <Widget
        src="frol.near/widget/bos-component-ts-starter.components.subfolder.my-nested-component"
        props={{ color: "green" }}
      />
    </>
  );
}

return MainComponent(props, context);