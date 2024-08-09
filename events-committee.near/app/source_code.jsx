/**
 * This is the main entry point for the DevHub application.
 * Page route gets passed in through params, along with all other page props.
 */
const { onDraftStateChange } = VM.require(
  "events-committee.near/widget/devhub.entity.post.draft"
);
const { page, ...passProps } = props;
// Import our modules
const { AppLayout } = VM.require(
  "events-committee.near/widget/devhub.components.templates.AppLayout"
);
const { Theme } = VM.require("events-committee.near/widget/config.theme");
const { CssContainer } = VM.require("events-committee.near/widget/config.css");
if (!AppLayout || !Theme || !CssContainer) {
  return <p>Loading modules...</p>;
}
if (!page) {
  // If no page is specified, we default to the feed page TEMP
  page = "home";
}
// This is our navigation, rendering the page based on the page parameter
function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "create-proposal": {
      return (
        <Widget
          src={"events-committee.near/widget/devhub.entity.proposal.Editor"}
          props={{ ...passProps }}
        />
      );
    }
    case "proposals": {
      return (
        <Widget
          src={"events-committee.near/widget/devhub.page.proposals"}
          props={passProps}
        />
      );
    }
    case "proposal": {
      return (
        <Widget
          src={"events-committee.near/widget/devhub.entity.proposal.Proposal"}
          props={passProps}
        />
      );
    }
    // ?page=about
    case "about": {
      return (
        <Widget
          src={"events-committee.near/widget/devhub.page.about"}
          props={passProps}
        />
      );
    }
    case "admin": {
      return (
        <Widget
          src={"events-committee.near/widget/devhub.page.admin.index"}
          props={passProps}
        />
      );
    }
    case "profile": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.profile"}
          props={passProps}
        />
      );
    }
    default: {
      return (
        <Widget
          src={"events-committee.near/widget/devhub.page.proposals"}
          props={passProps}
        />
      );
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
