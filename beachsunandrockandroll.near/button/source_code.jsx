const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Button = ({ className, variant, size, children, ...props }) => {
  return (
    <Tailwind>
      <button className={className} ref={forwardedRef} {...props}>
        {children}
      </button>
    </Tailwind>
  );
};

return { Button };
