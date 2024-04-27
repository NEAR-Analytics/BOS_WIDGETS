const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const AspectRatioRoot = ({ children, ...props }) => (
  <Tailwind>
    <AspectRatio.Root {...props}>{children}</AspectRatio.Root>
  </Tailwind>
);

return { AspectRatio: AspectRatioRoot };
