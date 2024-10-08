/**
 * This is the main entry point for the DevHub application.
 * Page route gets passed in through params, along with all other page props.
 */

const { onDraftStateChange } = VM.require(
  "devhub.near/widget/devhub.entity.post.draft"
);

const { page, ...passProps } = props;

// Import our modules
const { AppLayout } = VM.require(
  "devhub.near/widget/devhub.components.templates.AppLayout"
);

const { CssContainer } = VM.require("devhub.near/widget/config.css");
const { Theme } = VM.require("devhub.near/widget/config.theme");

if (!AppLayout || !Theme || !CssContainer) {
  return <p>Loading modules...</p>;
}

if (!page) {
  // If no page is specified, we default to the feed page TEMP
  page = "home";
}

// Track visits

if ("phc_es19zuLOCXpiyOGqBDkBrH7MaL77ggqJMjy8mpR1623".length === 47) {
  useEffect(() => {
    const hashedUserId = context.accountId
      ? Array.from(nacl.hash(Buffer.from(context.accountId)))
          .map((b) => ("00" + b.toString(16)).slice(-2))
          .join("")
      : "unauthenticated";

    fetch("https://eu.posthog.com/capture/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        api_key: "phc_es19zuLOCXpiyOGqBDkBrH7MaL77ggqJMjy8mpR1623",
        event: "devhub_pageview",
        properties: {
          distinct_id: hashedUserId,
          page,
          ...props,
        },
        timestamp: new Date().toISOString(),
      }),
    });
  }, [props]);
}

// This is our navigation, rendering the page based on the page parameter
function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "home": {
      return (
        <Widget
          src="devhub.near/widget/devhub.page.home"
          props={passProps}
        />
      );
    }
    // ?page=communities
    case "communities": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.communities"}
          props={passProps}
        />
      );
    }
    case "announcements": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.announcements"}
          props={passProps}
        />
      );
    }

    // ?page=community
    case "community": {
      return (
        // Considering to consolidate this into a single widget,
        // where each level handles its own routing.
        // Modularizing a page just like we do with addons
        <Widget
          src={"devhub.near/widget/devhub.entity.community.Provider"}
          props={{
            ...passProps,
            Children: (p) => {
              // passing props from the Provider into the Children
              switch (routes[1]) {
                // ?page=community.configuration
                case "configuration": {
                  return (
                    <Widget
                      src={
                        "devhub.near/widget/devhub.page.community.configuration"
                      }
                      props={{
                        ...passProps,
                        ...p,
                      }}
                    />
                  );
                }
                // ?page=community
                default: {
                  return (
                    <Widget
                      src={"devhub.near/widget/devhub.page.community.index"}
                      props={{
                        ...passProps,
                        ...p,
                      }}
                    />
                  );
                }
              }
            },
          }}
        />
      );
    }
    // ?page=feed
    case "feed": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.feed"}
          props={passProps}
        />
      );
    }
    // ?page=create
    case "create": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.entity.post.PostEditor"}
          props={{ ...passProps, isCreatePostPage: true, onDraftStateChange }}
        />
      );
    }

    case "create-proposal": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.entity.proposal.Editor"}
          props={{ ...passProps }}
        />
      );
    }

    case "proposals": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.proposals"}
          props={passProps}
        />
      );
    }
    case "proposal": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.entity.proposal.Proposal"}
          props={passProps}
        />
      );
    }
    // ?page=about
    case "about": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.about"}
          props={passProps}
        />
      );
    }
    case "contribute": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.contribute"}
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
    // ?page=blog
    case "blog": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.blog"}
          props={passProps}
        />
      );
    }
    case "blogv2": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.blogv2"}
          props={passProps}
        />
      );
    }
    case "post": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.post"}
          props={passProps}
        />
      );
    }
    case "admin": {
      return (
        <Widget
          src={"devhub.near/widget/devhub.page.admin.index"}
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
