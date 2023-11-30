/**
 * This is the main entry point for the DevHub application.
 * Page route gets passed in through params, along with all other page props.
 */

const { page, ...passProps } = props;

// Import our modules
const { AppLayout } = VM.require(
  "lucus.near/widget/DonationHub.components.templates.AppLayout"
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

  .attractable {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    transition: box-shadow 0.6s;

    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }
  }
`;

if (!page) {
  // If no page is specified, we default to the feed page TEMP
  page = "feed";
}

// This is our navigation, rendering the page based on the page parameter
function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "feed": {
      return (
        <Widget
          src={"natapat.near/widget/Donationhub.page.feed"}
          props={passProps}
        />
      );
    }
    case "create": {
      return (
        <Widget
          src={"natapat.near/widget/Donation.Project.Create"}
          props={passProps}
        />
      );
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
