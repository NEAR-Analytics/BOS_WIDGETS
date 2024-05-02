const baseBadge =
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const variantDefault =
  "border-transparent bg-uin-primary text-primary-foreground shadow hover:opacity-80";

const badgeClassnameDefault = `${baseBadge} ${variantDefault}`;

const Badge = ({ className, children, ...props }) => (
  <div className={className ?? badgeClassnameDefault} {...props}>
    {children}
  </div>
);

return { Badge, baseBadge, variantDefault, badgeClassnameDefault };
