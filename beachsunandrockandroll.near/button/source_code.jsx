const baseButton =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantDefault =
  "bg-uin-primary text-primary-foreground hover:opacity-90";

const sizeDefault = "h-10 px-4 py-2";

const buttonClassnameDefault = `${baseButton} ${variantDefault} ${sizeDefault}`;

const Button = ({ className, children, ...props }) => (
  <button
    className={className ?? buttonClassnameDefault}
    ref="forwardedRef"
    {...props}
  >
    {children}
  </button>
);

return {
  Button,
  baseButton,
  variantDefault,
  sizeDefault,
  buttonClassnameDefault,
};
