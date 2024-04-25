const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Alert = ({ className, children, variant, ...props }) => (
  <Tailwind>
    <div ref={forwardedRef} role="alert" className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const AlertTitle = ({ className, children, ...props }) => (
  <Tailwind>
    <h5 ref={forwardedRef} className={className} {...props}>
      {children}
    </h5>
  </Tailwind>
);

const AlertDescription = ({ className, children, ...props }) => (
  <Tailwind>
    <div ref={forwardedRef} className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

return { Alert, AlertTitle, AlertDescription };
