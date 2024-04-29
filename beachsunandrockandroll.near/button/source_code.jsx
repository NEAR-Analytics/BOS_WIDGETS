const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

State.init({
  cnButton: "",
});

if (["", "loaded"].includes(state.cnButton))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButton) => State.update({ cnButton }),
      }}
    />
  );

const Button = ({ className, children, ...props }) => (
  <Tailwind>
    <button className={state.cnButton} ref="forwardedRef" {...props}>
      {children}
    </button>
  </Tailwind>
);

return { Button };
