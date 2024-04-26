const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");
const { Button } = VM.require("beachsunandrockandroll.near/widget/button");
const { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } = VM.require(
  "beachsunandrockandroll.near/widget/collapsible"
);

State.init({
  cnButtonToggle: "",
});

if (["", "loaded"].includes(state.cnButtonToggle))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButtonToggle) => State.update({ cnButtonToggle }),
        variant: "ghost",
        size: "sm",
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <CollapsibleRoot
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger>
            <Button className={state.cnButtonToggle}>
              <i class="bi bi-arrow-down-up h-4 w-4"></i>
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </CollapsibleRoot>
    </div>
  </Tailwind>
);
