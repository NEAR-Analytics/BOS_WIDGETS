const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");
const { Button } = VM.require("beachsunandrockandroll.near/widget/button");

const {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  hoverCardContentClassname,
} = VM.require("beachsunandrockandroll.near/widget/hoverCard");
const { Avatar, AvatarImage, AvatarFallback } = VM.require(
  "beachsunandrockandroll.near/widget/avatar"
);

State.init({
  cnButton: "",
  cnHoverCardContent: "",
});

if (["", "loaded"].includes(state.cnButton))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButton) => State.update({ cnButton }),
        variant: "outline",
      }}
    />
  );

if (["", "loaded"].includes(state.cnHoverCardContent))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/cnIframe"
      props={{
        output: (cnHoverCardContent) => State.update({ cnHoverCardContent }),
        className: `${hoverCardContentClassname} w-80`,
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <HoverCard>
        <HoverCardTrigger>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className={state.cnHoverCardContent}>
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework - created and maintained by @vercel.
              </p>
              <div className="flex items-center pt-2">
                <i class="bi bi-calendar3 mr-2 h-4 w-4 opacity-70"></i>{" "}
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  </Tailwind>
);
