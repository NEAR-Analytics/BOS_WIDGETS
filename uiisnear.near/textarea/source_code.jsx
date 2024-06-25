const textareaClassname =
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const Textarea = ({ className, children, ...props }) => (
  <textarea
    className={className ?? textareaClassname}
    ref="forwardedRef"
    {...props}
  />
);

return { Textarea, textareaClassname };
