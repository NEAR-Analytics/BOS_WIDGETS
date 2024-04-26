const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const CollapsibleRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <Collapsible.Root className={className} {...props}>
      {children}
    </Collapsible.Root>
  </Tailwind>
);

const CollapsibleTrigger = ({ className, children, ...props }) => (
  <Tailwind>
    <Collapsible.CollapsibleTrigger className={className} {...props}>
      {children}
    </Collapsible.CollapsibleTrigger>
  </Tailwind>
);

const CollapsibleContent = ({ className, children, ...props }) => (
  <Tailwind>
    <Collapsible.CollapsibleContent className={className} {...props}>
      {children}
    </Collapsible.CollapsibleContent>
  </Tailwind>
);

return { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
