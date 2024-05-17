const twitterConfig = {
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
          status: [{ info: 'You must be logged in to make all features available' }],
          content: "\nMutable Web is a new web3 paradigm that allows anyone to add custom functionality to existing websites and share it with your community— no matter who owns the website.\n\nBecome a co-owner of any website you are use!\n\n### Mutation switch\n\n![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/onboarding-video-001.webp)\n\nYou can switch between website mutations created by different communities.\n\n[See more examples in our playground](https://twitter.com/MrConCreator)\n",
        },
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
    },
    {
      id: "bos.dapplets.near/app/Paywall",
      type: "callout",
      namespace: "mweb",
      contextType: "injected-widget",
      injectTo: "hidden",
      if: {
        parentContextId: { eq: "1694995303642939408" },
        widgetSrc: { eq: "bos.dapplets.near/widget/Paywall.Main" },
      },
      arrowTo: "context",
      pages: [
        {
          id: "bos.dapplets.near/app/Paywall/1",
          status: [],
          title: "Paywall app",
          content: "Paywall app allows users to add images to posts and sell access to them.",
        },
      ],
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
    },
  ],
}

const nearSocialConfig = {
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
          status: [{ info: 'You must be logged in to make all features available' }],
          content: "Mutable Web is a new web3 paradigm that allows anyone to add custom functionality to existing websites and share them within your community — no matter who owns the website.\n\nBecome the co-owner of any website you are using!\n\n### Mutation switch\n\n![](https://raw.githubusercontent.com/dapplets/bos-components/main/assets/onboarding-008.png)\n\nYou can switch between website mutations created by different communities.\n\n[Mutable Web also runs on X](https://augm.link/mutate/?t=https%3A%2F%2Ftwitter.com%2FMrConCreator&m=bos.dapplets.near%2Fmutation%2FSandbox). Сheck its’ Web Guide there!",
        },
      ]
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
      ]
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
    //   ]
    // },
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

  const status = currentPage.status.length&& Object.entries(currentPage.status[0])[0] // ToDo: mocked!!!

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
      src='bos.dapplets.near/widget/WebGuide.OverlayTrigger'
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
      }}
    />
  )
}

return showApp ? (guideConfig.chapters[chapterCounter]?.type === 'infobox' ? (
  <OverlayTriggerWrapper>
    <DappletOverlay>
      <ChapterWrapper/>
    </DappletOverlay>
  </OverlayTriggerWrapper>
) : (
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
)) : <></>
