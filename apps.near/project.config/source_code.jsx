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
    build: {
      path: "apps.near/widget/directory",
      blockHeight: "final",
      init: {
        name: "Explore",
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
