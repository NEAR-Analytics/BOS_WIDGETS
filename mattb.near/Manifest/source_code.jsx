let availableComponents = Object.keys(Social.getr(`mattb.near/widget`));

const resolve = (componentPath) =>
  availableComponents.filter((path) => path.indexOf(componentPath) != -1) || [];

return {
  libs: {
    frensly: {
      commons: resolve("Frensly.Commons"),
    },
    "near-badger": {
      lens: "NearBadger.Libs.Lens"
    }
  },
  links: {
    telegram: "@OxMattB",
    twitter: "@0xMattB",
    near: "@mattb.near",
  },
};
