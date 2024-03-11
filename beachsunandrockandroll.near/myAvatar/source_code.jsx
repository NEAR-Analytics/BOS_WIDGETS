const css = fetch("https://floatui.com/tailwind.css").body;
if (!css) return "";
const Tailwind = styled.div`${css}`;

const MyAvatar = ({ className, ...props }) => (
  <Tailwind>
    <Avatar.Root
      className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
      {...props}
    />
  </Tailwind>
);

const MyAvatarImage = ({ className, ...props }) => (
  <Tailwind>
    <Avatar.Image className="aspect-square h-full w-full" {...props} />
  </Tailwind>
);

const MyAvatarFallback = ({ className, ...props }) => (
  <Tailwind>
    <Avatar.Fallback
      className="flex h-full w-full items-center justify-center rounded-full bg-muted"
      {...props}
    />
  </Tailwind>
);

return { MyAvatar, MyAvatarImage, MyAvatarFallback };
