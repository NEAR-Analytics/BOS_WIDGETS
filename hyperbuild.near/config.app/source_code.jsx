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
    profile: {
      path: "hyperbuild.near/widget/page.profile",
      blockHeight: "final",
      init: {
        name: "Profile",
      },
    },
    tools: {
      path: "hyperbuild.near/widget/page.tools",
      blockHeight: "final",
      init: {
        name: "Tools",
      },
    },
  },
};
