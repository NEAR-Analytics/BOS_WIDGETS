return {
  type: "app",
  routes: {
    home: {
      path: "abdullahi3000.near/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    // feed: {
    //   path: "abdullahi3000.near/widget/page.feed",
    //   blockHeight: "final",
    //   init: {
    //     name: "Feed",
    //   },
    // },
    pitch: {
      path: "buildhub.near/widget/page.projects",
      blockHeight: "final",
      init: {
        name: "Pitch",
      },
    },
    documents: {
      path: "buildhub.near/widget/page.resources",
      blockHeight: "final",
      init: {
        name: "Documents",
      },
    },
    musicPlayer: {
      path: "#",
      blockHeight: "final",
      init: {
        name: "Music layer",
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
  },
};
