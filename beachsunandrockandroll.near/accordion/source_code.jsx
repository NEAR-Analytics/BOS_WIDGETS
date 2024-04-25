const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const AccordionRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <Accordion.Root className={className} {...props}>
      {children}
    </Accordion.Root>
  </Tailwind>
);

const AccordionItem = ({ className, children, ...props }) => (
  <Tailwind>
    <Accordion.Item ref={forwardedRef} className={"border-b"} {...props}>
      {children}
    </Accordion.Item>
  </Tailwind>
);

const AccordionTrigger = ({ className, children, ...props }) => (
  <Tailwind>
    <Accordion.Header className="flex">
      <Accordion.Trigger
        ref={forwardedRef}
        className={
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
        }
        {...props}
      >
        {children}
        <i className="bi bi-chevron-down h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"></i>
      </Accordion.Trigger>
    </Accordion.Header>
  </Tailwind>
);

const AccordionContent = ({ className, children, ...props }) => (
  <Tailwind>
    <Accordion.Content
      ref={forwardedRef}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={"pb-4 pt-0"}>{children}</div>
    </Accordion.Content>
  </Tailwind>
);

return { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
