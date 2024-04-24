const css = fetch("https://floatui.com/tailwind.css").body;
if (!css) return "";
const Tailwind = styled.div`${css}`;

const MyAvatar = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Root
      className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full"
      {...props}
    >
      {children}
    </Avatar.Root>
  </Tailwind>
);

const MyAvatarImage = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Image className="aspect-square h-full w-full" {...props} />
  </Tailwind>
);

const MyAvatarFallback = ({ className, children, ...props }) => (
  <Tailwind>
    <Avatar.Fallback
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
      {...props}
    >
      {children}
    </Avatar.Fallback>
  </Tailwind>
);

return { MyAvatar, MyAvatarImage, MyAvatarFallback };
