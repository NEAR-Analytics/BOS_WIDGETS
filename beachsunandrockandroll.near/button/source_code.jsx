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
      <Widget
        src="beachsunandrockandroll.near/widget/buttonIframe"
        props={{
          output: setCnButton,
          className,
          variant,
          size,
        }}
      />
      <button className={cnButton} ref="forwardedRef" {...props}>
        {children}
      </button>
    </>
  );
};

return { Button };
