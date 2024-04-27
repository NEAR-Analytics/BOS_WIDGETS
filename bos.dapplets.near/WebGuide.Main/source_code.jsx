const { context } = props;

const [counter, setCounter] = useState(0);

const ids = [
  "1694995344461894022",
  "1694995303642939408",
  "1694995269547438149",
  "1694995241055465828",
  "1694995203663290832",
];

const handleIncrement = () => {
  setCounter((val) => Math.min(val + 1, ids.length - 1));
};

const handleDecrement = () => {
  setCounter((val) => Math.max(val - 1, 0));
};

const CalloutForContext = ({ children, context }) => {
  if (ids[counter] !== context.id) return children;

  return (
    <Widget
      src="bos.dapplets.near/widget/WebGuide.OverlayTrigger"
      loading={children}
      props={{
        type: "callout",
        navi: {
          currentStepIndex: counter,
          totalSteps: ids.length
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
            disabled: counter === ids.length - 1,
            onClick: handleIncrement,
            label: "Next",
          },
        ],
        // status: {
        //   type: "info",
        //   text: counter,
        // },
        content: context.parsed.text,
        children,
      }}
    />
  );
};

return (
  <>
    <MuWebWrapperPortal
      target={{
        namespace: "bos.dapplets.near/parser/twitter",
        contextType: "post",
        injectTo: "southPanel",
        if: { id: { not: null } },
        insteadOf: {
          linkId: "2dec2fe13441c1432d7a881e9cb58659",
        },
      }}
      component={CalloutForContext}
    />
  </>
);
