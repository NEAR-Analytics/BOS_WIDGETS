return {
  type: "project",
  routes: {
    main: {
      path: "apps.near/widget/page",
      blockHeight: "final",
      init: {
        name: "View",
      },
    },
    collab: {
      path: "apps.near/widget/git",
      blockHeight: "final",
      init: {
        name: "Build",
      },
    },
    social: {
      path: "apps.near/widget/feed",
      blockHeight: "final",
      init: {
        name: "Discuss",
      },
    },
    about: {
      path: "apps.near/widget/docs",
      blockHeight: "final",
      init: {
        name: "Learn",
      },
    },
  },
};
