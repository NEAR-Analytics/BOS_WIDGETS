const Cn = ({ output, ...props }) => (
  <Widget
    src="beachsunandrockandroll.near/widget/buttonIframe"
    props={{ output, ...props }}
  />
);

const Button = ({
  className,
  children,
  variant,
  size,
  cnButton,
  setCnButton,
  ...props
}) => {
  return (
    <>
      <Cn
        output={setCnButton}
        variant={variant}
        size={size}
        className={className}
      />
      <button className={cnButton} ref="forwardedRef" {...props}>
        {children}
      </button>
    </>
  );
};

return { Button };
