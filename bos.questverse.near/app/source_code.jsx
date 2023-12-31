const { page, ...passProps } = props;

const { AppLayout } = VM.require(
  "bos.questverse.near/widget/components.Layout"
);

if (!AppLayout) {
  return <p>Loading modules...</p>;
}

// CSS styles to be used across the app.
// Define fonts here, as well as any other global styles.
const Theme = styled.div`
  a {
    color: inherit;
  }
  
  width: 100%;
  height: 100vh;
`;

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
          src="bos.questverse.near/widget/pages.Dashboard"
          props={passProps}
        />
      );
    }
    case "discover": {
      return (
        <Widget
          src="bos.questverse.near/widget/pages.Discover"
          props={passProps}
        />
      );
    }
    case "create": {
      return (
        <Widget
          src="bos.questverse.near/widget/pages.Create"
          props={passProps}
        />
      );
    }
    case "quest": {
      return (
        <Widget
          src="bos.questverse.near/widget/pages.Quest"
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