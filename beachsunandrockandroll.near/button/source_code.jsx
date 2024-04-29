const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Button = ({ className, children, State, ...props }) => {
  console.log("veamos->", state.cnButton, "<-");

  return (
    <Tailwind>
      <Widget
        src="beachsunandrockandroll.near/widget/buttonIframe"
        props={{
          output: (cnButton) => State.update({ cnButton }),
          className,
        }}
      />
      <button className={state.cnButton} ref="forwardedRef" {...props}>
        {children}
      </button>
    </Tailwind>
  );
};

return { Button };
