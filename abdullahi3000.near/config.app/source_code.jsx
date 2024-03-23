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
    feed: {
      path: "abdullahi3000.near/widget/page.feed",
      blockHeight: "final",
      init: {
        name: "Feed",
      },
    },
    // pitch: {
    //   path: "abdullahi3000.near/widget/page.feed",
    //   blockHeight: "final",
    //   init: {
    //     name: "Pitch",
    //   },
    // },
    // documents: {
    //   path: "abdullahi3000.near/widget/page.feed",
    //   blockHeight: "final",
    //   init: {
    //     name: "Documents",
    //   },
    // },
    musicPlayer: {
      path: "abdullahi3000.near/widget/harmonic.music.player",
      blockHeight: "final",
      init: {
        name: "Music Player",
      },
    },
    songUploader: {
      path: "abdullahi3000.near/widget/harmonic.song.uploader",
      blockHeight: "final",
      init: {
        name: "Song Uploader",
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
