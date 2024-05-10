return {
  type: "app",
  routes: {
    home: {
      path: "hyperbuild.near/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    create: {
      path: "hyperbuild.near/widget/page.create",
      blockHeight: "final",
      init: {
        name: "Create",
      },
    },
    explore: {
      path: "hyperbuild.near/widget/page.explore",
      blockHeight: "final",
      init: {
        name: "Explore",
      },
    },
  },
};
