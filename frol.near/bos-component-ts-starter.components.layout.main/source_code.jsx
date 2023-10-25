/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/





function MainComponent(props, context) {
  return (
    <>
      <h1>DEMO. You are at "{props.title}" page</h1>
      <ul>
        <li>
          <a href="/frol.near/widget/bos-component-ts-starter.pages.page-a">
            Go to Page A
          </a>
        </li>
        <li>
          <a href="/frol.near/widget/bos-component-ts-starter.pages.page-b">
            Go to Page B
          </a>
        </li>
        <li>
          <a href="/frol.near/widget/bos-component-ts-starter.pages.page-a?customWelcomeMessage=heyoo">
            Go to Page A with custom message
          </a>
        </li>
      </ul>
      {props.children}
    </>
  );
}

return MainComponent(props, context);