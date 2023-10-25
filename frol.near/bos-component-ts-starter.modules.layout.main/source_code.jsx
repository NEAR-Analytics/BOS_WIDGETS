/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/

function AppLayout(props, context) {
  return (
    <>
      <h1>DEMO. You are at "{props.title}" page</h1>
      <ul>
        <li>
          <Link to="/frol.near/widget/bos-component-ts-starter.pages.page-a">
            Go to Page A
          </Link>
        </li>
        <li>
          <Link href="/frol.near/widget/bos-component-ts-starter.pages.page-b">
            Go to Page B
          </Link>
        </li>
        <li>
          <Link href="/frol.near/widget/bos-component-ts-starter.pages.page-a?customWelcomeMessage=heyoo">
            Go to Page A with custom message
          </Link>
        </li>
      </ul>
      {props.children}
    </>
  );
}

return { AppLayout };
