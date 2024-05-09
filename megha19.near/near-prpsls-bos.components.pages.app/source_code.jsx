/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes//common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "megha19.near";
const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT = "truedove38.near";
const REPL_RPC_URL = "https://rpc.mainnet.near.org";
const REPL_NEAR = "near";
const RFPImage =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const TIMELINE_STATUS = {
  ACCEPTING_SUBMISSIONS: "ACCEPTING_SUBMISSIONS",
  EVALUATION: "EVALUATION",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  CANCELLED: "CANCELLED",
};
/* END_INCLUDE: "includes//common.jsx" */

/**
 * This is the main entry point for the RFP application.
 * Page route gets passed in through params, along with all other page props.
 */

const { page, ...passProps } = props;

// Import our modules
const { AppLayout } = VM.require(
  `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.template.AppLayout`
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
  page = "about";
}

// This is our navigation, rendering the page based on the page parameter
function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "about": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.about`}
          props={passProps}
        />
      );
    }
    case "rfps": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.Feed`}
          props={passProps}
        />
      );
    }
    case "rfp": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.Rfp`}
          props={passProps}
        />
      );
    }
    case "create-rfp": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.Editor`}
          props={passProps}
        />
      );
    }
    case "create-proposal": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.proposals.Editor`}
          props={{ ...passProps }}
        />
      );
    }

    case "proposals": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.proposals.Feed`}
          props={passProps}
        />
      );
    }
    case "proposal": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.proposals.Proposal`}
          props={passProps}
        />
      );
    }
    case "about": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.about`}
          props={passProps}
        />
      );
    }
    case "admin": {
      return (
        <Widget
          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.admin`}
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
