const [isRunnigApp, toggleIsRunningApp] = useState(false)
const [selectedContext, setSelectedContext] = useState(null)

const handleClose = () => {
  setSelectedContext(null)
  toggleIsRunningApp(false)
}

const ChapterWrapper = (props) => {
  const widgetProps = {
    id: selectedContext.id,
    type: 'callout',
    onClose: handleClose,
    content:`
**ID:** ${selectedContext.id}

**Context type:** ${selectedContext.type}

**Namespace:** ${selectedContext.namespace}

**Parsed context:**

\`\`\`js
${JSON.stringify(selectedContext.parsed, null, 2)}
\`\`\`
`,
    skin: 'META_GUIDE',
    children: ({ ref }) => {
      props.attachContextRef(ref);
      return props.children;
    }
  }
  return (
    <Widget
      src='bos.dapplets.near/widget/WebGuide.OverlayTrigger'
      loading={props?.children}
      props={widgetProps}
    />
  )
}

return (
  <>
    {isRunnigApp ? (
      <DappletContextPicker
        target={
          [
            {
              namespace: 'bos.dapplets.near/parser/twitter',
              contextType: 'timeline',
              if: {}
            },
            {
              namespace: 'bos.dapplets.near/parser/twitter',
              contextType: 'post',
              if: {}
            },
            {
              namespace: 'bos.dapplets.near/parser/twitter',
              contextType: 'postSouthButton',
              if: {}
            },
            {
              namespace: 'bos.dapplets.near/parser/twitter',
              contextType: 'profile',
              if: {}
            }
          ]
        }
        onClick={setSelectedContext}
        LatchComponent={ContextTypeLatch}
      />
    ) : null}
    
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
          appId: 'picker-adapter-tester',
          tooltip: isRunnigApp ? 'Stop Picker Adapter Tester' : 'Run Picker Adapter Tester',
          isActive: isRunnigApp,
          children: (<p>PAT</p>),
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

    {isRunnigApp && selectedContext ? (
      <DappletPortal
        target={selectedContext}
        component={ChapterWrapper}
      />
    ) : null}
  </>
)
