const Alert = ({ className, children, variant, ...props }) => (
  <div ref={forwardedRef} role="alert" className={className} {...props}>
    {children}
  </div>
);

const AlertTitle = ({ className, children, ...props }) => (
  <h5 ref={forwardedRef} className={className} {...props}>
    {children}
  </h5>
);

const AlertDescription = ({ className, children, ...props }) => (
  <div ref={forwardedRef} className={className} {...props}>
    {children}
  </div>
);

return { Alert, AlertTitle, AlertDescription };
