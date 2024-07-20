/**
 * This is the main entry point for the Treasury application.
 * Page route gets passed in through params, along with all other page props.
 */
const { page, ...passProps } = props;
// Import our modules
const { AppLayout } = VM.require(
  "treasury-devdao.near/widget/components.templates.AppLayout"
) || { AppLayout: () => <></> };
const { Theme } = VM.require("treasury-devdao.near/widget/config.css") || {
  Theme: () => <></>,
};
if (!page) {
  // If no page is specified, we default to the feed page TEMP
  page = "dashboard";
}
// This is our navigation, rendering the page based on the page parameter
function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "dashboard": {
      return (
        <Widget
          src="treasury-devdao.near/widget/pages.dashboard.index"
          props={passProps}
        />
      );
    }
    // ?page=members
    case "members": {
      return (
        <Widget
          src={"treasury-devdao.near/widget/pages.members.index"}
          props={passProps}
        />
      );
    }
    case "operations": {
      return (
        <Widget
          src={"treasury-devdao.near/widget/pages.operations.index"}
          props={passProps}
        />
      );
    }
    default: {
      // TODO: 404 page
      return <p>404</p>;
    }
  }
}
return (
  <Theme>
    <AppLayout page={page}>
      <Page />
    </AppLayout>
  </Theme>
);
