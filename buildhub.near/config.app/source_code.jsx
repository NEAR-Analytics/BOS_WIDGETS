return {
  type: "app",
  routes: {
    home: {
      path: "buildhub.near/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
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
  },
};
