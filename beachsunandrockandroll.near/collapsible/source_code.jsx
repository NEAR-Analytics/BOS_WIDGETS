const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const CollapsibleRoot = ({ children, ...props }) => (
  <Tailwind>
    <Collapsible.Root {...props}>{children}</Collapsible.Root>
  </Tailwind>
);

const CollapsibleTrigger = ({ children, ...props }) => (
  <Tailwind>
    <Collapsible.CollapsibleTrigger {...props}>
      {children}
    </Collapsible.CollapsibleTrigger>
  </Tailwind>
);

const CollapsibleContent = ({ children, ...props }) => (
  <Tailwind>
    <Collapsible.CollapsibleContent {...props}>
      {children}
    </Collapsible.CollapsibleContent>
  </Tailwind>
);

return { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
