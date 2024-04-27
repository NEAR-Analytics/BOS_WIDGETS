const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const avatarClassname =
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full";

const AvatarRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Root className={className ?? avatarClassname} {...props}>
      {children}
    </Avatar.Root>
  </Tailwind>
);

const avatarImageClassname = "aspect-square h-full w-full";

const AvatarImage = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Image className={className ?? avatarImageClassname} {...props} />
  </Tailwind>
);

const avatarFallbackClassname =
  "flex h-full w-full items-center justify-center rounded-full bg-muted";

const AvatarFallback = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Fallback
      className={className ?? avatarFallbackClassname}
      {...props}
    >
      {children}
    </Avatar.Fallback>
  </Tailwind>
);

return {
  Avatar: AvatarRoot,
  AvatarImage,
  AvatarFallback,
  avatarClassname,
  avatarImageClassname,
  avatarFallbackClassname,
};
