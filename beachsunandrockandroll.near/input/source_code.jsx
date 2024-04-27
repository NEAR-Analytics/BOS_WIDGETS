const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Input = ({ className, children, type, ...props }) => (
  <Tailwind>
    <input type={type} className={className} ref="forwardedRef" {...props} />
  </Tailwind>
);

return { Input };
