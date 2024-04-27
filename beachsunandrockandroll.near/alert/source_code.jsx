const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Alert = ({ className, children, variant, ...props }) => (
  <Tailwind>
    <div ref="forwardedRef" role="alert" className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const alertTitleClassname = "mb-1 font-medium leading-none tracking-tight";

const AlertTitle = ({ className, children, ...props }) => (
  <Tailwind>
    <h5
      ref="forwardedRef"
      className={className ?? alertTitleClassname}
      {...props}
    >
      {children}
    </h5>
  </Tailwind>
);

const alertDescriptionClassname = "text-sm [&_p]:leading-relaxed";

const AlertDescription = ({ className, children, ...props }) => (
  <Tailwind>
    <div
      ref="forwardedRef"
      className={className ?? alertDescriptionClassname}
      {...props}
    >
      {children}
    </div>
  </Tailwind>
);

return {
  Alert,
  AlertTitle,
  AlertDescription,
  alertTitleClassname,
  alertDescriptionClassname,
};
