const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const LabelRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <LabelPrimitive.Root
      ref="forwardedRef"
      className={
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      }
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  </Tailwind>
);

return { LabelRoot };
