const { context } = props;

const [counter, setCounter] = useState(0);

const stepsCount = 5;

const handleIncrement = () => {
  setCounter((val) => Math.min(val + 1, stepsCount - 1));
};

const handleDecrement = () => {
  setCounter((val) => Math.max(val - 1, 0));
};

const CalloutForContext =
  ({ arrowTo }) =>
  ({ children, context, attachContextRef, attachInsPointRef }) => {
    return (
      <Widget
        src="bos.dapplets.near/widget/WebGuide.OverlayTrigger"
        loading={children}
        props={{
          type: "callout",
          navi: {
            currentStepIndex: counter,
            totalSteps: stepsCount,
          },
          buttons: [
            {
              variant: "secondary",
              disabled: counter === 0,
              onClick: handleDecrement,
              label: "Prev",
            },
            {
              variant: "primary",
              disabled: counter === stepsCount - 1,
              onClick: handleIncrement,
              label: "Next",
            },
          ],
          status: {
            type: "info",
            text: context.type,
          },
          content: context.parsed.id,
          children:
            arrowTo === "context"
              ? ({ ref }) => {
                  attachContextRef(ref);
                  return children;
                }
              : arrowTo === "insPoint"
              ? ({ ref }) => {
                  attachInsPointRef(ref);
                  return children;
                }
              : children,
        }}
      />
    );
  };

return (
  <>
    {counter == 0 ? (
      <MuWebWrapperPortal
        target={{
          namespace: "mweb",
          contextType: "notch",
          injectTo: "hidden",
          if: { id: { eq: "notch" } },
        }}
        component={CalloutForContext({ arrowTo: "context" })}
      />
    ) : null}

    {counter == 1 ? (
      <MuWebWrapperPortal
        target={{
          namespace: "mweb",
          contextType: "mutation",
          injectTo: "hidden",
          if: { id: { eq: "bos.dapplets.near/mutation/Testing2" } },
        }}
        component={CalloutForContext({ arrowTo: "context" })}
      />
    ) : null}

    {counter == 2 ? (
      <MuWebWrapperPortal
        target={{
          namespace: "bos.dapplets.near/parser/twitter",
          contextType: "post",
          injectTo: "avatar",
          if: { id: { eq: "1694995344461894022" } },
        }}
        component={CalloutForContext({ arrowTo: "insPoint" })}
      />
    ) : null}

    {counter == 3 ? (
      <MuWebWrapperPortal
        target={{
          namespace: "bos.dapplets.near/parser/twitter",
          contextType: "post",
          injectTo: "southPanel",
          if: { id: { eq: "1694995344461894022" } },
          insteadOf: {
            linkId: "2dec2fe13441c1432d7a881e9cb58659",
          },
        }}
        component={CalloutForContext()}
      />
    ) : null}

    {counter == 4 ? (
      <MuWebWrapperPortal
        target={{
          namespace: "mweb",
          contextType: "ear-trigger",
          injectTo: "hidden",
          if: { id: { eq: "1694995344461894022" } },
        }}
        component={CalloutForContext({ arrowTo: "context" })}
      />
    ) : null}
  </>
);
