const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const AspectRatioRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <AspectRatio.Root className={className} {...props}>
      {children}
    </AspectRatio.Root>
  </Tailwind>
);

return { AspectRatioRoot };
