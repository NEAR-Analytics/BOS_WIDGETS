const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const { AvatarRoot, AvatarImage, AvatarFallback } = VM.require(
  "beachsunandrockandroll.near/widget/avatar"
);

return (
  <Tailwind>
    <div className="flex mx-auto w-max h-screen pt-10">
      <AvatarRoot className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <AvatarImage
          className="aspect-square h-full w-full"
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          PD
        </AvatarFallback>
      </AvatarRoot>
    </div>
  </Tailwind>
);
