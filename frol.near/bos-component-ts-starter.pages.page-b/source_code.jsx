/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/
// Welcome to the home page of the first TypeScript BOS component!
const { AppLayout } = VM.require(
  "frol.near/widget/bos-component-ts-starter.modules.layout.main"
);

// TypeScript! Yay!




// Just create a default export function (no need to `return` it, see `.bos`
// folder after `npm run build` if you want to understand what is happening)
function MainComponent(props, context) {
  return (
    <AppLayout title="Page B">
      <h1>
        {props.customWelcomeMessage ??
          "Welcome to the home page of the first TypeScript BOS component"}
        , {context.accountId ?? "anonymous user"}
      </h1>
      <p>
        Learn more at{" "}
        <a href="https://github.com/frol/bos-component-ts-starter">
          BOS Component TypeScript Starter repo
        </a>
      </p>
      <Widget
        src="frol.near/widget/bos-component-ts-starter.components.subfolder.my-nested-component"
        props={{ color: "green" }}
      />
    </AppLayout>
  );
}

return MainComponent(props, context);