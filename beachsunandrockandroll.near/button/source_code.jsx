const Button = ({ className, children, ...props }) => (
  <button className={className} ref="forwardedRef" {...props}>
    {children}
  </button>
);

return { Button };
