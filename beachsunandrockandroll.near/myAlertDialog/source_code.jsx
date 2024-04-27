const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");
const { Button } = VM.require("beachsunandrockandroll.near/widget/button");

const {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  dropdownMenuContentClassname,
} = VM.require("beachsunandrockandroll.near/widget/dropdownMenu");

State.init({
  cnButton: "",
  cnDropdownMenuContent: "",
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

if (["", "loaded"].includes(state.cnDropdownMenuContent))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/cnIframe"
      props={{
        output: (cnDropdownMenuContent) =>
          State.update({ cnDropdownMenuContent }),
        className: `${dropdownMenuContentClassname} w-56`,
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className={state.cnButton}>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={state.cnDropdownMenuContent}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Tailwind>
);
