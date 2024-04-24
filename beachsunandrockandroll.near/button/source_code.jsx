
const Button = ({ className, variant, size, children, ...props }) => {
  return (
      <button className={className} ref={forwardedRef} {...props}>
        {children}
      </button>
  );
};

return { Button };
