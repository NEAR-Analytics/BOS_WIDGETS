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
    governance: {
      path: "abdullahi3000.near/widget/page.feed",
      blockHeight: "final",
      init: {
        name: "Governance",
      },
    },
    music: {
      path: "abdullahi3000.near/widget/page.music",
      blockHeight: "final",
      init: {
        name: "Music",
      },
    },
    joinUs: {
      path: "abdullahi3000.near/widget/harmonic.join.us",
      blockHeight: "final",
      init: {
        name: "Join Us",
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
