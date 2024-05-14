const guideConfigs = [
  {
    chapters: [
      {
        id: "bos.dapplets.near/gateway/MutableWebExtension",
        type: "infobox",
        if: { id: "1694995344461894022" }, // ToDo: should be another trigger
        // showChecked: true,
        pages: [
          {
            id: "bos.dapplets.near/gateway/MutableWebExtension/Welcome",
            title: "You’re entering Mutable Web",
            status: [
              { info: "You must be logged in to make all features available" },
            ],
            content:
              "\nMutable Web is a new web3 paradigm that allows anyone to add custom functionality to existing websites and share them within your community— no matter who owns the website.\n\nBecome the co-owner of any website you are using!\n\n### Mutation switch\n\n![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/onboarding-video-001.webp)\n\nYou can switch between website mutations created by different communities.\n\n[See more examples on our playground](https://twitter.com/MrConCreator)\n",
          },
        ],
      },
      {
        id: "bos.dapplets.near/app/Tipping/2",
        type: "callout",
        namespace: "mweb",
        contextType: "injected-widget",
        injectTo: "hidden",
        if: {
          parentContextId: { eq: "dapplets.near/104755842" },
          widgetSrc: { eq: "bos.dapplets.near/widget/Tipping.Main" },
        },
        arrowTo: "context",
        pages: [
          {
            id: "bos.dapplets.near/app/Tipping/2/1",
            status: [],
            title: "Tipping app",
            content: "... you can send them a tip through our application.",
          },
        ],
      },
      {
        id: "bos.dapplets.near/mutation/EarTrigger",
        type: "callout",
        namespace: "mweb",
        contextType: "ear-trigger",
        injectTo: "hidden",
        if: { id: { eq: "dapplets.near/104755842" } },
        arrowTo: "context",
        pages: [
          {
            id: "bos.dapplets.near/mutation/EarTrigger/1",
            status: [],
            title: "Apps control panel",
            content:
              "We add the App control panel to every post. By using it the user can add to the right-on post or inside the panel widgets, which expands the browser workflow possibilities.",
          },
        ],
      },
    ],
  },
];

return (
  <>
    {guideConfigs.map((guideConfig, i) => (
      <Widget
        key={i}
        src="bos.dapplets.near/widget/WebGuideTest.WebGuide"
        props={{ guideConfig }}
      />
    ))}
  </>
);
