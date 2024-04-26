const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Badge = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

return { Badge };
