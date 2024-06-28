const twitterConfig = {
  action: true,
  chapters: [
    {
      id: "bos.dapplets.near/gateway/MutableWebExtension",
      type: 'infobox',
      if: { id: "1694995344461894022" }, // ToDo: should be another trigger
      // showChecked: true,
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtension/Welcome",
          title: "You’re entering Mutable Web",
          status: [],
          content: "\nMutable Web is a new web3 paradigm that allows anyone to add custom functionality to existing websites and share it with your community— no matter who owns the website.\n\nBecome a co-owner of any website you are use!\n\n### Mutation switch\n\n![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/onboarding-video-001.webp)\n\nYou can switch between website mutations created by different communities.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionNotch",
      type: 'callout',
      placement: 'right',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "notch",
      injectTo: "hidden",
      if: { id: { eq: "notch" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionNotch/Notch",
          title: "Mutation switch",
          status: [{ info: 'Click on the dropdown box' }],
          content: "Mutation switch allows user to choose between application sets.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionDropdown/1",
      type: 'callout',
      placement: 'right',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "notch",
      injectTo: "recently-used-mutations",
      if: { id: { eq: "recently-used-mutations" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionDropdown/1/1",
          title: "The list of recently used mutations (1/2)",
          status: [],
          content: "The current mutation is highlighted with a star. To add a “favorite” status to a mutation on the current page, simply click on the star. his mutation will become active when you open the website in a new tab.",
        },
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionDropdown/1/2",
          title: "The list of recently used mutations (2/2)",
          status: [{ info: 'Click on the dropdown box below' }],
          content: "The “Trash” removes the mutation from the “Recentt” list.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionDropdown/2",
      type: 'callout',
      strategy: 'fixed',
      placement: 'right',
      namespace: "mweb",
      contextType: "notch",
      injectTo: "hidden",
      if: { id: { eq: "unused-mutations-title" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionDropdown/2/1",
          title: "All mutations",
          status: [],
          content: "This is the list of all available, previously unused mutations.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionDropdown/3",
      type: 'callout',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "notch",
      injectTo: "hidden",
      if: { id: { eq: "mutate-button" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionDropdown/3/1",
          title: '"Mutate" button',
          status: [],
          content: 'The "Mutate" button allows users to create, fork, and edit mutations.',
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/1",
      type: 'callout',
      placement: 'left',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-overlay",
      injectTo: "mweb-overlay",
      if: { id: { eq: "mweb-overlay" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/1/MutationButton",
          title: "Application panel",
          status: [],
          content: "Here are the available application settings for the current mutation.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/2",
      type: 'callout',
      placement: 'bottom',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-overlay",
      injectTo: "mutation-icon",
      if: { id: { eq: "mutation-button" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/2/MutationButton",
          title: "Mutation button",
          status: [],
          content: "![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/webguide-006.png)\n\nThis is the current mutation icon. Click on it to open the Wallet panel. There you can connect your NEAR wallet.",
        },
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/2/MutationButton",
          title: "Mutation button",
          status: [],
          content: "![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/webguide-007.png)\n\n Once your wallet is connected, you can see information about it and disconnect whenever you want.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/3",
      type: 'callout',
      placement: 'bottom',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-overlay-action",
      injectTo: "mweb-overlay-action",
      if: { id: { eq: "web-guide-action-web-guide-test" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/3/Action",
          title: "Action button",
          status: [],
          content: "![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/webguide-005.png)\n\nYou can always call up this guide again on this page by clicking on this button. It is inserted by the Web Guide application. Other applications can also insert their own quick action buttons nearby.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/4",
      type: 'callout',
      placement: 'left',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-overlay",
      injectTo: "open-apps-button",
      if: { id: { eq: "open-apps-button" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/4/Applications",
          title: "Applications",
          status: [],
          content: "![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/webguide-008.png)\n\nClick on the button to view the applications of the current mutation. Here you can turn them off and on.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/app/Tipping/1",
      type: 'callout',
      namespace: "bos.dapplets.near/parser/twitter",
      contextType: "post",
      injectTo: "avatar",
      if: { id: { eq: "1694995344461894022" } },
      arrowTo: "insPoint",
      pages: [
        {
          id: "bos.dapplets.near/app/Tipping/1/1",
          status: [],
          title: "Tipping app",
          content: "If you want to thank the author of the tweet you like...",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/app/Tipping/2",
      type: "callout",
      namespace: "mweb",
      contextType: "injected-widget",
      injectTo: "hidden",
      if: {
        parentContextId: { eq: "1694995344461894022" },
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
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/mutation/EarTrigger",
      type: 'callout',
      namespace: "mweb",
      contextType: "ear-trigger",
      injectTo: "hidden",
      if: { id: { eq: "1694995344461894022" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/mutation/EarTrigger/1",
          status: [],
          title: "Apps control panel",
          content: 'We add the app control panel to each post. You can add widgets to the post or panel to extend the functionality of the site.',
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/mutation/EarTrigger/copy",
      type: 'callout',
      namespace: "mweb",
      contextType: "ear-trigger",
      injectTo: "hidden",
      if: { id: { eq: "1694995344461894022" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/mutation/EarTrigger/copy/1",
          status: [],
          title: "Apps control panel",
          content: '[See other Mutable Web facilities on NEAR Social](https://social.dapplets.org/mob.near/widget/ProfilePage?accountId=dappletsproject.near)',
        },
      ],
      skin: 'META_GUIDE',
    },
  ],
}

const nearSocialConfig = {
  action: true,
  chapters: [
    {
      id: "bos.dapplets.near/gateway/MutableWeb",
      type: 'infobox',
      if: { id: "1694995344461894022" }, // ToDo: should be another trigger
      // showChecked: true,
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWeb/Welcome",
          title: "You’re entering Mutable Web",
          status: [],
          content: "[Mutable Web also runs on Legacy Web2.](https://augm.link/mutate/?t=https%3A%2F%2Ftwitter.com%2FMrConCreator&m=bos.dapplets.near%2Fmutation%2FSandbox) Check its’ Web Guide there!\n\nMutable Web is a new web3 paradigm that allows anyone to add custom functionality to existing websites and share them within your community — no matter who owns the website.\n\nBecome the co-owner of any website you are using!\n\n### Mutation switch\n\n![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/onboarding-008.png)\n\nYou can switch between website mutations created by different communities.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebDropdown/1",
      type: 'callout',
      placement: 'right',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-gateway",
      injectTo: "mutation-wrapper",
      if: { id: { eq: "mutation-wrapper" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebDropdown/1/1",
          title: "Mutation switch",
          status: [{ info: 'Click on the dropdown box' }],
          content: "This is a mutation switcher to select the desired set of applications.",
        },
      ],
      skin: 'META_GUIDE',
    },
    // {
    //   id: "bos.dapplets.near/gateway/MutableWebDropdown/2",
    //   type: 'callout',
    //   strategy: 'fixed',
    //   placement: 'right',
    //   namespace: "mweb",
    //   contextType: "mweb-gateway",
    //   injectTo: "mutations-list",
    //   if: { id: { eq: "mutations-list" } },
    //   arrowTo: "context",
    //   pages: [
    //     {
    //       id: "bos.dapplets.near/gateway/MutableWebDropdown/2/1",
    //       title: "All mutations",
    //       status: [],
    //       content: "Each mutation defines the set of applications. Select it from the list.",
    //     },
    //   ],
    //   skin: 'META_GUIDE',
    // },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/1",
      type: 'callout',
      placement: 'left',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-overlay",
      injectTo: "mweb-overlay",
      if: { id: { eq: "mweb-overlay" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/1/MutationButton",
          title: "Application panel",
          status: [],
          content: "Here are the available application settings for the current mutation.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/3",
      type: 'callout',
      placement: 'bottom',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-overlay-action",
      injectTo: "mweb-overlay-action",
      if: { id: { eq: "web-guide-action-web-guide-test" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/3/Action",
          title: "Action button",
          status: [],
          content: "![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/webguide-005.png)\n\nYou can always call up this guide again on this page by clicking on this button. It is inserted by the Web Guide application. Other applications can also insert their own quick action buttons nearby.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/4",
      type: 'callout',
      placement: 'left',
      strategy: 'fixed',
      namespace: "mweb",
      contextType: "mweb-overlay",
      injectTo: "open-apps-button",
      if: { id: { eq: "open-apps-button" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/gateway/MutableWebExtensionOverlay/4/Applications",
          title: "Applications",
          status: [],
          content: "![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/webguide-008.png)\n\nClick on the button to view the applications of the current mutation. Here you can turn them off and on.",
        },
      ],
      skin: 'META_GUIDE',
    },
    // {
    //   id: "bos.dapplets.near/app/Tipping/1",
    //   type: 'callout',
    //   namespace: "bos.dapplets.near/parser/near-social-json",
    //   contextType: "post",
    //   injectTo: "avatar",
    //   if: { id: { eq: "dappletsproject.near/119034910" } },
    //   arrowTo: "insPoint",
    //   pages: [
    //     {
    //       id: "bos.dapplets.near/app/Tipping/1/1",
    //       status: [],
    //       title: "Tipping app",
    //       content: "If you want to thank the author of the post you like...",
    //     },
    //   ],
    //   skin: 'META_GUIDE',
    // },
    {
      id: "bos.dapplets.near/app/Tipping/2",
      type: "callout",
      namespace: "mweb",
      contextType: "injected-widget",
      injectTo: "hidden",
      if: {
        parentContextId: { eq: "dappletsproject.near/119034910" },
        widgetSrc: { eq: "bos.dapplets.near/widget/Tipping.Main" },
      },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/app/Tipping/2/1",
          status: [],
          title: "Tipping app",
          content: "If you want to thank the author of the post you like, you can send them a tip through our application.",
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/mutation/EarTrigger",
      type: 'callout',
      namespace: "mweb",
      contextType: "ear-trigger",
      injectTo: "hidden",
      if: { id: { eq: "dappletsproject.near/119034910" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/mutation/EarTrigger/1",
          status: [],
          title: "Apps control panel",
          content: 'We’ve added a special container to all posts. This allows users to attach widgets that extend the possibilities of Near Social.',
        },
      ],
      skin: 'META_GUIDE',
    },
    {
      id: "bos.dapplets.near/mutation/EarTrigger/copy",
      type: 'callout',
      namespace: "mweb",
      contextType: "ear-trigger",
      injectTo: "hidden",
      if: { id: { eq: "dappletsproject.near/119034910" } },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/mutation/EarTrigger/copy/1",
          status: [],
          title: "Apps control panel",
          content: '[See other Mutable Web facilities on X](https://augm.link/mutate/?t=https%3A%2F%2Ftwitter.com%2FMrConCreator&m=bos.dapplets.near%2Fmutation%2FSandbox)',
        },
      ],
      skin: 'META_GUIDE',
    },
  ],
}

const nestedCalloutConfig = {
  chapters: [{
    id: "CalloutInCallout",
    type: 'callout',
    namespace: "mweb",
    contextType: "wg-chapter",
    injectTo: "hidden",
    if: { id: { eq: "bos.dapplets.near/mutation/EarTrigger/copy" } }, // ID of the last chapter
    arrowTo: "context",
    pages: [
      {
        id: "CalloutInCallout/1",
        status: [],
        title: "Web Guides 1/3",
        content: 'The WebGuide is also an application. Any user can create a guide to explain a workflow to other users. The WebGuide consists of callouts pointing to UI elements (original or embedded by other applications).',
      },
      {
        id: "CalloutInCallout/2",
        status: [],
        title: "Web Guides 2/3",
        content: '![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/webguide-004.png)\n\nWeb Guides can consist of several chapters.',
      },
      {
        id: "CalloutInCallout/3",
        status: [],
        title: "Web Guides 3/3",
        content: 'Use the buttons to navigate through the Web Guide.',
      },
    ],
  }]
}

// ToDo: move to a smart contract
const guideConfigByLinkId = {
  // production (bos.dapplets.near/mutation/sandbox)
  '9a6537b6efbb98ad4c12ef747c7e29e9': twitterConfig,
  '8a1ca0a9eb03ce2725db7a553a9bcab7': nearSocialConfig,
  "5c105a6a05975423d39a1e0d9447a22d": nestedCalloutConfig,
  '84998d899f0b75b6ca47197c66baf3ca': nestedCalloutConfig, // twitter
  
  // testing (bos.dapplets.near/mutation/testing2)
  'b3777e928bd7ce9ad30eb636857a1853': twitterConfig,
  '114a78557d9044ff8c6e0177bcbe690a': nearSocialConfig,
  '0b492fd62c72d7ad87c7658e2b3a4f1e': nestedCalloutConfig,
}

const OverlayTriggerWrapper = styled.div`
  display: flex;
  z-index: 500;

  .OverlayTrigger {
    position: absolute;
    background: #db504a;
    border: 1px solid #db504a;
    width: 6px;
    height: 49px;
    right: -6px;
    top: 10px;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: 79;
  }
`

const guideConfig = guideConfigByLinkId[props.link.id]

const [showApp, setShowApp] = useState(true)
const [chapterCounter, setChapterCounter] = useState(0)
const [pageCounter, setPageCounter] = useState(0)

if (
  !guideConfig
  || !guideConfig.chapters?.length
  || !guideConfig.chapters[0].pages?.length
) return <></>

const handleClose = () => {
  setShowApp(false)
}

const handleAction = () => {
  setShowApp((val) => !val)
  setChapterCounter(0)
  setPageCounter(0)
}

const handleChapterDecrement = () => {
  if (chapterCounter !== 0) {
    setChapterCounter((val) => val - 1)
    setPageCounter(
      guideConfig.chapters[chapterCounter - 1]?.pages?.length
        ? guideConfig.chapters[chapterCounter - 1]?.pages?.length - 1
        : 0
    )
  }
}

const handleChapterIncrement = () => {
  setChapterCounter((val) => Math.min(val + 1, guideConfig.chapters.length - 1))
  setPageCounter(0)
}

const handleClickPrev = () => {
  if (!pageCounter) {
    handleChapterDecrement()
  } else {
    setPageCounter((val) => val - 1)
  }
}

const handleClickNext = () => {
  if (pageCounter === guideConfig.chapters[chapterCounter]?.pages?.length - 1) {
    handleChapterIncrement()
  } else {
    setPageCounter((val) => val + 1)
  }
}

const ChapterWrapper = (props) => {
  const currentChapter = guideConfig.chapters[chapterCounter]
  if (!currentChapter) return <></>
  const pages = currentChapter.pages
  if (!pages) return <></>
  const currentPage = pages[pageCounter]
  if (!currentPage) return <></>

  const status = currentPage.status.length && Object.entries(currentPage.status[0])[0] // ToDo: mocked!!!

  const buttons = []
  if (chapterCounter || pageCounter) {
    buttons.push({
      variant: "secondary",
      disabled: false,
      onClick: handleClickPrev,
      label: "Prev",
    })
  }
  if (chapterCounter === guideConfig.chapters.length - 1 && pageCounter === pages.length - 1) {
    buttons.push({
      variant: "primary",
      disabled: false,
      onClick: handleClose,
      label: "Finish",
    })
  } else (
    buttons.push({
      variant: "primary",
      disabled: false,
      onClick: handleClickNext,
      label: "Next",
    })
  )

  return  (
    <Widget
      src='bos.dapplets.near/widget/WebGuideTest.OverlayTrigger'
      loading={props?.children}
      props={{
        id: currentChapter.id,
        type: currentChapter.type,
        placement: currentChapter.placement,
        strategy: currentChapter.strategy,
        navi: {
          currentChapterIndex: chapterCounter,
          totalChapters: guideConfig.chapters.length,
          currentPageIndex: pageCounter,
          totalPages: pages.length,
        },
        onClose: handleClose,
        buttons,
        status: status && {
          type: status[0],
          text: status[1],
        },
        title: currentPage.title,
        content: currentPage.content,
        showChecked: currentChapter.showChecked,
        children: currentChapter.type === 'callout'
          && currentChapter.arrowTo === "context"
            ? ({ ref }) => {
                props.attachContextRef(ref);
                return props.children;
              }
            : currentChapter.arrowTo === "insPoint"
            ? ({ ref }) => {
                props.attachInsPointRef(ref);
                return props.children;
              }
            : props.children,
        skin: currentChapter.skin ?? 'DEFAULT',
      }}
    />
  )
}

const iconQuestionMark = (isActive) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <rect width="18" height="18" rx="9" fill={isActive ? "white" : "#02193A"} />
    <path
      d="M7.84446 12.85H9.60281V14.5H7.84446V12.85ZM9.01669 3.5C12.1524 3.621 13.5181 6.591 11.6542 8.8185C11.1677 9.3685 10.3823 9.7315 9.9955 10.1935C9.60281 10.65 9.60281 11.2 9.60281 11.75H7.84446C7.84446 10.8315 7.84446 10.056 8.23716 9.506C8.62399 8.956 9.40939 8.6315 9.89586 8.2685C11.3143 7.0365 10.9626 5.293 9.01669 5.15C8.55035 5.15 8.10311 5.32384 7.77335 5.63327C7.4436 5.94271 7.25835 6.36239 7.25835 6.8H5.5C5.5 5.92479 5.87051 5.08542 6.53001 4.46655C7.18952 3.84768 8.08401 3.5 9.01669 3.5Z"
      fill={isActive ? "#384BFF" : "white"}
    />
  </svg>
)

const iconTimelineLatch = (color) => (
  <svg
    width="15"
    height="19"
    viewBox="0 0 15 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 18.6H0.39L7.27 8.42C7.36 8.24 7.31 8.15 7.12 8.15H4.28L7.27 2.7C7.36 2.52 7.29 2.43 7.07 2.43H3.26C3.15 2.43 3.06 2.49 2.97 2.61L0.19 10.01C0.17 10.19 0.23 10.28 0.38 10.28H3.13L0 18.6ZM8.5 12.27H8.77L13.99 4.6C14.04 4.52 14.05 4.45 14.03 4.4C14.01 4.35 13.95 4.33 13.86 4.33H11.76L13.94 0.3C14.06 0.1 14 0 13.76 0H11.02C10.89 0 10.79 0.0600001 10.72 0.19L8.64 5.67C8.61 5.76 8.61 5.83 8.65 5.88C8.69 5.93 8.75 5.95 8.84 5.95H10.88L8.5 12.27Z"
      fill={color}
    />
  </svg>
)

return (
  <>
    {guideConfig.action ? (
      <DappletPortal
        target={{
          namespace: "mweb",
          contextType: "mweb-overlay",
          injectTo: "mweb-actions-panel",
          if: { id: { eq: "mweb-overlay" } },
          arrowTo: "context",
        }}
        component={() => <Widget
          src='bos.dapplets.near/widget/WebGuideTest.Action'
          props={{
            appId: 'web-guide-test',
            tooltip: showApp ? 'Stop Web Guide' : 'Run Web Guide',
            isActive: showApp,
            handleAction,
            children: iconQuestionMark(showApp),
          }}
        />}
      />
    ) : null}
    {showApp ? (guideConfig.chapters[chapterCounter]?.type === 'infobox' ? (
      <OverlayTriggerWrapper>
        <DappletOverlay>
          <ChapterWrapper/>
        </DappletOverlay>
      </OverlayTriggerWrapper>
    ) : (
      <>
        <DappletPortal
          target={{
            namespace: guideConfig.chapters[chapterCounter]?.namespace,
            contextType: guideConfig.chapters[chapterCounter]?.contextType,
            injectTo: guideConfig.chapters[chapterCounter]?.injectTo,
            if: guideConfig.chapters[chapterCounter]?.if,
            insteadOf: guideConfig.chapters[chapterCounter]?.insteadOf,
          }}
          component={ChapterWrapper}
        />
        <Highlighter
          target={{ 
            namespace: guideConfig.chapters[chapterCounter]?.namespace,
            contextType: guideConfig.chapters[chapterCounter]?.contextType,
            if: guideConfig.chapters[chapterCounter]?.if,
          }}
          styles={{
            borderColor: '#14AE5C',
            backgroundColor: 'rgb(56 255 63 / 10%)',
            // borderStyle: 'dashed',
          }}
          // filled
          // icon={iconTimelineLatch('#14AE5C')}
          // icon={() => <></>}
          // action={() => console.log('Highlighter action')}
        />
      </>
    )) : null}
  </>
)
