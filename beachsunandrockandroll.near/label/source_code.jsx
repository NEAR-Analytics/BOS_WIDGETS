const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const labelClassname =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const LabelRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <Label.Root
      ref="forwardedRef"
      className={className ?? labelClassname}
      {...props}
    >
      {children}
    </Label.Root>
  </Tailwind>
);

return { Label: LabelRoot, labelClassname };
