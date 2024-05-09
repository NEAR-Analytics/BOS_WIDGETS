return {
  type: "app",
  routes: {
    home: {
      path: "buildcommons.near/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    feed: {
      path: "buildcommons.near/widget/page.feed",
      blockHeight: "final",
      init: {
        name: "Collab",
      },
    },
    cohorts: {
      path: "buildcommons.near/widget/page.cohorts",
      blockHeight: "final",
      init: {
        name: "Cohorts",
      },
    },
    states: {
      path: "buildcommons.near/widget/page.states",
      blockHeight: "final",
      init: {
        name: "CommonStates",
      },
    },
    projects: {
      path: "buildcommons.near/widget/page.projects",
      blockHeight: "final",
      init: {
        name: "Projects",
      },
    },
  },
};
