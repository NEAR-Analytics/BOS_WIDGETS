const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const AvatarRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Root className={className} ref="forwardedRef" {...props}>
      {children}
    </Avatar.Root>
  </Tailwind>
);

const AvatarImage = ({ className, ...props }) => (
  <Tailwind>
    <Avatar.Image className={className} ref="forwardedRef" {...props} />
  </Tailwind>
);

const AvatarFallback = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Fallback className={className} ref="forwardedRef" {...props}>
      {children}
    </Avatar.Fallback>
  </Tailwind>
);

return { AvatarRoot, AvatarImage, AvatarFallback };
