const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const daoName = "Harmonic Guild";
const feedLink = "https://https://www.harmonicguild.io";

return {
  type: "app", // every.near/type/app
  routes: {
    player: {
      path: "abdullahi3000.near/widget/harmonic.music.player",
      blockHeight: "final",
      init: {
        name: "Music Player", // maybe these should be moved to navbar specific
        icon: "bi bi-vinyl-fill",
      },
    },
    uploader: {
      path: "abdullahi3000.near/widget/harmonic.song.uploader",
      blockHeight: "final",
      init: {
        name: "Music Uploader",
        icon: "bi bi-cloud-arrow-up-fill",
      },
    },
    network: {
      path: "abdullahi3000.near/widget/harmonic.artists.network",
      blockHeight: "final",
      init: {
        name: "Artists Network",
        icon: "bi bi-people-fill",
      },
    },
  },
};
