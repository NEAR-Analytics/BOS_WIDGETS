const { CSS } = VM.require("buildhub.near/widget/components.CSS") || {
  CSS: () => <></>,
};
const config = {
  theme: {
    // add key values to define colors
    "--main-color": "black",
    "--secondary-color": "white",
    background: "var(--main-color)",
    color: "var(--secondary-color)",
    height: "100vh",
  },
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget
        src="buildhub.near/widget/components.Navbar"
        props={{ routes: config.router.routes, ...passProps, page: props.page }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "builddao.near/widget/home.Home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      feed: {
        path: "buildhub.near/widget/page.feed",
        blockHeight: "final",
        init: {
          name: "Activity",
        },
      },
      projects: {
        path: "buildhub.near/widget/page.projects",
        blockHeight: "final",
        init: {
          name: "Projects",
        },
        hide: true,
      },
      proposal: {
        path: "buildhub.near/widget/Proposals",
        blockHeight: "final",
        init: {
          name: "Proposals",
        },
        hide: true,
      },
      resources: {
        path: "buildhub.near/widget/page.resources",
        blockHeight: "final",
        init: {
          name: "Resources",
        },
      },
      library: {
        path: "buildhub.near/widget/page.library",
        blockHeight: "final",
        init: {
          name: "Library",
        },
      },
      profile: {
        path: "buildhub.near/widget/page.profile",
        blockHeight: "final",
        init: {
          name: "Profile",
        },
        hide: true,
      },
      inspect: {
        path: "buildhub.near/widget/page.inspect",
        blockHeight: "final",
        init: {
          name: "Inspect",
        },
        hide: true,
      },
      project: {
        path: "buildhub.near/widget/page.project",
        blockHeight: "final",
        init: {
          name: "Project Page",
        },
        hide: true,
      },
      notifications: {
        path: "buildhub.near/widget/page.notifications",
        blockHeight: "final",
        init: {
          name: "Notifications",
        },
        hide: true,
      },
    },
  },
};
return (
  <CSS>
    <Widget src="buildhub.near/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
