const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Card = ({ className, children, ...props }) => (
  <Tailwind>
    <div ref="forwardedRef" className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const CardHeader = ({ className, children, ...props }) => (
  <Tailwind>
    <div ref="forwardedRef" className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const CardTitle = ({ className, children, ...props }) => (
  <Tailwind>
    <h3 ref="forwardedRef" className={className} {...props}>
      {children}
    </h3>
  </Tailwind>
);

const CardDescription = ({ className, children, ...props }) => (
  <Tailwind>
    <p ref="forwardedRef" className={className} {...props}>
      {children}
    </p>
  </Tailwind>
);

const CardContent = ({ className, children, ...props }) => (
  <Tailwind>
    <div ref="forwardedRef" className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const CardFooter = ({ className, children, ...props }) => (
  <Tailwind>
    <div ref="forwardedRef" className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

return {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
