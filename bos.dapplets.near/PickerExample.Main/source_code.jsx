const NAMESPACE = 'bos.dapplets.near/parser/twitter'
const CONTEXT_TYPE = 'post'

const SKIN = 'DEFAULT'

const [isRunnigApp, toggleIsRunningApp] = useState(false)
const [context, setContext] = useState(null)

const handleClose = () => {
  setContext(null)
  toggleIsRunningApp(false)
}

useEffect(() => {
  if (!isRunnigApp) return;
  props.pickContext({ 
    namespace: NAMESPACE,
    contextType: CONTEXT_TYPE,
    if: {}
  })
    .then((newContext) => setContext(newContext))
    .catch((err) => console.log(err))
}, [isRunnigApp])

const ChapterWrapper = (props) => {
  const widgetProps = {
    id: context.id,
    type: 'callout',
    onClose: handleClose,
    title: 'Parsed context',
    content:`
\`\`\`js
${JSON.stringify(context.parsed, null, 2)}
\`\`\`
`,
    skin: SKIN,
    children: ({ ref }) => {
      props.attachInsPointRef(ref);
      return props.children;
    }
    // children: ({ ref }) => {
    //   props.attachContexttRef(ref);
    //   return props.children;
    // }
  }
  return (
    <Widget
      src='bos.dapplets.near/widget/WebGuide.OverlayTrigger'
      loading={props?.children}
      props={widgetProps}
    />
  )
}

const iconQuestionMark = (isActive) => (
  <svg
    width="512"
    height="512"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="512"
      height="512"
      fill={isActive ? "white" : "#384BFF"}
    />
    <path
      d="M274.175 72.1535C274.547 69.181 270.812 67.5595 268.894 69.8608L85.1005 290.413C83.4721 292.367 84.8616 295.333 87.4051 295.333H252.602C254.406 295.333 255.802 296.915 255.578 298.705L237.825 440.735C237.453 443.708 241.188 445.329 243.106 443.028L426.9 222.476C428.528 220.522 427.138 217.556 424.595 217.556H259.398C257.594 217.556 256.198 215.974 256.422 214.183L274.175 72.1535Z"
      fill={isActive ? "#384BFF" : "white"}
      stroke={isActive ? "#384BFF" : "white"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

return (
  <>
    <DappletPortal
      target={{
        namespace: "mweb",
        contextType: "mweb-overlay",
        injectTo: "mweb-actions-panel",
        if: { id: { eq: "mweb-overlay" } },
        arrowTo: "context",
      }}
      component={() => <Widget
        src='bos.dapplets.near/widget/WebGuide.Action'
        props={{
          appId: 'picker-example',
          tooltip: isRunnigApp ? 'Stop Picker' : 'Run Picker',
          isActive: isRunnigApp,
          children: iconQuestionMark(isRunnigApp),
          handleAction: () => {
            if (isRunnigApp) {
              handleClose()
            } else {
              toggleIsRunningApp(true)
            }
          },
        }}
      />}
    />
    {isRunnigApp && context ? (
      <DappletPortal
        target={{
          namespace: NAMESPACE,
          contextType: CONTEXT_TYPE,
          if: { id: { eq: context?.id } },
          injectTo: 'avatar',
          arrowTo: "insPoint",
          // injectTo: CONTEXT_TYPE,
          // arrowTo: 'context',
        }}
        component={ChapterWrapper}
      />
    ) : null}
  </>
)
