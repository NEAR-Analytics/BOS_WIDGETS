return {
  type: "app",
  routes: {
    home: {
      path: "harmonic1.near/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    // feed: {
    //   path: "harmonic1.near/widget/page.feed",
    //   blockHeight: "final",
    //   init: {
    //     name: "Feed",
    //   },
    // },
    create: {
      path: "harmonic1.near/widget/page.create",
      blockHeight: "final",
      init: {
        name: "Create",
      },
    },
    // demo: {
    //   path: "harmonic1.near/widget/page.demo",
    //   blockHeight: "final",
    //   init: {
    //     name: "Demo",
    //   },
    // },
  },
};
