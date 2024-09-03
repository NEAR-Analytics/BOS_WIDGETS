/**
 * This is the main entry point for the RFP application.
 * Page route gets passed in through params, along with all other page props.
 */
const { page, ...passProps } = props;
// Import our modules
const { AppLayout } = VM.require(
  `megha19.near/widget/components.template.AppLayout`
);
const { Theme } = VM.require(`megha19.near/widget/config.theme`);
const { CssContainer } = VM.require(`megha19.near/widget/config.css`);
if (!AppLayout || !Theme || !CssContainer) {
  return <p>Loading modules...</p>;
}
if (!page) {
  // If no page is specified, we default to the feed page TEMP
  page = "about";
}
// This is our navigation, rendering the page based on the page parameter
function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "about": {
      return (
        <Widget
          src={`megha19.near/widget/components.pages.about`}
          props={passProps}
        />
      );
    }
    case "rfps": {
      return (
        <Widget
          src={`megha19.near/widget/components.rfps.Feed`}
          props={passProps}
        />
      );
    }
    case "rfp": {
      return (
        <Widget
          src={`megha19.near/widget/components.rfps.Rfp`}
          props={passProps}
        />
      );
    }
    case "create-rfp": {
      return (
        <Widget
          src={`megha19.near/widget/components.rfps.Editor`}
          props={passProps}
        />
      );
    }
    case "create-proposal": {
      return (
        <Widget
          src={`megha19.near/widget/components.proposals.Editor`}
          props={{ ...passProps }}
        />
      );
    }
    case "proposals": {
      return (
        <Widget
          src={`megha19.near/widget/components.proposals.Proposals`}
          props={passProps}
        />
      );
    }
    case "proposal": {
      return (
        <Widget
          src={`megha19.near/widget/components.proposals.Proposal`}
          props={passProps}
        />
      );
    }
    case "about": {
      return (
        <Widget
          src={`megha19.near/widget/components.pages.about`}
          props={passProps}
        />
      );
    }
    case "admin": {
      return (
        <Widget
          src={`megha19.near/widget/components.pages.admin`}
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
    <CssContainer>
      <AppLayout page={page}>
        <Page />
      </AppLayout>
    </CssContainer>
  </Theme>
);
