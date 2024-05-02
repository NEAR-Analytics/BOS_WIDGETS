const baseAlert =
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7";

const variantDefault = "bg-background text-foreground";

const alertClassnameDefault = `${baseAlert} ${variantDefault}`;

const Alert = ({ className, children, ...props }) => (
  <div
    ref="forwardedRef"
    role="alert"
    className={className ?? alertClassnameDefault}
    {...props}
  >
    {children}
  </div>
);

const alertTitleClassname = "mb-1 font-medium leading-none tracking-tight";

const AlertTitle = ({ className, children, ...props }) => (
  <h5
    ref="forwardedRef"
    className={className ?? alertTitleClassname}
    {...props}
  >
    {children}
  </h5>
);

const alertDescriptionClassname = "text-sm [&_p]:leading-relaxed";

const AlertDescription = ({ className, children, ...props }) => (
  <div
    ref="forwardedRef"
    className={className ?? alertDescriptionClassname}
    {...props}
  >
    {children}
  </div>
);

return {
  Alert,
  AlertTitle,
  AlertDescription,
  alertTitleClassname,
  alertDescriptionClassname,
  baseAlert,
  variantDefault,
  alertClassnameDefault,
};
