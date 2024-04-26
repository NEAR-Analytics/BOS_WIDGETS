const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Button = ({ className, children, ...props }) => (
  <Tailwind>
    <button className={className} ref="forwardedRef" {...props}>
      {children}
    </button>
  </Tailwind>
);

return { Button };
