/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/

function AppLayout(props, context) {
  const cssFont = fetch(
    "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
  ).body;
  const css = fetch(
    "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
  ).body;

  if (!state.theme) {
    State.update({
      theme: styled.div`
      font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      ${cssFont}
      ${css}
  `,
    });
  }
  const Theme = state.theme;

  return (
    <Theme>
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
    </Theme>
  );
}

return { AppLayout };
