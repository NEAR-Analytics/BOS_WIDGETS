const Cn = ({ setCnButton, ...props }) => {
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: setCnButton,
        ...props,
      }}
    />
  );
};

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
        setCnButton={setCnButton}
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
